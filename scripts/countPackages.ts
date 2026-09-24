import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import picocolors from 'picocolors'

/**
 * Count the published packages of this monorepo.
 *
 * Packages may be laid out flat (`themes/<package>`, `tools/<package>`) or
 * grouped into categories (`plugins/<category>/<package>`), both layouts are
 * supported.
 *
 * Directories without a valid `package.json` are skipped, so stale build
 * leftovers do not affect the result, and packages marked as `private` are
 * excluded from the counts.
 *
 * Run it with `unrun scripts/countPackages.ts`, and pass `--write` to also sync
 * the count in the README.
 */

const ROOT = path.resolve(import.meta.dirname, '../')
const README = path.join(ROOT, 'README.md')
const README_PATTERN =
  /^This repo contains \d+ official plugins? and \d+ official themes?\.$/mu

interface PackageMeta {
  name: string
  dir: string
  private: boolean
}

interface PackageGroup {
  category: string
  /** Whether the packages are nested in a category directory */
  nested: boolean
  packages: PackageMeta[]
}

const getDirectories = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true })

  return entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
}

const readPackageMeta = async (dir: string): Promise<PackageMeta | null> => {
  try {
    const content = await readFile(path.join(ROOT, dir, 'package.json'), 'utf8')
    const { name, private: isPrivate } = JSON.parse(content) as {
      name?: string
      private?: boolean
    }

    return name ? { name, dir, private: isPrivate ?? false } : null
  } catch {
    return null
  }
}

const collectGroup = async (
  dir: string,
  category: string,
): Promise<PackageGroup> => {
  const meta = await readPackageMeta(dir)

  // A directory holding a `package.json` is the package itself
  if (meta) return { category, nested: false, packages: [meta] }

  const children = await getDirectories(path.join(ROOT, dir))
  const metas = await Promise.all(
    children.map((child) => readPackageMeta(`${dir}/${child}`)),
  )

  return {
    category,
    nested: true,
    packages: metas.filter((item): item is PackageMeta => item != null),
  }
}

const collectPackages = async (dir: string): Promise<PackageGroup[]> => {
  const names = await getDirectories(path.join(ROOT, dir))

  return Promise.all(names.map((name) => collectGroup(`${dir}/${name}`, name)))
}

const flatten = (groups: PackageGroup[]): PackageMeta[] =>
  groups.flatMap(({ packages }) => packages)

const countPublished = (packages: PackageMeta[]): number =>
  packages.filter(({ private: isPrivate }) => !isPrivate).length

const printSection = (title: string, groups: PackageGroup[]): void => {
  console.log(
    `\n${picocolors.bold(title)} ${picocolors.cyan(
      String(countPublished(flatten(groups))),
    )}`,
  )

  // Only grouped layouts get a per-category breakdown
  if (!groups.some(({ nested }) => nested)) return

  for (const { category, packages } of groups) {
    console.log(
      `  ${picocolors.bold(category.padEnd(12))} ${picocolors.cyan(
        String(countPublished(packages)),
      )}`,
    )
  }
}

const [pluginGroups, themeGroups, toolGroups] = await Promise.all([
  collectPackages('plugins'),
  collectPackages('themes'),
  collectPackages('tools'),
])

console.log(picocolors.bold('VuePress Ecosystem'))
printSection('Plugins', pluginGroups)
printSection('Themes', themeGroups)
printSection('Tools', toolGroups)

const plugins = countPublished(flatten(pluginGroups))
const themes = countPublished(flatten(themeGroups))

if (process.argv.includes('--write')) {
  const readme = await readFile(README, 'utf8')

  if (!README_PATTERN.test(readme)) {
    console.error(
      `\n${picocolors.red('Failed to find the package count line in README.md')}`,
    )
    // oxlint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  }

  const line = `This repo contains ${plugins} official ${
    plugins === 1 ? 'plugin' : 'plugins'
  } and ${themes} official ${themes === 1 ? 'theme' : 'themes'}.`

  await writeFile(README, readme.replace(README_PATTERN, line), 'utf8')
  console.log(`\nUpdated README.md: ${picocolors.cyan(line)}`)
}
