const coolDownExcludePrefixes = [
  '@oxfmt/',
  '@oxlint/',
  '@vue/',
  '@vuepress/',
  '@vitest/',
]
const coolDownExcludePackages = new Set([
  'oxc-config-hope',
  'oxfmt',
  'oxlint',
  'vite',
  'vitest',
  'vue',
  'vuepress',
])

export default {
  peer: true,
  cooldown: (name) => {
    if (
      coolDownExcludePrefixes.some((item) => name.startsWith(item)) ||
      coolDownExcludePackages.has(name)
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
