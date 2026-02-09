import { tsdownConfig } from '../../../scripts/tsdown.js'

export default [
  tsdownConfig('node/index', {
    external: ['workbox-build'],
  }),
  tsdownConfig(
    {
      base: 'client',
      files: [
        'components/PwaInstall',
        'components/PwaFoundPopup',
        'components/PwaReadyPopup',
        'composables/index',
        'index',
      ],
    },
    {
      external: ['mitt', 'register-service-worker'],
    },
  ),
]
