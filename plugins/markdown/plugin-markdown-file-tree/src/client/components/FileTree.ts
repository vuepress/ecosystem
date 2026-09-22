import type { SlotsType, VNode } from 'vue'
import { defineComponent, h } from 'vue'

import '../styles/vars.scss'
import '../styles/fileTree.scss'

/**
 * Container of a file tree
 *
 * 文件树的容器
 */
export const FileTree = defineComponent({
  name: 'FileTree',

  props: {
    /**
     * Title displayed above the file tree
     *
     * 文件树上方的标题
     */
    title: {
      type: String,
      default: '',
    },
  },

  slots: Object as SlotsType<{
    default: () => VNode[]
  }>,

  setup(props, { slots }) {
    return (): VNode =>
      h('div', { class: 'vp-file-tree' }, [
        props.title
          ? h(
              'div',
              { class: 'vp-file-tree-title', title: props.title },
              props.title,
            )
          : null,
        h('div', { class: 'vp-file-tree-content' }, slots.default?.()),
      ])
  },
})
