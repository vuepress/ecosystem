import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: ['chokidar'],
    dtsExternal: ['vuepress/core'],
  }),
  ...rollupBundle(
    {
      base: 'client',
      files: ['config', 'index'],
    },
    {
      external: ['@internal/searchIndex'],
    },
  ),
]
