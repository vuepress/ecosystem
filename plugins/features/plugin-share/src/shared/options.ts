import type { ShareService } from './share.js'

/**
 * Options of `@vuepress/plugin-share`
 *
 * `@vuepress/plugin-share` 的配置
 */
export interface SharePluginOptions {
  /**
   * Share services to display
   *
   * A built-in service is selected by its name, while a custom service is
   * provided as an object with `name`, `link` and `shape`.
   *
   * 要显示的分享服务
   *
   * 内置服务通过名称选择，自定义服务通过包含 `name`、`link` 与 `shape` 的对象提供。
   *
   * @default ['twitter', 'facebook', 'reddit', 'telegram', 'whatsapp', 'email']
   */
  services?: ShareService[]

  /**
   * Twitter user name to mention
   *
   * It is appended to the tweet as the `via` parameter.
   *
   * 要提及的 Twitter 用户名
   *
   * 它会作为 `via` 参数添加到推文中。
   */
  twitterUserName?: string
}
