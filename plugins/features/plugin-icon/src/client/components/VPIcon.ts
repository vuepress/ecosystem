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
      const classList = ['vp-icon icon']

      if (props.type === 'fontawesome') {
        classList.push('fa-fw fa-sm')
        classList.push(
          props.icon.includes(' ') ? props.icon : defaultIconClass.value,
        )
      } else if (!isIconify.value) {
        classList.push(defaultIconClass.value)
      }

      return classList
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
            class: classNames.value,
            style: style.value,
            ...(isIconify.value
              ? {
                  mode: 'style',
                  inline: '',
                  icon: defaultIconClass.value,
                  width: '1em',
                  height: '1em',
                }
              : {}),
          })
        : null
  },
})
