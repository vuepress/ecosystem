import { tsdownConfig } from '../../../scripts/tsdown.js'

export default tsdownConfig([
  'node/index',
  'client/components/PwaInstall',
  'client/components/PwaFoundPopup',
  'client/components/PwaReadyPopup',
  'client/composables/index',
  'client/index',
])
