import { rollupBundle } from '../../../scripts/rollup.js'

export default rollupBundle('node/index', {
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
