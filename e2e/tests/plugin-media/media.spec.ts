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
      'https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&t=0&autoplay=0',
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
})
