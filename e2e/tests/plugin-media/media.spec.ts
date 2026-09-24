import { expect, test } from '@playwright/test'

test.describe('plugin-media', () => {
  test.beforeEach(async ({ page }) => {
    // The embeds load from third-party sites, which only slows the tests down
    await page.route(/^https?:\/\/(?!127\.0\.0\.1|localhost)/u, (route) =>
      route.abort(),
    )
  })

  test('renders the embed players', async ({ page }) => {
    await page.goto('media.html')

    await expect(page.locator('.vp-bilibili-iframe')).toHaveCount(1)
    await expect(page.locator('.vp-youtube-iframe')).toHaveCount(1)
    await expect(page.locator('.vp-vimeo-iframe')).toHaveCount(1)
    await expect(page.locator('.vp-twitch-iframe')).toHaveCount(1)
    await expect(page.locator('.vp-dailymotion-iframe')).toHaveCount(1)
    await expect(page.locator('.vp-tiktok-iframe')).toHaveCount(1)
    await expect(page.locator('.vp-spotify-iframe')).toHaveCount(1)
  })

  test('prefixes the BiliBili classes with vp-', async ({ page }) => {
    await page.goto('media.html')

    await expect(page.locator('.vp-bilibili-desc')).toHaveCount(1)
    await expect(page.locator('.vp-bilibili-iframe')).toHaveCount(1)
  })

  test('builds the embed URLs', async ({ page }) => {
    await page.goto('media.html')

    const src = (selector: string): Promise<string | null> =>
      page.locator(selector).getAttribute('src')

    expect(await src('.vp-bilibili-iframe')).toBe(
      'https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&t=0&autoplay=0&p=1',
    )
    expect(await src('.vp-youtube-iframe')).toBe(
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
    )
    expect(await src('.vp-vimeo-iframe')).toBe(
      'https://player.vimeo.com/video/76979871',
    )
    expect(await src('.vp-dailymotion-iframe')).toBe(
      'https://geo.dailymotion.com/player.html?video=x8v5k1u',
    )
    expect(await src('.vp-tiktok-iframe')).toBe(
      'https://www.tiktok.com/player/v1/6718335390845095173',
    )
    expect(await src('.vp-spotify-iframe')).toBe(
      'https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC',
    )
  })

  test('disables autoplay on Twitch unless asked for', async ({ page }) => {
    await page.goto('media.html')

    // Twitch autoplays unless `autoplay` is given, which browsers block
    expect(await page.locator('.vp-twitch-iframe').getAttribute('src')).toBe(
      'https://player.twitch.tv/?channel=monstercat&autoplay=false&parent=ecosystem-e2e-test.com',
    )
  })

  test.describe('link syntax', () => {
    test('renders the components of the links', async ({ page }) => {
      await page.goto('media-links.html')

      await expect(page.locator('.vp-bilibili-iframe')).toHaveCount(2)
      await expect(page.locator('.vp-youtube-iframe')).toHaveCount(1)
      await expect(page.locator('.vp-vimeo-iframe')).toHaveCount(1)
      await expect(page.locator('.vp-twitch-iframe')).toHaveCount(1)
    })

    test('passes the props to the components', async ({ page }) => {
      await page.goto('media-links.html')

      await expect(page.locator('.vp-youtube')).toHaveAttribute(
        'style',
        /width: 80%/u,
      )
      await expect(page.locator('.vp-youtube-iframe')).toHaveAttribute(
        'title',
        'A YouTube video',
      )
    })

    test('builds the BiliBili links', async ({ page }) => {
      await page.goto('media-links.html')

      const frames = page.locator('.vp-bilibili-iframe')

      // The id and the URL of the link are both accepted, and the `p` and `t`
      // parameters of the URL become the `page` and `time` props
      await expect(frames.nth(0)).toHaveAttribute(
        'src',
        'https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&t=0&autoplay=0&p=1',
      )
      await expect(frames.nth(1)).toHaveAttribute(
        'src',
        'https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&t=30&autoplay=0&p=3',
      )
    })

    test('passes the parent of the Twitch link', async ({ page }) => {
      await page.goto('media-links.html')

      expect(await page.locator('.vp-twitch-iframe').getAttribute('src')).toBe(
        'https://player.twitch.tv/?channel=monstercat&autoplay=false&parent=ecosystem-e2e-test.com',
      )
    })
  })
})
