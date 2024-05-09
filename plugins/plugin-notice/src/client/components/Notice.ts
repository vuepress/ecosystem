import { startsWith } from '@vuepress/helper/client'
import type { PropType } from 'vue'
import { computed, defineComponent, h } from 'vue'
import { ClientOnly, useRoutePath } from 'vuepress/client'
import type { NoticeItemOptions } from '../../shared/index.js'
import NoticeItem from './NoticeItem.js'

import '../styles/notice.css'

type NoticeClientOption = Omit<NoticeItemOptions, 'key'> & {
  noticeKey?: string
} & ({ path: string } | { match: string })

export const Notice = defineComponent({
  name: 'Notice',

  props: {
    /**
     * Notice locales settings
     *
     * 通知的多语言设置
     */
    config: {
      type: Array as PropType<NoticeClientOption[]>,
      required: true,
    },
  },

  setup(props) {
    const routePath = useRoutePath()

    const item = computed(() =>
      props.config.find((item) =>
        'match' in item
          ? new RegExp(item.match).test(routePath.value)
          : startsWith(routePath.value, item.path),
      ),
    )

    return () =>
      h(ClientOnly, () => (item.value ? h(NoticeItem, item.value) : null))
  },
})
