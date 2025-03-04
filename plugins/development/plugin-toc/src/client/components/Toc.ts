import type { GetHeadersOptions } from '@vuepress/helper/client'
import { useHeaders } from '@vuepress/helper/client'
import type { PropType, VNode } from 'vue'
import { computed, defineComponent, h, toRefs } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { RouterLink } from 'vue-router'
import type { PageHeader } from 'vuepress/client'
import { RouteLink, useRoute } from 'vuepress/client'
import type { TocPropsOptions } from '../../shared/index.js'

export type TocPropsHeaders = PageHeader[]

export interface TocProps {
  headers: TocPropsHeaders
  headersOptions: GetHeadersOptions
  propsOptions: TocPropsOptions
}

const renderLink = (
  header: PageHeader,
  options: TocPropsOptions,
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
  options: TocPropsOptions,
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

export const Toc = defineComponent({
  name: 'Toc',

  props: {
    /**
     * Headers to render the table of contents
     */
    headers: Array as PropType<TocPropsHeaders>,

    /**
     * Get headers options
     */
    headersOptions: Object as PropType<GetHeadersOptions>,

    /**
     * TOC prop options
     */
    propsOptions: Object as PropType<Partial<TocPropsOptions>>,
  },

  setup(props) {
    const { headers, headersOptions, propsOptions } = toRefs(props)

    const pageHeaders = useHeaders(headersOptions)
    const route = useRoute()

    const options = computed<TocPropsOptions>(() => ({
      containerTag: 'nav',
      containerClass: 'vuepress-toc',
      listClass: 'vuepress-toc-list',
      itemClass: 'vuepress-toc-item',
      linkTag: 'RouteLink',
      linkClass: 'vuepress-toc-link',
      linkActiveClass: 'active',
      linkChildrenActiveClass: 'active',
      ...propsOptions.value,
    }))

    return () => {
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
