import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig([
    'node/index',
    'client/components/SearchResult',
    'client/config',
    'client/index',
    'client/worker',
  ]),
  tsdownConfig('worker/index', {
    dts: false,
    define: {
      '__VUEPRESS_SSR__': 'false',
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
  }),
]
