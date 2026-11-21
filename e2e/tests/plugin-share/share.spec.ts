import { expect, test } from '@playwright/test'

test.describe('plugin-share', () => {
  test('should render share buttons', async ({ page }) => {
    await page.goto('share/')

    const groups = page.locator('.vp-share-buttons')

    await expect(groups).toHaveCount(5)
    await expect(groups.nth(0).locator('.vp-share-button')).toHaveCount(6)
    await expect(
      groups.nth(0).locator('.vp-share-button').nth(0),
    ).toHaveAttribute('aria-label', 'twitter')
    await expect(groups.nth(1).locator('.vp-share-button')).toHaveCount(2)
    await expect(groups.nth(2).locator('.vp-share-icon.colorful')).toHaveCount(
      6,
    )
    await expect(groups.nth(3)).toHaveClass(/vp-share-buttons-inline/u)
    await expect(groups.nth(4).locator('.vp-share-button')).toHaveCount(1)
  })

  test('should show a QR code popup', async ({ page }) => {
    await page.goto('share/')

    const qrcodeButton = page
      .locator('.vp-share-buttons')
      .nth(4)
      .locator('.vp-share-button')

    await qrcodeButton.click()

    const image = page.locator('.vp-share-popup-content img.vp-share-qrcode')

    await expect(image).toHaveAttribute('src', /^data:image\/png;base64,/u)

    await page.keyboard.press('Escape')
    await expect(page.locator('.vp-share-popup-wrapper')).toHaveCount(0)
  })
})
