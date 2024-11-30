import { rollupBundle } from '../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: [],
  }),
  ...rollupBundle(
    {
      base: 'client',
      files: ['index'],
    },
    {
      external: [],
    },
  ),
]
