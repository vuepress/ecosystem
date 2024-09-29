import type { Page } from 'vuepress/core'
import type { LocaleConfig } from 'vuepress/shared'
import type {
  CopyrightPluginLocaleData,
  CopyrightPluginSharedOptions,
} from '../shared/index.js'

export interface CopyrightPluginOptions extends CopyrightPluginSharedOptions {
  /**
   * Author Getter
   *
   * 作者获取器
   */
  authorGetter?: <
    ExtraPageData extends Record<string, unknown> = Record<never, never>,
    ExtraPageFrontmatter extends Record<string, unknown> = Record<
      string,
      unknown
    >,
    ExtraPageFields extends Record<string, unknown> = Record<never, never>,
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  ) => string | null

  /**
   * License getter
   *
   * 协议信息获取器
   */
  licenseGetter?: <
    ExtraPageData extends Record<string, unknown> = Record<never, never>,
    ExtraPageFrontmatter extends Record<string, unknown> = Record<
      string,
      unknown
    >,
    ExtraPageFields extends Record<string, unknown> = Record<never, never>,
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  ) => string | null

  /**
   * Copyright Getter
   *
   * 协议获取器
   */
  copyrightGetter?: <
    ExtraPageData extends Record<string, unknown> = Record<never, never>,
    ExtraPageFrontmatter extends Record<string, unknown> = Record<
      string,
      unknown
    >,
    ExtraPageFields extends Record<string, unknown> = Record<never, never>,
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  ) => string | null

  /**
   * Locales config for copyright
   *
   * 复制版权的多语言配置
   */
  locales?: LocaleConfig<CopyrightPluginLocaleData>
}
