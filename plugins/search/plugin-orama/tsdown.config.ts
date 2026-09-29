import { tsdownConfig } from '../../../scripts/tsdown.ts'

export default [
  tsdownConfig([
    'node/index',
    'client/config',
    'client/index',
    'client/shims.d',
    // The dev worker is resolved against `import.meta.url` of the client
    // config, so it has to be emitted next to it
    { 'client/worker/dev': './src/worker/dev.ts' },
  ]),
  tsdownConfig('worker/build', {
    dts: false,
    define: {
      '__VUEPRESS_SSR__': 'false',
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    alwaysBundle: [/^@vuepress\//u, /^@orama\//u, /^vuepress\//u],
    format: 'iife',
    outputOptions: {
      entryFileNames: '[name].js',
    },
  }),
]
