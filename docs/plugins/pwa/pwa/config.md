---
icon: settings-2
---

# Config

## Options

:::: fields
@`serviceWorkerFilename` type=string default=`'service-worker.js'`

Service Worker file path.

@`showInstall` type=boolean default=`true`

Whether to display the install button when the Service Worker is first registered successfully.

@`manifest` type=AppManifest

An object which will be parsed to manifest.webmanifest.

::: tip

Some options have their fallback if you don't set them.

- `name`: `siteConfig.title` || `siteConfig.locales['/'].title` || `"Site"`
- `short_name`: `siteConfig.title` || `siteConfig.locales['/'].title` || `"Site"`
- `description`: `siteConfig.description` || `siteConfig.locales['/'].description` || `"A site built with vuepress"`
- `lang`: `siteConfig.locales['/'].lang` || `"en-US"`
- `start_url`: `context.base`
- `scope`: `context.base`
- `display`: `"standalone"`
- `theme_color`: `"#46bd87"`
- `background_color`: `"#ffffff"`
- `orientation`: `"portrait-primary"`
- `prefer_related_applications`: `false`

:::

See also:

- [MDN Web Docs: Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [W3C: Web App Manifest](https://www.w3.org/TR/appmanifest/)

@`favicon` type=string

Link of favicon.ico.

::: warning

We recommend setting favicon for your site.

:::

@`themeColor` type=string default=`'#46bd87'`

Theme color of the PWA.

@`maxSize` type=number default=`2048`

Max size allowed to be cached, in KB.

::: warning

This option has the highest priority, and any files exceeding this value will be excluded.

So if you generate very large HTML or JS files, please consider increasing this value, otherwise your PWA may not work normally in offline mode.

:::

@`cacheHTML` type=boolean

Whether to cache HTML files besides home page and 404 page.

@`cacheImage` type=boolean

Whether to cache pictures.

@`maxImageSize` type=number default=`1024`

Max picture size allowed to be cached, in KB.

::: tip

The value must not be greater than [maxSize](#maxsize) option.

:::

@`update` type=`'available' | 'disable' | 'force' | 'hint'` default=`'available'`

Control logic when new content is found.

- `'available'`: Only display update popup when the new service worker is available.
- `'disable'`: Do nothing even when new service worker is available. After new service work succeeds installing and starts waiting, it will control page and provide new content in next visit.
- `'hint'`: Display a hint to let user choose to refresh immediately. This is helpful when you want users to see new docs immediately.

  If users choose to refresh, the current service worker will be unregister, and request will start coming to web. Later the new service worker will start installing and control current page after installed.

- `'force'`: Unregister current service worker immediately then refresh to get new content. This may affect viewing experiences.

::: tip

How docs are updated is controlled by a previous version, so the current option only affects the next update from this version.

:::

@`apple` type=`ApplePwaOptions | false`

Special settings for better supporting Safari, ignoring these options are safe.

@@`apple.icon` type=string

Icon link used by Safari, recommend 152×152 size.

@@`apple.maskIcon` type=string

Safari mask icon.

@@`apple.statusBarColor` type=`'black-translucent' | 'black' | 'default'` default=`'default'` deprecated

Status bar color for Safari. Related tag is unstandardized, so you should avoid declaring it.

@`foundComponent` type=string default=`'PwaFoundPopup'`

Path of custom hint popup component.

@`readyComponent` type=string default=`'PwaReadyPopup'`

Path of custom update popup component.

@`appendBase` type=boolean

Whether append base to all absolute links in options.

@`generateSWConfig` type=`Partial<GenerateSWOptions>`

Options passed to `workbox-build`, for details, see [Workbox documentation](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW).

@`locales` type=`LocaleConfig<PwaPluginLocaleData>`

Locales config for pwa plugin. The locale data is a partial of `PwaPluginLocaleData`.

::: details Built-in Supported Languages

- **Simplified Chinese** (zh-CN)
- **Traditional Chinese** (zh-TW)
- **English (United States)** (en-US)
- **German** (de-DE)
- **Russian** (ru-RU)
- **Ukrainian** (uk-UA)
- **Vietnamese** (vi-VN)
- **Portuguese** (pt)
- **Polish** (pl-PL)
- **French** (fr-FR)
- **Spanish** (es-ES)
- **Slovak** (sk-SK)
- **Japanese** (ja-JP)
- **Turkish** (tr-TR)
- **Korean** (ko-KR)
- **Finnish** (fi-FI)
- **Indonesian** (id-ID)
- **Dutch** (nl-NL)

:::

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

::::

## Composition API

### usePwaEvent

- Type: `() => EventEmitter`
- Returns: Event emitter of this plugin / 插件的事件发射器
- Details: Returns the event emitter of this plugin. You can add listener function to events that provided by [register-service-worker](https://github.com/yyx990803/register-service-worker).

- Example:

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

- Type: `() => void`
- Details: Force update the page when an update is found.

- Example:

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

- Type: `(serviceWorkerPath: string, hooks?: Hooks, showStatus?: boolean) => void`

- Parameters:

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

- Details: Register service worker manually.

- Example:

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

- Type: `(registration: ServiceWorkerRegistration) => void`

- Parameters:

  | Parameter    | Type                        | Description                                              |
  | ------------ | --------------------------- | -------------------------------------------------------- |
  | registration | `ServiceWorkerRegistration` | The registration of the service worker you want activate |

- Details: Activate the waiting service worker.

- Example:

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

- Type: `() => void`
- Details: Unregister service worker manually.

- Example:

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

@[code css](@vuepress/plugin-pwa/src/client/styles/vars.css)
