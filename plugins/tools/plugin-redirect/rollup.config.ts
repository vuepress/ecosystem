import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('cli/index', {
    external: ['commander'],
  }),
  ...rollupBundle('node/index', {
    dtsExternal: ['@vuepress/helper/shared'],
  }),
  ...rollupBundle(
    {
      base: 'client',
      files: ['components/RedirectModal', 'config', 'index'],
    },
    {
      external: ['@vuepress/plugin-redirect/modal'],
      dtsExternal: ['@vuepress/helper/shared'],
    },
  ),
]
