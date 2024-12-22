import { isLinkAbsolute, isLinkHttp, keys } from '@vuepress/helper/client'
import type { CSSProperties, PropType, VNode } from 'vue'
import { computed, defineComponent, h } from 'vue'
import { withBase } from 'vuepress/client'

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

    return (): VNode | null => {
      const { type, icon, prefix } = props
      // if multiple classes are provided, do not add prefix
      const iconName = icon.includes(' ') ? icon : `${prefix}${icon}`

      return icon
        ? isLinkHttp(icon)
          ? h('img', {
              'class': 'icon',
              'src': icon,
              'alt': '',
              'aria-hidden': '',
              'no-view': '',
              'style': style.value,
            })
          : isLinkAbsolute(icon)
            ? h('img', {
                'class': 'icon',
                'src': withBase(icon),
                'alt': '',
                'aria-hidden': '',
                'no-view': '',
                'style': style.value,
              })
            : type === 'iconify'
              ? h('iconify-icon', {
                  key: icon,
                  class: 'vp-icon icon',
                  icon: iconName,
                  inline: '',
                  style: style.value,
                })
              : h('span', {
                  key: icon,
                  class: [
                    'vp-icon icon',
                    type === 'fontawesome'
                      ? `fa-fw fa-sm ${iconName}`
                      : iconName,
                  ],
                  style: style.value,
                })
        : null
    }
  },
})
