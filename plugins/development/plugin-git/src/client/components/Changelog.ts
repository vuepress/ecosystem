import { useToggle } from '@vueuse/core'
import type { FunctionalComponent } from 'vue'
import { computed, defineComponent, h } from 'vue'
import { usePageData, usePageFrontmatter, usePageLang } from 'vuepress/client'
import type {
  GitChangelog,
  GitPluginFrontmatter,
  GitPluginPageData,
} from '../../shared/index.js'
import { useGitLocaleConfig } from '../composables/index.js'
import { VPHeader } from './VPHeader.js'

import '../styles/vars.css'
import '../styles/changelog.css'

type ResolvedChangelog = Omit<GitChangelog, 'date'> & { datetime: string }

export const Changelog = defineComponent({
  name: 'Changelog',

  props: {
    /** Title of changelog */
    title: String,

    /** header level of changelog */
    headerLevel: {
      type: Number,
      default: 2,
    },
  },

  setup(props) {
    const locale = useGitLocaleConfig()
    const frontmatter = usePageFrontmatter<GitPluginFrontmatter>()
    const page = usePageData<GitPluginPageData>()
    const lang = usePageLang()

    const list = computed<ResolvedChangelog[]>(() => {
      if (frontmatter.value.changelog === false) return []

      const formatter = new Intl.DateTimeFormat(lang.value, {
        dateStyle: 'short',
      })

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      return (page.value.git?.changelog ?? []).map(({ date, ...item }) => {
        const datetime = formatter.format(date)
        return { datetime, ...item }
      })
    })

    const latestUpdated = computed(() => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      const latest = (page.value.git?.changelog ?? [])[0]

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!latest) return ''

      const formatter = new Intl.DateTimeFormat(lang.value, {
        dateStyle: 'short',
        timeStyle: 'short',
      })
      return formatter.format(latest.date)
    })

    const [active, toggle] = useToggle()

    const ChangelogHeader: FunctionalComponent = () =>
      h('div', { class: 'changelog-header', onClick: toggle }, [
        h('div', { class: 'latest-updated' }, [
          h('span', { class: 'vpi-changelog' }),
          h('span', [locale.value.latestUpdateAt, ' ']),
          h('span', { 'data-allow-mismatch': '' }, latestUpdated.value),
        ]),
        h('div', [
          h('span', { class: 'vpi-changelog-menu' }),
          h('span', locale.value.viewChangelog),
        ]),
      ])

    const ReleaseTag: FunctionalComponent<{ item: ResolvedChangelog }> = ({
      item,
    }) =>
      h(
        'li',
        { class: 'changelog release-tag' },
        h('div', [
          h('a', { class: 'link release-tag' }, h('code', item.tag)),
          h('span', { 'class': 'datetime', 'data-allow-mismatch': '' }, [
            locale.value.timeOn,
            ' ',
            item.datetime,
          ]),
        ]),
      )

    const Commit: FunctionalComponent<{ item: ResolvedChangelog }> = ({
      item,
    }) =>
      h('li', { class: 'changelog commit' }, [
        h(
          item.commitUrl ? 'a' : 'span',
          {
            class: 'link hash',
            href: item.commitUrl,
            target: '_blank',
            rel: 'noreferrer',
          },
          [h('code', item.hash.slice(0, 5))],
        ),
        h('span', { class: 'divider' }, '-'),
        h('span', { class: 'message', innerHTML: item.message }),
        h('span', { 'class': 'datetime', 'data-allow-mismatch': '' }, [
          locale.value.timeOn || 'on',
          ' ',
          item.datetime,
        ]),
      ])

    return () =>
      list.value.length
        ? [
            h(VPHeader, {
              level: props.headerLevel,
              anchor: 'doc-changelog',
              text: props.title || locale.value.changelog,
            }),

            h('div', { class: ['vp-changelog', { active: active.value }] }, [
              h(ChangelogHeader),

              h('ul', { class: 'changelog-list' }, [
                list.value.map((item) =>
                  item.tag
                    ? h(ReleaseTag, { item, key: item.tag })
                    : h(Commit, { item, key: item.hash }),
                ),
              ]),
            ]),
          ]
        : null
  },
})
