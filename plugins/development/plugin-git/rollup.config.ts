import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: ['execa'],
  }),
  ...rollupBundle(
    {
      base: 'client',
      files: ['components/GitChangelog', 'components/GitContributors', 'index'],
    },
    {},
  ),
]
