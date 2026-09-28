---
icon: layout-grid
---

# pwa

<NpmBadge package="@vuepress/plugin-pwa" />

将你的 VuePress 站点变成渐进式网络应用程序 (PWA)[^pwa-intro]。

## 使用 {#usage}

```bash
npm i -D @vuepress/plugin-pwa@next
```

```ts title=".vuepress/config.ts"
import { pwaPlugin } from '@vuepress/plugin-pwa'

export default {
  plugins: [
    pwaPlugin({
      // 选项
    }),
  ],
}
```

此插件使用 [workbox-build](https://developers.google.com/web/tools/workbox/modules/workbox-build) 生成 Service Worker 文件，并使用 [register-service-worker](https://github.com/yyx990803/register-service-worker) 注册 Service Worker。

一个 PWA 使用 Service Worker[^service-worker] (简称 SW) 来缓存并代理网站内容。

::: warning

如果你启用过该插件，并想要禁用它，你可能需要 [`@vuepress/plugin-remove-pwa`](./remove-pwa.md) 来移除现有的 Service Worker。

:::

[^pwa-intro]: **PWA 介绍**

    PWA 全称 Progressive Web app，即渐进式网络应用程序，标准由 W3C 规定。

    它允许网站通过支持该特性的浏览器将网站作为 App 安装在对应平台上。

    访问 <https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps> 查看详情。

[^service-worker]: **Service Worker 简要介绍**

    1. Service Worker 会在注册过程中获取注册在其中的所有文件并缓存它们。

    1. 注册成功后，Service Worker 激活，并开始代理并控制你的全部请求。

    1. 每当你想要通过浏览器发起访问请求后，Service Worker 将会查看其是否存在与自身缓存列表中，若存在则直接返回缓存好的结果，否则调用自身的 fetch 方法进行获取。你可以通过自定义 fetch 方法，来完全控制网页内资源获取请求的结果，比如在离线时提供一个 fallback 的网页。

    1. 每次用户重新打开网站时，Service Worker 会向自身注册时的地址发出校验命令，如果检测到新版本的 Service Worker，则会更新自身，并开始缓存注册在新 Service Worker 中的资源列表。成功获取内容更新后，Service Worker 将会触发 `update` 事件。可以通过此事件提示用户，比如将在右下角显示一个弹出窗口，提示用户新内容可用并允许用户触发更新。

## 指南 {#guide}

### 网络 App 清单 {#web-app-manifests}

为了使你的网站符合 PWA 的要求，一个网络 App 清单[^manifest]文件是必要的，并且你的 PWA 应满足可安装性[^installable]要求。

[^manifest]: **清单文件**

    清单文件使用 JSON 格式，负责声明 PWA 各项信息，如名称、描述、图标、快捷动作等。

    为了使你的站点能够被注册为 PWA，你需要满足 manifest 基本的规范，才能使浏览器认为该网站为一个可安装的 PWA 并允许用户安装它。

    ::: tip

    Manifest 的标准与规范，请详见 [MDN 网络 App 清单](https://developer.mozilla.org/zh-CN/docs/Web/Manifest) 和 [W3C Manifest](https://w3c.github.io/manifest/)

    :::

[^installable]: **可安装性**

    想要让网站可以注册为 PWA，网站需要自行成功注册有效的 Service Worker，同时拥有合法的 manifest 清单文件并在网站中声明它。

    清单文件应至少包含 `name`(或 `short_name`)、`icons` 和 `start_url`。

    在 Safari 中，Service Worker 的最大缓存空间为 50 MB。

你可以通过设置 [`manifest`](#manifest) 选项来自定义 manifest 文件，或者在 public 文件夹中提供 `manifest.webmanifest` 或 `manifest.json`。前者优先级更高。

插件会自动为你生成 `manifest.webmanifest`，并在每个页面中添加清单链接声明，但是 **你至少应该通过 `manifest.icons` 或 PWA 插件中的其他选项设置一个有效的图标。**

::: warning

可安装性[^installable]规范要求 manifest 中至少声明一个有效的图标。

所以如果你不配置 `manifest.icons`，访问者只能享受到 Service Worker 缓存带来的离线可访问性，而并不能作为 PWA 进行安装。

:::

部分清单字段在未设置时会回退到预设值:

- `name`: `siteConfig.title` || `siteConfig.locales['/'].title` || `"Site"`
- `short_name`: `siteConfig.title` || `siteConfig.locales['/'].title` || `"Site"`
- `description`: `siteConfig.description` || `siteConfig.locales['/'].description` || `"A site built with vuepress"`
- `lang`：`siteConfig.locales['/'].lang` || `siteConfig.lang`
- `start_url`: `context.base`
- `scope`: `context.base`
- `display`: `"standalone"`
- `theme_color`: [`themeColor`](#themecolor) || `"#46bd87"`
- `background_color`: `"#ffffff"`
- `orientation`: `"portrait-primary"`
- `prefer_related_applications`: `false`

我们建议你为你的站点设置 [`favicon`](#favicon)。

此外，该插件默认不处理清单中的任何内容，而是按原样输出。这意味着，如果你计划部署到子目录，则应自行将 URL 前缀附加到自己的清单 URLs 中。如果你需要的所有内容都在 `base` 文件夹下，你可以在插件选项中设置 [`appendBase`](#appendbase) 为 `true` 让插件将 `base` 自动附加到任何地址。

### 缓存控制 {#cache-control}

为了更好的控制 Service Worker 可以预缓存的内容，插件提供了相关的缓存控制选项。

#### 默认缓存 {#default-cache}

默认情况下插件会预缓存所有的 `js` 和 `css` 文件，但仅缓存主页和 404 页面的 HTML。插件同时还会缓存字体文件 (woff, woff2, eot, ttf, otf) 和 SVG 图标。

#### 图片缓存 {#image-cache}

如果你的站点只有少量重要图片，并希望它们在离线模式下显示，你可以通过设置 [`cacheImage`](#cacheimage) 为 `true` 来缓存站点图片。

我们通过文件后缀名识别图片，任何以 `.png`, `.jpg`, `.jpeg`, `.gif`, `.bmp`, `.webp` 结尾的文件都会视为图片。

#### HTML 缓存 {#html-cache}

当你网站体积不大，并且希望文档完全离线可用时，你可以通过设置 [`cacheHTML`](#cachehtml) 为 `true` 来缓存所有 HTML 页面。

::: tip 为什么默认不缓存非主页和 404 页面

虽然说 VuePress 为所有的页面通过 SSG[^ssg] 生成了 HTML 文件，但是这些文件主要用于 SEO[^seo]，并能够让你在后端不做 SPA[^spa] 配置的情况下能够直接访问任何链接。

[^ssg]: **SSG**: **S**tatic **S**ite **G**enerating，静态站点生成。

[^seo]: **SEO**: **S**earch **E**ngine **O**ptimization，搜索引擎增强，

    详见 [SEO 介绍](https://mister-hope.com/code/website/html/definition/seo.html)

[^spa]: **SPA**: **S**ingle **P**age **A**pplication, 单页应用

    大多只有主页，并使用 history mode 处理路由，而不是真的在页面之间导航。

VuePress 本质上是一个 SPA。这意味着你只需要缓存主页并从主页进入即可正常访问所有页面。所以默认不缓存其他 HTML 能够有效减小缓存大小 (可以缩减大约 40% 的体积)，加快 SW 更新速度。

但是这样做也有缺点，如果用户直接从非主页进入网站，首个页面的 HTML 文件仍需要从互联网加载。同时离线环境下，用户只能通过主页进入再自行导航到对应页面，直接访问某个链接会出现无法访问的提示。

:::

#### 大小控制 {#size-control}

为了防止在预缓存列表中包含大文件，任何 > 2 MB 的文件或 > 1 MB 的图片都将被忽略。你可以通过 [`maxSize`](#maxsize) 和 [`maxImageSize`](#maximagesize) 来自定义大小限制 (单位为 KB)。

`maxSize` 具有最高优先级，任何超过此值的文件都会被排除。所以你如果生成了很大的 HTML 或 JS 文件，请考虑调高此值，否则你的 PWA 可能无法在离线模式下正常运行。

`maxImageSize` 不能大于 [`maxSize`](#maxsize)。

### 更新控制 {#update-control}

[`update`](#update) 选项控制用户如何接收更新，其默认值为 `"available"`。

- `"available"`: 新的 SW 会在后台静默安装并获取资源，安装结束后弹窗提示用户新内容就绪，用户可以自主选择是否立即刷新查看新内容。这意味在新 SW 就绪前用户会访问旧版本网站。

- `"hint"`: 用户在进入文档后数秒内就可以收到新内容已发布的通知，并可选择立即刷新。如果用户选择刷新，页面会立即重新加载，随后新的 SW 完成安装并接管页面。其负面效果是，用户在新 SW 安装并接管页面前，需要从互联网获取页面的全部资源。

- `"disable"`: 新的 SW 将在后台完全静默安装并在安装后等待。当旧版本 SW 控制的页面全部关闭后，新 SW 将在下次访问时接管并提供新内容给用户。此设置可以避免用户在访问中被弹窗打扰。

- `"force"`: 检测到新 SW 后页面会被立即强制刷新，以确保用户浏览最新内容。最大的缺点就是当新 SW 发布后，用户在重新进入网站后的几秒内会遇到预期之外的突然刷新。

::: tip

文档的更新方式由以前的版本控制，因此当前选项仅影响此版本的下一次更新。

:::

#### 更新提示弹窗 {#popups}

当检测到新内容 (检测到新的 Service Worker) 时，更新提示弹窗将会出现；当新内容就绪时，更新就绪弹窗将会出现。

如果你对默认的弹窗不满意，你可以自行编写组件更换。从 `@vuepress/plugin-pwa/client` 中导入 `PwaFoundPopup` 或 `PwaReadyPopup` 并使用其 slot 来自定义弹窗内容，然后将组件路径传递给 [`foundComponent`](#foundcomponent) 或 [`readyComponent`](#readycomponent) 选项。

```vue
<script setup lang="ts">
import { PwaFoundPopup } from '@vuepress/plugin-pwa/client'
</script>
<template>
  <PwaFoundPopup v-slot="{ found, refresh }">
    <div v-if="found">
      已找到新内容
      <button type="button" @click="refresh">刷新</button>
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
      新内容已就绪
      <button type="button" @click="reload">应用</button>
    </div>
  </PwaReadyPopup>
</template>
```

### 其他选项 {#other-options}

插件还提供了其他 PWA 相关选项，比如微软磁贴图标与颜色设置，苹果图标 ([`apple`](#apple)) 等。如果你是一个高级用户，你也可以设置 [`generateSWConfig`](#generateswconfig) 来配置 `workbox-build`。

## 选项 {#options}

::: fields
@`serviceWorkerFilename` type=string default=`'service-worker.js'`

Service Worker 文件路径。

@`showInstall` type=boolean default=`true`

是否在 Service Worker 首次成功注册时显示 PWA 安装按钮。

@`manifest` type=AppManifest

将被解析为 `manifest.webmanifest` 的对象，该文件由插件生成并注入到每个页面。

参考：[网络 App 清单](#web-app-manifests)。

@`favicon` type=string

`favicon.ico` 地址。

@`themeColor` type=string default=`'#46bd87'`

PWA 的主题色。

@`maxSize` type=number default=`2048`

允许缓存的最大大小 (以 KB 为单位)。

参考：[大小控制](#size-control)。

@`cacheHTML` type=boolean default=`false`

是否缓存主页和 404 错误页之外的 HTML 文件。

参考：[HTML 缓存](#html-cache)。

@`cacheImage` type=boolean default=`false`

是否缓存图片。

参考：[图片缓存](#image-cache)。

@`maxImageSize` type=number default=`1024`

图片允许缓存的最大大小 (以 KB 为单位)。

参考：[大小控制](#size-control)。

@`update` type=`'available' | 'disable' | 'force' | 'hint'` default=`'available'`

用户接收更新的方式。

参考：[更新控制](#update-control)。

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

参考：[更新提示弹窗](#popups)。

@`readyComponent` type=string default=`'PwaReadyPopup'`

自定义的更新弹窗组件路径。

参考：[更新提示弹窗](#popups)。

@`appendBase` type=boolean default=`false`

是否为选项中所有绝对链接添加 base。

参考：[网络 App 清单](#web-app-manifests)。

@`generateSWConfig` type=`Partial<GenerateSWOptions>`

传递给 `workbox-build` 的选项，具体详情，请见 [Workbox 文档](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW)。

@`locales` type=`LocaleConfig<PwaPluginLocaleData>`

PWA 插件的国际化配置，各语言的数据为 `PwaPluginLocaleData` 的一部分。

参考：[多语言配置](../supported-locales.md)。

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

:::

## 组合式 API {#composition-api}

### usePwaEvent

- 类型：`() => PwaEvent`
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

## 工具函数 {#utilities}

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

- 类型：`(serviceWorkerPath: string, hooks?: Hooks, showStatus?: boolean) => Promise<void>`

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

- 类型：`() => Promise<boolean>`
- 返回值：`true` 表示注销成功，`false` 表示注销失败
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

## 样式 {#styles}

你可以通过 CSS 变量来自定义样式：

@[code](@vuepress/plugin-pwa/src/client/styles/vars.css)

## 相关阅读 {#further-reading}

更多内容，请详见:

- [Google PWA](https://web.dev/progressive-web-apps/)
- [MDN PWA](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)
- [W3C Manifest 规范](https://w3c.github.io/manifest/)
