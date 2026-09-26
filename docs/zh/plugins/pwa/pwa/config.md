---
icon: settings-2
---

# 配置

## 选项

:::: fields
@`serviceWorkerFilename` type=string default=`'service-worker.js'`

Service Worker 文件路径。

@`showInstall` type=boolean default=`true`

是否在 Service Worker 首次成功注册时显示 PWA 安装按钮。

@`manifest` type=AppManifest

填充一个将被解析为 manifest.webmanifest 的对象。

::: tip

如果未设置某些选项，它们会回退到插件预设值。

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

参考：

- [MDN Web Docs: Web App Manifest](https://developer.mozilla.org/zh-CN/docs/Web/Manifest)
- [W3C Manifest](https://w3c.github.io/manifest/)

@`favicon` type=string

`favicon.ico` 地址，填入绝对路径。

::: warning

我们建议你为你的站点生成 favicon。

:::

@`themeColor` type=string default=`'#46bd87'`

PWA 的主题色。

@`maxSize` type=number default=`2048`

允许缓存的最大大小 (以 KB 为单位)。

::: warning

此选项具有最高优先级，任何超过此值的文件都会被排除。

所以你如果生成了很大的 HTML 或 JS 文件，请考虑调高此值，否则你的 PWA 可能无法在离线模式下正常运行。

:::

@`cacheHTML` type=boolean

是否缓存主页和 404 错误页之外的 HTML 文件。

@`cacheImage` type=boolean

是否缓存图片。

@`maxImageSize` type=number default=`1024`

图片允许缓存的最大大小 (以 KB 为单位)。

::: tip

该选项不能大于 [maxSize](#maxsize) 选项。

:::

@`update` type=`'available' | 'disable' | 'force' | 'hint'` default=`'available'`

发现新内容时的控制逻辑。

- `'available'`: 仅当新的 service worker 可用时才显示更新弹出窗口。
- `'disable'`: 即使有新的 service worker 也不做任何事情，新的 service work 开始等待后，会在用户下次访问时接管页面，让用户获得新内容。
- `'hint'`: 显示更新内容可用提示，并允许用户立即刷新。当新的 SW 成功注册后，将转为更新内容就绪弹窗。当你希望用户立即查看新文档时，这很有帮助。

  如果用户在新 SW 就绪前选择刷新，当前的 Service Worker 将被注销，并且请求将开始向 Web 发出。新的 service worker 将开始安装并在安装后接管页面。

- `'force'`: 立即注销当前 Service Worker 然后刷新以获取新内容。这可能会影响访问体验。

::: tip

文档的更新方式由以前的版本控制，因此当前选项仅影响此版本的下一次更新。

:::

@`apple` type=`ApplePwaOptions | false`

支持苹果的特殊设置，忽略它们是安全的。

@@`apple.icon` type=string

填入苹果使用的图标地址，推荐 152×152 大小。

@@`apple.maskIcon` type=string

Safari 图标。

@@`apple.statusBarColor` type=`'black-translucent' | 'black' | 'default'` default=`'default'` deprecated

Safari 状态栏颜色。相关标签尚未标准化，你应该避免声明它。

@`foundComponent` type=string default=`'PwaFoundPopup'`

自定义的提示弹窗组件路径。

@`readyComponent` type=string default=`'PwaReadyPopup'`

自定义的更新弹窗组件路径。

@`appendBase` type=boolean

是否为选项中所有绝对链接添加 base。

@`generateSWConfig` type=`Partial<GenerateSWOptions>`

传递给 `workbox-build` 的选项，具体详情，请见 [Workbox 文档](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW)。

@`locales` type=`LocaleConfig<PwaPluginLocaleData>`

PWA 插件的国际化配置，各语言的数据为 `PwaPluginLocaleData` 的一部分。

::: details 内置支持语言

- **简体中文** (zh-CN)
- **繁体中文** (zh-TW)
- **英文(美国)** (en-US)
- **德语** (de-DE)
- **俄语** (ru-RU)
- **乌克兰语** (uk-UA)
- **越南语** (vi-VN)
- **葡萄牙语** (pt)
- **波兰语** (pl-PL)
- **法语** (fr-FR)
- **西班牙语** (es-ES)
- **斯洛伐克** (sk-SK)
- **日语** (ja-JP)
- **土耳其语** (tr-TR)
- **韩语** (ko-KR)
- **芬兰语** (fi-FI)
- **印尼语** (id-ID)
- **荷兰语** (nl-NL)

:::

@@`locales.<localePath>.install` type=string

安装按钮文字。

@@`locales.<localePath>.iOSInstall` type=string

iOS 安装文字。

@@`locales.<localePath>.cancel` type=string

取消按钮文字。

@@`locales.<localePath>.close` type=string

关闭按钮文字。

@@`locales.<localePath>.prevImage` type=string

上一张图片文字。

@@`locales.<localePath>.nextImage` type=string

下一张图片文字。

@@`locales.<localePath>.explain` type=string

安装解释。

@@`locales.<localePath>.desc` type=string

描述标签文字。

@@`locales.<localePath>.feature` type=string

特性标签文字。

@@`locales.<localePath>.hint` type=string

更新内容提示文字。

@@`locales.<localePath>.update` type=string

更新内容可用文字。

::::

## 组合式 API

### usePwaEvent

- 类型：`() => EventEmitter`
- 返回值：插件的事件发射器
- 详情：返回此插件的事件派发器。你可以添加监听器函数到 [register-service-worker](https://github.com/yyx990803/register-service-worker) 提供的事件。

- 示例：

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

## 工具函数

### forceUpdate

- 类型：`() => void`
- 详情：当发现新内容时强制刷新页面。

- 示例：

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

- 类型：`(serviceWorkerPath: string, hooks?: Hooks, showStatus?: boolean) => void`

- 参数：

  | 参数              | 类型      | 描述                  |
  | ----------------- | --------- | --------------------- |
  | serviceWorkerPath | `string`  | Service worker 的路径 |
  | hooks             | `object`  | Service worker 的钩子 |
  | showStatus        | `boolean` | 在控制台输出状态日志  |

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

- 详情：手动注册 Service Worker。

- 示例：

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

- 类型：`(registration: ServiceWorkerRegistration) => void`

- 参数：

  | 参数         | 类型                        | 描述                             |
  | ------------ | --------------------------- | -------------------------------- |
  | registration | `ServiceWorkerRegistration` | 想要激活的 Service Worker 的注册 |

- 详情：激活等待中的 Service Worker。

- 示例：

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

- 类型：`() => void`
- 详情：手动注销 Service Worker。

- 示例：

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

## 样式

你可以通过 CSS 变量来自定义样式：

@[code css](@vuepress/plugin-pwa/src/client/styles/vars.css)
