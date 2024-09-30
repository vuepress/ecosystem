import { rollupBundle } from '../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: ['@vue/shared', 'cheerio', 'fflate/node', 'gray-matter'],
  }),
  ...rollupBundle(
    {
      base: 'client',
      files: ['noopComponent', 'noopModule', 'index'],
    },
    {
      external: ['fflate/browser'],
    },
  ),
  ...rollupBundle('shared/index', {
    external: ['vuepress/shared'],
    dtsExternal: ['vuepress/shared'],
  }),
]
