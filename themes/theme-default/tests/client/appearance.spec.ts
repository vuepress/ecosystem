import { renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'

import type { AppearanceOptions } from '../../src/shared/types.js'
import { createClientConfigs } from './utils.js'

const renderWithAppearance = async (
  appearance?: AppearanceOptions,
): Promise<string> =>
  renderVuePress({
    clientConfigs: await createClientConfigs(),
    content: '<h1 id="hello">Hello</h1>',
    page: { path: '/guide/', title: 'Guide' },
    site: { title: 'My Site' },
    themeData: appearance === undefined ? {} : { appearance },
  })

describe('theme appearance switch', () => {
  it('should render the appearance switch by default', async () => {
    await expect(renderWithAppearance()).resolves.toContain(
      'vp-switch-appearance',
    )
  })

  it('should render the appearance switch when the appearance is auto', async () => {
    await expect(renderWithAppearance(true)).resolves.toContain(
      'vp-switch-appearance',
    )
  })

  it('should hide the appearance switch when the appearance is fixed', async () => {
    const htmls = await Promise.all(
      ([false, 'force-dark', 'force-auto'] as const).map((appearance) =>
        renderWithAppearance(appearance),
      ),
    )

    expect(htmls.join('')).not.toContain('vp-switch-appearance')
  })
})
