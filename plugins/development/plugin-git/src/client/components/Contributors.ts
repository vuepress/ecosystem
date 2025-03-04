import type { VNode } from 'vue'
import { computed, defineComponent, h } from 'vue'
import { usePageData, usePageFrontmatter } from 'vuepress/client'
import type {
  GitContributor,
  GitPluginFrontmatter,
  GitPluginPageData,
} from '../../shared/index.js'
import { useGitLocaleConfig } from '../composables/index.js'
import { VPHeader } from './VPHeader.js'

import '../styles/contributors.css'

export const Contributors = defineComponent({
  name: 'Contributors',
  props: {
    /** Contributor title */
    title: String,

    /** header level of contributor title */
    headerLevel: {
      type: Number,
      default: 2,
    },
  },
  setup(props) {
    const locale = useGitLocaleConfig()
    const frontmatter = usePageFrontmatter<GitPluginFrontmatter>()
    const page = usePageData<GitPluginPageData>()

    const contributors = computed(() => {
      if (frontmatter.value.contributors === false) return []
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      return page.value.git?.contributors ?? []
    })

    const Contributor = ({
      item: { name, url, avatar },
    }: {
      item: GitContributor
    }): VNode =>
      h(
        url ? 'a' : 'span',
        {
          href: url,
          target: '_blank',
          rel: 'noreferrer',
          class: 'contributor',
        },
        [
          avatar ? h('img', { src: avatar, alt: name, class: 'avatar' }) : null,
          h('span', { class: 'name' }, name),
        ],
      )

    return () =>
      contributors.value.length
        ? [
            h(VPHeader, {
              level: props.headerLevel,
              anchor: 'doc-contributors',
              text: props.title || locale.value.contributors,
            }),
            h(
              'div',
              { class: 'vp-contributors' },
              contributors.value.map((item) =>
                h(Contributor, { item, key: item.name + item.email }),
              ),
            ),
          ]
        : null
  },
})
