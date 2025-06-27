import { expect, test } from '@playwright/test'
import { writeSourceMarkdown } from '../../utils/source'

const restoreMarkdownContent = async (): Promise<void> => {
  await writeSourceMarkdown(
    'auto-frontmatter/README.md',
    '# auto-frontmatter\n\n<p class="frontmatter-test">{{ $frontmatter.test }}</p>\n',
  )
}

test.afterAll(async () => {
  await restoreMarkdownContent()
})

test('should auto frontmatter', async ({ page }) => {
  await page.goto('auto-frontmatter/')

  await expect(page.locator('.frontmatter-test')).toHaveText('test')
})

test('should not auto frontmatter', async ({ page }) => {
  await page.goto('auto-frontmatter/no-generate.html')

  await expect(page.locator('.frontmatter-test')).not.toBeVisible()
})
