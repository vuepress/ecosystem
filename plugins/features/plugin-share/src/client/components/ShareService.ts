import {
  endsWith,
  isArray,
  isLinkAbsolute,
  isLinkHttp,
  isString,
  startsWith,
} from '@vuepress/helper/client'
import type { PropType, VNode } from 'vue'
import { defineComponent, h } from 'vue'
import { usePageData } from 'vuepress/client'

import type { ShareServiceOptions } from '../../shared/index.js'
import type { SharePageData } from '../typings.js'
import {
  Popup,
  getMetaContent,
  openPopupWindow,
  resolveShareLink,
} from '../utils/index.js'

import '../styles/share-service.scss'

const isHtml = (content: string): boolean =>
  startsWith(content, '<') && endsWith(content, '>')

const isImage = (content: string): boolean =>
  isLinkHttp(content) || isLinkAbsolute(content)

const renderIcon = (content: string, extraClass?: string): VNode => {
  const className = ['vp-share-icon', extraClass].filter(Boolean)

  if (isImage(content)) {
    return h('img', {
      'class': className,
      'src': content,
      'loading': 'lazy',
      'alt': '',
      'aria-hidden': 'true',
    })
  }

  if (isHtml(content)) {
    return h('span', {
      'class': className,
      'innerHTML': content,
      'aria-hidden': 'true',
    })
  }

  return h('span', {
    'class': [...className, content],
    'aria-hidden': 'true',
  })
}

const renderColorfulIcon = (config: ShareServiceOptions): VNode => {
  const { color, icon, shape } = config

  if (icon) return renderIcon(icon, 'colorful')

  if (!color) return renderIcon(shape, 'plain')

  if (isHtml(shape)) {
    return h('span', {
      'class': ['vp-share-icon', 'colorful'],
      'style': { backgroundColor: color },
      'innerHTML': shape,
      'aria-hidden': 'true',
    })
  }

  if (isImage(shape)) {
    return h(
      'span',
      {
        class: ['vp-share-icon', 'colorful'],
        style: { backgroundColor: color },
      },
      [renderIcon(shape)],
    )
  }

  return h('span', {
    'class': ['vp-share-icon', 'colorful', shape],
    'style': { backgroundColor: color },
    'aria-hidden': 'true',
  })
}

/**
 * Share button of a single service
 *
 * 单个服务的分享按钮
 */
export default defineComponent({
  name: 'ShareService',

  props: {
    /**
     * Share service configuration
     *
     * 分享服务配置
     */
    config: {
      type: Object as PropType<ShareServiceOptions>,
      required: true,
    },

    /**
     * Whether to use the plain icon
     *
     * 是否使用纯色图标
     */
    plain: Boolean,

    /**
     * Share title
     *
     * 分享标题
     */
    title: String,

    /**
     * Share description
     *
     * 分享描述
     */
    description: String,

    /**
     * Share URL
     *
     * 分享链接
     */
    url: String,

    /**
     * Share excerpt
     *
     * 分享摘要
     */
    excerpt: String,

    /**
     * Share summary
     *
     * 分享综述
     */
    summary: String,

    /**
     * Share cover
     *
     * 分享封面
     */
    cover: String,

    /**
     * Share tags
     *
     * 分享标签
     */
    tag: [Array, String] as PropType<string | string[]>,
  },

  setup(props) {
    const page = usePageData<SharePageData>()

    let popup: Popup | undefined

    const getTags = (): string | string[] | undefined => {
      const tags =
        props.tag ?? page.value.frontmatter.tag ?? page.value.frontmatter.tags

      if (isArray<string>(tags)) return tags.filter((tag) => isString(tag))

      return isString(tags) ? tags : undefined
    }

    // oxlint-disable-next-line complexity
    const getShareLink = (): string => {
      const { frontmatter } = page.value
      const description =
        props.description ??
        (isString(frontmatter.description)
          ? frontmatter.description
          : undefined) ??
        getMetaContent('description') ??
        getMetaContent('og:description') ??
        getMetaContent('twitter:description') ??
        undefined
      const image =
        document
          .querySelector<HTMLImageElement>(
            '[vp-content] :not(a) > img:not(.vp-share-icon), .vp-page :not(a) > img:not(.vp-share-icon)',
          )
          ?.getAttribute('src') ?? undefined

      return resolveShareLink(
        props.config.link,
        {
          title: props.title ?? page.value.title,
          description,
          url: props.url ?? globalThis.location.href,
          excerpt:
            props.excerpt ??
            page.value.excerpt ??
            (isString(frontmatter.excerpt) ? frontmatter.excerpt : undefined),
          summary:
            props.summary ??
            page.value.summary ??
            (isString(frontmatter.summary) ? frontmatter.summary : undefined),
          tags: getTags(),
          cover:
            props.cover ??
            page.value.cover ??
            (isString(frontmatter.cover) ? frontmatter.cover : undefined) ??
            getMetaContent('og:image') ??
            undefined,
          image,
        },
        { encode: props.config.action !== 'qrcode' },
      )
    }

    const share = (): void => {
      if (typeof document === 'undefined') return

      const link = getShareLink()

      switch (props.config.action) {
        case 'navigate': {
          globalThis.location.href = link
          break
        }

        case 'open': {
          globalThis.open(link, '_blank')
          break
        }

        case 'qrcode': {
          popup ??= new Popup()

          const currentPopup = popup

          void import('qrcode')
            .then(({ toDataURL }) =>
              toDataURL(link, {
                errorCorrectionLevel: 'H',
                width: 250,
                scale: 1,
                margin: 1.5,
              }),
            )
            .then((dataURL) => {
              currentPopup.emit(
                `<img src="${dataURL}" alt="QR code" class="vp-share-qrcode" />`,
              )
            })
            .catch(() => {
              globalThis.open(link, '_blank')
            })
          break
        }

        // "popup" is the default action
        default: {
          openPopupWindow(link, 'share')
        }
      }
    }

    return (): VNode => {
      const { color, icon, label, name, shape } = props.config
      const title = label ?? name
      const plain = props.plain || (!icon && !color)

      return h(
        'button',
        {
          'type': 'button',
          'class': ['vp-share-button', { plain }],
          'aria-label': title,
          title,
          'onClick': share,
        },
        [plain ? renderIcon(shape, 'plain') : renderColorfulIcon(props.config)],
      )
    }
  },
})
