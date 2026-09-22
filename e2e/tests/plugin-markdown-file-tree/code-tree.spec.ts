import { expect, test } from '@playwright/test'

test.describe('plugin-markdown-file-tree: code tree', () => {
  test('render code tree', async ({ page }) => {
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').first()

    await expect(codeTree.locator('.vp-file-tree-title')).toHaveText('Vue App')
    await expect(codeTree.locator('.vp-file-tree-name')).toHaveText([
      'src',
      'components',
      'HelloWorld.vue',
      'App.vue',
      'main.ts',
      'package.json',
    ])

    // The entry file is opened by default
    await expect(
      codeTree.locator('.vp-file-tree-info.active .vp-file-tree-name'),
    ).toHaveText('main.ts')

    // Only the code block of the active file is displayed
    await expect(
      codeTree.locator('.vp-code-tree-code > .code-block-with-title'),
    ).toHaveCount(4)
    await expect(
      codeTree.locator('.vp-code-tree-code > .code-block-with-title.active'),
    ).toHaveCount(1)
    await expect(
      codeTree.locator(
        '.vp-code-tree-code > .code-block-with-title.active .code-block-title-bar',
      ),
    ).toHaveText('src/main.ts')
  })

  test('switch active file', async ({ page }) => {
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').first()

    await codeTree
      .locator('.vp-file-tree-name', { hasText: /^HelloWorld\.vue$/u })
      .click()

    await expect(
      codeTree.locator('.vp-file-tree-info.active .vp-file-tree-name'),
    ).toHaveText('HelloWorld.vue')
    await expect(
      codeTree.locator(
        '.vp-code-tree-code > .code-block-with-title.active .code-block-title-bar',
      ),
    ).toHaveText('src/components/HelloWorld.vue')
  })

  test('toggle folder', async ({ page }) => {
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').first()
    const group = codeTree.locator('.vp-file-tree-group').first()

    await expect(group).toHaveCSS('display', 'block')

    await codeTree.locator('.vp-file-tree-info.folder').first().click()

    await expect(group).toHaveCSS('display', 'none')

    await codeTree.locator('.vp-file-tree-info.folder').first().click()

    await expect(group).toHaveCSS('display', 'block')
  })

  test('render node icon', async ({ page }) => {
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').first()

    // Every node has an icon, and the fallback icon matches the node type,
    // since `@vuepress/plugin-icon` is not enabled in the e2e site.
    await expect(
      codeTree.locator(
        '.vp-file-tree-info.folder > .vp-file-tree-icon-fallback.folder',
      ),
    ).toHaveCount(2)
    await expect(
      codeTree.locator(
        '.vp-file-tree-info.file > .vp-file-tree-icon-fallback.file',
      ),
    ).toHaveCount(4)
    await expect(
      codeTree.locator('.vp-file-tree-info .vp-file-tree-icon-fallback'),
    ).toHaveCount(6)
  })

  test('open the first code block by default', async ({ page }) => {
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').nth(1)

    await expect(
      codeTree.locator('.vp-file-tree-info.active .vp-file-tree-name'),
    ).toHaveText('index.ts')
    await expect(
      codeTree.locator(
        '.vp-code-tree-code > .code-block-with-title.active .code-block-title-bar',
      ),
    ).toHaveText('index.ts')
  })

  test('ignore code block without title', async ({ page }) => {
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').nth(2)

    await expect(codeTree.locator('.vp-file-tree-name')).toHaveText([
      'untitled.ts',
    ])
    await expect(
      codeTree.locator('.vp-code-tree-code > .code-block-with-title'),
    ).toHaveCount(1)
    await expect(
      codeTree.locator('.vp-code-tree-code > .code-block-with-title.active'),
    ).toHaveCount(1)
    // The code block without a title is not displayed
    await expect(
      codeTree.locator('.vp-code-tree-code > div[class*="language-"]'),
    ).toBeHidden()
  })

  test('embed a directory', async ({ page }) => {
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').nth(3)

    await expect(codeTree.locator('.vp-file-tree-title')).toHaveText('Snippet')
    await expect(codeTree.locator('.vp-file-tree-name')).toHaveText([
      'a.ts',
      'b.ts',
      'package.json',
    ])

    // The entry file declared by the attribute is opened by default
    await expect(
      codeTree.locator('.vp-file-tree-info.active .vp-file-tree-name'),
    ).toHaveText('b.ts')
    await expect(
      codeTree.locator(
        '.vp-code-tree-code > .code-block-with-title.active .code-block-title-bar',
      ),
    ).toHaveText('b.ts')

    // The icon of every node is resolved from its file name
    await expect(
      codeTree.locator('.vp-file-tree-icon-fallback.file'),
    ).toHaveCount(3)
  })

  test('collapse the file tree on a small screen', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 800 })
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').first()
    const fileTree = codeTree.locator('.vp-file-tree')
    const toggle = codeTree.locator('.vp-code-tree-toggle')

    // The file tree is collapsed, and it is toggled by the button
    await expect(fileTree).toBeHidden()
    await expect(toggle).toBeVisible()

    await toggle.click()
    await expect(fileTree).toBeVisible()

    // Selecting a file collapses the file tree again
    await fileTree
      .locator('.vp-file-tree-name', { hasText: /^package\.json$/u })
      .click()
    await expect(fileTree).toBeHidden()
  })

  test('float the toggle over the title bar on a small screen', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 500, height: 800 })
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').first()
    const toggle = codeTree.locator('.vp-code-tree-toggle')
    const titleBar = codeTree.locator(
      '.code-block-with-title.active .code-block-title-bar',
    )

    // The toggle does not take a column of its own
    await expect(codeTree.locator('.vp-code-tree-actions')).toHaveCount(0)

    // It floats over the left end of the code block title bar
    const [treeBox, toggleBox, barBox] = await Promise.all([
      codeTree.boundingBox(),
      toggle.boundingBox(),
      titleBar.boundingBox(),
    ])

    expect(toggleBox!.x - treeBox!.x).toBeLessThan(2)
    expect(Math.abs(toggleBox!.y - barBox!.y)).toBeLessThan(2)

    // The button is reset, otherwise the browser draws its own border and
    // background around the icon
    await expect(toggle).toHaveCSS('border-width', '0px')
    await expect(toggle).toHaveCSS('border-style', 'none')
    await expect(toggle).toHaveCSS('appearance', 'none')
    await expect(toggle).toHaveCSS('padding', '0px')
    await expect(toggle).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')

    // The title bars leave room for the toggle
    await expect(titleBar).toHaveCSS('padding-inline-start', '52px')
  })

  test('switch the toggle icon with the file tree state', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 800 })
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').first()
    const icon = codeTree.locator('.vp-code-tree-toggle-icon')

    // The collapsed state and the expanded state use different icons
    await expect(icon).toHaveClass(/expand/u)
    const collapsedMask = await icon.evaluate(
      (el) => getComputedStyle(el).maskImage,
    )

    await codeTree.locator('.vp-code-tree-toggle').click()
    await expect(icon).toHaveClass(/collapse/u)

    const expandedMask = await icon.evaluate(
      (el) => getComputedStyle(el).maskImage,
    )

    expect(collapsedMask).not.toBe(expandedMask)
  })

  test('hide the toggle on a wide screen', async ({ page }) => {
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').first()

    // The file tree is always visible, so the toggle is not rendered
    await expect(codeTree.locator('.vp-file-tree')).toBeVisible()
    await expect(codeTree.locator('.vp-code-tree-toggle')).toBeHidden()
    await expect(
      codeTree.locator('.code-block-with-title.active .code-block-title-bar'),
    ).toHaveCSS('padding-inline-start', '16px')
  })
})
