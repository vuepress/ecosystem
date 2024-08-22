import { expect, test } from '@playwright/test'

test.describe('hint', () => {
  test('render default containers', async ({ page }) => {
    await page.goto('hint/')

    await Promise.all(
      ['tip', 'warning', 'caution', 'info', 'note', 'important', 'details'].map(
        async (item) => {
          await expect(page.locator(`.hint-container.${item}`)).toHaveCount(1)

          if (item === 'details')
            await expect(
              page.locator(`.hint-container.${item} summary`),
            ).not.toBeEmpty()
          else
            await expect(
              page.locator(`.hint-container.${item} .hint-container-title`),
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

          if (item === 'details')
            await expect(
              page.locator(`.hint-container.${item} summary`),
            ).toContainText('title')
          else
            await expect(
              page.locator(`.hint-container.${item} .hint-container-title`),
            ).toContainText('title')
        },
      ),
    )
  })
})
