import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: ['cheerio', 'chokidar', 'slimsearch'],
    dtsExternal: ['vuepress/core'],
  }),
  ...rollupBundle(
    {
      base: 'client',
      files: ['components/SearchResult', 'config', 'index', 'worker'],
    },
    {
      external: ['@internal/pagesComponents', 'slimsearch'],
    },
  ),
  ...rollupBundle('worker/index', {
    resolve: true,
    dts: false,
    external: [/^@internal\//],
    define: {
      '__VUEPRESS_SSR__': 'false',
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
  }),
]
