import { tsdownConfig } from '../../../scripts/tsdown.ts'

export default tsdownConfig([
  'node/index',
  'client/index',
  'client/components/GitChangelog',
  'client/components/GitContributors',
])
