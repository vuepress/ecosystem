import { LoadingIcon, decodeData, wait } from '@vuepress/helper/client'
import { useEventListener, useToggle } from '@vueuse/core'
import type { PropType, SlotsType, VNode } from 'vue'
import { computed, defineComponent, h, onMounted, ref, shallowRef } from 'vue'

import type { DemoOptions } from '../../shared/index.js'
import {
  CODEPEN_SVG,
  JSFIDDLE_SVG,
  getCodeInfo,
  getNormalInfo,
  getReactInfo,
  getVueInfo,
  injectCSS,
  injectScript,
  loadNormalScripts,
  loadReactScripts,
  loadVue,
} from '../utils/index.js'

import 'balloon-css/balloon.css'
import '../styles/vp-demo.css'

declare const __DEMO_DELAY__: number

export default defineComponent({
  name: 'VPDemo',

  props: {
    /**
     * Code demo id
     *
     * 代码演示 id
     */
    id: {
      type: String,
      required: true,
    },

    /**
     * Code demo type
     *
     * 代码演示类型
     */
    type: {
      type: String as PropType<'normal' | 'react' | 'vue'>,
      default: 'normal',
    },

    /**
     * Code demo title
     *
     * 代码演示标题
     */
    title: {
      type: String,
      default: '',
    },

    /**
     * Code demo config
     *
     * 代码演示配置
     */
    config: {
      type: String,
      default: '',
    },

    /**
     * Code demo code content
     *
     * 代码演示代码内容
     */
    code: {
      type: String,
      required: true,
    },
  },

  slots: Object as SlotsType<{
    default: () => VNode[]
  }>,

  setup(props, { slots }) {
    const [isExpanded, toggleIsExpand] = useToggle(false)
    const demoWrapper = shallowRef<HTMLDivElement>()
    const codeContainer = shallowRef<HTMLDivElement>()
    const height = ref('0')
    const loaded = ref(false)

    const config = computed(
      () =>
        JSON.parse(
          props.config ? decodeData(props.config) : '{}',
        ) as Partial<DemoOptions>,
    )

    const codeInfo = computed(() => {
      const codeConfig = JSON.parse(decodeData(props.code)) as Record<
        string,
        string
      >

      return getCodeInfo(codeConfig)
    })

    const demoInfo = computed(() =>
      props.type === 'react'
        ? getReactInfo(codeInfo.value, config.value)
        : props.type === 'vue'
          ? getVueInfo(codeInfo.value, config.value)
          : getNormalInfo(codeInfo.value, config.value),
    )

    const isLegal = computed(() => demoInfo.value.isLegal)

    const initDom = (innerHTML = false): void => {
      // Attach a shadow root to demo

      const shadowRoot = demoWrapper.value!.attachShadow({ mode: 'open' })
      const appElement = document.createElement('div')

      appElement.classList.add('code-demo-app')
      shadowRoot.appendChild(appElement)

      if (isLegal.value) {
        if (innerHTML) appElement.innerHTML = demoInfo.value.html
        injectCSS(shadowRoot, demoInfo.value)
        injectScript(props.id, shadowRoot, demoInfo.value)

        height.value = '0'
      } else {
        height.value = 'auto'
      }

      loaded.value = true
    }

    const loadDemo = async (): Promise<void> => {
      const { transpile } = demoInfo.value

      switch (props.type) {
        case 'react': {
          await loadReactScripts(transpile)
          initDom()
          break
        }
        case 'vue': {
          await loadVue(transpile)
          initDom()
          break
        }

        case 'normal':
        default: {
          await loadNormalScripts(transpile)
          initDom(true)
        }
      }
    }

    useEventListener('beforeprint', () => {
      toggleIsExpand(true)
    })

    onMounted(async () => {
      await wait(__DEMO_DELAY__)
      await loadDemo()
    })

    return (): VNode =>
      h('div', { class: 'vp-demo-container', id: props.id }, [
        h('div', { class: 'vp-demo-container-header' }, [
          isLegal.value
            ? h('button', {
                'type': 'button',
                'title': 'toggle',
                'aria-hidden': true,
                'class': [
                  'vp-demo-toggle-button',
                  isExpanded.value ? 'down' : 'end',
                ],
                'onClick': () => {
                  height.value = isExpanded.value
                    ? '0'
                    : `${codeContainer.value!.clientHeight + 13.8}px`
                  toggleIsExpand()
                },
              })
            : null,
          props.title
            ? h(
                'span',
                { class: 'vp-demo-container-title' },
                decodeURIComponent(props.title),
              )
            : null,

          isLegal.value && demoInfo.value.jsfiddle !== false
            ? h(
                'form',
                {
                  class: 'code-demo-jsfiddle',
                  target: '_blank',
                  action: 'https://jsfiddle.net/api/post/library/pure/',
                  method: 'post',
                },
                [
                  h('input', {
                    type: 'hidden',
                    name: 'html',
                    value: demoInfo.value.html,
                  }),
                  h('input', {
                    type: 'hidden',
                    name: 'js',
                    value: demoInfo.value.js,
                  }),
                  h('input', {
                    type: 'hidden',
                    name: 'css',
                    value: demoInfo.value.css,
                  }),
                  h('input', { type: 'hidden', name: 'wrap', value: '1' }),
                  h('input', { type: 'hidden', name: 'panel_js', value: '3' }),
                  h('input', {
                    type: 'hidden',
                    name: 'resources',
                    value: [
                      ...demoInfo.value.cssLib,
                      ...demoInfo.value.jsLib,
                    ].join(','),
                  }),
                  h('button', {
                    'type': 'submit',
                    'class': 'jsfiddle-button',
                    'innerHTML': JSFIDDLE_SVG,
                    'aria-label': 'JSFiddle',
                    'data-balloon-pos': 'down',
                  }),
                ],
              )
            : null,

          !isLegal.value || demoInfo.value.codepen !== false
            ? h(
                'form',
                {
                  class: 'code-demo-codepen',
                  target: '_blank',
                  action: 'https://codepen.io/pen/define',
                  method: 'post',
                },
                [
                  h('input', {
                    type: 'hidden',
                    name: 'data',
                    value: JSON.stringify({
                      html: demoInfo.value.html,
                      html_pre_processor: codeInfo.value.html[1] ?? 'none',
                      js: demoInfo.value.js,
                      js_pre_processor: codeInfo.value.js.length
                        ? codeInfo.value.js[1]
                        : demoInfo.value.jsx
                          ? 'babel'
                          : 'none',
                      js_external: demoInfo.value.jsLib.join(';'),
                      css: demoInfo.value.css,
                      css_pre_processor: codeInfo.value.css[1] ?? 'none',
                      css_external: demoInfo.value.cssLib.join(';'),

                      layout: demoInfo.value.codepenLayout ?? 'left',
                      editors: demoInfo.value.codepenEditors ?? '101',
                    }),
                  }),
                  h('button', {
                    'type': 'submit',
                    'innerHTML': CODEPEN_SVG,
                    'class': 'codepen-button',
                    'aria-label': 'Codepen',
                    'data-balloon-pos': 'down',
                  }),
                ],
              )
            : null,
        ]),
        loaded.value ? null : h(LoadingIcon, { class: 'vp-demo-loading' }),
        h('div', {
          ref: demoWrapper,
          class: 'vp-demo-display',
          style: {
            display: isLegal.value && loaded.value ? 'block' : 'none',
          },
        }),

        h(
          'div',
          {
            class: 'vp-demo-code-wrapper',
            style: { height: height.value },
          },
          h(
            'div',
            {
              ref: codeContainer,
              class: 'vp-demo-codes',
            },
            slots.default(),
          ),
        ),
      ])
  },
})
