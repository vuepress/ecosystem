import { expect, test } from '@playwright/test'

test.describe('plugin-theme-data', () => {
  test('theme data', async ({ page }) => {
    await page.goto('')

    const themeData = JSON.parse(
      (await page.locator('#theme-data').textContent()) ?? '{}',
    ) as Record<string, unknown>

    expect(themeData).toEqual({
      appearance: true,
      outline: [2, 3],
      aside: true,
      scrollOffset: 134,
      editLink: true,
      lastUpdated: true,
      contributors: true,
      externalLinkIcon: true,
      logo: 'https://v2.vuepress.vuejs.org/images/hero.png',
      navbar: [
        '/',
        {
          text: 'Dropdown',
          children: [
            {
              text: 'item',
              link: '/navbar/',
            },
            {
              text: 'Nested',
              prefix: '/navbar/',
              children: [
                {
                  text: 'Nested foo',
                  link: '/navbar/foo.html',
                },
                'bar.md',
              ],
            },
          ],
        },
      ],
      sidebar: {
        '/sidebar/heading/': 'structure',
        '/sidebar/config/': [
          {
            text: 'Sidebar',
            link: '',
            items: [
              {
                text: 'sidebar 1',
                link: '1.html',
              },
              {
                text: 'sidebar 2',
                link: '2.html',
              },
            ],
          },
        ],
        '/': [],
      },
      locales: {
        '/zh/': {
          darkModeSwitchLabel: '外观',
          lightModeSwitchTitle: '切换到浅色主题',
          darkModeSwitchTitle: '切换到深色主题',
          selectLanguageText: '选择语言',
          selectLanguageName: '简体中文',
          returnToTopLabel: '返回顶部',
          sidebarMenuLabel: '目录',
          outlineTitle: '此页内容',
          editLinkText: '编辑此页',
          lastUpdatedText: '最后更新于',
          contributorsText: '贡献者',
          docFooter: { prev: '上一页', next: '下一页' },
          notFound: {
            title: '页面未找到',
            quote:
              '如果你不改变方向，继续寻找，最终可能会到达你正在前往的地方。',
            linkLabel: '回到首页',
            linkText: '回到首页',
            code: '404',
          },
          logo: 'https://v2.vuepress.vuejs.org/images/hero.png',
          navbar: ['/zh/'],
          sidebar: {
            '/sidebar/heading/': 'structure',
            '/sidebar/config/': [
              {
                text: 'Sidebar',
                link: '',
                items: [
                  { text: 'sidebar 1', link: '1.html' },
                  { text: 'sidebar 2', link: '2.html' },
                ],
              },
            ],
            '/': [],
          },
        },
        '/': {
          darkModeSwitchLabel: 'Appearance',
          lightModeSwitchTitle: 'Switch to light theme',
          darkModeSwitchTitle: 'Switch to dark theme',
          selectLanguageText: 'Languages',
          selectLanguageName: 'English',
          returnToTopLabel: 'Return to top',
          sidebarMenuLabel: 'Menu',
          outlineTitle: 'On This Page',
          editLinkText: 'Edit this page',
          lastUpdatedText: 'Last Updated',
          contributorsText: 'Contributors',
          docFooter: { prev: 'Previous Page', next: 'Next Page' },
          notFound: {
            title: 'PAGE NOT FOUND',
            quote:
              "But if you don't change your direction, and if you keep looking, you may end up where you are heading.",
            linkLabel: 'go to home',
            linkText: 'Take me home',
            code: '404',
          },
          logo: 'https://v2.vuepress.vuejs.org/images/hero.png',
          navbar: [
            '/',
            { text: 'Dropdown', items: [{ text: 'item', link: '/dropdown/' }] },
          ],
          sidebar: {
            '/sidebar/heading/': 'structure',
            '/sidebar/config/': [
              {
                text: 'Sidebar',
                link: '',
                items: [
                  { text: 'sidebar 1', link: '1.html' },
                  { text: 'sidebar 2', link: '2.html' },
                ],
              },
            ],
            '/': [],
          },
        },
      },
    })

    await page.locator('.actions .vp-button').first().click()

    await page.waitForURL('action1.html')

    await expect(page.locator('#is-theme-data-changed')).toHaveText('false')
  })

  test('theme locale data', async ({ page }) => {
    await page.goto('zh/')

    const themeLocaleData = JSON.parse(
      (await page.locator('#theme-locale-data').textContent()) ?? '{}',
    ) as Record<string, unknown>

    expect(themeLocaleData).toHaveProperty('navbar', ['/zh/'])
    expect(themeLocaleData).not.toHaveProperty('locales')

    await page.locator('[vp-content] .route-link').click()

    await page.waitForURL('zh/test.html')

    await expect(page.locator('#is-theme-locale-data-changed')).toHaveText(
      'false',
    )

    await page.goto('zh/')
    await page.locator('.action .vp-button').first().click()

    await page.waitForURL('action1.html')

    await expect(page.locator('#is-theme-locale-data-changed')).toHaveText(
      'true',
    )
  })
})
