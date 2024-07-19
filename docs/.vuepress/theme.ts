import { defaultTheme } from '@vuepress/theme-default'
import type { Theme } from 'vuepress/core'
import { navbarEn, navbarZh, sidebarEn, sidebarZh } from './configs'

const isProd = process.env.NODE_ENV === 'production'

export default defaultTheme({
  logo: '/images/hero.png',
  repo: 'vuepress/ecosystem',
  docsDir: 'docs',
  hostname: 'https://ecosystem.vuejs.press',

  // theme-level locales config
  locales: {
    /**
     * English locale config
     *
     * As the default locale of @vuepress/theme-default is English,
     * we don't need to set all of the locale fields
     */
    '/': {
      // navbar
      navbar: navbarEn,
      // sidebar
      sidebar: sidebarEn,
      // page meta
      editLinkText: 'Edit this page on GitHub',
    },

    /**
     * Chinese locale config
     */
    '/zh/': {
      // navbar
      navbar: navbarZh,
      selectLanguageName: '简体中文',
      selectLanguageText: '选择语言',
      selectLanguageAriaLabel: '选择语言',
      // sidebar
      sidebar: sidebarZh,
      // page meta
      editLinkText: '在 GitHub 上编辑此页',
      lastUpdatedText: '上次更新',
      contributorsText: '贡献者',
      // custom containers
      tip: '提示',
      warning: '注意',
      danger: '警告',
      // 404 page
      notFound: [
        '这里什么都没有',
        '我们怎么到这来了？',
        '这是一个 404 页面',
        '看起来我们进入了错误的链接',
      ],
      backToHome: '返回首页',
      // a11y
      openInNewWindow: '在新窗口打开',
      toggleColorMode: '切换颜色模式',
      toggleSidebar: '切换侧边栏',
    },
  },

  themePlugins: {
    // only enable git plugin in production mode
    git: isProd,
    // use shiki plugin in production mode instead
    prismjs: isProd
      ? false
      : {
          lineNumbers: 10,
          notationDiff: true,
          notationErrorLevel: true,
          notationFocus: true,
          notationHighlight: true,
          notationWordHighlight: true,
          whitespace: true,
          themes: {
            light: 'one-light',
            dark: 'one-dark',
          },
        },
  },
}) as Theme
