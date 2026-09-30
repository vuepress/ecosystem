// @vitest-environment happy-dom

import { flushPromises } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { mountVuePress, renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'

import { VPCodeTree } from '../../src/client/components/VPCodeTree.js'
import { VPFileTreeNode } from '../../src/client/components/VPFileTreeNode.js'

const codeBlock = (title: string): VNode =>
  h('div', { class: 'code-block-with-title' }, [
    h('div', { 'class': 'code-block-title-bar', 'data-title': title }),
    h('div', { class: 'code-block-body' }, `${title} code`),
  ])

const codeBlocks = (): VNode[] => [codeBlock('src/a.ts'), codeBlock('src/b.ts')]

const fileNodes = (): VNode[] => [
  h(VPFileTreeNode, { filepath: 'src/a.ts', filename: 'a.ts' }),
  h(VPFileTreeNode, { filepath: 'src/b.ts', filename: 'b.ts' }),
]

const CodeTreeHost = defineComponent({
  name: 'CodeTreeHost',
  props: {
    entry: { type: String, default: '' },
    height: { type: String, default: '' },
    withFileTree: { type: Boolean, default: false },
  },
  setup(props) {
    return (): VNode =>
      h(
        VPCodeTree,
        { entry: props.entry, height: props.height },
        {
          'default': codeBlocks,
          'file-tree': props.withFileTree ? fileNodes : undefined,
        },
      )
  },
})

const mountCodeTree = async (
  props: { entry?: string; height?: string; withFileTree?: boolean } = {},
): Promise<VueWrapper> =>
  mountVuePress({
    rootComponent: defineComponent({
      name: 'CodeTreeMount',
      setup: (): (() => VNode) => () => h(CodeTreeHost, props),
    }),
  })

describe('code tree', () => {
  it('should render the code blocks without a file tree', async () => {
    const html = await renderVuePress({
      rootComponent: defineComponent({
        name: 'CodeTreeRender',
        setup: (): (() => VNode) => () => h(CodeTreeHost, {}),
      }),
    })

    expect(html).toContain('vp-code-tree')
    expect(html).toContain('no-file-tree')
    expect(html).not.toContain('vp-code-tree-toggle')
    expect(html).toContain('src/a.ts code')
    expect(html).toContain('src/b.ts code')
  })

  it('should apply the given height', async () => {
    const html = await renderVuePress({
      rootComponent: defineComponent({
        name: 'CodeTreeHeight',
        setup: (): (() => VNode) => () => h(CodeTreeHost, { height: '400px' }),
      }),
    })

    expect(html).toContain('--vp-code-tree-height:400px')
  })

  it('should expand the file tree on toggle and collapse it on mask click', async () => {
    const wrapper = await mountCodeTree({ withFileTree: true })

    expect(wrapper.find('.vp-code-tree').classes()).not.toContain(
      'file-tree-expanded',
    )

    await wrapper.find('.vp-code-tree-toggle').trigger('click')

    expect(wrapper.find('.vp-code-tree').classes()).toContain(
      'file-tree-expanded',
    )

    await wrapper.find('.vp-code-tree-mask').trigger('click')

    expect(wrapper.find('.vp-code-tree').classes()).not.toContain(
      'file-tree-expanded',
    )
  })

  it('should mark the code block of the entry file as active', async () => {
    const wrapper = await mountCodeTree({ entry: 'src/b.ts' })
    const blocks = wrapper.findAll('.code-block-with-title')

    expect(blocks[1].classes()).toContain('active')
    expect(blocks[0].classes()).not.toContain('active')
  })

  it('should fall back to the first code block when the entry file is missing', async () => {
    const wrapper = await mountCodeTree({ entry: 'src/missing.ts' })

    await flushPromises()

    const blocks = wrapper.findAll('.code-block-with-title')

    expect(blocks[0].classes()).toContain('active')
    expect(blocks[1].classes()).not.toContain('active')
  })

  it('should mark the file tree node that matches the entry file', async () => {
    const wrapper = await mountCodeTree({
      entry: 'src/b.ts',
      withFileTree: true,
    })
    const nodes = wrapper.findAll('.vp-file-tree-info')

    expect(nodes[1].classes()).toContain('active')
    expect(nodes[0].classes()).not.toContain('active')
  })
})

describe('code tree component', () => {
  it('should keep the tree collapsed after the active file changes', async () => {
    const wrapper = await mountCodeTree({
      entry: 'src/a.ts',
      withFileTree: true,
    })

    await wrapper.find('.vp-code-tree-toggle').trigger('click')

    expect(wrapper.find('.vp-code-tree').classes()).toContain(
      'file-tree-expanded',
    )

    await wrapper.findAll('.vp-file-tree-info')[1].trigger('click')
    await flushPromises()

    expect(wrapper.find('.vp-code-tree').classes()).not.toContain(
      'file-tree-expanded',
    )
    expect(wrapper.findAll('.code-block-with-title')[1].classes()).toContain(
      'active',
    )
  })
})
