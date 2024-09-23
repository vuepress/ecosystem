import {
  useLocalStorage,
  usePreferredLanguages,
  useScrollLock,
  useSessionStorage,
} from '@vueuse/core'
import type { VNode } from 'vue'
import {
  TransitionGroup,
  computed,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'
import { useRouteLocale, useRoutePath, useRouter } from 'vuepress/client'
import type { RedirectPluginLocaleConfig } from '../../shared/locales.js'
import { redirectLocaleConfig, redirectLocaleEntries } from '../define.js'

import '../styles/redirect-modal.css'

declare const __REDIRECT_LOCALES__: RedirectPluginLocaleConfig

const redirectLocales = __REDIRECT_LOCALES__
const { switchLocale } = redirectLocaleConfig

interface LocaleInfo {
  lang: string
  localePath: string
}

const REDIRECT_STORAGE_KEY = 'VUEPRESS_REDIRECT_STATUS'

const redirectStatusSessionStorage = useSessionStorage<Record<string, boolean>>(
  REDIRECT_STORAGE_KEY,
  {},
)
const redirectStatusLocalStorage = useLocalStorage<Record<string, boolean>>(
  REDIRECT_STORAGE_KEY,
  {},
)

export default defineComponent({
  name: 'RedirectModal',

  setup() {
    const languages = usePreferredLanguages()
    const router = useRouter()
    const routePath = useRoutePath()
    const routeLocale = useRouteLocale()

    const body = ref<HTMLElement>()
    // lock body scroll when modal is displayed
    const showModal = useScrollLock(body)
    const shouldRemember = ref(false)

    const info = computed<LocaleInfo | null>(() => {
      if (redirectLocaleEntries.some(([key]) => routeLocale.value === key))
        for (const language of languages.value)
          for (const [localePath, langs] of redirectLocaleEntries)
            if (langs.includes(language)) {
              if (localePath === routeLocale.value) return null

              return {
                lang: language,
                localePath,
              }
            }

      return null
    })

    const locale = computed(() => {
      if (info.value) {
        const { lang, localePath } = info.value
        const locales = [
          redirectLocales[localePath],
          redirectLocales[routeLocale.value],
        ]

        return {
          hint: locales.map(({ hint }) => hint.replace('$1', lang)),
          switch: locales
            .map(({ switch: switchText }) => switchText.replace('$1', lang))
            .join(' / '),
          cancel: locales.map(({ cancel }) => cancel).join(' / '),
          remember: locales.map(({ remember }) => remember).join(' / '),
        }
      }

      return null
    })

    const redirect = (): void => {
      router.replace(
        routePath.value.replace(routeLocale.value, info.value!.localePath),
      )
    }

    watch(routePath, () => {
      showModal.value = false
    })

    onMounted(async () => {
      body.value = document.body

      await nextTick()

      if (
        !redirectStatusSessionStorage.value[routeLocale.value] &&
        info.value
      ) {
        if (switchLocale === 'direct') redirect()
        else if (
          switchLocale === 'modal' &&
          !redirectStatusLocalStorage.value[routeLocale.value]
        )
          showModal.value = true
      }
    })

    onBeforeUnmount(() => {
      showModal.value = false
    })

    return (): VNode | null =>
      h(TransitionGroup, { name: 'redirect-modal-fade' }, () =>
        showModal.value
          ? h(
              'div',
              { key: 'mask', class: 'redirect-modal-mask' },
              h(
                'div',
                {
                  key: 'popup',
                  class: 'redirect-modal-wrapper',
                },
                [
                  h(
                    'div',
                    { class: 'redirect-modal-content' },
                    locale.value?.hint.map((text) => h('p', text)),
                  ),
                  h('div', { class: 'redirect-modal-hint' }, [
                    h('input', {
                      id: 'remember-redirect',
                      type: 'checkbox',
                      value: shouldRemember.value,
                      onChange: () => {
                        shouldRemember.value = !shouldRemember.value
                      },
                    }),
                    h(
                      'label',
                      { for: 'remember-redirect' },
                      locale.value?.remember,
                    ),
                  ]),
                  h(
                    'button',
                    {
                      type: 'button',
                      class: 'redirect-modal-action primary',
                      onClick: () => {
                        redirectStatusSessionStorage.value[routeLocale.value] =
                          true
                        if (shouldRemember.value) {
                          redirectStatusLocalStorage.value[routeLocale.value] =
                            true
                        }
                        showModal.value = false
                        redirect()
                      },
                    },
                    locale.value?.switch,
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      class: 'redirect-modal-action',
                      onClick: () => {
                        redirectStatusSessionStorage.value[routeLocale.value] =
                          true
                        if (shouldRemember.value) {
                          redirectStatusLocalStorage.value[routeLocale.value] =
                            true
                        }
                        showModal.value = false
                      },
                    },
                    locale.value?.cancel,
                  ),
                ],
              ),
            )
          : null,
      )
  },
})
