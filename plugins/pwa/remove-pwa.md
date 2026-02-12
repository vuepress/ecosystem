---
url: /plugins/pwa/remove-pwa.md
---
# remove-pwa

This plugin removes service workers from your VuePress site, ensuring users can receive updates after you remove any previously enabled PWA plugin.

::: tip Why this plugin is needed if you used PWA plugin once?

PWA plugins like [`@vuepress/plugin-pwa`](./pwa/README.md) register service workers that cache your site for offline access.

If you remove a PWA plugin, the old service worker remains but can't receive updates as there's no new service worker to update to. Users will be stuck with the old version of your site.

To solve this problem:

1. A new empty service worker is generated in the original location.
2. This service worker removes cached content from the old service worker, then unregisters itself.

:::

## Usage

```bash
npm i -D @vuepress/plugin-remove-pwa@next
```

```ts title=".vuepress/config.ts"
import { removePwaPlugin } from '@vuepress/plugin-remove-pwa'

export default {
  plugins: [
    removePwaPlugin({
      // By default, all caches will be removed
      // To target specific caches, provide regex patterns
      cachePatterns: ['\\bworkbox\\b', 'precache-v2'],
      swLocation: 'service-worker.js',
    }),
  ],
}
```

## Options

### cachePatterns

* Type: `string[]`
* Default: `[]`
* Details: Regular expression patterns to match cache names for removal. If empty, all caches will be removed.

### swLocation

* Type: `string`
* Default: `'service-worker.js'`
* Details: Original service worker location relative to dest folder.
