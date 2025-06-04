/**
 * Copyright information data
 *
 * 版权信息数据
 */
export interface CopyrightInfoData {
  /**
   * Author information
   *
   * 作者信息
   */
  author?: string

  /**
   * License information
   *
   * 协议信息
   */
  license?: string
}

/**
 * Copyright plugin page data
 *
 * 版权插件页面数据
 */
export interface CopyrightPluginPageData extends Record<string, unknown> {
  /**
   * Copyright information
   *
   * 版权信息
   */
  copyright?: CopyrightInfoData | string
}
