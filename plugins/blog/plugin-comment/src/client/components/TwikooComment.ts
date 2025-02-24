import { LoadingIcon, wait } from '@vuepress/helper/client'
import { watchImmediate } from '@vueuse/core'
import type { VNode } from 'vue'
import { computed, defineComponent, h, nextTick, onMounted, ref } from 'vue'
import { usePageLang } from 'vuepress/client'
import { useTwikooOptions } from '../helpers/index.js'

export default defineComponent({
  name: 'TwikooComment',

  props: {
    /**
     * The identifier of the comment
     *
     * 评论标识符
     */
    identifier: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const twikooOptions = useTwikooOptions()
    const lang = usePageLang()

    const loaded = ref(false)

    const enableTwikoo = computed(() => Boolean(twikooOptions.value.envId))

    const initTwikoo = async (): Promise<void> => {
      const [{ init }] = await Promise.all([
        import(/* webpackChunkName: "twikoo" */ 'twikoo'),
        wait(twikooOptions.value.delay ?? 800),
      ])

      loaded.value = true

      await nextTick()

      await init({
        lang: lang.value === 'zh-CN' ? 'zh-CN' : 'en',
        path: props.identifier,
        ...twikooOptions.value,
        el: '#twikoo-comment',
      })
    }

    onMounted(() => {
      watchImmediate(
        () => [props.identifier, twikooOptions.value],
        () => initTwikoo(),
        { flush: 'post' },
      )
    })

    return (): VNode | null =>
      enableTwikoo.value
        ? h('div', { id: 'comment', class: 'twikoo-wrapper' }, [
            loaded.value ? null : h(LoadingIcon),
            h('div', { id: 'twikoo-comment' }),
          ])
        : null
  },
})
