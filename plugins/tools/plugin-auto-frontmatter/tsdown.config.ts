import { tsdownConfig } from '../../../scripts/tsdown.js'

export default tsdownConfig('node/index', {
  external: [
    'chokidar',
    'nanoid',
    'picomatch',
    'p-map',
    'js-yaml',
    'gray-matter',
  ],
})
