import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig('node/index', {
    external: ['chokidar'],
  }),
  tsdownConfig(
    {
      base: 'client',
      files: ['config', 'index'],
    },
    { external: ['@internal/noticeOptions'] },
  ),
]
