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
    prefix: String,

    /**
     * Icon class
     *
     * 图标类名
     */
    icon: String,

    /**
     * Icon color
     *
     * 图标颜色
     */
    color: String,

    /**
     * Icon size
     *
     * 图标大小
     */
    size: [String, Number],

    /**
     * Icon vertical align
     *
     * 图标垂直对齐方式
     */
    verticalAlign: String,

    /**
     * Icon sizing
     *
     * 图标尺寸
     *
     * @default 'height' in main content, and 'both' in others
     */
    sizing: {
      type: String as PropType<'both' | 'height' | 'width' | undefined>,
      default: 'height',
    },
  },

  setup(props) {
    const imageLink = computed(() =>
      props.icon
        ? isLinkHttp(props.icon)
          ? props.icon
          : isLinkAbsolute(props.icon)
            ? withBase(props.icon)
            : null
        : null,
    )

    const attrs = computed(() => {
      const attrsObject: Record<string, unknown> = {}
      const styleObject: CSSProperties = {}
      const { type, verticalAlign, size, sizing } = props

      if (props.color) styleObject.color = props.color
      if (size)
        styleObject['--icon-size'] = Number.isNaN(Number(size))
          ? (size as string)
          : `${size}px`
      if (verticalAlign) styleObject['--icon-vertical-align'] = verticalAlign

      if (type === 'iconify') {
        if (sizing !== 'height') attrsObject.width = props.size || '1em'
        if (sizing !== 'width') attrsObject.height = props.size || '1em'
      }

      if (props.sizing) attrsObject.sizing = props.sizing
      if (keys(styleObject).length) attrsObject.style = styleObject

      return attrsObject
    })

    const appendFontawesomePrefix = (icon: string): string =>
      icon.includes('fa-') || /^fa.$/.test(icon) ? icon : `fa-${icon}`

    return (): VNode | null => {
      const { type, icon, prefix = '', sizing } = props

      if (!icon) return null

      if (imageLink.value) {
        return h('img', {
          'class': 'vp-icon',
          'src': imageLink.value,
          'alt': '',
          'aria-hidden': '',
          'no-view': '',
          ...attrs.value,
        })
      }

      if (type === 'iconify') {
        return h('iconify-icon', {
          key: icon,
          class: 'vp-icon',
          // if a icon set is provided, do not add prefix
          icon: icon.includes(':') ? icon : `${prefix}${icon}`,
          ...attrs.value,
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
            sizing === 'height' ? '' : 'fa-fw',
          ],
          ...attrs.value,
        })
      }

      return h('i', {
        key: icon,
        class: [
          'vp-icon',
          // if multiple classes are provided, do not add prefix
          icon.includes(' ') ? icon : `${prefix}${icon}`,
        ],
        ...attrs.value,
      })
    }
  },
})
