import { defaultTheme } from '@vuepress/theme-default'

import { navbarEn, navbarZh, sidebarEn, sidebarZh } from './configs/index.js'

// The docs site is written in the classic theme syntax: string items, `prefix`
// and `children` are normalized by the default theme at build time.
const navbarConfigEn = navbarEn
const navbarConfigZh = navbarZh
const sidebarConfigEn = sidebarEn
const sidebarConfigZh = sidebarZh

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
  navbar: navbarConfigEn,
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
      navbar: navbarConfigEn,
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
      navbar: navbarConfigZh,
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
