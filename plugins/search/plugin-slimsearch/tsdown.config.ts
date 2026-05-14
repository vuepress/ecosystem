import { tsdownConfig } from '../../../scripts/tsdown.ts'

export default [
  tsdownConfig([
    'node/index',
    'client/config',
    'client/index',
    'client/shims.d',
    'worker/dev',
  ]),
  tsdownConfig('worker/build', {
    dts: false,
    define: {
      '__VUEPRESS_SSR__': 'false',
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    alwaysBundle: [/^@vuepress\//u, 'slimsearch', /^vuepress\//u],
    format: 'iife',
    outputOptions: {
      entryFileNames: '[name].js',
    },
  }),
]
