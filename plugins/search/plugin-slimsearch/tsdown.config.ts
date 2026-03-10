import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig([
    'node/index',
    'client/config',
    'client/index',
    'client/shims.d',
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
