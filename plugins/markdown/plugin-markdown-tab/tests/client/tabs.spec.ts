// @vitest-environment happy-dom

import { flushPromises } from '@vue/test-utils'
import { mountVuePress, renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'

import { VPCodeTabs } from '../../src/client/components/VPCodeTabs.js'
import { VPTabs } from '../../src/client/components/VPTabs.js'

const tabData = [{ id: 'js' }, { id: 'ts' }]

/** Slots of a two-tab group, the index is part of the slot name */
const tabsSlots = {
  title0: (): VNode => h('span', 'JavaScript'),
  title1: (): VNode => h('span', 'TypeScript'),
  tab0: (): VNode => h('div', { class: 'panel-js' }, 'JavaScript content'),
  tab1: (): VNode => h('div', { class: 'panel-ts' }, 'TypeScript content'),
}

const TabsHost = defineComponent({
  name: 'TabsHost',
  setup: (): (() => VNode) => () => h(VPTabs, { data: tabData }, tabsSlots),
})

const ActiveTabsHost = defineComponent({
  name: 'ActiveTabsHost',
  setup: (): (() => VNode) => () =>
    h(VPTabs, { active: 1, data: tabData }, tabsSlots),
})

const EmptyTabsHost = defineComponent({
  name: 'EmptyTabsHost',
  setup: (): (() => VNode) => () => h(VPTabs, { data: [] }, tabsSlots),
})

describe('regular tabs', () => {
  it('should render one tab button per tab and mark the active one', async () => {
    const wrapper = await mountVuePress({ rootComponent: TabsHost })
    const navs = wrapper.findAll('.vp-tab-nav')

    expect(navs).toHaveLength(2)
    expect(navs[0].classes()).toContain('active')
    expect(navs[0].attributes('role')).toBe('tab')
    expect(navs[0].attributes('aria-selected')).toBe('true')
    expect(navs[1].attributes('aria-selected')).toBe('false')
  })

  it('should only activate the panel of the active tab', async () => {
    const wrapper = await mountVuePress({ rootComponent: TabsHost })
    const panels = wrapper.findAll('.vp-tab')

    expect(panels).toHaveLength(2)
    expect(panels[0].classes()).toContain('active')
    expect(panels[1].classes()).not.toContain('active')
    // every panel keeps its own content
    expect(panels[0].find('.panel-js').exists()).toBe(true)
    expect(panels[1].find('.panel-ts').exists()).toBe(true)
  })

  it('should use the active prop as the initial tab', async () => {
    const wrapper = await mountVuePress({ rootComponent: ActiveTabsHost })

    expect(wrapper.findAll('.vp-tab-nav')[1].classes()).toContain('active')
    expect(wrapper.findAll('.vp-tab-nav')[0].classes()).not.toContain('active')
    expect(wrapper.findAll('.vp-tab')[1].classes()).toContain('active')
  })

  it('should switch the active tab when a tab button is clicked', async () => {
    const wrapper = await mountVuePress({ rootComponent: TabsHost })

    await wrapper.findAll('.vp-tab-nav')[1].trigger('click')

    expect(wrapper.findAll('.vp-tab-nav')[1].classes()).toContain('active')
    expect(wrapper.findAll('.vp-tab-nav')[0].classes()).not.toContain('active')
    expect(wrapper.findAll('.vp-tab')[1].classes()).toContain('active')
    expect(wrapper.findAll('.vp-tab')[0].classes()).not.toContain('active')
  })

  it('should move the active tab with the arrow keys', async () => {
    const wrapper = await mountVuePress({ rootComponent: TabsHost })

    await wrapper.findAll('.vp-tab-nav')[0].trigger('keydown', {
      key: 'ArrowRight',
    })

    expect(wrapper.findAll('.vp-tab-nav')[1].classes()).toContain('active')

    await wrapper.findAll('.vp-tab-nav')[1].trigger('keydown', {
      key: 'ArrowLeft',
    })

    expect(wrapper.findAll('.vp-tab-nav')[0].classes()).toContain('active')
  })

  it('should render nothing when there is no tab', async () => {
    const html = await renderVuePress({ rootComponent: EmptyTabsHost })

    expect(html).not.toContain('vp-tabs')
  })
})

const CodeTabsHost = defineComponent({
  name: 'CodeTabsHost',
  setup: (): (() => VNode) => () =>
    h('div', [
      h(VPCodeTabs, { data: tabData, tabId: 'code-tabs-sync' }, tabsSlots),
      h(VPCodeTabs, { data: tabData, tabId: 'code-tabs-sync' }, tabsSlots),
    ]),
})

describe('code tabs', () => {
  it('should sync the selected tab across the instances of the same group', async () => {
    const wrapper = await mountVuePress({ rootComponent: CodeTabsHost })
    const groups = wrapper.findAll('.vp-code-tabs')

    expect(groups).toHaveLength(2)
    expect(groups[0].findAll('.vp-code-tab-nav')[0].classes()).toContain(
      'active',
    )
    expect(groups[1].findAll('.vp-code-tab-nav')[0].classes()).toContain(
      'active',
    )

    await groups[0].findAll('.vp-code-tab-nav')[1].trigger('click')
    await flushPromises()

    expect(groups[1].findAll('.vp-code-tab-nav')[1].classes()).toContain(
      'active',
    )
    expect(groups[1].findAll('.vp-code-tab-nav')[0].classes()).not.toContain(
      'active',
    )
  })

  it('should restore the stored tab of the group', async () => {
    const Host = defineComponent({
      name: 'RestoreCodeTabs',
      setup: (): (() => VNode) => () =>
        h(VPCodeTabs, { data: tabData, tabId: 'code-tabs-restore' }, tabsSlots),
    })

    const first = await mountVuePress({ rootComponent: Host })

    await first.findAll('.vp-code-tab-nav')[1].trigger('click')
    await flushPromises()

    // a new instance of the same group picks up the stored tab
    const second = await mountVuePress({ rootComponent: Host })

    expect(second.findAll('.vp-code-tab-nav')[1].classes()).toContain('active')
  })
})
