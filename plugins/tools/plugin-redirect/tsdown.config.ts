import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig('cli/index', {
    external: ['commander'],
  }),
  tsdownConfig('node/index'),
  tsdownConfig(
    {
      base: 'client',
      files: ['components/RedirectModal', 'config', 'index'],
    },
    {
      external: ['@vuepress/plugin-redirect/modal'],
    },
  ),
]
