/**
 * Check build output externals
 *
 * This script verifies that the build output correctly externalizes
 * dependencies. It checks that:
 * 1. All imports in built files are valid external dependencies
 *    (listed in package.json dependencies/peerDependencies,
 *     or are Node.js builtins, CSS/SCSS files, VuePress internals, etc.)
 * 2. No unexpected packages are bundled or missing
 *
 * 检查构建产物的外部依赖
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
  devDependencies?: Record<string, string>
}

/**
 * Extract import specifiers from a JavaScript file
 *
 * 从 JavaScript 文件中提取导入标识符
 *
 * @param content - File content / 文件内容
 * @returns Array of import specifiers / 导入标识符数组
 */
const extractImports = (content: string): string[] => {
  const imports: string[] = []

  // Remove block comments (/* ... */) and line comments (// ...)
  // Remove template literals (` ... `) to avoid matching imports in strings
  // Remove regular strings (' ... ' and " ... ") to avoid false matches
  const stripped = content
    .replaceAll(/\/\*[\s\S]*?\*\//g, '')
    .replaceAll(/\/\/[^\n]*/g, '')
    .replaceAll(/`[^`]*`/g, '""')

  // Only match imports at the start of a line or after a semicolon/newline
  // This avoids matching imports inside template strings

  // Match static imports: import ... from '...'
  const staticImportRegex =
    /(?:^|[\n;])\s*import\s+(?:[\s\S]*?\s+from\s+)?['"]([^'"]+)['"]/g
  let match: RegExpExecArray | null

  while ((match = staticImportRegex.exec(stripped)) != null) {
    imports.push(match[1])
  }

  // Match re-exports: export ... from '...'
  const reExportRegex =
    /(?:^|[\n;])\s*export\s+(?:[\s\S]*?\s+from\s+)['"]([^'"]+)['"]/g

  while ((match = reExportRegex.exec(stripped)) != null) {
    imports.push(match[1])
  }

  // Filter out template literal fragments (contain ${...})
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

  // Tools
  for (const dir of readdirSync(join(ROOT, 'tools'))) {
    const pkgDir = join(ROOT, 'tools', dir)

    if (existsSync(join(pkgDir, 'package.json'))) {
      packages.push(pkgDir)
    }
  }

  // Plugins
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

  // Themes
  for (const dir of readdirSync(join(ROOT, 'themes'))) {
    const pkgDir = join(ROOT, 'themes', dir)

    if (existsSync(join(pkgDir, 'package.json'))) {
      packages.push(pkgDir)
    }
  }

  return packages
}

interface ExternalIssue {
  pkg: string
  file: string
  importSpecifier: string
  reason: string
}

const issues: ExternalIssue[] = []
let checkedFiles = 0
let checkedPackages = 0

for (const pkgDir of findPackages()) {
  const pkgJsonPath = join(pkgDir, 'package.json')
  const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8')) as PackageJson
  const libDir = join(pkgDir, 'lib')

  if (!existsSync(libDir)) continue

  checkedPackages++

  const allowedDeps = new Set<string>()

  // Add dependencies and peerDependencies
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

  // The package itself is allowed (self-referencing)
  allowedDeps.add(pkgJson.name)

  const jsFiles = findJsFiles(libDir)

  for (const filePath of jsFiles) {
    const content = readFileSync(filePath, 'utf-8')
    const imports = extractImports(content)

    checkedFiles++

    for (const importSpecifier of imports) {
      // Check if import matches allowed patterns
      if (ALLOWED_PATTERNS.some((pattern) => pattern.test(importSpecifier))) {
        continue
      }

      // Check if the import is a known dependency
      const pkgName = getPackageName(importSpecifier)

      if (!allowedDeps.has(pkgName)) {
        const relativePath = filePath
          .replace(`${ROOT}/`, '')
          .replace(`${ROOT}\\`, '')

        issues.push({
          pkg: pkgJson.name,
          file: relativePath,
          importSpecifier,
          reason: `"${pkgName}" is not listed in dependencies or peerDependencies`,
        })
      }
    }
  }
}

// Report results
console.log(`\n📦 External Dependencies Check`)
console.log(
  `   Checked ${checkedFiles} files across ${checkedPackages} packages\n`,
)

if (issues.length === 0) {
  console.log('✅ All external imports are valid!\n')
} else {
  console.log(`❌ Found ${issues.length} issue(s):\n`)

  // Group by package
  const byPkg = new Map<string, ExternalIssue[]>()

  for (const issue of issues) {
    const existing = byPkg.get(issue.pkg) ?? []

    existing.push(issue)
    byPkg.set(issue.pkg, existing)
  }

  for (const [pkg, pkgIssues] of byPkg) {
    console.log(`  📦 ${pkg}:`)

    for (const issue of pkgIssues) {
      console.log(`     ❌ ${issue.file}`)
      console.log(`        imports "${issue.importSpecifier}"`)
      console.log(`        → ${issue.reason}`)
    }

    console.log()
  }

  throw new Error(`Found ${issues.length} external dependency issue(s)`)
}
