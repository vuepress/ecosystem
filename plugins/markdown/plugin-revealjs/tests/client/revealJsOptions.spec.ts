// @vitest-environment happy-dom
import { flushPromises } from '@vue/test-utils'
import { mountVuePress, renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { VNode } from 'vue'
import { defineComponent, h, ref } from 'vue'

import type { RevealJsOptions } from '../../src/client/helpers/revealJs.js'
import {
  defineRevealJsConfig,
  injectRevealJsConfig,
  useRevealJsConfig,
} from '../../src/client/helpers/revealJs.js'

/**
 * Client config of the plugin
 *
 * It provides the reveal.js options ref, which `RevealJs` reads through
 * `useRevealJsConfig()`.
 */
const clientConfig = {
  enhance: ({
    app,
  }: {
    app: Parameters<typeof injectRevealJsConfig>[0]
  }): void => injectRevealJsConfig(app),
}

const Probe = defineComponent({
  name: 'RevealOptionsProbe',
  setup() {
    const options = useRevealJsConfig()

    const stringify = (value: unknown): string =>
      JSON.stringify(value) ?? 'undefined'

    return (): VNode =>
      h('div', { class: 'probe' }, [
        h('span', { class: 'hash' }, stringify(options.value.hash)),
        h('span', { class: 'keyboard' }, stringify(options.value.keyboard)),
      ])
  },
})

describe('reveal.js options', () => {
  it('should provide the options defined by a plain object', async () => {
    defineRevealJsConfig({ hash: true, keyboard: false })

    const html = await renderVuePress({
      clientConfigs: [clientConfig],
      rootComponent: Probe,
    })

    expect(html).toContain('<span class="hash">true</span>')
    expect(html).toContain('<span class="keyboard">false</span>')
  })

  it('should replace the previous options', async () => {
    defineRevealJsConfig({ hash: true })
    defineRevealJsConfig({ keyboard: true })

    const html = await renderVuePress({
      clientConfigs: [clientConfig],
      rootComponent: Probe,
    })

    expect(html).toContain('<span class="hash">undefined</span>')
    expect(html).toContain('<span class="keyboard">true</span>')
  })

  it('should react to a getter source', async () => {
    const source = ref<RevealJsOptions>({ hash: false })

    defineRevealJsConfig((): RevealJsOptions => source.value)

    const wrapper = await mountVuePress({
      clientConfigs: [clientConfig],
      rootComponent: Probe,
    })

    expect(wrapper.find('.hash').text()).toBe('false')

    source.value = { hash: true }

    await flushPromises()

    expect(wrapper.find('.hash').text()).toBe('true')
  })

  it('should react to a ref source', async () => {
    const source = ref<RevealJsOptions>({ hash: false })

    defineRevealJsConfig(source)

    const wrapper = await mountVuePress({
      clientConfigs: [clientConfig],
      rootComponent: Probe,
    })

    expect(wrapper.find('.hash').text()).toBe('false')

    source.value = { hash: true }

    await flushPromises()

    expect(wrapper.find('.hash').text()).toBe('true')
  })

  it('should stop the previous reactive source when reconfigured', async () => {
    const source = ref<RevealJsOptions>({ hash: false })

    defineRevealJsConfig((): RevealJsOptions => source.value)
    defineRevealJsConfig({ keyboard: true })

    const wrapper = await mountVuePress({
      clientConfigs: [clientConfig],
      rootComponent: Probe,
    })

    source.value = { hash: true }

    await flushPromises()

    // the later plain object wins, the previous getter must not write again
    expect(wrapper.find('.hash').text()).toBe('undefined')
    expect(wrapper.find('.keyboard').text()).toBe('true')
  })
})
