import type { LocaleConfig } from 'vuepress/shared'
import type { GenerateSWOptions } from 'workbox-build'
import type { AppManifest, PwaPluginLocaleData } from '../shared/index.js'

interface ApplePwaOptions {
  /**
   * Path of icon used on apple devices
   *
   * Recommend 152×152 size
   *
   * 苹果上使用的图标路径
   *
   * 推荐 152×152 大小
   */
  icon?: string

  /**
   * Safari mask icon
   *
   * Safari 图标
   */
  maskIcon?: string

  /**
   * @deprecated Related tag is unstandardized so you should avoid declaring it.
   *
   * Color of status bar
   *
   * 状态栏的颜色
   *
   * @default "default"
   */
  statusBarColor?: 'black-translucent' | 'black' | 'default'
}

export interface PwaPluginOptions {
  /**
   * Service Worker file path
   *
   * Service Worker 文件路径
   *
   * @default "service-worker.js"
   */
  serviceWorkerFilename?: string

  /**
   * Whether display install button
   *
   * 是否显示安装按钮
   *
   * @default true
   */
  showInstall?: boolean

  /**
   * Manifest file Config
   *
   * manifest 文件设置
   */
  manifest?: AppManifest

  /**
   * Path of favicon
   *
   * favicon 地址
   */
  favicon?: string

  /**
   * Theme Color
   *
   * 主题色
   *
   * @default "#46bd87"
   */
  themeColor?: string

  /**
   * Max size which allows to cache, with KB unit
   *
   * 允许缓存的最大大小，单位 KB
   *
   * @default 2048
   */
  maxSize?: number

  /**
   * Whether cache html files besides home page and 404
   *
   * 是否缓存除主页与 404 之外的 HTML
   *
   * @default false
   */
  cacheHTML?: boolean

  /**
   * Whether cache pictures
   *
   * 是否缓存站点图片
   *
   * @default false
   */
  cacheImage?: boolean

  /**
   * Max size which allows to cache, with KB unit
   *
   * 图片允许缓存的最大大小，单位 KB
   *
   * @default 1024
   */
  maxImageSize?: number

  /**
   * Settings for apple
   *
   * 苹果设置
   */
  apple?: ApplePwaOptions | false

  /**
   * Update logic
   *
   * - `"disable"`: Do nothing even when new service worker is available. After new service work succeeds installing and starts waiting, it will control page and provide new content in next visit.
   * - `"available"`: Only display update popup when the new service worker is available
   * - `"hint"`: Display a hint to let user choose to refresh immediately. This is helpful when you want users to see new docs immediately.
   * - `"force"`: unregister current service worker immediately then refresh to get new content. **This may affect visiting experiences**！
   *
   * 更新逻辑
   *
   * - `"disable"`: 即使有新的 service worker 也不做任何事情，新的 service work 开始等待后，会在用户下次访问时接管页面，让用户获得新内容。
   * - `"available"`: 仅当新的 service worker 可用时才显示更新弹出窗口
   * - `"hint"`: 显示更新内容可用提示，并允许用户立即刷新。当新的 SW 成功注册后，将转为更新内容就绪弹窗。当你希望用户立即查看新文档时，这很有帮助。
   * - `"force"`: 立即注销当前 Service Worker 然后刷新以获取新内容。**这可能会影响访问体验**!
   *
   * @default "available"
   */
  update?: 'available' | 'disable' | 'force' | 'hint'

  /**
   * A custom component to replace the default hint popup component.
   *
   * 用于替换默认提示弹出组件的自定义组件。
   *
   * @default "PwaFoundPopup"
   */
  foundComponent?: string

  /**
   * A custom component to replace the default update popup component.
   *
   * 用于替换默认更新弹出组件的自定义组件。
   *
   * @default "PwaReadyPopup"
   */
  readyComponent?: string

  /**
   * workbox-build’s [generateSW config](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config)
   *
   */
  generateSWConfig?: Partial<GenerateSWOptions>

  /**
   * Locales config
   *
   * 国际化配置
   */

  locales?: LocaleConfig<PwaPluginLocaleData>

  /**
   * Whether append base to all absolute links in options
   *
   * 是否为选项中所有绝对链接添加 base
   *
   * @default false
   */
  appendBase?: boolean
}
