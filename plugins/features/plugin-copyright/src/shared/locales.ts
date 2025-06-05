export interface CopyrightPluginLocaleData {
  /**
   * Author text
   *
   * 作者文字
   *
   * @description `:author` will be replaced by author
   *
   * `:author` 将会被作者替换
   */
  author: string

  /**
   * License text
   *
   * 协议文字
   *
   * @description `:license` will be replaced by current license
   *
   * `:license` 会被当前协议替换
   */
  license: string

  /**
   * Link text
   *
   * 链接文字
   *
   * @description `:link` will be replaced by current page link
   *
   * `:link` 会替换为当前页面链接
   */
  link: string
}
