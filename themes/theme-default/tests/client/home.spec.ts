import { renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'

import { createClientConfigs } from './utils.js'

describe('theme home page', () => {
  it('should render the hero from the frontmatter', async () => {
    const html = await renderVuePress({
      clientConfigs: await createClientConfigs(),
      content: '',
      page: {
        path: '/',
        title: 'Home',
        frontmatter: {
          type: 'home',
          hero: {
            name: 'VuePress Ecosystem',
            tagline: 'The official themes and plugins',
            image: { src: '/images/hero.png', alt: 'VuePress' },
            actions: [
              { text: 'Get Started', link: '/guide/', theme: 'brand' },
              {
                text: 'GitHub',
                link: 'https://github.com/vuepress/ecosystem',
                theme: 'alt',
              },
            ],
          },
        },
      },
      site: { title: 'My Site' },
      themeData: {},
    })

    expect(html).toContain('vp-hero')
    expect(html).toMatch(/class="name clip"[^>]*>VuePress Ecosystem<\/span>/u)
    expect(html).toMatch(
      /class="tagline"[^>]*><bdi[^>]*>The official themes and plugins<\/bdi>/u,
    )
    expect(html).toContain('src="/images/hero.png"')
    expect(html).toContain('href="/guide/"')
    expect(html).toContain('Get Started')
    expect(html).toMatch(/href="https:\/\/github\.com\/vuepress\/ecosystem"/u)
  })

  it('should render the features from the frontmatter', async () => {
    const html = await renderVuePress({
      clientConfigs: await createClientConfigs(),
      content: '',
      page: {
        path: '/',
        title: 'Home',
        frontmatter: {
          type: 'home',
          hero: { name: 'My Site' },
          features: [
            { icon: '🚀', title: 'Fast', details: 'Build the site quickly' },
            { title: 'Simple', details: 'Write plain Markdown' },
          ],
        },
      },
      site: { title: 'My Site' },
      themeData: {},
    })

    expect(html).toContain('vp-features')
    expect(html).toContain('vp-feature')
    expect(html).toContain('Fast')
    expect(html).toContain('Build the site quickly')
    expect(html).toContain('Simple')
    expect(html).toContain('Write plain Markdown')
  })

  it('should render the home content', async () => {
    const html = await renderVuePress({
      clientConfigs: await createClientConfigs(),
      content: '<h2>Welcome</h2><p>This is the home content.</p>',
      page: {
        path: '/',
        title: 'Home',
        frontmatter: { type: 'home', hero: { name: 'My Site' } },
      },
      site: { title: 'My Site' },
      themeData: {},
    })

    expect(html).toContain('class="vp-home-content vp-doc container"')
    expect(html).toContain('Welcome')
    expect(html).toContain('This is the home content.')
  })
})
