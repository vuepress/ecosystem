import type { SlotsType, VNode } from 'vue'
import { defineComponent, h, onMounted, provide, ref, watch } from 'vue'

import { activeFileKey } from '../utils.js'

import '../styles/vars.scss'
import '../styles/codeTree.scss'

/**
 * Panel that displays code blocks with a file tree
 *
 * 配合文件树展示代码块的面板
 */
export const CodeTree = defineComponent({
  name: 'CodeTree',

  props: {
    /**
     * Title of the code tree
     *
     * 代码树的标题
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * Height of the code tree
     *
     * 代码树的高度
     */
    height: {
      type: String,
      default: '',
    },
    /**
     * File opened by default
     *
     * 默认打开的文件
     */
    entry: {
      type: String,
      default: '',
    },
  },

  slots: Object as SlotsType<{
    'default': () => VNode[]
    'file-tree'?: () => VNode[]
  }>,

  setup(props, { slots }) {
    const activeFile = ref(props.entry)
    const codePanel = ref<HTMLDivElement | null>(null)

    provide(activeFileKey, activeFile)

    /**
     * Code blocks are rendered from the markdown content, which is not managed
     * by Vue, so we have to toggle the active state manually.
     *
     * 代码块由 Markdown 内容渲染而来，不受 Vue 管理，因此需要手动切换激活状态。
     */
    const syncActiveFile = (): void => {
      const panel = codePanel.value

      if (!panel) return

      const blocks = [
        ...panel.querySelectorAll<HTMLElement>('.code-block-with-title'),
      ]

      if (blocks.length === 0) return

      const titles = blocks.map(
        (block) =>
          block.querySelector<HTMLElement>('.code-block-title-bar')?.dataset
            .title ?? '',
      )
      // Fallback to the first code block when the entry file is not found
      const index = Math.max(titles.indexOf(activeFile.value), 0)

      if (titles[index] !== activeFile.value) {
        activeFile.value = titles[index]
        return
      }

      blocks.forEach((block, blockIndex) => {
        block.classList.toggle('active', blockIndex === index)
      })
    }

    watch(activeFile, syncActiveFile, { flush: 'post' })
    onMounted(syncActiveFile)

    return (): VNode => {
      const fileTree = slots['file-tree']

      return h(
        'div',
        { class: { 'vp-code-tree': true, 'no-file-tree': !fileTree } },
        [
          fileTree
            ? h(
                'div',
                {
                  class: 'vp-code-tree-files',
                  style: props.height ? { maxHeight: props.height } : undefined,
                },
                [
                  props.title
                    ? h(
                        'div',
                        { class: 'vp-code-tree-title', title: props.title },
                        props.title,
                      )
                    : null,
                  h('div', { class: 'vp-code-tree-tree' }, fileTree()),
                ],
              )
            : null,
          h(
            'div',
            {
              ref: codePanel,
              class: 'vp-code-tree-code',
              style: props.height ? { height: props.height } : undefined,
            },
            slots.default?.(),
          ),
        ],
      )
    }
  },
})
