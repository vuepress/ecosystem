/**
 * Check build output imports and file sizes
 *
 * This script scans all built JS files in the monorepo and reports:
 * 1. External imports per package
 * 2. File sizes per package
 *
 * 检查构建产物的导入和文件大小
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')

/** Known allowed import patterns that are always valid externals */
const ALLOWED_PATTERNS: RegExp[] = [
  // Node.js builtins
  /^node:/,
  // Relative imports (bundled chunks)
  /^\./,
  /^\.\./,
  // VuePress core packages
  /^vuepress\//,
  // VuePress temp modules (generated at runtime)
  /^@temp\//,
  // VuePress internal virtual modules
  /^@internal\//,
  // VuePress theme path aliases (resolved at runtime)
  /^@theme\//,
  // VuePress sass palette virtual modules
  /^@sass-palette\//,
  // CSS/SCSS imports
  /\.css$/,
  /\.scss$/,
]

interface PackageJson {
  name: string
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

/**
 * Extract import specifiers from a JavaScript file (stripping comments and
 * template literals)
 *
 * 从 JavaScript 文件中提取导入标识符
 *
 * @param content - File content / 文件内容
 * @returns Array of import specifiers / 导入标识符数组
 */
const extractImports = (content: string): string[] => {
  const imports: string[] = []

  // Remove block comments, template literals, then line comments
  // Order matters: template literals must be removed before line comments
  // because `//` inside template literals (e.g. URLs) is not a comment
  const stripped = content
    .replaceAll(/\/\*[\s\S]*?\*\//g, '')
    .replaceAll(/`[^`]*`/g, '""')
    .replaceAll(/\/\/[^\n]*/g, '')

  const staticImportRegex =
    /(?:^|[\n;])\s*import\s+(?:[\s\S]*?\s+from\s+)?['"]([^'"]+)['"]/g
  let match: RegExpExecArray | null

  while ((match = staticImportRegex.exec(stripped)) != null) {
    imports.push(match[1])
  }

  const reExportRegex =
    /(?:^|[\n;])\s*export\s+(?:[\s\S]*?\s+from\s+)['"]([^'"]+)['"]/g

  while ((match = reExportRegex.exec(stripped)) != null) {
    imports.push(match[1])
  }

  // Dynamic import() expressions
  const dynamicImportRegex = /\bimport\(\s*['"]([^'"]+)['"]\s*\)/g

  while ((match = dynamicImportRegex.exec(stripped)) != null) {
    imports.push(match[1])
  }

  return imports.filter((specifier) => !specifier.includes('${'))
}

/**
 * Get the package name from an import specifier
 *
 * 从导入标识符获取包名
 *
 * @param specifier - Import specifier / 导入标识符
 * @returns Package name / 包名
 */
const getPackageName = (specifier: string): string => {
  if (specifier.startsWith('@')) {
    const parts = specifier.split('/')

    return `${parts[0]}/${parts[1]}`
  }

  return specifier.split('/')[0]
}

/**
 * Format file size in human-readable format
 *
 * 格式化文件大小
 *
 * @param bytes - File size in bytes / 文件大小（字节）
 * @returns Formatted size / 格式化后的大小
 */
const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`

  const kb = bytes / 1024

  if (kb < 1024) return `${kb.toFixed(2)} kB`

  return `${(kb / 1024).toFixed(2)} MB`
}

/**
 * Recursively find all .js files in a directory
 *
 * 递归查找目录中的所有 .js 文件
 *
 * @param dir - Directory path / 目录路径
 * @returns Array of file paths / 文件路径数组
 */
const findJsFiles = (dir: string): string[] => {
  const files: string[] = []

  if (!existsSync(dir)) return files

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...findJsFiles(fullPath))
    } else if (entry.endsWith('.js') && !entry.endsWith('.d.js')) {
      files.push(fullPath)
    }
  }

  return files
}

/**
 * Find all packages in the monorepo
 *
 * 查找 monorepo 中的所有包
 *
 * @returns Array of package directory paths / 包目录路径数组
 */
const findPackages = (): string[] => {
  const packages: string[] = []

  for (const topDir of ['tools', 'themes']) {
    for (const dir of readdirSync(join(ROOT, topDir))) {
      const pkgDir = join(ROOT, topDir, dir)

      if (existsSync(join(pkgDir, 'package.json'))) {
        packages.push(pkgDir)
      }
    }
  }

  for (const category of readdirSync(join(ROOT, 'plugins'))) {
    const categoryDir = join(ROOT, 'plugins', category)

    if (!statSync(categoryDir).isDirectory()) continue

    for (const dir of readdirSync(categoryDir)) {
      const pkgDir = join(categoryDir, dir)

      if (existsSync(join(pkgDir, 'package.json'))) {
        packages.push(pkgDir)
      }
    }
  }

  return packages
}

interface PackageReport {
  name: string
  totalSize: number
  dtsSize: number
  jsSize: number
  externalImports: Set<string>
  issues: string[]
}

const reports: PackageReport[] = []

for (const pkgDir of findPackages()) {
  const pkgJsonPath = join(pkgDir, 'package.json')
  const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8')) as PackageJson
  const libDir = join(pkgDir, 'lib')

  if (!existsSync(libDir)) continue

  const report: PackageReport = {
    name: pkgJson.name,
    totalSize: 0,
    dtsSize: 0,
    jsSize: 0,
    externalImports: new Set(),
    issues: [],
  }

  const allowedDeps = new Set<string>()

  if (pkgJson.dependencies) {
    for (const dep of Object.keys(pkgJson.dependencies)) {
      allowedDeps.add(dep)
    }
  }

  if (pkgJson.peerDependencies) {
    for (const dep of Object.keys(pkgJson.peerDependencies)) {
      allowedDeps.add(dep)
    }
  }

  allowedDeps.add(pkgJson.name)

  // Collect file sizes
  const collectSizes = (dir: string): void => {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        collectSizes(fullPath)
      } else {
        report.totalSize += stat.size

        if (entry.endsWith('.d.ts') || entry.endsWith('.d.mts')) {
          report.dtsSize += stat.size
        } else if (entry.endsWith('.js') || entry.endsWith('.mjs')) {
          report.jsSize += stat.size
        }
      }
    }
  }

  collectSizes(libDir)

  // Collect imports and check
  for (const filePath of findJsFiles(libDir)) {
    const content = readFileSync(filePath, 'utf-8')

    for (const specifier of extractImports(content)) {
      if (ALLOWED_PATTERNS.some((pattern) => pattern.test(specifier))) continue

      const pkgName = getPackageName(specifier)

      report.externalImports.add(specifier)

      if (!allowedDeps.has(pkgName)) {
        report.issues.push(`"${specifier}" (${pkgName} not in deps)`)
      }
    }
  }

  reports.push(report)
}

// Output
console.log('\n📦 Build Output Report\n')

let totalJsSize = 0
let totalDtsSize = 0
let totalSize = 0
let totalIssues = 0

for (const report of reports.sort((a, b) => a.name.localeCompare(b.name))) {
  totalJsSize += report.jsSize
  totalDtsSize += report.dtsSize
  totalSize += report.totalSize

  const imports = [...report.externalImports].sort()

  console.log(
    `📦 ${report.name}  (js: ${formatSize(report.jsSize)}, dts: ${formatSize(report.dtsSize)}, total: ${formatSize(report.totalSize)})`,
  )

  if (imports.length > 0) {
    console.log(`   imports: ${imports.join(', ')}`)
  }

  if (report.issues.length > 0) {
    totalIssues += report.issues.length

    for (const issue of report.issues) {
      console.log(`   ❌ ${issue}`)
    }
  }

  console.log()
}

console.log('─'.repeat(60))
console.log(
  `Total: ${reports.length} packages, js: ${formatSize(totalJsSize)}, dts: ${formatSize(totalDtsSize)}, total: ${formatSize(totalSize)}`,
)

if (totalIssues > 0) {
  console.log(`\n❌ Found ${totalIssues} issue(s) with undeclared dependencies`)

  throw new Error(`Found ${totalIssues} issue(s) with undeclared dependencies`)
} else {
  console.log('\n✅ All external imports match declared dependencies')
}
