import { defineComponent, h } from 'vue'

export const VPHeader = defineComponent({
  name: 'VPHeader',
  props: {
    level: {
      type: Number,
      default: 2,
    },
    title: {
      type: String,
      require: true,
    },
    anchor: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    return () =>
      h(
        `h${props.level || 2}`,
        { id: props.anchor, tabindex: '-1' },
        h(
          'a',
          { href: `#${props.anchor}`, class: 'header-anchor' },
          h('span', props.title),
        ),
      )
  },
})
