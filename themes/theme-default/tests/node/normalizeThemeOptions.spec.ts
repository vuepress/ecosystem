// oxlint-disable vitest/no-hooks, no-console -- the deprecation warnings are asserted

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { normalizeThemeConfig } from '../../src/node/normalizeThemeOptions.js'
import type { ThemeConfig } from '../../src/shared/types.js'

const normalize = (config: Record<string, unknown>): ThemeConfig =>
  normalizeThemeConfig(config)

describe(normalizeThemeConfig, () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('appearance', () => {
    it('should map colorMode to appearance', () => {
      expect(normalize({ colorMode: 'auto' }).appearance).toBeUndefined()
      expect(normalize({ colorMode: 'dark' }).appearance).toBe('dark')
      expect(normalize({ colorMode: 'light' }).appearance).toStrictEqual({
        initialValue: 'light',
      })
    })

    it('should force the appearance when colorModeSwitch is disabled', () => {
      expect(
        normalize({ colorMode: 'auto', colorModeSwitch: false }).appearance,
      ).toBe('force-auto')
      expect(
        normalize({ colorMode: 'dark', colorModeSwitch: false }).appearance,
      ).toBe('force-dark')
      expect(
        normalize({ colorMode: 'light', colorModeSwitch: false }).appearance,
      ).toBe(false)
    })

    it('should keep an explicit appearance', () => {
      expect(
        normalize({ appearance: 'force-dark', colorMode: 'light' }).appearance,
      ).toBe('force-dark')
    })
  })

  describe('logo', () => {
    it('should merge logoDark and logoAlt into logo', () => {
      expect(
        normalize({ logo: '/logo.svg', logoDark: '/logo-dark.svg' }).logo,
      ).toStrictEqual({ light: '/logo.svg', dark: '/logo-dark.svg' })
      expect(
        normalize({ logo: { src: '/logo.png' }, logoDark: '/logo-dark.png' })
          .logo,
      ).toStrictEqual({ light: '/logo.png', dark: '/logo-dark.png' })
      expect(normalize({ logoDark: '/logo-dark.svg' }).logo).toBe(
        '/logo-dark.svg',
      )
    })
  })

  describe('editLink', () => {
    it('should build the pattern from the repository options', () => {
      expect(
        normalize({
          editLink: true,
          editLinkText: 'Edit this page',
          repo: 'vuepress/ecosystem',
        }).editLink,
      ).toStrictEqual({
        pattern: 'https://github.com/vuepress/ecosystem/edit/main/:path',
        text: 'Edit this page',
      })

      expect(
        normalize({
          docsBranch: 'dev',
          docsDir: 'docs',
          docsRepo: 'https://gitlab.com/vuepress/ecosystem',
        }).editLink,
      ).toStrictEqual({
        pattern: 'https://gitlab.com/vuepress/ecosystem/-/edit/dev/docs/:path',
      })
    })

    it('should disable the edit link', () => {
      expect(
        normalize({ editLink: false, repo: 'vuepress/ecosystem' }).editLink,
      ).toBe(false)
    })

    it('should keep the edit link undefined without a repository', () => {
      expect(normalize({ editLink: true }).editLink).toBeUndefined()
    })

    it('should keep an explicit edit link', () => {
      expect(
        normalize({ editLink: { pattern: 'https://example.com/:path' } })
          .editLink,
      ).toStrictEqual({ pattern: 'https://example.com/:path' })
    })

    it('should apply the classic text to an explicit edit link', () => {
      expect(
        normalize({
          editLink: { pattern: 'https://example.com/:path' },
          editLinkText: 'Improve this page',
        }).editLink,
      ).toStrictEqual({
        pattern: 'https://example.com/:path',
        text: 'Improve this page',
      })
    })
  })

  describe('notFound', () => {
    it('should use the first classic not found message as the quote', () => {
      expect(
        normalize({
          backToHome: 'Back home',
          home: '/',
          notFound: ['Page not found', 'Not here'],
        }).notFound,
      ).toStrictEqual({
        link: '/',
        linkText: 'Back home',
        quote: 'Page not found',
      })
    })
  })

  describe('logoLink', () => {
    it('should use home as the logo link', () => {
      expect(normalize({ home: '/guide/' }).logoLink).toBe('/guide/')
      expect(normalize({ home: '/guide/', logoLink: '/home/' }).logoLink).toBe(
        '/home/',
      )
    })
  })

  describe('lastUpdated and docFooter', () => {
    it('should merge lastUpdatedText and prev/next', () => {
      const config = normalize({
        lastUpdatedText: 'Updated at',
        next: 'Next page',
        prev: 'Previous page',
      })

      expect(config.lastUpdated).toStrictEqual({ text: 'Updated at' })
      expect(config.docFooter).toStrictEqual({
        next: 'Next page',
        prev: 'Previous page',
      })
    })
  })

  describe('socialLinks', () => {
    it('should add a social link with the brand icon for the repository', () => {
      const { socialLinks } = normalize({
        repo: 'vuepress/ecosystem',
        repoLabel: 'GitHub repository',
      })

      expect(socialLinks).toHaveLength(1)
      const [socialLink] = socialLinks!
      expect(socialLink.link).toBe('https://github.com/vuepress/ecosystem')
      expect(socialLink.ariaLabel).toBe('GitHub repository')
      expect((socialLink.icon as { svg: string }).svg).toMatch(/^<svg/u)
    })

    it('should label the repository link with the repository type by default', () => {
      const [socialLink] = normalize({
        repo: 'vuepress/ecosystem',
      }).socialLinks!

      expect(socialLink.ariaLabel).toBe('GitHub')
    })

    it('should not duplicate an existing social link with a trailing slash', () => {
      const { socialLinks } = normalize({
        repo: 'vuepress/ecosystem',
        socialLinks: [
          { icon: 'github', link: 'https://github.com/vuepress/ecosystem/' },
        ],
      })

      expect(socialLinks).toHaveLength(1)
    })

    it('should not duplicate an existing social link', () => {
      const { socialLinks } = normalize({
        repo: 'vuepress/ecosystem',
        socialLinks: [
          { icon: 'github', link: 'https://github.com/vuepress/ecosystem' },
        ],
      })

      expect(socialLinks).toHaveLength(1)
    })

    it('should skip an unsupported repository', () => {
      expect(
        normalize({ repo: 'https://example.com/foo' }).socialLinks,
      ).toStrictEqual([])
    })
  })

  describe('markdownPlugins', () => {
    it('should move the classic markdown plugin options', () => {
      expect(
        normalize({
          themePlugins: {
            hint: { themes: ['tip'] },
            prismjs: false,
            tab: false,
          },
        }).markdownPlugins,
      ).toStrictEqual({ hint: { themes: ['tip'] }, tab: false })
    })

    it('should warn about the classic markdown plugin options', () => {
      normalize({ themePlugins: { markdownExt: { gfm: true } } })

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('`themePlugins.markdownExt`'),
      )
    })

    it('should prefer the markdownPlugins option', () => {
      expect(
        normalize({
          markdownPlugins: { hint: false },
          themePlugins: { markdownHint: { themes: ['tip'] } },
        }).markdownPlugins,
      ).toStrictEqual({ hint: false })
    })
  })

  describe('labels', () => {
    it('should map the classic labels', () => {
      const config = normalize({
        navbarLabel: 'Navigation',
        selectLanguageAriaLabel: 'Choose language',
        toggleColorMode: 'Switch theme',
        toggleSidebar: 'Toggle sidebar',
      })

      expect(config.navMenuLabel).toBe('Navigation')
      expect(config.langMenuLabel).toBe('Choose language')
      expect(config.darkModeSwitchLabel).toBe('Switch theme')
      expect(config.sidebarMenuLabel).toBe('Toggle sidebar')
    })

    it('should not use the language menu label as the language name', () => {
      expect(
        (normalize({ selectLanguageText: 'Languages' }) as { label?: string })
          .label,
      ).toBeUndefined()
    })

    it('should map the locale language name', () => {
      const config = normalize({
        locales: {
          '/zh/': { selectLanguageName: '简体中文' } as never,
        },
      })

      const zhLocale = config.locales?.['/zh/'] as { label?: string }
      expect(zhLocale.label).toBe('简体中文')
    })
  })

  describe('warnings', () => {
    it('should warn about a deprecated option once', () => {
      normalize({ openInNewWindow: 'open in new window' })
      normalize({ openInNewWindow: 'open in new window' })

      const warnings = vi
        .mocked(console.warn)
        .mock.calls.filter(([message]) =>
          String(message).includes('openInNewWindow'),
        )

      expect(warnings).toHaveLength(1)
      expect(String(warnings[0][0])).toContain('Use `externalLinkIcon` instead')
    })
  })
})
