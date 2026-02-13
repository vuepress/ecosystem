import { tsdownConfig } from '../../../scripts/tsdown.js'

const COMMENT_PROVIDERS = ['Artalk', 'Giscus', 'Twikoo', 'Waline']

export default tsdownConfig([
  'node/index',
  ...COMMENT_PROVIDERS.map((name) => `client/components/${name}Comment`),
  'client/pageview/artalk',
  'client/pageview/noop',
  'client/pageview/waline',
  'client/config',
  'client/index',
])
