---
url: /ecosystem/plugins/pwa/pwa.md
---
# pwa

Make your VuePress site a Progressive Web Application (PWA)\[^pwa-intro].

## Usage

```bash
npm i -D @vuepress/plugin-pwa@next
```

```ts title=".vuepress/config.ts"
import { pwaPlugin } from '@vuepress/plugin-pwa'

export default {
  plugins: [
    pwaPlugin({
      // options
    }),
  ],
}
```

The plugin uses [workbox-build](https://developers.google.com/web/tools/workbox/modules/workbox-build) to generate the service worker file, and [register-service-worker](https://github.com/yyx990803/register-service-worker) to register the service worker.

A PWA uses a Service Worker\[^service-worker] (SW for short) to cache and proxy site content.

::: warning

If you have enabled this plugin once and want to disable it, you might need [`@vuepress/plugin-remove-pwa`](./remove-pwa.md) to remove the existing service worker.

:::

\[^pwa-intro]: **PWA Introduction**

```
PWA, full name Progressive Web App, is a standard stipulated by W3C.

It allows sites to install themselves as an App on supported platforms through browsers that support this feature.

See <https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps> for details.
```

\[^service-worker]: **Service Worker Introduction**

```
1. The Service Worker will get and cache all the files registered in it during the registration process.

1. After the registration completes, the Service Worker is activated and starts to proxy and control all your requests.

1. Whenever you want to initiate an access request through the browser, the Service Worker will check whether it exists in its own cache list. If it exists, it will directly return the cached result; otherwise, it will call its own fetch method to get it. You can use a custom fetch method to fully control the result of requests for resources in the web page, such as providing a fallback web page when offline.

1. Every time the user reopens the site, the Service Worker will request the link where it was registered. If a new version of Service Worker is detected, it will update itself and start caching the list of resources registered in the new Service Worker. After the content update is successfully obtained, the Service Worker will trigger the `update` event. The user can be notified through this event, for example, a pop-up window will be displayed in the lower right corner, prompting the user that new content is available and allowing the user to trigger an update.
```

## Guide

### Web App Manifests

To make your website fully compliant with PWA, a Web App Manifest\[^manifest] file is needed, and your PWA should satisfy the installability[^installable] specification.

\[^manifest]: **Manifest File**

```
The manifest file uses the JSON format and is responsible for declaring various information of the PWA, such as name, description, icon, and shortcut actions.

In order for your site to be registered as a PWA, you need to meet the basic specifications of the manifest to make the browser consider the site as an installable PWA and allow users to install it.

::: tip

For Manifest standards and specifications, please see [MDN Web App manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest) and [W3C Manifest](https://w3c.github.io/manifest/).

:::
```

[^installable]: **Installable**

```
To let the site be registered as a PWA, the site needs to successfully register a valid service worker by itself, and declare a valid manifest file with its link in meta tag.

The manifest file should contain at least `name` (or `short_name`) `icons` `start_url`.

On Safari, the maximum cache size of the service worker is 50 MB.
```

You can set the [`manifest`](#manifest) option to customize the manifest file, or provide a `manifest.webmanifest` or `manifest.json` in the public folder. The former has higher priority.

The plugin automatically generates `manifest.webmanifest` for you and adds a manifest link declaration in each page, while **you should still at least set a valid icon through `manifest.icons` or other icon-related options.**

::: warning

The installability[^installable] specification requires at least one valid icon to be declared in the manifest.

So if you do not configure `manifest.icons`, visitors can only enjoy the offline accessibility brought by the Service Worker cache, but cannot install your site as a PWA.

:::

Some manifest fields have a fallback when you do not set them:

* `name`: `siteConfig.title` || `siteConfig.locales['/'].title` || `"Site"`
* `short_name`: `siteConfig.title` || `siteConfig.locales['/'].title` || `"Site"`
* `description`: `siteConfig.description` || `siteConfig.locales['/'].description` || `"A site built with vuepress"`
* `lang`: `siteConfig.locales['/'].lang` || `siteConfig.lang`
* `start_url`: `context.base`
* `scope`: `context.base`
* `display`: `"standalone"`
* `theme_color`: [`themeColor`](#themecolor) || `"#46bd87"`
* `background_color`: `"#ffffff"`
* `orientation`: `"portrait-primary"`
* `prefer_related_applications`: `false`

It is recommended to set [`favicon`](#favicon) for your site.

The plugin does not process anything in the manifest by default, but outputs them as-is. This means that if you plan to deploy to a subdirectory, you should append the URL prefix to manifest URLs yourself. If everything you need is all under the `base` directory, you can set [`appendBase`](#appendbase) to `true` to let the plugin append `base` to any links in the manifest.

### Cache Control

To better control what the Service Worker can pre-cache, the plugin provides related options for cache control.

#### Default Cache

By default, the plugin pre-caches all `js` and `css` files, and only the homepage and 404 HTML are cached. The plugin also caches font files (woff, woff2, eot, ttf, otf) and SVG icons.

#### Image Cache

If your site has only a few important images and you want them displayed in offline mode, you can cache site images by setting [`cacheImage`](#cacheimage) to `true`.

Images are recognized by file extension. Any file ending with `.png`, `.jpg`, `.jpeg`, `.gif`, `.bmp` or `.webp` is regarded as an image.

#### HTML Cache

If you have a small site and would like to make documents fully available offline, you can set [`cacheHTML`](#cachehtml) to `true` to cache all HTML files.

::: tip Why are only home and 404 pages cached by default?

Though VuePress generates HTML files through SSG\[^ssg] for all pages, these files are mainly used for SEO\[^seo] and allow you to directly visit any link without configuring the backend as SPA\[^spa].

\[^ssg]: **SSG**: **S**tatic **S**ite **G**eneration

\[^seo]: **SEO**: **S**earch **E**ngine **O**ptimization

\[^spa]: **SPA**: **S**ingle **P**age **A**pplication, most of them only have the homepage and use history mode to handle routing instead of actually navigating between pages.

VuePress is essentially an SPA. This means that you only need to cache the home page and enter from the home page to access all pages normally. Therefore, not caching other HTML by default can effectively reduce the cache size (40% smaller in size) and speed up the SW update speed.

But this also has disadvantages. If the user enters the site directly from a non-home page, the HTML file for the first page still needs to be loaded from the internet. Also, in an offline environment, users can only enter through the homepage and then navigate to the corresponding page by themselves. If they directly access a link, an inaccessible prompt will appear.

:::

#### Size Control

To prevent large files from being included in the pre-cache list, any file > 2 MB or image > 1 MB will be omitted. You can customize these limits with [`maxSize`](#maxsize) and [`maxImageSize`](#maximagesize) (in KB unit).

`maxSize` has the highest priority, and any file exceeding it will be excluded. So if you generate very large HTML or JS files, please consider increasing it, otherwise your PWA may not work normally in offline mode.

`maxImageSize` must not be greater than [`maxSize`](#maxsize).

### Update Control

The [`update`](#update) option controls how users receive updates. Its default value is `"available"`.

* `"available"`: The new SW is installed and its resources are fetched silently in the background. A pop-up window appears once the new SW is ready, and users can choose whether to refresh immediately to view new content. This means users are reading old content before a new SW is ready.

* `"hint"`: Users are notified that new content has been published within seconds after visiting the docs, and can choose to refresh immediately. If the user chooses to refresh, the page is reloaded at once, then the new SW installs and takes control of the page. The negative effect is that the user needs to get all the resources of the page from the internet before the new SW installs and controls the page.

* `"disable"`: The new SW is installed completely silently in the background and starts waiting. When all pages controlled by the old SW are closed, the new SW starts to take control and provides users with new content during the next visit. This setting prevents users from being disturbed during their visit.

* `"force"`: The page is force-reloaded as soon as a new SW is detected, ensuring that users always browse the latest content. The biggest disadvantage is that all users experience an unexpected sudden refresh within seconds after re-entering an updated site.

::: tip

How docs are updated is controlled by the previous version, so the current option only affects the next update from this version.

:::

#### Popups

When new content is detected (a new SW is detected), an update found popup appears; and when the new content is ready, an update ready popup appears.

If you are not satisfied with the default popup content, you can use your own component. Import `PwaFoundPopup` or `PwaReadyPopup` from `@vuepress/plugin-pwa/client` and use its slot to customize the popup content, then pass the component path to [`foundComponent`](#foundcomponent) or [`readyComponent`](#readycomponent) option:

```vue
<script setup lang="ts">
import { PwaFoundPopup } from '@vuepress/plugin-pwa/client'
</script>
<template>
  <PwaFoundPopup v-slot="{ found, refresh }">
    <div v-if="found">
      New content is found.
      <button type="button" @click="refresh">Refresh</button>
    </div>
  </PwaFoundPopup>
</template>
```

```vue
<script setup lang="ts">
import { PwaReadyPopup } from '@vuepress/plugin-pwa/client'
</script>
<template>
  <PwaReadyPopup v-slot="{ isReady, reload }">
    <div v-if="isReady">
      New content is ready.
      <button type="button" @click="reload">Apply</button>
    </div>
  </PwaReadyPopup>
</template>
```

### Other Options

The plugin also provides other PWA-related options, such as Microsoft tile icon and color settings, Apple icons ([`apple`](#apple)), and so on. If you are an advanced user, you can also set [`generateSWConfig`](#generateswconfig) to configure `workbox-build`.

## Options

::: fields
@`serviceWorkerFilename` type=string default=`'service-worker.js'`

Service Worker file path.

@`showInstall` type=boolean default=`true`

Whether to display the install button when the Service Worker is first registered successfully.

@`manifest` type=AppManifest

The object to be parsed to `manifest.webmanifest`, which is generated and injected into every page by the plugin.

See also: [Web App Manifests](#web-app-manifests).

@`favicon` type=string

Link of `favicon.ico`.

@`themeColor` type=string default=`'#46bd87'`

Theme color of the PWA.

@`maxSize` type=number default=`2048`

Max size allowed to be cached, in KB.

See also: [Size Control](#size-control).

@`cacheHTML` type=boolean default=`false`

Whether to cache HTML files besides the home page and the 404 page.

See also: [HTML Cache](#html-cache).

@`cacheImage` type=boolean default=`false`

Whether to cache images.

See also: [Image Cache](#image-cache).

@`maxImageSize` type=number default=`1024`

Max image size allowed to be cached, in KB.

See also: [Size Control](#size-control).

@`update` type=`'available' | 'disable' | 'force' | 'hint'` default=`'available'`

How users receive updates.

See also: [Update Control](#update-control).

@`apple` type=`ApplePwaOptions | false`

Special settings for better supporting Safari, ignoring these options is safe.

@@`apple.icon` type=string

Icon link used by Safari, recommend 152×152 size.

@@`apple.maskIcon` type=string

Safari mask icon.

@@`apple.statusBarColor` type=`'black-translucent' | 'black' | 'default'` default=`'default'` deprecated

Status bar color for Safari. The related tag is unstandardized, so you should avoid declaring it.

@`foundComponent` type=string default=`'PwaFoundPopup'`

Path of the custom hint popup component.

See also: [Popups](#popups).

@`readyComponent` type=string default=`'PwaReadyPopup'`

Path of the custom update popup component.

See also: [Popups](#popups).

@`appendBase` type=boolean default=`false`

Whether to append `base` to all absolute links in options.

See also: [Web App Manifests](#web-app-manifests).

@`generateSWConfig` type=`Partial<GenerateSWOptions>`

Options passed to `workbox-build`, see [Workbox documentation](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW).

@`locales` type=`LocaleConfig<PwaPluginLocaleData>`

Locales config for the PWA plugin. The locale data is a partial of `PwaPluginLocaleData`.

See also: [Locales](../supported-locales.md).

@@`locales.<localePath>.install` type=string

Install button text.

@@`locales.<localePath>.iOSInstall` type=string

IOS install hint text.

@@`locales.<localePath>.cancel` type=string

Cancel button text.

@@`locales.<localePath>.close` type=string

Close button text.

@@`locales.<localePath>.prevImage` type=string

Previous image text.

@@`locales.<localePath>.nextImage` type=string

Next image text.

@@`locales.<localePath>.explain` type=string

Install explain text.

@@`locales.<localePath>.desc` type=string

Description label text.

@@`locales.<localePath>.feature` type=string

Feature label text.

@@`locales.<localePath>.hint` type=string

Update hint text.

@@`locales.<localePath>.update` type=string

Update available text.

:::

## Composition API

### usePwaEvent

* Type: `() => PwaEvent`

* Returns: Event emitter of this plugin

* Details: Returns the event emitter of this plugin. You can add listener function to events that provided by [register-service-worker](https://github.com/yyx990803/register-service-worker).

* Example:

  ```ts
  import { usePwaEvent } from '@vuepress/plugin-pwa/client'

  export default {
    setup(): void {
      const event = usePwaEvent()
      event.on('ready', (registration) => {
        console.log('Service worker is active.')
      })
    },
  }
  ```

## Utilities

### forceUpdate

* Type: `() => void`

* Details: Force update the page when an update is found.

* Example:

  ```ts
  import { forceUpdate } from '@vuepress/plugin-pwa/client'
  import { onMounted } from 'vue'

  export default {
    setup(): void {
      onMounted(() => {
        forceUpdate()
      })
    },
  }
  ```

### registerSW

* Type: `(serviceWorkerPath: string, hooks?: Hooks, showStatus?: boolean) => Promise<void>`

* Parameters:

  | Parameter         | Type      | Description                          |
  | ----------------- | --------- | ------------------------------------ |
  | serviceWorkerPath | `string`  | Path of the service worker           |
  | hooks             | `object`  | Hooks of service worker              |
  | showStatus        | `boolean` | Log service worker status in console |

  ```ts
  interface Hooks {
    registrationOptions?: RegistrationOptions
    ready?: (registration: ServiceWorkerRegistration) => void
    registered?: (registration: ServiceWorkerRegistration) => void
    cached?: (registration: ServiceWorkerRegistration) => void
    updated?: (registration: ServiceWorkerRegistration) => void
    updatefound?: (registration: ServiceWorkerRegistration) => void
    offline?: () => void
    error?: (error: Error) => void
  }
  ```

* Details: Register service worker manually.

* Example:

  ```ts
  import { registerSW } from '@vuepress/plugin-pwa/client'
  import { onMounted } from 'vue'

  export default {
    setup(): void {
      onMounted(() => {
        registerSW('/service-worker.js', {
          ready(registration) {
            console.log('Service worker is active.')
          },
        })
      })
    },
  }
  ```

### skipWaiting

* Type: `(registration: ServiceWorkerRegistration) => void`

* Parameters:

  | Parameter    | Type                        | Description                                              |
  | ------------ | --------------------------- | -------------------------------------------------------- |
  | registration | `ServiceWorkerRegistration` | The registration of the service worker you want activate |

* Details: Activate the waiting service worker.

* Example:

  ```ts
  import { skipWaiting, usePwaEvent } from '@vuepress/plugin-pwa/client'

  export default {
    setup(): void {
      const event = usePwaEvent()

      event.on('updated', (registration) => {
        console.log('The waiting service worker is available.')
        // activate the waiting service worker
        skipWaiting(registration)
      })
    },
  }
  ```

### unregisterSW

* Type: `() => Promise<boolean>`

* Returns: `true` if unregister success, `false` if unregister failed

* Details: Unregister service worker manually.

* Example:

  ```ts
  import { unregisterSW } from '@vuepress/plugin-pwa/client'
  import { onMounted } from 'vue'

  export default {
    setup(): void {
      onMounted(() => {
        unregisterSW()
      })
    },
  }
  ```

## Styles

You can customize the style via CSS variables:

@[code](@vuepress/plugin-pwa/src/client/styles/vars.css)

## Further Reading

For more details, please see:

* [Google PWA](https://web.dev/progressive-web-apps/)
* [MDN PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
* [W3C Manifest Specification](https://w3c.github.io/manifest/)
