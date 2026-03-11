import { tsdownConfig } from '../../../scripts/tsdown.js'

export default tsdownConfig(
  [
    'cli/index',
    'node/index',
    'client/components/RedirectModal',
    'client/components/RedirectPopup',
    'client/config',
    'client/index',
  ],
  {
    neverBundle: ['@vuepress/plugin-redirect/component'],
  },
)
