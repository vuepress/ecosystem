import { expect, test } from '@playwright/test'

test.describe('plugin-sass-palette', () => {
  test('palette value', async ({ page }) => {
    await page.goto('sass-palette/')

    await expect(page.locator('#length')).toHaveText('1rem')
    await expect(page.locator('#complex')).toHaveText('1s ease')
  })

  test('default palette', async ({ page }) => {
    await page.goto('sass-palette/')

    await expect(page.locator('#snake-color')).toHaveText(/#f00|red/)
    await expect(page.locator('#pascal-color')).toHaveText(/#f00|red/)
    await expect(page.locator('#kebab-color')).toHaveText(/#f00|red/)
    await expect(page.locator('#snake_color')).toBeEmpty()
    await expect(page.locator('#PascalColor')).toBeEmpty()
  })

  test('user palette override', async ({ page }) => {
    await page.goto('sass-palette/')

    await expect(page.locator('#color')).toHaveText('#00f')
  })

  test('user palette user', async ({ page }) => {
    await page.goto('sass-palette/')

    await expect(page.locator('#color-new')).toHaveText('#00f')
  })

  test('generator', async ({ page }) => {
    await page.goto('sass-palette/')

    await expect(page.locator('#color-default')).toHaveText(/#f00|red/)
    await expect(page.locator('#color-user')).toHaveText('#00f')
    await expect(page.locator('#color-generator')).toHaveText('#00f')
    await expect(page.locator('#config-colors')).toHaveText(
      /(?:#f00|red), #0f0, #00f/,
    )
    await expect(page.locator('#color-count')).toHaveText('3')
    await expect(page.locator('#count')).toBeEmpty()
    await expect(page.locator('#_count')).toBeEmpty()
  })
})
