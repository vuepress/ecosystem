import { useToggle } from '@vueuse/core'
import type { FunctionalComponent, VNode } from 'vue'
import { defineComponent, h } from 'vue'

import type { GitChangelogItem } from '../composables/index.js'
import {
  useChangelog,
  useGitLocale,
  useLastUpdated,
} from '../composables/index.js'
import { VPHeader } from './VPHeader.js'

import '../styles/vars.css'
import '../styles/changelog.scss'

/**
 * Resolve the attributes of a changelog link
 *
 * Returns nothing when there is no url, so the element falls back to a plain
 * `span` without link attributes
 *
 * 解析变更日志链接的属性
 *
 * 没有链接时返回空对象，元素回退为不带链接属性的 `span`
 *
 * @param url - The link url / 链接地址
 * @returns The link attributes, or an empty object / 链接属性，无链接时为空对象
 */
const resolveLinkAttrs = (url?: string): Record<string, string> =>
  url ? { href: url, target: '_blank', rel: 'noreferrer' } : {}

export const GitChangelog = defineComponent({
  name: 'GitChangelog',

  props: {
    /** Title of changelog */
    title: String,

    /** Header level of changelog */
    headerLevel: {
      type: Number,
      default: 2,
    },
  },

  setup(props) {
    const changelog = useChangelog()
    const locale = useGitLocale()
    const lastUpdated = useLastUpdated()

    const [active, toggleActive] = useToggle()

    const ChangelogHeader: FunctionalComponent = () =>
      h(
        'div',
        { class: 'vp-changelog-header', onClick: () => toggleActive() },
        [
          h('div', { class: 'vp-latest-updated' }, [
            h('span', { class: 'vp-changelog-icon' }),
            h('span', { 'data-allow-mismatch': '' }, lastUpdated.value!.text),
          ]),
          h('div', [
            h('span', { class: 'vp-changelog-menu-icon' }),
            h('span', locale.value.viewChangelog),
          ]),
        ],
      )

    const ReleaseTag: FunctionalComponent<{ item: GitChangelogItem }> = ({
      item,
    }) =>
      h(
        'li',
        { class: 'vp-changelog-item-tag' },
        h('div', [
          h(
            item.tagUrl ? 'a' : 'span',
            { class: 'vp-changelog-tag', ...resolveLinkAttrs(item.tagUrl) },
            h('code', item.tag),
          ),
          h(
            'span',
            { 'class': 'vp-changelog-date', 'data-allow-mismatch': '' },
            [
              locale.value.timeOn,
              ' ',
              h(
                'time',
                { datetime: new Date(item.time).toISOString() },
                item.date,
              ),
            ],
          ),
        ]),
      )

    const Commit: FunctionalComponent<{ item: GitChangelogItem }> = ({
      item,
    }) =>
      h('li', { class: 'vp-changelog-item-commit' }, [
        h(
          item.commitUrl ? 'a' : 'span',
          { class: 'vp-changelog-hash', ...resolveLinkAttrs(item.commitUrl) },
          [h('code', item.hash.slice(0, 5))],
        ),
        h('span', { class: 'vp-changelog-divider' }, '-'),
        h('span', { class: 'vp-changelog-message', innerHTML: item.message }),
        h('span', { 'class': 'vp-changelog-date', 'data-allow-mismatch': '' }, [
          locale.value.timeOn || 'on',
          ' ',
          h('time', { datetime: new Date(item.time).toISOString() }, item.date),
        ]),
      ])

    return (): VNode[] | null =>
      changelog.value.length > 0
        ? [
            h(VPHeader, {
              level: props.headerLevel,
              anchor: 'doc-changelog',
              text: props.title || locale.value.changelog,
            }),

            h(
              'div',
              { class: ['vp-changelog-wrapper', { active: active.value }] },
              [
                h(ChangelogHeader),

                h('ul', { class: 'vp-changelog-list' }, [
                  changelog.value.map((item) =>
                    item.tag
                      ? h(ReleaseTag, { item, key: item.tag })
                      : h(Commit, { item, key: item.hash }),
                  ),
                ]),
              ],
            ),
          ]
        : null
  },
})
