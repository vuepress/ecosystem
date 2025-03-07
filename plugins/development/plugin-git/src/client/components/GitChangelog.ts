import { useToggle } from '@vueuse/core'
import type { FunctionalComponent } from 'vue'
import { defineComponent, h } from 'vue'
import type { GitChangelogItem } from '../composables/index.js'
import {
  useChangelog,
  useGitLocaleConfig,
  useLastUpdated,
} from '../composables/index.js'
import { VPHeader } from './VPHeader.js'

import '../styles/vars.css'
import '../styles/changelog.css'

export const GitChangelog = defineComponent({
  name: 'GitChangelog',

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
    const changelog = useChangelog()
    const locale = useGitLocaleConfig()
    const latestUpdated = useLastUpdated()

    const [active, toggleActive] = useToggle()

    const ChangelogHeader: FunctionalComponent = () =>
      h('div', { class: 'changelog-header', onClick: () => toggleActive() }, [
        h('div', { class: 'latest-updated' }, [
          h('span', { class: 'vpi-changelog' }),
          h('span', { 'data-allow-mismatch': '' }, latestUpdated.value!.text),
        ]),
        h('div', [
          h('span', { class: 'vpi-changelog-menu' }),
          h('span', locale.value.viewChangelog),
        ]),
      ])

    const ReleaseTag: FunctionalComponent<{ item: GitChangelogItem }> = ({
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
            item.date,
          ]),
        ]),
      )

    const Commit: FunctionalComponent<{ item: GitChangelogItem }> = ({
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
          item.date,
        ]),
      ])

    return () =>
      changelog.value.length
        ? [
            h(VPHeader, {
              level: props.headerLevel,
              anchor: 'doc-changelog',
              text: props.title || locale.value.changelog,
            }),

            h('div', { class: ['vp-changelog', { active: active.value }] }, [
              h(ChangelogHeader),

              h('ul', { class: 'changelog-list' }, [
                changelog.value.map((item) =>
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
