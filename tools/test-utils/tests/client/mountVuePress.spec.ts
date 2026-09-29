// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'
import type { VNode } from 'vue'
import { defineComponent, h, onMounted, ref } from 'vue'
import { usePageData, useSiteLocaleData } from 'vuepress/client'

import { mountVuePress } from '../../src/client/mountVuePress.js'

const Counter = defineComponent({
  name: 'Counter',
  setup() {
    const count = ref(0)

    return (): VNode =>
      h(
        'button',
        {
          class: 'counter',
          onClick: () => {
            count.value += 1
          },
        },
        String(count.value),
      )
  },
})

const Probe = defineComponent({
  name: 'Probe',
  setup() {
    const page = usePageData()
    const siteLocale = useSiteLocaleData()

    return (): VNode =>
      h('div', { class: 'probe' }, [
        h('span', { class: 'page' }, page.value.title),
        h('span', { class: 'site' }, siteLocale.value.title),
      ])
  },
})

describe(mountVuePress, () => {
  it('should mount the component and support interaction', async () => {
    const wrapper = await mountVuePress({ content: Counter })

    expect(wrapper.find('.counter').text()).toBe('0')

    await wrapper.find('.counter').trigger('click')

    expect(wrapper.find('.counter').text()).toBe('1')
  })

  it('should provide the client data', async () => {
    const wrapper = await mountVuePress({
      content: Probe,
      page: { path: '/', title: 'Home' },
      site: { title: 'My Site' },
    })

    expect(wrapper.find('.page').text()).toBe('Home')
    expect(wrapper.find('.site').text()).toBe('My Site')
  })

  it('should run the lifecycle hooks inside the client data context', async () => {
    let mountedTitle = ''

    const HookProbe = defineComponent({
      name: 'HookProbe',
      setup() {
        const page = usePageData()

        onMounted(() => {
          mountedTitle = page.value.title
        })

        return (): VNode => h('div')
      },
    })

    await mountVuePress({
      content: HookProbe,
      page: { path: '/', title: 'Mounted' },
    })

    expect(mountedTitle).toBe('Mounted')
  })

  it('should apply the root components of the client configs', async () => {
    const Floating = defineComponent({
      name: 'Floating',
      setup: (): (() => VNode) => () =>
        h('div', { class: 'floating' }, 'Floating'),
    })

    const wrapper = await mountVuePress({
      clientConfigs: [{ rootComponents: [Floating] }],
      content: Counter,
    })

    expect(wrapper.find('.floating').text()).toBe('Floating')
    expect(wrapper.find('.counter').text()).toBe('0')
  })

  it('should attach the app to the given element', async () => {
    const container = document.createElement('div')

    document.body.append(container)

    const wrapper = await mountVuePress({
      attachTo: container,
      content: Counter,
    })

    expect(container.querySelector('.counter')).not.toBeNull()

    wrapper.unmount()
    container.remove()
  })
})
