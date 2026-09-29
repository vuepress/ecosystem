import type { PwaPluginLocaleConfig } from '../../src/client/types.js'

/** Full locale data for the root locale, used by the PWA client tests */
export const pwaLocales: PwaPluginLocaleConfig = {
  '/': {
    install: 'Install',
    iOSInstall: "Tap the share button and then 'Add to Home Screen'",
    cancel: 'Cancel',
    close: 'Close',
    prevImage: 'Previous Image',
    nextImage: 'Next Image',
    desc: 'Description',
    feature: 'Key Features',
    explain: 'This app can be installed on your PC or mobile device.',
    hint: 'New content found.',
    update: 'New content is available.',
  },
}
