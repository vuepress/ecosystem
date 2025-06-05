import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: ['chokidar'],
  }),
  ...rollupBundle(
    {
      base: 'client',
      files: ['config', 'index'],
    },
    { external: ['@internal/noticeOptions'] },
  ),
]
