import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig('node/index', {
    external: [
      'rehype-parse',
      'rehype-sanitize',
      'rehype-stringify',
      'unified',
    ],
  }),
  tsdownConfig(
    {
      base: 'client',
      files: ['components/GitChangelog', 'components/GitContributors', 'index'],
    },
    {},
  ),
]
