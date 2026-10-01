const coolDownExcludePrefixes = [
  '@mdit/',
  '@mr-hope/',
  '@oxfmt/',
  '@oxlint/',
  '@vitest/',
  '@vue/',
  '@vuepress/',
  '@waline/',
]
const coolDownExcludePackages = new Set([
  'oxc-config-hope',
  'oxfmt',
  'oxlint',
  'stylelint-config-hope',
  'vite',
  'vitest',
  'vue',
  'vuepress',
])

export default {
  peer: true,
  cooldown: (pkg) => {
    if (
      coolDownExcludePrefixes.some((prefix) => pkg.startsWith(prefix)) ||
      coolDownExcludePackages.has(pkg)
    )
      return 0

    return 1
  },
  workspaces: true,
  upgrade: true,
  timeout: 300000,
  target: (name) => {
    if (
      name.startsWith('@vuepress/') ||
      name === 'vuepress' ||
      name.startsWith('vuepress-')
    )
      return '@next'

    if (name === '@types/node') return 'minor'

    if (['vite'].includes(name)) return 'patch'

    return 'latest'
  },
}
