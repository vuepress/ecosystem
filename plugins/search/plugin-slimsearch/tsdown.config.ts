import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig('node/index', {
    external: ['cheerio', 'chokidar', 'slimsearch'],
    dtsExternal: ['vuepress/core'],
  }),
  tsdownConfig(
    {
      base: 'client',
      files: ['components/SearchResult', 'config', 'index', 'worker'],
    },
    {
      external: ['@internal/pagesComponents', 'slimsearch'],
    },
  ),
  tsdownConfig('worker/index', {
    resolve: true,
    dts: false,
    external: [/^@internal\//],
    define: {
      '__VUEPRESS_SSR__': 'false',
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
  }),
]
