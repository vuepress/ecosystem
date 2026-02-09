import { tsdownConfig } from '../../../scripts/tsdown.js'

export default tsdownConfig('node/index', {
  external: [
    '@mdit/plugin-align',
    '@mdit/plugin-attrs',
    '@mdit/plugin-mark',
    '@mdit/plugin-spoiler',
    '@mdit/plugin-stylize',
    '@mdit/plugin-sub',
    '@mdit/plugin-sup',
  ],
})
