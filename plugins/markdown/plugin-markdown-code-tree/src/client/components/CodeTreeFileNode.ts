import { hasGlobalComponent } from '@vuepress/helper/client'
import type { PropType, SlotsType, VNode } from 'vue'
import {
  computed,
  defineComponent,
  h,
  inject,
  ref,
  resolveComponent,
} from 'vue'

import { activeFileKey } from '../utils.js'

import '../styles/vars.scss'
import '../styles/codeTree.scss'

/**
 * Single node of the code tree file tree
 *
 * 代码树文件树的单个节点
 */
export const CodeTreeFileNode = defineComponent({
  name: 'CodeTreeFileNode',

  props: {
    /**
     * Full path of the file or the folder
     *
     * 文件或文件夹的完整路径
     */
    path: {
      type: String,
      required: true,
    },
    /**
     * Type of the node
     *
     * 节点类型
     */
    type: {
      type: String as PropType<'file' | 'folder'>,
      default: 'file',
    },
    /**
     * Icon of the file or the folder
     *
     * Resolved by the plugin at build time. It is rendered by the global icon
     * component, and falls back to the built-in icon when the icon component
     * does not exist.
     *
     * 文件或文件夹的图标
     *
     * 由插件在构建时解析。它会被全局图标组件渲染，当图标组件不存在时回退到内置图标。
     */
    icon: {
      type: String,
      default: '',
    },
  },

  slots: Object as SlotsType<{
    default: () => VNode[]
  }>,

  setup(props, { slots }) {
    const activeFile = inject(activeFileKey, ref(''))
    const expanded = ref(true)
    // `VPIcon` is registered by `@vuepress/plugin-icon`
    const hasIconComponent = hasGlobalComponent('VPIcon')

    const name = computed(() => props.path.split('/').pop() ?? props.path)
    const isFolder = computed(() => props.type === 'folder')
    const isActive = computed(
      () => !isFolder.value && activeFile.value === props.path,
    )

    const onClick = (): void => {
      if (isFolder.value) expanded.value = !expanded.value
      else activeFile.value = props.path
    }

    const renderIcon = (): VNode => {
      if (props.icon && hasIconComponent) {
        return h(resolveComponent('VPIcon'), {
          icon: props.icon,
          size: 16,
          sizing: 'both',
        })
      }

      return h('span', {
        class: [
          'vp-code-tree-node-icon-fallback',
          `vp-code-tree-node-icon-fallback-${props.type}`,
        ],
      })
    }

    return (): VNode =>
      h('div', { class: 'vp-code-tree-node' }, [
        h(
          'p',
          {
            class: {
              'vp-code-tree-node-info': true,
              [props.type]: true,
              'expanded': isFolder.value && expanded.value,
              'active': isActive.value,
            },
            onClick,
          },
          [
            h('span', { class: 'vp-code-tree-node-icon' }, renderIcon()),
            h('span', { class: 'vp-code-tree-node-name' }, name.value),
          ],
        ),
        isFolder.value
          ? h(
              'div',
              {
                class: 'vp-code-tree-node-group',
                style: { display: expanded.value ? 'block' : 'none' },
              },
              slots.default?.(),
            )
          : null,
      ])
  },
})
