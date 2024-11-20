import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: ['workbox-build'],
  }),
  ...rollupBundle(
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
