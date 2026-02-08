import type { GetHeadersOptions } from '@vuepress/helper/client'
import { useHeaders } from '@vuepress/helper/client'
import type { PropType, VNode } from 'vue'
import { computed, defineComponent, h, toRefs } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { RouterLink } from 'vue-router'
import type { PageHeader } from 'vuepress/client'
import { RouteLink, useRoute } from 'vuepress/client'
import type { TocRenderOptions } from '../../shared/index.js'

/**
 * Headers for TOC component
 *
 * 目录组件的标题
 */
export type TocPropsHeaders = PageHeader[]

/**
 * TOC component props
 *
 * 目录组件属性
 */
export interface TocProps {
  /**
   * Headers to render
   *
   * 要渲染的标题
   */
  headers: TocPropsHeaders

  /**
   * Headers options
   *
   * 标题选项
   */
  headersOptions: GetHeadersOptions

  /**
   * Render options
   *
   * 渲染选项
   */
  renderOptions: TocRenderOptions
}

const renderLink = (
  header: PageHeader,
  options: Required<TocRenderOptions>,
  route: RouteLocationNormalizedLoaded,
): VNode => {
  const hash = `#${header.slug}`
  const linkClass = [options.linkClass]

  // add active class if the header hash is matched
  if (options.linkActiveClass && route.hash === hash) {
    linkClass.push(options.linkActiveClass)
  }

  // add active class if any sub-header hash is matched
  if (
    options.linkChildrenActiveClass &&
    header.children.some((item) => `#${item.slug}` === route.hash)
  ) {
    linkClass.push(options.linkChildrenActiveClass)
  }

  if (options.linkTag === 'RouteLink') {
    return h(
      RouteLink,
      {
        to: hash,
        class: linkClass,
        ariaLabel: header.title,
      },
      () => header.title,
    )
  }

  if (options.linkTag === 'RouterLink') {
    return h(
      RouterLink,
      {
        to: hash,
        class: linkClass,
        ariaLabel: header.title,
      },
      () => header.title,
    )
  }

  return h(
    'a',
    {
      href: hash,
      class: linkClass,
      ariaLabel: header.title,
    },
    header.title,
  )
}

const renderHeaders = (
  headers: PageHeader[],
  options: Required<TocRenderOptions>,
  route: RouteLocationNormalizedLoaded,
): VNode[] => {
  if (headers.length === 0) {
    return []
  }

  return [
    h(
      'ul',
      {
        class: options.listClass,
      },
      headers.map((header) =>
        h(
          'li',
          {
            class: options.itemClass,
          },
          [
            renderLink(header, options, route),
            renderHeaders(header.children, options, route),
          ],
        ),
      ),
    ),
  ]
}

/**
 * Table of Contents component
 *
 * 目录组件
 */
export const Toc = defineComponent({
  name: 'Toc',

  props: {
    /**
     * Headers to render the table of contents
     *
     * 渲染目录的标题
     */
    headers: Array as PropType<TocPropsHeaders>,

    /**
     * Get headers options
     *
     * 获取标题的选项
     */
    headersOptions: Object as PropType<GetHeadersOptions>,

    /**
     * TOC prop options
     *
     * 目录属性选项
     */
    renderOptions: Object as PropType<TocRenderOptions>,
  },

  setup(props) {
    const { headers, headersOptions, renderOptions } = toRefs(props)

    const pageHeaders = useHeaders(headersOptions)
    const route = useRoute()

    const options = computed<Required<TocRenderOptions>>(() => ({
      containerTag: 'nav',
      containerClass: 'vuepress-toc',
      listClass: 'vuepress-toc-list',
      itemClass: 'vuepress-toc-item',
      linkTag: 'RouteLink',
      linkClass: 'vuepress-toc-link',
      linkActiveClass: 'active',
      linkChildrenActiveClass: 'active',
      ...renderOptions.value,
    }))

    return (): VNode | VNode[] => {
      const renderedHeaders = renderHeaders(
        headers.value ?? pageHeaders.value,
        options.value,
        route,
      )

      if (options.value.containerTag) {
        return h(
          options.value.containerTag,
          {
            class: options.value.containerClass,
          },
          renderedHeaders,
        )
      }

      return renderedHeaders
    }
  },
})
