import { commonjs } from '@hyrious/esbuild-plugin-commonjs'
import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  dts: true,
  entryPoints: ['src/index.ts', 'src/client/index.ts', 'src/client/define.ts'],
  esbuildPlugins: [commonjs()],

  format: ['esm'],
  outDir: 'lib',
  external: [/\.vue$/u, /^@internal/u],
  target: 'node20',
})
