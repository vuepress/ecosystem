import { defineConfig } from 'npm-check-updates'

export default defineConfig({
  peer: true,
  workspaces: true,
  upgrade: true,
  timeout: 60000,
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
})
