// @vitest-environment happy-dom
import { flushPromises } from '@vue/test-utils'
import { createTestClient, mountVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'
import type { Component, Ref, VNode } from 'vue'
import { defineComponent, h } from 'vue'

import { SearchBox } from '../../src/client/components/SearchBox.js'
import type { SearchPluginLocaleConfig } from '../../src/client/types.js'
import type { SearchIndex } from '../../src/shared/index.js'

vi.mock(
  import('../../src/client/composables/useSearchIndex.js'),
  async (): Promise<{ useSearchIndex: () => Ref<SearchIndex> }> => {
    const { ref } = await import('vue')

    return {
      useSearchIndex: (): Ref<SearchIndex> =>
        ref([
          {
            extraFields: [],
            headers: [],
            path: '/',
            pathLocale: '/',
            title: 'Home',
          },
          {
            extraFields: [],
            headers: [
              {
                children: [],
                level: 2,
                link: '#getting-started',
                slug: 'getting-started',
                title: 'Getting Started',
              },
            ],
            path: '/guide/',
            pathLocale: '/',
            title: 'Guide',
          },
          {
            extraFields: [],
            headers: [
              {
                children: [],
                level: 2,
                link: '#getting-started',
                slug: 'getting-started',
                title: 'Getting Started',
              },
            ],
            path: '/about/',
            pathLocale: '/',
            title: 'About',
          },
        ]),
    }
  },
)

const locales: SearchPluginLocaleConfig = { '/': { placeholder: 'Search' } }

const site = { locales: { '/': { lang: 'en-US' } } }

const createSearchBox = (props: {
  hotKeys?: string[]
  maxSuggestions?: number
}): Component =>
  defineComponent({
    name: 'TestSearchBox',
    setup: (): (() => VNode) => () => h(SearchBox, { locales, ...props }),
  })

const mountSearchBox = async (
  props: { hotKeys?: string[]; maxSuggestions?: number } = {},
): Promise<Awaited<ReturnType<typeof mountVuePress>>> => {
  const container = document.createElement('div')

  document.body.append(container)

  return mountVuePress({
    attachTo: container,
    page: { path: '/' },
    rootComponent: createSearchBox(props),
    site,
  })
}

describe('search box', () => {
  it('should render the input with the localized placeholder', async () => {
    const wrapper = await mountSearchBox()

    expect(wrapper.find('input[type="search"]').attributes('placeholder')).toBe(
      'Search',
    )
  })

  it('should show the matching suggestions while typing', async () => {
    const wrapper = await mountSearchBox()
    const input = wrapper.find('input')

    await input.trigger('focus')
    await input.setValue('guide')
    await flushPromises()

    const suggestions = wrapper.findAll('.suggestions .suggestion')

    expect(suggestions).toHaveLength(1)
    expect(suggestions[0].text()).toContain('Guide')
    expect(suggestions[0].find('a').attributes('href')).toBe('/guide/')
  })

  it('should show the header of a matched section', async () => {
    const wrapper = await mountSearchBox()
    const input = wrapper.find('input')

    await input.trigger('focus')
    await input.setValue('getting')
    await flushPromises()

    expect(wrapper.find('.suggestion .page-header').text()).toBe(
      '> Getting Started',
    )
    expect(wrapper.find('.suggestion a').attributes('href')).toBe(
      '/guide/#getting-started',
    )
  })

  it('should not show more suggestions than the maximum', async () => {
    const wrapper = await mountSearchBox({ maxSuggestions: 1 })
    const input = wrapper.find('input')

    await input.trigger('focus')
    // `g` matches both the page title and one of its headers
    await input.setValue('g')
    await flushPromises()

    expect(wrapper.findAll('.suggestion')).toHaveLength(1)
  })

  it('should hide the suggestions when the query does not match', async () => {
    const wrapper = await mountSearchBox()
    const input = wrapper.find('input')

    await input.trigger('focus')
    await input.setValue('zzz')
    await flushPromises()

    expect(wrapper.find('.suggestions').exists()).toBe(false)
  })

  it('should hide the suggestions when the input loses focus', async () => {
    const wrapper = await mountSearchBox()
    const input = wrapper.find('input')

    await input.trigger('focus')
    await input.setValue('guide')
    await flushPromises()
    expect(wrapper.find('.suggestions').exists()).toBe(true)

    await input.trigger('blur')
    expect(wrapper.find('.suggestions').exists()).toBe(false)
  })

  it('should move the focus between the suggestions with the arrow keys', async () => {
    const wrapper = await mountSearchBox()
    const input = wrapper.find('input')

    await input.trigger('focus')
    await input.setValue('g')
    await flushPromises()

    const getFocused = (): string =>
      wrapper
        .findAll('.suggestion')
        .findIndex((item) => item.classes().includes('focus'))
        .toString()

    expect(getFocused()).toBe('0')

    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(getFocused()).toBe('1')

    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(getFocused()).toBe('0')

    // wrapping around
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(getFocused()).toBe('1')
  })

  it('should navigate to the focused suggestion when pressing enter', async () => {
    const client = await createTestClient({
      page: { path: '/' },
      rootComponent: createSearchBox({}),
      routes: { '/guide/': {} },
      site,
    })
    const wrapper = await client.mount()
    const input = wrapper.find('input')

    await input.trigger('focus')
    await input.setValue('guide')
    await flushPromises()

    await input.trigger('keydown', { key: 'Enter' })
    await flushPromises()

    expect(client.router.currentRoute.value.path).toBe('/guide/')
    // the query is reset after the navigation
    expect(wrapper.find('.suggestions').exists()).toBe(false)
  })

  it('should navigate to the first suggestion after the list shrinks', async () => {
    const client = await createTestClient({
      page: { path: '/' },
      rootComponent: createSearchBox({}),
      routes: { '/guide/': {} },
      site,
    })
    const wrapper = await client.mount()
    const input = wrapper.find('input')

    await input.trigger('focus')
    // `g` matches several suggestions, so the focus can move away from the first
    await input.setValue('g')
    await flushPromises()
    await input.trigger('keydown', { key: 'ArrowDown' })

    // `guide` only matches a single suggestion, the stale focus index must reset
    await input.setValue('guide')
    await flushPromises()
    expect(wrapper.findAll('.suggestion')).toHaveLength(1)

    await input.trigger('keydown', { key: 'Enter' })
    await flushPromises()

    expect(client.router.currentRoute.value.path).toBe('/guide/')
  })

  it('should focus the input when a hotkey is pressed', async () => {
    const wrapper = await mountSearchBox({ hotKeys: ['s'] })
    const input = wrapper.find('input')

    expect(document.activeElement).not.toBe(input.element)

    document.body.dispatchEvent(
      new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 's',
      }),
    )
    await flushPromises()

    expect(document.activeElement).toBe(input.element)
  })

  it('should ignore the hotkey when a text control is focused', async () => {
    const wrapper = await mountSearchBox({ hotKeys: ['s'] })
    const input = wrapper.find('input')

    const onBody = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 's',
    })
    document.body.dispatchEvent(onBody)
    expect(onBody.defaultPrevented).toBe(true)

    input.element.focus()
    const onInput = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 's',
    })
    input.element.dispatchEvent(onInput)
    expect(onInput.defaultPrevented).toBe(false)
  })
})
