import { expect, test } from '@playwright/test'

test.describe('plugin-media players', () => {
  test.beforeEach(async ({ page }) => {
    // The players load third-party content, which only slows the tests down
    await page.route(/^https?:\/\/(?!127\.0\.0\.1|localhost)/u, (route) =>
      route.abort(),
    )
  })

  test('renders the ArtPlayer components', async ({ page }) => {
    await page.goto('media-players.html')

    await expect(page.locator('.vp-artplayer')).toHaveCount(4)
    await expect(page.locator('.vp-video-player')).toHaveCount(2)
  })

  test('turns off a default Artplayer option through a no- attribute', async ({
    page,
  }) => {
    await page.goto('media-players.html')

    const players = page.locator('.vp-artplayer')

    // Artplayer shows the settings button and the backdrop by default
    await expect(players.nth(0).locator('.art-control-setting')).toHaveCount(1)
    await expect(players.nth(0).locator('.art-backdrop')).toHaveCount(1)

    await expect(players.nth(1).locator('.art-control-setting')).toHaveCount(0)
    await expect(players.nth(3).locator('.art-backdrop')).toHaveCount(0)

    // The link syntax renders the same component, so `no-` works there as well
    await expect(players.nth(2).locator('.art-control-setting')).toHaveCount(0)
  })

  test('labels the video of ArtPlayer', async ({ page }) => {
    await page.goto('media-players.html')

    await expect(page.locator('.vp-artplayer video').first()).toHaveAttribute(
      'aria-label',
      'An ArtPlayer video',
    )
  })

  test('passes playsinline only when inline playback is wanted', async ({
    page,
  }) => {
    await page.goto('media-players.html')

    const videos = page.locator('.vp-video-player video')

    // `playsinline` is read by its presence, so the prop removes it
    await expect(videos.nth(0)).toHaveAttribute('playsinline', 'true')
    await expect(videos.nth(1)).not.toHaveAttribute('playsinline')
  })
})
