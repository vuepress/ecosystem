# cache

<NpmBadge package="@vuepress/plugin-cache" />

This plugin is used to solve the issue of long startup times in VuePress.

By caching the `markdown render` during the initial startup of the VuePress development server, the plugin skips unnecessary `markdown render` on subsequent startups, thus speeding up the startup process.

## Usage

```bash
npm i -D @vuepress/plugin-cache@next
```

It is recommended to place `cachePlugin` as the last item in the `plugins` configuration, as this can ensure maximum utilization of caching.

```ts
import { cachePlugin } from '@vuepress/plugin-cache'

export default {
  plugins: [
    // ... other plugins
    cachePlugin({
      // options
    }),
  ],
}
```

## Options

### type

- Type: `'memory'` | `'filesystem'`

- Default: `'memory'`

- Details:

  Cache Types

  - `'memory'` is for memory cache, using memory cache can achieve optimal optimization effects, but as the project scales up, it occupies more memory, suitable for projects with fewer pages.
  - `'filesystem'` is for file system cache, for complex projects with many pages, file cache is recommended.
