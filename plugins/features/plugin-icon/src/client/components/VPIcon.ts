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
      default: 'unknown',
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

    const appendFontawesomePrefix = (icon: string): string =>
      icon.includes('fa-') || /^fa.$/.test(icon) ? icon : `fa-${icon}`

    return (): VNode | null => {
      const { type, icon, prefix } = props

      if (!icon) return null

      if (isLinkHttp(icon)) {
        return h('img', {
          'class': 'vp-icon',
          'src': icon,
          'alt': '',
          'aria-hidden': '',
          'no-view': '',
          'style': style.value,
        })
      }

      if (isLinkAbsolute(icon)) {
        return h('img', {
          'class': 'vp-icon',
          'src': withBase(icon),
          'alt': '',
          'aria-hidden': '',
          'no-view': '',
          'style': style.value,
        })
      }

      if (type === 'iconify') {
        return h('iconify-icon', {
          key: icon,
          class: 'vp-icon',
          // if a icon set is provided, do not add prefix
          icon: icon.includes(':') ? icon : `${prefix}${icon}`,
          inline: '',
          style: style.value,
        })
      }

      if (type === 'fontawesome') {
        const [iconType, rest] = icon.includes(':')
          ? icon.split(':', 2)
          : ['fas', icon]

        return h('i', {
          key: icon,
          class: [
            'vp-icon',

            // declare icon type
            iconType.length === 1
              ? `fa${iconType}`
              : appendFontawesomePrefix(iconType),

            ...rest.split(' ').map(appendFontawesomePrefix),
          ],
          style: style.value,
        })
      }

      return h('span', {
        key: icon,
        class: [
          'vp-icon',
          // if multiple classes are provided, do not add prefix
          icon.includes(' ') ? icon : `${prefix}${icon}`,
        ],
        style: style.value,
      })
    }
  },
})
