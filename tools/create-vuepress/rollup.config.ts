import { rollupBundle } from '../../scripts/rollup.js'

export default rollupBundle('index', {
  external: [/^node:/, '@inquirer/prompts', 'cac', 'execa'],
  dts: false,
})
