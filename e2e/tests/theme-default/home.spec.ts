import { expect, test } from '@playwright/test'
import { BASE } from '../../utils/env.js'

test.describe('homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('')
  })

  test('has hero info', async ({ page }) => {
    const title = 'VuePress Ecosystem E2E'
    const description = 'VuePress Ecosystem E2E Test Site'
    const heroImage = 'https://v2.vuepress.vuejs.org/images/hero.png'

    const img = await page.locator('.hero img')

    expect(img).toHaveAttribute('src', heroImage)
    expect(img).toHaveAttribute('alt', title)

    expect(await page.locator('#main-title')).toHaveText(title)
    expect(await page.locator('.hero .description')).toHaveText(description)

    const actionButtons = await page.locator('.hero .action-button')

    expect(await actionButtons.count()).toBe(2)

    for (const [index, actionButton] of (await actionButtons.all()).entries()) {
      expect(actionButton).toHaveAttribute(
        'href',
        `${BASE}action${index + 1}.html`,
      )
      expect(actionButton).toHaveAttribute('aria-label', `Action${index + 1}`)
      expect(actionButton).toHaveText(`Action${index + 1}`)
    }
  })

  test('has feature', async ({ page }) => {
    const features = await page.locator('.feature')

    expect(await features.count()).toBe(3)

    for (const [index, featureTitle] of (
      await page.locator('.feature h2').all()
    ).entries()) {
      expect(featureTitle).toHaveText(`Feature${index + 1}`)
    }

    for (const [index, featureDetail] of (
      await page.locator('.feature p').all()
    ).entries()) {
      expect(featureDetail).toHaveText(`Detail${index + 1}`)
    }
  })

  test('has content', async ({ page }) => {
    expect(await page.locator('.theme-default-content')).toHaveText(
      'HomePage Content',
    )
  })

  test('has footer', async ({ page }) => {
    expect(await page.locator('.footer')).toHaveText('Footer Content')
  })
})
