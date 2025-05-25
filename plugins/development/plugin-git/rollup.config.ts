import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: [
      'rehype-parse',
      'rehype-sanitize',
      'rehype-stringify',
      'unified',
    ],
  }),
  ...rollupBundle(
    {
      base: 'client',
      files: ['components/GitChangelog', 'components/GitContributors', 'index'],
    },
    {},
  ),
]
