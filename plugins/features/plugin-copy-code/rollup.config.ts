import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    dtsExternal: ['@vuepress/helper/shared'],
  }),
  ...rollupBundle(
    {
      base: 'client',
      files: ['config', 'index'],
    },
    {
      dtsExternal: ['@vuepress/helper/shared'],
    },
  ),
]
