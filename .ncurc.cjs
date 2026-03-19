// oxlint-disable-next-line typescript/no-unsafe-call
const { defineConfig } = require('npm-check-updates')

module.exports = defineConfig({
  workspaces: true,
  upgrade: true,
  timeout: 60000,
  // FIXME: https://github.com/raineorshine/npm-check-updates/issues/1604
  // peer: true,
  target: (name) => {
    if (
      name.startsWith('@vuepress/') ||
      name === 'vuepress' ||
      name.startsWith('vuepress-')
    )
      return '@next'

    if (['vite'].includes(name)) return 'patch'

    return 'latest'
  },
  reject: (name) => {
    if (name === '@types/node') return true

    return false
  },
})
