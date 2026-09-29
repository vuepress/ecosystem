// @vitest-environment happy-dom

import { mountVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'

import hintClientConfig from '../../src/client/config.js'

const content = `
  <details><summary>First</summary><p>first content</p></details>
  <details><summary>Second</summary><p>second content</p></details>
`

describe('hint client config', () => {
  it('should render the details as closed by default', async () => {
    const wrapper = await mountVuePress({
      clientConfigs: [hintClientConfig],
      content,
    })

    for (const details of wrapper.findAll('details'))
      expect((details.element as HTMLDetailsElement).open).toBe(false)
  })

  it('should open every details element on beforeprint', async () => {
    const wrapper = await mountVuePress({
      attachTo: document.body,
      clientConfigs: [hintClientConfig],
      content,
    })

    window.dispatchEvent(new Event('beforeprint'))

    for (const details of wrapper.findAll('details'))
      expect((details.element as HTMLDetailsElement).open).toBe(true)
  })
})
