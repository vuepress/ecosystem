import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    dtsExternal: ['@vuepress/helper/shared'],
  }),
  ...rollupBundle('client/index', {
    dtsExternal: ['@vuepress/helper/shared'],
  }),
]
