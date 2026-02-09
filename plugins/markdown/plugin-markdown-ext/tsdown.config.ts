import { tsdownConfig } from '../../../scripts/tsdown.js'

export default tsdownConfig('node/index', {
  external: [
    '@mdit/plugin-container',
    '@mdit/plugin-footnote',
    '@mdit/plugin-tasklist',
    'js-yaml',
  ],
})
