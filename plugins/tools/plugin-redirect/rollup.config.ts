import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('cli/index', {
    external: ['commander'],
  }),
  ...rollupBundle('node/index'),
  ...rollupBundle(
    {
      base: 'client',
      files: ['components/RedirectModal', 'config', 'index'],
    },
    {
      external: ['@vuepress/plugin-redirect/modal'],
    },
  ),
]
