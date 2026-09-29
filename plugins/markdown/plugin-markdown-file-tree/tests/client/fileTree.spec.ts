// @vitest-environment happy-dom

import { flushPromises } from '@vue/test-utils'
import { mountVuePress, renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { Component, VNode } from 'vue'
import { defineComponent, h, provide, ref } from 'vue'

import { VPFileTree } from '../../src/client/components/VPFileTree.js'
import { VPFileTreeNode } from '../../src/client/components/VPFileTreeNode.js'
import { activeFileKey } from '../../src/client/utils.js'

const createHost = (render: () => VNode): Component =>
  defineComponent({ name: 'FileTreeHost', setup: (): (() => VNode) => render })

const FileNodeHost = createHost(() =>
  h(VPFileTreeNode, { filename: 'App.vue', type: 'file' }),
)

const IconNodeHost = createHost(() =>
  h(VPFileTreeNode, {
    filename: 'App.vue',
    icon: 'vscode-icons:file-type-vue',
    type: 'file',
  }),
)

/**
 * Read the indentation offset of a rendered file tree node
 *
 * 读取渲染后的文件树节点的缩进偏移
 *
 * @param element - The rendered file tree info element / 渲染出的文件树信息元素
 * @returns The numeric indentation offset / 数值化的缩进偏移
 */
const readFileTreeLevel = (element: {
  attributes: (name: string) => string | undefined
}): number => {
  const style = element.attributes('style') ?? ''

  return Number(
    /--file-tree-level:\s*(?<level>-?\d+)/u.exec(style)?.groups?.level ?? '0',
  )
}

const createChildNode = (): VNode =>
  h(VPFileTreeNode, { filename: 'App.vue', level: 1, type: 'file' })

const FolderHost = createHost(() =>
  h(
    VPFileTreeNode,
    { filename: 'src', type: 'folder' },
    { default: (): VNode[] => [createChildNode()] },
  ),
)

const ExpandedFolderHost = createHost(() =>
  h(
    VPFileTreeNode,
    { expanded: true, filename: 'src', type: 'folder' },
    { default: (): VNode[] => [createChildNode()] },
  ),
)

const EmptyFolderHost = createHost(() =>
  h(
    VPFileTreeNode,
    { empty: true, filename: 'empty', type: 'folder' },
    {
      default: (): VNode[] => [
        h(VPFileTreeNode, { filename: '…', level: 1, type: 'file' }),
      ],
    },
  ),
)

const CommentFolderHost = createHost(() =>
  h(
    VPFileTreeNode,
    { expanded: true, filename: 'src', type: 'folder' },
    {
      comment: (): VNode[] => [h('span', 'src comment')],
      default: (): VNode[] => [createChildNode()],
    },
  ),
)

describe('file tree node', () => {
  it('should render a file node with its name and the built-in icon', async () => {
    const html = await renderVuePress({ rootComponent: FileNodeHost })

    expect(html).toContain('data-title="App.vue"')
    expect(html).toContain('vp-file-tree-name file')
    expect(html).toContain('App.vue')
    expect(html).toContain('vp-file-tree-icon-fallback file')
    // a file node has no children group
    expect(html).not.toContain('vp-file-tree-group')
  })

  it('should render the icon resolved by the plugin', async () => {
    const html = await renderVuePress({ rootComponent: IconNodeHost })

    expect(html).toContain('icon="vscode-icons:file-type-vue"')
    expect(html).not.toContain('vp-file-tree-icon-fallback')
  })

  it('should indent a nested node more than a top-level node', async () => {
    const Host = createHost(() =>
      h('div', [
        h(VPFileTreeNode, { filename: 'root', type: 'file' }),
        h(VPFileTreeNode, { filename: 'nested', level: 2, type: 'file' }),
      ]),
    )

    const wrapper = await mountVuePress({ rootComponent: Host })
    const infos = wrapper.findAll('.vp-file-tree-info')

    // the top-level node is not offset, a deeper node is offset further
    expect(readFileTreeLevel(infos[0])).toBe(0)
    expect(readFileTreeLevel(infos[1])).toBeLessThan(
      readFileTreeLevel(infos[0]),
    )
  })

  it('should keep a folder collapsed by default', async () => {
    const wrapper = await mountVuePress({ rootComponent: FolderHost })

    expect(wrapper.find('.vp-file-tree-group').attributes('style')).toContain(
      'display: none',
    )
    expect(wrapper.find('.vp-file-tree-info.folder').classes()).not.toContain(
      'expanded',
    )
  })

  it('should expand a folder that is expanded by default', async () => {
    const wrapper = await mountVuePress({ rootComponent: ExpandedFolderHost })

    expect(wrapper.find('.vp-file-tree-group').attributes('style')).toContain(
      'display: block',
    )
    expect(wrapper.find('.vp-file-tree-info.folder').classes()).toContain(
      'expanded',
    )
  })

  it('should collapse and expand a folder when it is clicked', async () => {
    const wrapper = await mountVuePress({ rootComponent: FolderHost })
    const info = wrapper.find('.vp-file-tree-info.folder')

    await info.trigger('click')

    expect(wrapper.find('.vp-file-tree-group').attributes('style')).toContain(
      'display: block',
    )

    await info.trigger('click')

    expect(wrapper.find('.vp-file-tree-group').attributes('style')).toContain(
      'display: none',
    )
  })

  it('should mark an empty folder and its ellipsis child', async () => {
    const wrapper = await mountVuePress({ rootComponent: EmptyFolderHost })

    expect(wrapper.find('.vp-file-tree-group').classes()).toContain('empty')
    expect(wrapper.find('.vp-file-tree-name.omit').text()).toBe('…')

    // the ellipsis has no icon
    const omitNode = wrapper.find('.vp-file-tree-node[data-title="…"]')

    expect(omitNode.find('.vp-file-tree-icon').exists()).toBe(false)
  })

  it('should keep the folder expanded when its comment is clicked', async () => {
    const wrapper = await mountVuePress({ rootComponent: CommentFolderHost })

    // the comment stays interactive, and clicking it does not collapse the folder
    await wrapper.find('.vp-file-tree-comment').trigger('click')

    expect(wrapper.find('.vp-file-tree-group').attributes('style')).toContain(
      'display: block',
    )
  })

  it('should mark the clicked file as active', async () => {
    const ActiveFileHost = defineComponent({
      name: 'ActiveFileHost',
      setup() {
        provide(activeFileKey, ref(''))

        return (): VNode =>
          h('div', [
            h(VPFileTreeNode, { filepath: 'src/a.ts', filename: 'a.ts' }),
            h(VPFileTreeNode, { filepath: 'src/b.ts', filename: 'b.ts' }),
          ])
      },
    })

    const wrapper = await mountVuePress({ rootComponent: ActiveFileHost })
    const nodes = wrapper.findAll('.vp-file-tree-info')

    await nodes[1].trigger('click')
    await flushPromises()

    expect(wrapper.findAll('.vp-file-tree-info')[1].classes()).toContain(
      'active',
    )
    expect(wrapper.findAll('.vp-file-tree-info')[0].classes()).not.toContain(
      'active',
    )
  })
})

describe('file tree', () => {
  it('should render the title of the tree', async () => {
    const html = await renderVuePress({
      rootComponent: createHost(() =>
        h(VPFileTree, { title: 'My Project' }, { default: (): VNode[] => [] }),
      ),
    })

    expect(html).toContain('class="vp-file-tree-title"')
    expect(html).toContain('title="My Project"')
    expect(html).toContain('My Project')
  })

  it('should not render a title when there is none', async () => {
    const html = await renderVuePress({
      rootComponent: createHost(() =>
        h(VPFileTree, {}, { default: (): VNode[] => [createChildNode()] }),
      ),
    })

    expect(html).not.toContain('vp-file-tree-title')
    expect(html).toContain('vp-file-tree-content')
  })
})
