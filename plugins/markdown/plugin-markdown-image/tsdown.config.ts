import { tsdownConfig } from '../../../scripts/tsdown.js'

export default tsdownConfig('node/index', {
  external: [
    '@mdit/plugin-figure',
    '@mdit/plugin-img-lazyload',
    '@mdit/plugin-img-mark',
    '@mdit/plugin-img-size',
  ],
})
