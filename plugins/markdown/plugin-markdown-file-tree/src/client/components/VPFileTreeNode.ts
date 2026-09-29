import type { PropType, SlotsType, VNode } from 'vue'
import { computed, defineComponent, h, inject, ref } from 'vue'

import { activeFileKey } from '../utils.js'

import '../styles/vars.scss'
import '../styles/fileTree.scss'

/**
 * Single node of a file tree
 *
 * 文件树的单个节点
 */
export const VPFileTreeNode = defineComponent({
  name: 'VPFileTreeNode',

  props: {
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
     * Display name of the file or the folder
     *
     * 文件或文件夹的显示名称
     */
    filename: {
      type: String,
      required: true,
    },
    /**
     * Nesting level, used for the visual offset
     *
     * 嵌套层级，用于视觉偏移
     */
    level: {
      type: Number,
      default: 0,
    },
    /**
     * Whether a folder is expanded by default
     *
     * 文件夹是否默认展开
     */
    expanded: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether the node is highlighted
     *
     * 节点是否高亮
     */
    focus: {
      type: Boolean,
      default: false,
    },
    /**
     * Diff marker of the node
     *
     * 节点的差异标记
     */
    diff: {
      type: String as PropType<'add' | 'remove'>,
      default: undefined,
    },
    /**
     * Whether a folder is empty
     *
     * 文件夹是否为空
     */
    empty: {
      type: Boolean,
      default: false,
    },
    /**
     * Full path of the file, used to match the active file of a code tree
     *
     * 文件的完整路径，用于匹配代码树的当前激活文件
     */
    filepath: {
      type: String,
      default: '',
    },
    /**
     * Icon of the file or the folder
     *
     * Resolved by the plugin at build time. The icon is provided by the
     * optional Iconify icon set of the plugin, and it is empty when the icon
     * set is not installed, in which case the built-in icon is rendered.
     *
     * 文件或文件夹的图标
     *
     * 由插件在构建时解析。图标由插件的可选 Iconify 图标集提供，未安装图标集时为空，此时渲染内置图标。
     */
    icon: {
      type: String,
      default: '',
    },
  },

  slots: Object as SlotsType<{
    default: () => VNode[]
    comment?: () => VNode[]
  }>,

  setup(props, { slots }) {
    const activeFile = inject(activeFileKey, ref(''))
    const active = ref(props.expanded)
    const isFolder = computed(() => props.type === 'folder')
    const isOmit = computed(
      () => props.filename === '…' || props.filename === '...',
    )
    const isActive = computed(
      () =>
        !isFolder.value &&
        props.filepath !== '' &&
        activeFile.value === props.filepath,
    )

    const toggle = (event: MouseEvent): void => {
      if (isOmit.value) return

      if (isFolder.value) {
        // Clicks on the comment are ignored, so that a comment stays interactive
        const el = event.target as HTMLElement

        if (el.matches('.vp-file-tree-comment, .vp-file-tree-comment *')) return

        active.value = !active.value
      } else if (props.filepath !== '') {
        activeFile.value = props.filepath
      }
    }

    /**
     * Render the icon of the node
     *
     * The icon is provided by the optional Iconify icon set of the plugin, and
     * the built-in icon is rendered when the icon set is not installed.
     *
     * 渲染节点的图标
     *
     * 图标由插件的可选 Iconify 图标集提供，未安装图标集时渲染内置图标。
     *
     * @returns Rendered icon / 渲染结果
     */
    const renderIcon = (): VNode =>
      props.icon === ''
        ? h('span', {
            class: [
              'vp-file-tree-icon',
              'vp-file-tree-icon-fallback',
              props.type,
              isFolder.value && active.value ? 'expanded' : '',
            ],
          })
        : h('iconify-icon', {
            'class': 'vp-file-tree-icon',
            'icon': props.icon,
            'width': '1.2em',
            'height': '1.2em',
            'aria-hidden': 'true',
          })

    return (): VNode =>
      h('div', { 'class': 'vp-file-tree-node', 'data-title': props.filename }, [
        h(
          'p',
          {
            class: {
              'vp-file-tree-info': true,
              [props.type]: true,
              'focus': props.focus,
              'expanded': isFolder.value && active.value,
              'active': isActive.value,
              'diff': props.diff,
              'add': props.diff === 'add',
              'remove': props.diff === 'remove',
            },
            style: { '--file-tree-level': -props.level },
            onClick: toggle,
          },
          [
            isOmit.value ? null : renderIcon(),
            h(
              'span',
              {
                class: [
                  'vp-file-tree-name',
                  props.type,
                  isOmit.value ? 'omit' : '',
                ],
              },
              props.filename,
            ),
            slots.comment
              ? h('span', { class: 'vp-file-tree-comment' }, slots.comment())
              : null,
          ],
        ),
        isFolder.value
          ? h(
              'div',
              {
                class: { 'vp-file-tree-group': true, 'empty': props.empty },
                style: { display: active.value ? 'block' : 'none' },
              },
              slots.default?.(),
            )
          : null,
      ])
  },
})
