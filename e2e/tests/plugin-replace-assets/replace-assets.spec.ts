import { expect, test } from '@playwright/test'

test.describe('plugin-replace-assets', () => {
  test('replace assets', async ({ page }) => {
    await page.goto('replace-assets/')

    const PREFIX = 'https://cnd.example.com/images/replace-assets/foo.'

    const markdownImgList = page.locator('.markdown-syntax img')

    await expect(markdownImgList.nth(0)).toHaveAttribute('src', `${PREFIX}png`)
    await expect(markdownImgList.nth(1)).toHaveAttribute('src', `${PREFIX}jpg`)
    await expect(markdownImgList.nth(2)).toHaveAttribute('src', `${PREFIX}gif`)

    const elementImgList = page.locator('.element-syntax img')

    await expect(elementImgList.nth(0)).toHaveAttribute('src', `${PREFIX}png`)
    await expect(elementImgList.nth(1)).toHaveAttribute('src', `${PREFIX}jpg`)
    await expect(elementImgList.nth(2)).toHaveAttribute('src', `${PREFIX}gif`)

    await expect(page.locator('.append-img img').first()).toHaveAttribute(
      'src',
      `${PREFIX}png`,
    )
  })
})
