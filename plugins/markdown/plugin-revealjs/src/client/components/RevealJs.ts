import { useRevealJs } from '@temp/revealjs/index.js'
import { LoadingIcon, decodeData } from '@vuepress/helper/client'
// eslint-disable-next-line import/no-rename-default
import type Reveal from 'reveal.js/dist/reveal.esm.js'
import type { PropType, VNode } from 'vue'
import {
  computed,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  watch,
} from 'vue'
import {
  onContentUpdated,
  usePageFrontmatter,
  usePageLayout,
} from 'vuepress/client'

import type { RevealJsTheme } from '../../shared/index.js'
import { useRevealJsConfig } from '../helpers/index.js'

import '../styles/reveal-js.css'

export const RevealJs = defineComponent({
  name: 'RevealJs',

  props: {
    /**
     * Presentation id
     *
     * 幻灯片 id
     */
    id: {
      type: String,
      required: true,
    },

    /**
     * Presentation code
     *
     * 幻灯片代码
     */
    code: {
      type: String,
      required: true,
    },

    /**
     * Presentation theme
     *
     * 幻灯片主题
     */
    theme: {
      type: String as PropType<RevealJsTheme>,
      default: 'auto',
    },
  },

  setup(props) {
    const revealOptions = useRevealJsConfig()
    const frontmatter = usePageFrontmatter<{ revealJs: Reveal.Options }>()
    const layout = usePageLayout()

    const loading = ref(true)
    const presentationContainer = shallowRef<HTMLElement>()

    const code = computed(() => decodeData(props.code))

    let reveal: Reveal.Api | null = null

    const renderRevealJs = async (
      container: HTMLElement,
    ): Promise<Reveal.Api> => {
      const [Reveal, ...plugins] = await useRevealJs()

      const isSlidePage = layout.value.name === 'SlidePage'

      const instance = new Reveal(container, {
        backgroundTransition: 'slide',
        transition: 'slide',
        slideNumber: true,
        ...revealOptions.value,
        hash: isSlidePage,
        mouseWheel: isSlidePage,
        ...frontmatter.value.revealJs,
        embedded: !isSlidePage,
        keyboardCondition: isSlidePage ? null : 'focused',
        markdown: {
          separator: '^\r?\\n---\r?\n$',
          verticalSeparator: '^\r?\n--\r?\n$',
        },

        plugins: [plugins, revealOptions.value.plugins ?? []].flat(),
      })

      await instance.initialize()

      return instance
    }

    const initRevealJs = async (): Promise<void> => {
      const container = presentationContainer.value

      if (container) {
        container.setAttribute('id', props.id)
        container.setAttribute('data-theme', props.theme)

        loading.value = true

        reveal = await renderRevealJs(container)

        loading.value = false
      }
    }

    onContentUpdated(async (reason) => {
      if (reason === 'mounted') await initRevealJs()
    })

    onMounted(() => {
      watch(code, initRevealJs, { flush: 'post' })
    })

    onUnmounted(() => {
      reveal?.destroy()
    })

    return (): VNode =>
      h('div', { class: 'vp-reveal' }, [
        h(
          'div',
          {
            ref: presentationContainer,
            class: ['reveal', 'reveal-viewport'],
          },
          h('div', {
            class: 'slides',
            innerHTML: `<section data-markdown><script type="text/template">${code.value}</script></section>`,
          }),
        ),
        loading.value
          ? h(LoadingIcon, { class: 'reveal-loading', height: 400 })
          : null,
      ])
  },
})
