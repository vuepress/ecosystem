import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: ['execa'],
  }),
  ...rollupBundle(
    {
      base: 'client',
      files: ['config', 'index'],
    },
    {
      dtsExternal: ['@vuepress/helper/client'],
    },
  ),
]
