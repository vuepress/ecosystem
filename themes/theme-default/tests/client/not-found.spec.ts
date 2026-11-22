import { renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'

import { createClientConfigs } from './utils.js'

describe('theme 404 page', () => {
  it('should render the default not-found content', async () => {
    const html = await renderVuePress({
      clientConfigs: await createClientConfigs(),
      content: '',
      page: {
        path: '/missing.html',
        title: '404',
        frontmatter: { layout: 'NotFound' },
      },
      site: { title: 'My Site' },
      themeData: {},
    })

    expect(html).toContain('class="vp-theme-container"')
    expect(html).toContain('class="vp-not-found"')
    expect(html).toContain('PAGE NOT FOUND')
    expect(html).toContain('Take me home')
  })

  it('should render the not-found content of the current locale', async () => {
    const html = await renderVuePress({
      clientConfigs: await createClientConfigs(),
      content: '',
      page: {
        path: '/zh/missing.html',
        title: '404',
        lang: 'zh-CN',
        frontmatter: { layout: 'NotFound' },
      },
      site: {
        locales: {
          '/': { lang: 'en-US' },
          '/zh/': { lang: 'zh-CN' },
        },
      },
      themeData: {
        locales: {
          '/zh/': {
            notFound: {
              title: '页面不存在',
              quote: '看起来我们进入了错误的链接。',
              linkText: '返回首页',
            },
          },
        },
      },
    })

    expect(html).toContain('class="vp-not-found"')
    expect(html).toContain('页面不存在')
    expect(html).toContain('看起来我们进入了错误的链接。')
    expect(html).toContain('返回首页')
  })
})
