import { rollupBundle } from '../../../scripts/rollup.js'

export default rollupBundle('node/index', {
  external: [
    '@mdit/plugin-figure',
    '@mdit/plugin-img-lazyload',
    '@mdit/plugin-img-mark',
    '@mdit/plugin-img-size',
  ],
})
