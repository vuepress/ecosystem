import { keys } from '@vuepress/helper/client'
import type { CSSProperties, PropType, VNode } from 'vue'
import { computed, defineComponent, h } from 'vue'

import type { IconType } from '../../shared/index.js'
import '../styles/vp-icon.css'

export const VPIcon = defineComponent({
  name: 'VPIcon',

  props: {
    /**
     * Icon type
     */
    type: {
      type: String as PropType<IconType>,
      default: 'custom',
    },

    /**
     * Icon prefix
     */
    prefix: {
      type: String,
      default: '',
    },

    /**
     * Icon class
     *
     * 图标类名
     */
    icon: { type: String, default: '' },
    /**
     * Icon color
     *
     * 图标颜色
     */
    color: { type: String, default: '' },

    /**
     * Icon size
     *
     * 图标大小
     */
    size: {
      type: [String, Number],
      default: '',
    },

    /**
     * Icon vertical align
     *
     * 图标垂直对齐方式
     */
    verticalAlign: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const isIconify = computed(() => props.type === 'iconify')
    const defaultIconClass = computed(() => `${props.prefix}${props.icon}`)

    const classNames = computed(() => {
      if (props.type === 'fontawesome') {
        return [
          'fa-fw fa-sm',
          props.icon.includes(' ') ? props.icon : defaultIconClass.value,
        ]
      }

      if (isIconify.value) return []

      return defaultIconClass.value
    })

    const style = computed(() => {
      const styleObject: CSSProperties = {}

      if (props.color) styleObject.color = props.color

      if (props.size)
        styleObject.fontSize = Number.isNaN(Number(props.size))
          ? (props.size as string)
          : `${props.size}px`
      if (props.verticalAlign) styleObject.verticalAlign = props.verticalAlign

      return keys(styleObject).length ? styleObject : null
    })

    return (): VNode | null =>
      props.icon
        ? h(isIconify.value ? 'iconify-icon' : 'span', {
            key: props.icon,
            class: ['vp-icon icon', ...classNames.value],
            style: style.value,
            ...(isIconify.value
              ? {
                  icon: defaultIconClass.value,
                  inline: '',
                }
              : {}),
          })
        : null
  },
})
