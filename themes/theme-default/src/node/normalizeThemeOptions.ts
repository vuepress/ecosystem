// oxlint-disable typescript/no-deprecated, max-lines, max-lines-per-function, max-statements, complexity -- the classic options are normalized by one table-driven mapping
// oxlint-disable no-console -- unsupported classic values are reported on the console
import { getEditLinkPattern, resolveRepoType } from '@vuepress/theme-helper'
import { isLinkHttp } from 'vuepress/shared'

import type {
  AppearanceOptions,
  DocFooter,
  EditLink,
  LastUpdatedOptions,
  LocaleConfig,
  MarkdownPluginsOptions,
  NavItem,
  NavItemWithChildren,
  NavItemWithLink,
  NavbarGroupOptions,
  NavbarItemOptions,
  NavbarOptions,
  NotFoundOptions,
  Sidebar,
  SidebarArray,
  SidebarArrayOptions,
  SidebarItem,
  SidebarItemOptions,
  SidebarOptions,
  SidebarStructureItem,
  SocialLink,
  ThemeConfig,
  ThemePluginsOptions,
  ThemeableImage,
} from '../shared/types.js'
import { REPO_ICONS } from './repoIcons.js'
import { warnDeprecatedThemeOption } from './warnDeprecatedThemeOption.js'

type SidebarItemInput = SidebarItemOptions | SidebarStructureItem | string

type NavbarItemInput = NavbarItemOptions

/**
 * The theme options of the classic theme
 *
 * 已废弃的 classic 主题配置项
 */
interface ClassicThemeOptions {
  colorMode?: 'auto' | 'dark' | 'light'
  colorModeSwitch?: boolean
  home?: string
  navbarLabel?: string | null
  pageNavbarLabel?: string | null
  logoDark?: string | null
  logoAlt?: string | null
  repo?: string | null
  repoLabel?: string
  selectLanguageText?: string
  selectLanguageAriaLabel?: string
  selectLanguageName?: string
  sidebarDepth?: number
  editLinkText?: string
  editLinkPattern?: string
  docsRepo?: string
  docsBranch?: string
  docsDir?: string
  lastUpdatedText?: string
  backToHome?: string
  openInNewWindow?: string
  toggleColorMode?: string
  toggleSidebar?: string
  prev?: string | false
  next?: string | false
}

/**
 * The plugin options of the classic theme
 *
 * 已废弃的 classic 主题插件配置项
 */
interface ClassicThemePluginsOptions {
  markdownExt?: MarkdownPluginsOptions['ext']
  markdownHint?: MarkdownPluginsOptions['hint']
  markdownRaw?: MarkdownPluginsOptions['raw']
  markdownTab?: MarkdownPluginsOptions['tab']
  hint?: MarkdownPluginsOptions['hint']
  tab?: MarkdownPluginsOptions['tab']
  prismjs?: boolean
  shiki?: MarkdownPluginsOptions['shiki']
}

/**
 * The theme config written in the classic theme syntax
 *
 * 使用 classic 主题写法编写的主题配置
 */
type ThemeConfigInput = Omit<
  ThemeConfig,
  | 'editLink'
  | 'locales'
  | 'markdownPlugins'
  | 'navbar'
  | 'notFound'
  | 'sidebar'
  | 'themePlugins'
  | keyof ClassicThemeOptions
> &
  ClassicThemeOptions & {
    editLink?: EditLink | boolean
    label?: string
    link?: string
    locales?: LocaleConfig<ThemeConfigInput>
    markdownPlugins?: MarkdownPluginsOptions
    navbar?: NavbarOptions | false
    notFound?: NotFoundOptions | string[]
    sidebar?: SidebarOptions
    themePlugins?: ThemePluginsOptions & ClassicThemePluginsOptions
  }

/**
 * Whether the value is a non-empty string
 *
 * 判断该值是否为非空字符串
 *
 * @param value - The value to check / 需要判断的值
 * @returns Whether the value is a non-empty string / 该值是否为非空字符串
 */
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.length > 0

/**
 * Normalize a sidebar item written in the classic theme syntax
 *
 * 归一化使用 classic 主题写法编写的侧边栏条目
 *
 * @param item - The sidebar item to normalize / 需要归一化的侧边栏条目
 * @returns The normalized sidebar item / 归一化后的侧边栏条目
 */
const normalizeSidebarItem = (item: SidebarItemInput): SidebarArray[number] => {
  if (typeof item === 'string') return { link: item }

  const classicItem = item as SidebarItemOptions & { collapsed?: boolean }

  if ((classicItem as unknown as SidebarStructureItem).items === 'structure') {
    const { collapsed, children, prefix, ...rest } = classicItem

    if (collapsed !== undefined) {
      warnDeprecatedThemeOption(
        'sidebar[*].collapsed',
        'Use `collapsible` and `expanded` instead.',
      )
    }
    if (children !== undefined)
      warnDeprecatedThemeOption('sidebar[*].children', 'Use `items` instead.')
    if (prefix !== undefined)
      warnDeprecatedThemeOption('sidebar[*].prefix', 'Use `base` instead.')

    return {
      ...rest,
      ...(prefix && rest.base == null ? { base: prefix } : {}),
      items: 'structure',
    }
  }

  const { children, collapsed, items, prefix, ...rest } = classicItem

  if (collapsed !== undefined) {
    warnDeprecatedThemeOption(
      'sidebar[*].collapsed',
      'Use `collapsible` and `expanded` instead.',
    )
  }
  if (children !== undefined)
    warnDeprecatedThemeOption('sidebar[*].children', 'Use `items` instead.')
  if (prefix !== undefined)
    warnDeprecatedThemeOption('sidebar[*].prefix', 'Use `base` instead.')

  const normalizedItems = items ?? children

  return {
    ...rest,
    ...(prefix && rest.base == null ? { base: prefix } : {}),
    ...(normalizedItems
      ? {
          items: Array.isArray(normalizedItems)
            ? normalizedItems.map((child) => normalizeSidebarItem(child))
            : 'structure',
        }
      : {}),
  } as SidebarItem
}

/**
 * Normalize the sidebar config written in the classic theme syntax
 *
 * Supports string items, the deprecated `children` and `prefix` keys, and
 * `false` in the multi-sidebar config.
 *
 * 归一化使用 classic 主题写法编写的侧边栏配置
 *
 * 支持字符串条目、已废弃的 `children` 与 `prefix` 键，以及多侧边栏配置中的 `false`。
 *
 * @param sidebar - The sidebar config to normalize / 需要归一化的侧边栏配置
 * @returns The normalized sidebar config / 归一化后的侧边栏配置
 */
export const normalizeSidebar = (
  sidebar: SidebarOptions | undefined,
): Sidebar | false | undefined => {
  if (sidebar == null || sidebar === false) return sidebar
  if (typeof sidebar === 'string')
    return sidebar === 'structure' ? sidebar : undefined

  if (Array.isArray(sidebar))
    return sidebar.map((item) => normalizeSidebarItem(item))

  return Object.fromEntries(
    Object.entries(sidebar).map(([scope, value]) => {
      if (typeof value === 'string')
        // the removed `heading` mode and any other unknown mode disable the
        // sidebar of the scope instead of crashing the build
        return [scope, value === 'structure' ? value : []]

      if (value === false) return [scope, value]

      if (Array.isArray(value))
        return [scope, value.map((item) => normalizeSidebarItem(item))]

      const { items } = value as {
        items?: SidebarArrayOptions | 'structure'
      }

      return [
        scope,
        {
          ...value,
          items: Array.isArray(items)
            ? items.map((item) => normalizeSidebarItem(item))
            : // tolerate the removed modes, `{ items: 'structure' }` included
              'structure',
        },
      ]
    }),
  ) as Sidebar
}

/**
 * Normalize a navbar item written in the classic theme syntax
 *
 * 归一化使用 classic 主题写法编写的导航栏条目
 *
 * @param item - The navbar item to normalize / 需要归一化的导航栏条目
 * @returns The normalized navbar item / 归一化后的导航栏条目
 */
const normalizeNavbarItem = (item: NavbarItemInput): NavItem => {
  if (typeof item === 'string') return { link: item }
  if ('component' in item) return item

  const { children, prefix, items, ...rest } = item as NavbarGroupOptions & {
    base?: string
  }

  if (children !== undefined)
    warnDeprecatedThemeOption('navbar[*].children', 'Use `items` instead.')
  if (prefix !== undefined)
    warnDeprecatedThemeOption('navbar[*].prefix', 'Use `base` instead.')

  const normalizedItems = items ?? children

  if (!normalizedItems) {
    const { base: _base, ...linkItem } = rest as NavItemWithLink & {
      base?: string
    }

    return linkItem
  }

  return {
    ...(rest as NavItemWithChildren),
    ...(prefix && rest.base == null ? { base: prefix } : {}),
    items: normalizedItems.map((child) => normalizeNavbarItem(child)),
  }
}

/**
 * Normalize the navbar config written in the classic theme syntax
 *
 * Supports string items, the deprecated `children` and `prefix` keys, and
 * `false` to hide the navbar.
 *
 * 归一化使用 classic 主题写法编写的导航栏配置
 *
 * 支持字符串条目、已废弃的 `children` 与 `prefix` 键，以及设为 `false` 隐藏导航栏。
 *
 * @param navbar - The navbar config to normalize / 需要归一化的导航栏配置
 * @returns The normalized navbar config / 归一化后的导航栏配置
 */
export const normalizeNavbar = (
  navbar: NavbarOptions | undefined,
): NavItem[] | false | undefined => {
  if (navbar == null || navbar === false) return navbar

  return navbar.map((item) => normalizeNavbarItem(item))
}

/**
 * Resolve the appearance option from the classic color mode options
 *
 * 从 classic 的颜色模式配置解析外观选项
 *
 * @param config - The theme config / 主题配置
 * @returns The appearance option / 外观选项
 */
const resolveAppearance = (
  config: ThemeConfigInput,
): AppearanceOptions | undefined => {
  const { appearance, colorMode, colorModeSwitch } = config

  if (appearance !== undefined) return appearance
  if (colorMode === undefined && colorModeSwitch === undefined) return undefined

  // classic enables the switch by default
  if (colorModeSwitch === false) {
    if (colorMode === 'dark') return 'force-dark'
    if (colorMode === 'light') return false

    return 'force-auto'
  }

  // `appearance: true` keeps the switch and starts from the preferred color
  // scheme, it is the only shape that can represent the classic `auto` mode
  if (colorMode === 'dark') return 'dark'
  if (colorMode === 'light') return { initialValue: 'light' }

  return undefined
}

/**
 * Resolve the logo option from the classic logo options
 *
 * 从 classic 的 Logo 配置解析 Logo 选项
 *
 * @param config - The theme config / 主题配置
 * @returns The logo option / Logo 选项
 */
const resolveLogo = (config: ThemeConfigInput): ThemeableImage | undefined => {
  const { logo, logoAlt, logoDark } = config

  if (!isNonEmptyString(logoDark) && !isNonEmptyString(logoAlt)) return logo
  // a dark logo without a light one is the only logo the site has
  if (!logo) return isNonEmptyString(logoDark) ? logoDark : undefined

  if (typeof logo === 'string') {
    if (isNonEmptyString(logoDark)) {
      return {
        light: logo,
        dark: logoDark,
        ...(isNonEmptyString(logoAlt) ? { alt: logoAlt } : {}),
      }
    }

    return { src: logo, ...(isNonEmptyString(logoAlt) ? { alt: logoAlt } : {}) }
  }

  if ('light' in logo) {
    return {
      ...logo,
      ...(isNonEmptyString(logoDark) ? { dark: logoDark } : {}),
      ...(isNonEmptyString(logoAlt) ? { alt: logoAlt } : {}),
    }
  }

  if (isNonEmptyString(logoDark)) {
    return {
      light: logo.src,
      dark: logoDark,
      ...(isNonEmptyString(logoAlt ?? logo.alt)
        ? { alt: logoAlt ?? logo.alt }
        : {}),
    }
  }

  return {
    ...logo,
    ...(isNonEmptyString(logoAlt) ? { alt: logoAlt } : {}),
  }
}

/**
 * Resolve the edit link option from the classic edit link options
 *
 * The classic theme builds the edit link from the repository options, the
 * normalized option keeps the same result with a static pattern.
 *
 * 从 classic 的编辑链接配置解析编辑链接选项
 *
 * Classic 主题会根据仓库配置生成编辑链接，归一化后的选项使用静态模式保持相同结果。
 *
 * @param config - The theme config / 主题配置
 * @returns The edit link option / 编辑链接选项
 */
const resolveEditLink = (
  config: ThemeConfigInput,
): EditLink | boolean | undefined => {
  const {
    editLink,
    editLinkPattern,
    editLinkText,
    docsBranch,
    docsDir,
    docsRepo,
    repo,
  } = config

  const editRepo = docsRepo ?? repo

  const pattern =
    editLinkPattern ??
    (isNonEmptyString(editRepo)
      ? getEditLinkPattern({
          repo: editRepo,
          ...(docsBranch ? { branch: docsBranch } : {}),
          ...(docsDir ? { dir: docsDir } : {}),
        })
      : undefined)

  if (editLink === false) return false

  // classic shows the edit link by default, it only has a target when a
  // repository is configured
  if (editLink === true || editLink === undefined) {
    if (!pattern) return undefined

    return {
      pattern,
      ...(isNonEmptyString(editLinkText) ? { text: editLinkText } : {}),
    }
  }

  return isNonEmptyString(editLinkText)
    ? { ...editLink, text: editLink.text ?? editLinkText }
    : editLink
}

/**
 * Resolve the not found option from the classic not found options
 *
 * 从 classic 的 404 页配置解析 404 页选项
 *
 * @param config - The theme config / 主题配置
 * @returns The not found option / 404 页选项
 */
const resolveNotFound = (
  config: ThemeConfigInput,
): NotFoundOptions | undefined => {
  const { backToHome, home, notFound } = config

  const base: NotFoundOptions = Array.isArray(notFound)
    ? { quote: notFound[0] }
    : (notFound ?? {})

  const result: NotFoundOptions = { ...base }

  if (isNonEmptyString(backToHome) && result.linkText === undefined)
    result.linkText = backToHome
  if (isNonEmptyString(home) && result.link === undefined) result.link = home

  return Object.keys(result).length > 0 ? result : undefined
}

/**
 * Resolve the last updated option from the classic last updated options
 *
 * 从 classic 的最后更新配置解析最后更新选项
 *
 * @param config - The theme config / 主题配置
 * @returns The last updated option / 最后更新选项
 */
const resolveLastUpdated = (
  config: ThemeConfigInput,
): LastUpdatedOptions | boolean | undefined => {
  const { lastUpdated, lastUpdatedText } = config

  if (!isNonEmptyString(lastUpdatedText)) return lastUpdated
  if (lastUpdated === false) return false
  if (lastUpdated === true || lastUpdated === undefined)
    return { text: lastUpdatedText }

  return { ...lastUpdated, text: lastUpdatedText }
}

/**
 * Resolve the doc footer option from the classic prev/next options
 *
 * 从 classic 的上一页/下一页配置解析文档页脚选项
 *
 * @param config - The theme config / 主题配置
 * @returns The doc footer option / 文档页脚选项
 */
const resolveDocFooter = (config: ThemeConfigInput): DocFooter | undefined => {
  const { docFooter, next, prev } = config

  const result: DocFooter = { ...docFooter }

  if (prev !== undefined) result.prev = prev
  if (next !== undefined) result.next = next

  return Object.keys(result).length > 0 ? result : undefined
}

/**
 * Resolve the social links from the classic repository options
 *
 * The brand icon of the repository is shipped by the theme, so the link works
 * even when the site disables the icon plugin.
 *
 * 从 classic 的仓库配置解析社交链接
 *
 * 主题内置了仓库的品牌图标，因此即使站点禁用了图标插件，链接也能正常显示。
 *
 * @param config - The theme config / 主题配置
 * @returns The social links option / 社交链接选项
 */
const resolveSocialLinks = (
  config: ThemeConfigInput,
): SocialLink[] | undefined => {
  const { repo, repoLabel, socialLinks } = config

  const links: SocialLink[] = socialLinks ? [...socialLinks] : []

  if (!isNonEmptyString(repo))
    return socialLinks === undefined ? undefined : links

  const link = isLinkHttp(repo) ? repo : `https://github.com/${repo}`

  // the same link may have been written with a trailing slash
  const comparableLink = link.replace(/\/+$/u, '')

  if (links.some((item) => item.link.replace(/\/+$/u, '') === comparableLink))
    return links

  const repoType = resolveRepoType(repo)

  if (!repoType) {
    console.warn(
      `[theme-default] The \`repo\` option "${repo}" is not a supported repository. Add the link to \`socialLinks\` manually to display it.`,
    )

    return links
  }

  links.push({
    icon: { svg: REPO_ICONS[repoType] },
    link,
    // the classic theme labels the repository link with the repository type
    // when no label is configured
    ariaLabel: isNonEmptyString(repoLabel) ? repoLabel : repoType,
  })

  return links
}

/**
 * Resolve the Markdown plugin options from the classic plugin options
 *
 * 从 classic 的插件配置解析 Markdown 插件选项
 *
 * @param config - The theme config / 主题配置
 * @returns The Markdown plugin options / Markdown 插件选项
 */
const resolveMarkdownPlugins = (
  config: ThemeConfigInput,
): MarkdownPluginsOptions | undefined => {
  const { markdownPlugins, themePlugins } = config

  const result: MarkdownPluginsOptions = { ...markdownPlugins }

  if (!themePlugins) return result

  const setPlugin = (
    name: keyof MarkdownPluginsOptions,
    value: MarkdownPluginsOptions[keyof MarkdownPluginsOptions] | undefined,
  ): void => {
    if (value !== undefined && result[name] === undefined)
      (result as Record<string, unknown>)[name] = value
  }

  setPlugin('ext', themePlugins.markdownExt)
  setPlugin('hint', themePlugins.markdownHint ?? themePlugins.hint)
  setPlugin('raw', themePlugins.markdownRaw)
  setPlugin('shiki', themePlugins.shiki)
  setPlugin('tab', themePlugins.markdownTab ?? themePlugins.tab)

  return result
}

/**
 * Remove the classic Markdown plugin keys from the plugin options
 *
 * 从插件配置中移除 classic 的 Markdown 插件键
 *
 * @param plugins - The plugin options / 插件配置
 * @returns The plugin options without the classic Markdown keys / 不含 classic
 *   Markdown 键的插件配置
 */
const resolveThemePlugins = (
  plugins: ThemeConfigInput['themePlugins'],
): ThemePluginsOptions | undefined => {
  if (!plugins) return undefined

  const {
    hint: _hint,
    markdownExt: _markdownExt,
    markdownHint: _markdownHint,
    markdownRaw: _markdownRaw,
    markdownTab: _markdownTab,
    prismjs: _prismjs,
    shiki: _shiki,
    tab: _tab,
    ...rest
  } = plugins

  if (plugins.icon !== undefined) {
    const icon = plugins.icon as { component?: unknown }

    if (icon.component !== undefined) {
      warnDeprecatedThemeOption(
        'themePlugins.icon.component',
        'The theme always uses its own `VPIcon` component.',
      )
    }
  }

  return rest
}

/**
 * Normalize the theme config written in the classic theme syntax
 *
 * The classic options are mapped to their modern counterparts, every deprecated
 * option emits a warning once.
 *
 * 归一化使用 classic 主题写法编写的主题配置
 *
 * Classic 配置项会被映射到对应的现代配置项，每个已废弃的配置项只警告一次。
 *
 * @param config - The theme config / 主题配置
 * @returns The normalized theme config / 归一化后的主题配置
 */
export const normalizeThemeConfig = (config: ThemeConfigInput): ThemeConfig => {
  const {
    backToHome,
    colorMode,
    editLink: editLinkInput,
    colorModeSwitch,
    docsBranch,
    docsDir,
    docsRepo,
    editLinkPattern,
    editLinkText,
    home,
    lastUpdatedText,
    logoAlt,
    logoDark,
    locales,
    navbar: navbarInput,
    next,
    openInNewWindow,
    pageNavbarLabel,
    prev,
    repo,
    repoLabel,
    selectLanguageAriaLabel,
    selectLanguageName,
    selectLanguageText,
    sidebar: sidebarInput,
    sidebarDepth,
    themePlugins,
    toggleColorMode,
    toggleSidebar,
    ...rest
  } = config

  if (colorMode !== undefined)
    warnDeprecatedThemeOption('colorMode', 'Use `appearance` instead.')
  if (colorModeSwitch !== undefined)
    warnDeprecatedThemeOption('colorModeSwitch', 'Use `appearance` instead.')
  if (home !== undefined) {
    warnDeprecatedThemeOption(
      'home',
      'Use `logoLink` and `notFound.link` instead, and `type: home` for `home: true`.',
    )
  }
  if (pageNavbarLabel !== undefined || rest.navbarLabel !== undefined)
    warnDeprecatedThemeOption('navbarLabel', 'Use `navMenuLabel` instead.')
  if (logoDark !== undefined) {
    warnDeprecatedThemeOption(
      'logoDark',
      'Use `logo: { light, dark }` instead.',
    )
  }
  if (logoAlt !== undefined)
    warnDeprecatedThemeOption('logoAlt', 'Use `logo.alt` instead.')
  if (repo !== undefined) {
    warnDeprecatedThemeOption(
      'repo',
      'Use `socialLinks` with the brand icon of the repository instead.',
    )
  }
  if (repoLabel !== undefined) {
    warnDeprecatedThemeOption(
      'repoLabel',
      'Use `socialLinks[*].ariaLabel` instead.',
    )
  }
  if (selectLanguageText !== undefined) {
    warnDeprecatedThemeOption(
      'selectLanguageText',
      'Use `langMenuLabel` instead.',
    )
  }
  if (selectLanguageAriaLabel !== undefined) {
    warnDeprecatedThemeOption(
      'selectLanguageAriaLabel',
      'Use `langMenuLabel` instead.',
    )
  }
  if (selectLanguageName !== undefined) {
    warnDeprecatedThemeOption(
      'selectLanguageName',
      'Use `locales.<locale>.label` instead.',
    )
  }
  if (sidebarDepth !== undefined) {
    warnDeprecatedThemeOption(
      'sidebarDepth',
      'The theme no longer renders the page headers in the sidebar. Use `@vuepress/plugin-toc` instead.',
    )
  }
  if (editLinkText !== undefined)
    warnDeprecatedThemeOption('editLinkText', 'Use `editLink.text` instead.')

  if (editLinkPattern !== undefined) {
    warnDeprecatedThemeOption(
      'editLinkPattern',
      'Use `editLink.pattern` instead.',
    )
  }
  if (docsRepo !== undefined) {
    warnDeprecatedThemeOption(
      'docsRepo',
      'Use `getEditLinkPattern` with `editLink.pattern` instead.',
    )
  }
  if (docsBranch !== undefined) {
    warnDeprecatedThemeOption(
      'docsBranch',
      'Use `getEditLinkPattern` with `editLink.pattern` instead.',
    )
  }
  if (docsDir !== undefined) {
    warnDeprecatedThemeOption(
      'docsDir',
      'Use `getEditLinkPattern` with `editLink.pattern` instead.',
    )
  }
  if (lastUpdatedText !== undefined) {
    warnDeprecatedThemeOption(
      'lastUpdatedText',
      'Use `lastUpdated.text` instead.',
    )
  }
  if (backToHome !== undefined)
    warnDeprecatedThemeOption('backToHome', 'Use `notFound.linkText` instead.')

  if (openInNewWindow !== undefined) {
    warnDeprecatedThemeOption(
      'openInNewWindow',
      'Use `externalLinkIcon` instead, the label of the icon is built in.',
    )
  }
  if (toggleColorMode !== undefined) {
    warnDeprecatedThemeOption(
      'toggleColorMode',
      'Use `darkModeSwitchLabel` instead.',
    )
  }
  if (toggleSidebar !== undefined) {
    warnDeprecatedThemeOption(
      'toggleSidebar',
      'Use `sidebarMenuLabel` instead.',
    )
  }
  if (prev !== undefined)
    warnDeprecatedThemeOption('prev', 'Use `docFooter.prev` instead.')
  if (next !== undefined)
    warnDeprecatedThemeOption('next', 'Use `docFooter.next` instead.')
  if (themePlugins?.prismjs !== undefined) {
    warnDeprecatedThemeOption(
      'themePlugins.prismjs',
      'Prism is no longer bundled, install `@vuepress/plugin-prismjs` and disable `markdownPlugins.shiki` instead.',
    )
  }
  if (themePlugins?.hint !== undefined) {
    warnDeprecatedThemeOption(
      'themePlugins.hint',
      'Use `markdownPlugins.hint` instead.',
    )
  }
  if (themePlugins?.tab !== undefined) {
    warnDeprecatedThemeOption(
      'themePlugins.tab',
      'Use `markdownPlugins.tab` instead.',
    )
  }

  for (const key of [
    'markdownExt',
    'markdownHint',
    'markdownRaw',
    'markdownTab',
    'shiki',
  ] as const) {
    if (themePlugins?.[key] !== undefined) {
      warnDeprecatedThemeOption(
        `themePlugins.${key}`,
        `Use \`markdownPlugins.${key.replace(/^markdown/u, '').replace(/^./u, (char) => char.toLowerCase())}\` instead.`,
      )
    }
  }

  const appearance = resolveAppearance({ ...rest, colorMode, colorModeSwitch })
  const logo = resolveLogo({
    ...rest,
    logoAlt,
    logoDark,
  })
  const editLink = resolveEditLink({
    ...rest,
    editLink: editLinkInput,
    docsBranch,
    docsDir,
    docsRepo,
    editLinkPattern,
    editLinkText,
    repo,
  })
  const notFound = resolveNotFound({ ...rest, backToHome, home })
  const logoLink = rest.logoLink ?? (isNonEmptyString(home) ? home : undefined)
  const lastUpdated = resolveLastUpdated({ ...rest, lastUpdatedText })
  const docFooter = resolveDocFooter({ ...rest, next, prev })
  const socialLinks = resolveSocialLinks({ ...rest, repo, repoLabel })
  const markdownPlugins = resolveMarkdownPlugins({
    ...rest,
    themePlugins,
  })
  const normalizedPlugins = resolveThemePlugins(themePlugins)

  const navMenuLabel =
    rest.navMenuLabel ??
    [rest.navbarLabel, pageNavbarLabel].find((item) => isNonEmptyString(item))
  const langMenuLabel =
    rest.langMenuLabel ??
    [selectLanguageAriaLabel, selectLanguageText].find((item) =>
      isNonEmptyString(item),
    )

  // `selectLanguageText` is the menu button label, not the language name
  const label = isNonEmptyString(rest.label) ? rest.label : selectLanguageName

  return {
    ...rest,
    ...(appearance === undefined ? {} : { appearance }),
    ...(logo === undefined ? {} : { logo }),
    ...(editLink === undefined ? {} : { editLink }),
    ...(notFound === undefined ? {} : { notFound }),
    ...(logoLink === undefined ? {} : { logoLink }),
    ...(lastUpdated === undefined ? {} : { lastUpdated }),
    ...(docFooter === undefined ? {} : { docFooter }),
    ...(socialLinks === undefined ? {} : { socialLinks }),
    ...(markdownPlugins === undefined ||
    Object.keys(markdownPlugins).length === 0
      ? {}
      : { markdownPlugins }),
    ...(normalizedPlugins === undefined
      ? {}
      : { themePlugins: normalizedPlugins }),
    ...(navMenuLabel === undefined ? {} : { navMenuLabel }),
    ...(langMenuLabel === undefined ? {} : { langMenuLabel }),
    ...(rest.darkModeSwitchLabel === undefined && toggleColorMode !== undefined
      ? { darkModeSwitchLabel: toggleColorMode }
      : {}),
    ...(rest.sidebarMenuLabel === undefined && toggleSidebar !== undefined
      ? { sidebarMenuLabel: toggleSidebar }
      : {}),
    ...(label === undefined ? {} : { label }),
    ...(navbarInput === undefined
      ? {}
      : { navbar: normalizeNavbar(navbarInput) }),
    ...(sidebarInput === undefined
      ? {}
      : { sidebar: normalizeSidebar(sidebarInput) }),
    ...(locales === undefined
      ? {}
      : {
          locales: Object.fromEntries(
            Object.entries(locales).map(([key, value]) => [
              key,
              normalizeThemeConfig(value),
            ]),
          ),
        }),
  } as ThemeConfig
}
