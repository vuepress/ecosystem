import { expect, test } from '@playwright/test'

test('scrolls to hash after cross-page navigation', async ({ page }) => {
  await page.goto('navbar/foo.html')
  await page.getByRole('link', { name: 'Cross page hash' }).click()

  await expect(page).toHaveURL(/#code-block$/u)
  await expect(page.locator('#code-block')).toBeInViewport({ ratio: 0.5 })
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0)

  await page.reload()

  await expect(page.locator('#code-block')).toBeInViewport({ ratio: 0.5 })
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0)
})
