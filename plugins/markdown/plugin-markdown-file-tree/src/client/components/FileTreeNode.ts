import type { PropType, SlotsType, VNode } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'

import '../styles/vars.css'
import '../styles/fileTree.css'

export const FileTreeNode = defineComponent({
  name: 'FileTreeNode',

  props: {
    type: {
      type: String as PropType<'file' | 'folder'>,
      default: 'file',
    },
    filename: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      default: 0,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    focus: {
      type: Boolean,
      default: false,
    },
    diff: {
      type: String as PropType<'add' | 'remove'>,
      default: undefined,
    },
    empty: {
      type: Boolean,
      default: false,
    },
  },

  slots: Object as SlotsType<{
    default: () => VNode[]
    comment?: () => VNode[]
  }>,

  setup(props, { slots }) {
    const active = ref(props.expanded)
    const isOmit = computed(
      () => props.filename === '…' || props.filename === '...',
    )

    const toggle = (event: MouseEvent): void => {
      if (props.type === 'folder') {
        const el = event.target as HTMLElement
        if (!el.matches('.comment, .comment *')) {
          active.value = !active.value
        }
      }
    }

    return () =>
      h('div', { 'class': 'vp-file-tree-node', 'data-title': props.filename }, [
        h(
          'p',
          {
            class: {
              'node-info': true,
              [props.type]: true,
              'focus': props.focus,
              'expanded': props.type === 'folder' ? active.value : false,
              'diff': props.diff,
              'add': props.diff === 'add',
              'remove': props.diff === 'remove',
            },
            style: { '--file-tree-level': -props.level },
            onClick: toggle,
          },
          [
            isOmit.value ? null : h('span', { class: `icon-${props.type}` }),
            h(
              'span',
              { class: ['name', props.type, isOmit.value ? 'omit' : ''] },
              props.filename,
            ),
            slots.comment
              ? h('span', { class: 'comment' }, slots.comment())
              : null,
          ],
        ),
        props.type === 'folder'
          ? h(
              'div',
              {
                class: { group: true, empty: props.empty },
                style: { display: active.value ? 'block' : 'none' },
              },
              slots.default(),
            )
          : null,
      ])
  },
})
