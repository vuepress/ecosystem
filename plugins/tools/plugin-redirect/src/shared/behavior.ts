export interface RedirectBehaviorOptions {
  /**
   * Whether enable locales redirection
   *
   * 是否启用语言重定向
   *
   * @default false
   */
  autoLocale?: boolean

  /**
   * Whether fallback to other locales user defined
   *
   * 是否回退到用户定义的其他语言
   *
   * @default true
   */
  localeFallback?: boolean

  /**
   * Behavior when a locale version is not available for current link
   *
   * @description `"homepage"` and `"404"` is only available when a locale is assigned to current language
   *
   * 当前链接没有可用的语言版本时的行为
   *
   * @description 只有当语言分配给当前语言时，`"homepage"` 和 `"404"` 才可用
   *
   * @default "defaultLocale"
   */
  defaultBehavior?: '404' | 'defaultLocale' | 'homepage'

  /**
   * Default locale path
   *
   * @description the first locale will be used if absent
   *
   * 默认语言路径
   *
   * @description 如果缺失，则使用第一个语言
   */
  defaultLocale?: string
}

export interface RedirectBehaviorConfig
  extends Required<RedirectBehaviorOptions> {
  /**
   * Locale language config
   *
   * 多语言语言配置
   */
  config: Record<string, string[]>
}
