import type {
  NavbarGroupOptions,
  NavbarLinkOptions,
  NavbarOptions,
  SidebarItemOptions,
  SidebarOptions,
  SidebarStructureOptions,
} from '@vuepress/theme-classic'
import { defaultTheme } from '@vuepress/theme-default'
import type { DefaultTheme, ThemeConfig } from '@vuepress/theme-default'

import { navbarEn, navbarZh, sidebarEn, sidebarZh } from './configs/index.js'

// The docs site is configured with the configs of `@vuepress/theme-classic`
// (they also feed the LLM TOC and the catalog icons), so they are converted to
// the shape of the default theme here.
const WORD_FORMS: Record<string, string> = {
  ai: 'AI',
  api: 'API',
  llms: 'LLMs',
  pwa: 'PWA',
  rtl: 'RTL',
  seo: 'SEO',
}

const toTitle = (path: string): string => {
  const segment = path.replace(/\/+$/u, '').split('/').pop() ?? ''

  if (!segment) return 'Overview'

  return (
    WORD_FORMS[segment] ??
    segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  )
}

const isExternalLink = (link: string): boolean =>
  /^[a-z][a-z+.-]*:/iu.test(link)

const resolveLink = (prefix: string, link: string): string => {
  if (!link) return prefix || '/'
  if (isExternalLink(link) || link.startsWith('/')) return link

  return `${prefix}${link}`
}

const toIcon = (item: { icon?: string }): { icon?: string } =>
  item.icon ? { icon: item.icon } : {}

const toNavChild = (
  item: NavbarLinkOptions | NavbarGroupOptions,
  prefix: string,
): DefaultTheme.NavItem => {
  if (typeof item === 'string') return { link: resolveLink(prefix, item) }

  if ('children' in item && Array.isArray(item.children)) {
    const childPrefix = resolveLink(prefix, item.prefix ?? '')

    const group: DefaultTheme.NavItemWithChildren = {
      text: item.text ?? toTitle(item.link ?? item.prefix ?? ''),
      ...toIcon(item),
      items: item.children.map(
        (child) =>
          toNavChild(child, childPrefix) as
            | DefaultTheme.NavItemChildren
            | DefaultTheme.NavItemWithLink,
      ),
    }

    return group
  }

  const link: DefaultTheme.NavItemWithLink = {
    ...(item.text ? { text: item.text } : {}),
    link: resolveLink(prefix, item.link ?? ''),
    ...toIcon(item),
  }

  return link
}

const toNav = (navbar: NavbarOptions): DefaultTheme.NavItem[] => {
  if (!Array.isArray(navbar)) return []

  return navbar.map((item): DefaultTheme.NavItem => {
    if (typeof item === 'string') return { link: item }

    if ('children' in item && Array.isArray(item.children)) {
      const prefix = item.prefix ?? ''

      const group: DefaultTheme.NavItemWithChildren = {
        text: item.text ?? toTitle(item.prefix ?? item.link ?? ''),
        ...toIcon(item),
        items: item.children.map(
          (child) =>
            toNavChild(child, prefix) as
              | DefaultTheme.NavItemChildren
              | DefaultTheme.NavItemWithLink,
        ),
      }

      return group
    }

    const link: DefaultTheme.NavItemWithLink = {
      ...(item.text ? { text: item.text } : {}),
      link: resolveLink('', item.link ?? ''),
      ...toIcon(item),
    }

    return link
  })
}

const toSidebarItem = (
  item: SidebarItemOptions | SidebarStructureOptions,
  prefix: string,
): DefaultTheme.SidebarItem => {
  // The theme resolves the text and the icon from the page meta, so a plain
  // string only needs its link resolved here.
  if (typeof item === 'string') return { link: resolveLink(prefix, item) }

  // the docs site does not generate a sidebar from the file structure, so the
  // generated children are left empty
  if ('children' in item && item.children === 'structure') {
    return {
      text: item.text ?? toTitle(item.link ?? item.prefix ?? ''),
      ...toIcon(item),
      ...(item.link === undefined
        ? {}
        : { link: resolveLink(prefix, item.link) }),
      items: [],
      ...(item.collapsible ? { collapsed: false } : {}),
    }
  }

  if ('children' in item && Array.isArray(item.children)) {
    const childPrefix = resolveLink(prefix, item.prefix ?? '')

    const group: DefaultTheme.SidebarItem = {
      text: item.text ?? toTitle(item.link ?? item.prefix ?? ''),
      ...toIcon(item),
      ...(item.link === undefined
        ? {}
        : { link: resolveLink(prefix, item.link) }),
      items: item.children.map((child) => toSidebarItem(child, childPrefix)),
      ...(item.collapsible ? { collapsed: false } : {}),
    }

    return group
  }

  const link: DefaultTheme.SidebarItem = {
    ...(item.text ? { text: item.text } : {}),
    ...toIcon(item),
    ...(item.link === undefined
      ? {}
      : { link: resolveLink(prefix, item.link) }),
  }

  return link
}

const toSidebar = (sidebar: SidebarOptions | false): ThemeConfig['sidebar'] => {
  if (sidebar === false) return false
  if (sidebar === 'heading') return 'heading'
  if (sidebar === 'structure') return 'structure'

  if (Array.isArray(sidebar))
    return sidebar.map((item) => toSidebarItem(item, ''))

  const result: Record<
    string,
    DefaultTheme.SidebarItem[] | 'heading' | 'structure' | false
  > = {}

  for (const [prefix, items] of Object.entries(sidebar)) {
    result[prefix] =
      items === false || items === 'heading' || items === 'structure'
        ? items
        : items.map((item) => toSidebarItem(item, prefix))
  }

  return result as DefaultTheme.Sidebar
}

const navEn = toNav(navbarEn)
const navZh = toNav(navbarZh)
const sidebarConfigEn = toSidebar(sidebarEn)
const sidebarConfigZh = toSidebar(sidebarZh)

// The theme data is serialized to JSON by `@vuepress/plugin-theme-data`, so the
// pattern must be a string. `:path` is replaced with the page relative path.
const EDIT_LINK_PATTERN =
  'https://github.com/vuepress/ecosystem/edit/main/docs/:path'

const editLinkEn = {
  pattern: EDIT_LINK_PATTERN,
  text: 'Edit this page on GitHub',
}

export default defaultTheme({
  logo: '/images/hero.png',
  hostname: 'https://ecosystem.vuejs.press',
  nav: navEn,
  sidebar: sidebarConfigEn,
  editLink: editLinkEn,

  footer: {
    message: 'MIT Licensed',
    copyright: 'Copyright © 2018-present VuePress Community',
  },

  themePlugins: {
    copyCode: {
      inline: true,
    },
    git: {
      changelog: true,
      contributors: {
        avatar: true,
      },
    },
    markdownHint: {
      alert: true,
      hint: true,
    },
    markdownTab: {
      tabs: true,
      codeTabs: true,
    },
    // `#/1/1` in the reveal.js demos is a slide route rather than a markdown anchor
    linksCheck: {
      exclude: [/^#\//u],
    },
    // the site config already registers these plugins with its own options
    icon: false,
    markdownExt: false,
    markdownRaw: false,
    shiki: false,
  },

  locales: {
    '/': {
      label: 'English',
      lang: 'en-US',
      link: '/',
      nav: navEn,
      sidebar: sidebarConfigEn,
      editLink: editLinkEn,
      footer: {
        message: 'MIT Licensed',
        copyright: 'Copyright © 2018-present VuePress Community',
      },
    },
    '/zh/': {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      nav: navZh,
      sidebar: sidebarConfigZh,
      editLink: {
        pattern: EDIT_LINK_PATTERN,
        text: '在 GitHub 上编辑此页',
      },
      footer: {
        message: 'MIT 协议',
        copyright: '版权所有 © 2018-至今 VuePress 社区',
      },
      lastUpdated: { text: '上次更新' },
      contributorsText: '贡献者',
      docFooter: { prev: '上一页', next: '下一页' },
      tip: '提示',
      warning: '注意',
      danger: '警告',
      important: '重要',
      note: '笔记',
      notFound: {
        title: '页面不存在',
        quote: '看起来我们进入了错误的链接',
        linkText: '返回首页',
      },
      darkModeSwitchLabel: '切换颜色模式',
      lightModeSwitchTitle: '切换到浅色模式',
      darkModeSwitchTitle: '切换到深色模式',
      sidebarMenuLabel: '切换侧边栏',
      langMenuLabel: '选择语言',
      navMenuLabel: '主导航',
      mobileMenuLabel: '切换菜单',
      skipToContentLabel: '跳到正文',
    },
  },
})
