import {
  isArray,
  isFunction,
  isPlainObject,
  isString,
} from '@vuepress/helper/client'
import type { PropType, VNode } from 'vue'
import { computed, defineComponent, h } from 'vue'
import type { PageData } from 'vuepress/client'
import { usePage } from 'vuepress/client'

import type { ShareServiceOptions } from '../../shared/index.js'
import type { SharePageData } from '../typings.js'
import ShareService from './ShareService.js'

import '../styles/share-buttons.scss'

declare const __SHARE_DEFAULT_SERVICES__: string[]
declare const __SHARE_SERVICES__: ShareServiceOptions[]

const shareServices = __SHARE_SERVICES__

/**
 * Share buttons of the current page
 *
 * 当前页面的分享按钮
 */
export default defineComponent({
  name: 'Share',

  props: {
    /**
     * Share services to display
     *
     * It can be a comma separated string or an array. A string selects a
     * service by its name, while a custom service is provided as an object.
     *
     * 要显示的分享服务
     *
     * 可以是逗号分隔的字符串或数组。字符串按名称选择服务，自定义服务通过对象提供。
     */
    services: {
      type: [String, Array] as PropType<
        string | (ShareServiceOptions | string)[]
      >,
      default: () => __SHARE_DEFAULT_SERVICES__,
    },

    /**
     * Getter for the page title
     *
     * 页面标题的获取函数
     */
    titleGetter: {
      type: Function as PropType<(page: PageData) => string>,
      default: (page: PageData): string => page.title,
    },

    /**
     * Getter for the page description
     *
     * 页面描述的获取函数
     */
    descriptionGetter: {
      type: Function as PropType<(page: PageData) => string | null | undefined>,
      default: (page: PageData): string | undefined =>
        isString(page.frontmatter.description)
          ? page.frontmatter.description
          : undefined,
    },

    /**
     * Getter for the page excerpt
     *
     * 页面摘要的获取函数
     */
    excerptGetter: {
      type: Function as PropType<(page: PageData) => string | null | undefined>,
      default: (page: PageData): string | undefined => {
        const data = page as SharePageData

        return (
          data.excerpt ??
          (isString(page.frontmatter.excerpt)
            ? page.frontmatter.excerpt
            : undefined)
        )
      },
    },

    /**
     * Getter for the page summary
     *
     * 页面综述的获取函数
     */
    summaryGetter: {
      type: Function as PropType<(page: PageData) => string | null | undefined>,
      default: (page: PageData): string | undefined => {
        const data = page as SharePageData

        return (
          data.summary ??
          (isString(page.frontmatter.summary)
            ? page.frontmatter.summary
            : undefined)
        )
      },
    },

    /**
     * Getter for the page cover
     *
     * 页面封面的获取函数
     */
    coverGetter: {
      type: Function as PropType<(page: PageData) => string | null | undefined>,
      default: (page: PageData): string | undefined => {
        const data = page as SharePageData

        return (
          data.cover ??
          (isString(page.frontmatter.cover)
            ? page.frontmatter.cover
            : undefined)
        )
      },
    },

    /**
     * Getter for the page tags
     *
     * 页面标签的获取函数
     */
    tagGetter: {
      type: Function as PropType<
        (page: PageData) => string | string[] | null | undefined
      >,
      default: (page: PageData): string | string[] | undefined => {
        const { tag, tags } = page.frontmatter

        return isArray<string>(tag)
          ? tag
          : isString(tag)
            ? tag
            : isArray<string>(tags)
              ? tags
              : isString(tags)
                ? tags
                : undefined
      },
    },

    /**
     * Whether to display the share buttons inline
     *
     * 是否行内显示分享按钮
     */
    inline: Boolean,

    /**
     * Whether to use colorful icons
     *
     * 是否使用彩色图标
     */
    colorful: Boolean,
  },

  setup(props) {
    const page = usePage()

    const services = computed<ShareServiceOptions[]>(() => {
      const list = isArray<string | ShareServiceOptions>(props.services)
        ? props.services
        : isString(props.services)
          ? props.services.split(',')
          : []

      return list.flatMap((item) => {
        if (isString(item)) {
          const name = item.trim()
          const service = shareServices.find(
            (candidate) => candidate.name === name,
          )

          return service ? [service] : []
        }

        if (
          isPlainObject<ShareServiceOptions>(item) &&
          isString(item.name) &&
          isString(item.link) &&
          isString(item.shape)
        )
          return [item]

        return []
      })
    })

    const shareData = computed<Record<string, string | string[]>>(() => {
      const result: Record<string, string | string[]> = {}

      if (isFunction(props.titleGetter)) {
        const value = props.titleGetter(page.value)

        if (value) result.title = value
      }

      if (isFunction(props.descriptionGetter)) {
        const value = props.descriptionGetter(page.value)

        if (value) result.description = value
      }

      if (isFunction(props.excerptGetter)) {
        const value = props.excerptGetter(page.value)

        if (value) result.excerpt = value
      }

      if (isFunction(props.summaryGetter)) {
        const value = props.summaryGetter(page.value)

        if (value) result.summary = value
      }

      if (isFunction(props.coverGetter)) {
        const value = props.coverGetter(page.value)

        if (value) result.cover = value
      }

      if (isFunction(props.tagGetter)) {
        const value = props.tagGetter(page.value)

        if (value) result.tag = value
      }

      return result
    })

    return (): VNode =>
      h(
        props.inline ? 'span' : 'div',
        {
          class: [
            'vp-share-buttons',
            { 'vp-share-buttons-inline': props.inline },
          ],
        },
        services.value.map((service) =>
          h(ShareService, {
            config: service,
            ...shareData.value,
            plain: !props.colorful,
          }),
        ),
      )
  },
})
