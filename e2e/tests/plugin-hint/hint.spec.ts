import { expect, test } from '@playwright/test'

test.describe('hint', () => {
  test('render default containers', async ({ page }) => {
    await page.goto('hint/')

    await Promise.all(
      ['tip', 'warning', 'caution', 'info', 'note', 'important', 'details'].map(
        async (item) => {
          await expect(page.locator(`.hint-container.${item}`)).toHaveCount(1)

          await expect(
            page.locator(
              `.hint-container.${item} ${item === 'details' ? 'summary' : ' .hint-container-title'}`,
            ),
          ).not.toBeEmpty()
        },
      ),
    )
  })

  test('render custom title containers', async ({ page }) => {
    await page.goto('hint/custom.html')

    await Promise.all(
      ['tip', 'warning', 'caution', 'info', 'note', 'important', 'details'].map(
        async (item) => {
          await expect(page.locator(`.hint-container.${item}`)).toHaveCount(1)

          await expect(
            page.locator(
              `.hint-container.${item} ${item === 'details' ? 'summary' : ' .hint-container-title'}`,
            ),
          ).toContainText('title')
        },
      ),
    )
  })
})
