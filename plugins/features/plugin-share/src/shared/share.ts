/**
 * Action of a share button
 *
 * - `open` opens the link in a new tab
 * - `navigate` opens the link in the current tab
 * - `popup` opens the link in a popup window
 * - `qrcode` shows a QR code of the link
 *
 * 分享按钮的行为
 *
 * - `open` 在新标签页打开链接
 * - `navigate` 在当前标签页打开链接
 * - `popup` 在弹窗中打开链接
 * - `qrcode` 显示链接的二维码
 */
export type ShareAction = 'open' | 'navigate' | 'popup' | 'qrcode'

/**
 * Name of a built-in share service
 *
 * 内置分享服务的名称
 */
export type BuiltInShareService =
  | 'buffer'
  | 'douban'
  | 'email'
  | 'evernote'
  | 'facebook'
  | 'flipboard'
  | 'line'
  | 'linkedin'
  | 'messenger'
  | 'pinterest'
  | 'qq'
  | 'qrcode'
  | 'qzone'
  | 'reddit'
  | 'skype'
  | 'sms'
  | 'snapchat'
  | 'telegram'
  | 'tumblr'
  | 'twitter'
  | 'vk'
  | 'weibo'
  | 'whatsapp'
  | 'wordpress'

/**
 * Variables that can be used in a share link
 *
 * 分享链接中可使用的变量
 */
export type ShareServiceVariableName =
  | 'title'
  | 'description'
  | 'url'
  | 'excerpt'
  | 'summary'
  | 'tags'
  | 'cover'
  | 'image'

/**
 * Configuration of a share service
 *
 * 分享服务的配置
 */
export interface ShareServiceConfig {
  /**
   * Share link
   *
   * Variables wrapped in `[` and `]` are replaced with page data:
   *
   * - `title`: title of the page
   * - `description`: description of the page
   * - `url`: URL of the page
   * - `excerpt`: excerpt of the page
   * - `summary`: summary of the page
   * - `tags`: tags of the page
   * - `cover`: cover of the page
   * - `image`: first image of the page
   *
   * 分享链接
   *
   * 使用 `[` 和 `]` 包裹的变量会被替换为页面数据：
   *
   * - `title`：页面标题
   * - `description`：页面描述
   * - `url`：页面链接
   * - `excerpt`：页面摘要
   * - `summary`：页面综述
   * - `tags`：页面标签
   * - `cover`：页面封面
   * - `image`：页面中的第一张图片
   */
  link: string

  /**
   * Action of the share button
   *
   * 分享按钮的行为
   *
   * @default 'popup'
   */
  action?: ShareAction

  /**
   * Background color of the colorful icon
   *
   * 彩色图标的背景色
   */
  color?: string

  /**
   * Plain icon shape
   *
   * It can be an SVG string, an image link or a font icon class.
   *
   * 纯色图标的形状
   *
   * 可以是 SVG 字符串、图片链接或字体图标类名。
   */
  shape: string

  /**
   * Colorful icon
   *
   * It can be an SVG string, an image link or a font icon class. When it is
   * omitted, an icon is generated from `color` and `shape`.
   *
   * 彩色图标
   *
   * 可以是 SVG 字符串、图片链接或字体图标类名。省略时会由 `color` 与 `shape` 生成图标。
   */
  icon?: string
}

/**
 * Configuration of a share service with its name
 *
 * 带名称的分享服务配置
 */
export interface ShareServiceOptions extends ShareServiceConfig {
  /**
   * Name of the share service
   *
   * 分享服务的名称
   */
  name: string
}

/**
 * A share service
 *
 * 分享服务
 */
export type ShareService = BuiltInShareService | ShareServiceOptions
