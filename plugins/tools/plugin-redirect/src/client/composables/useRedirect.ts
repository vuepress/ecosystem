import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue'
import { useData, useRouter } from 'vuepress/client'

import type { RedirectBehaviorConfig } from '../../shared/index.js'
import type { RedirectPluginLocaleConfig } from '../types.js'
import { statusLocalStorage, statusSessionStorage } from '../utils/index.js'
import { useRedirectLocation } from './useRedirectLocation.js'

export const propsOptions = {
  config: {
    type: Object as PropType<RedirectBehaviorConfig>,
    required: true,
  },

  locales: {
    type: Object as PropType<RedirectPluginLocaleConfig>,
    required: true,
  },
} as const

type Props = ExtractPropTypes<typeof propsOptions>

export interface Redirect {
  showComponent: Ref<boolean>
  shouldRemember: Ref<boolean>
  locale: ComputedRef<{
    hint: string[]
    switch: string
    cancel: string
    remember: string
  } | null>
  persistUserAction: () => void
  redirect: () => void
}

export const useRedirect = (props: Props): Redirect => {
  const { routeLocale, routePath } = useData()
  const redirectInfo = useRedirectLocation(props.config)
  const router = useRouter()

  const showComponent = ref(false)
  const shouldRemember = ref(false)

  const locale = computed(() => {
    if (!redirectInfo.value) return null

    const { lang, localePath } = redirectInfo.value
    const targetLocale = props.locales[localePath]
    const currentLocale = props.locales[routeLocale.value]

    return {
      hint: [targetLocale, currentLocale].map(({ hint }) =>
        hint.replace('$1', lang),
      ),
      switch: targetLocale.switch.replace('$1', targetLocale.name),
      cancel: currentLocale.cancel,
      remember: targetLocale.remember,
    }
  })

  const persistUserAction = (): void => {
    statusSessionStorage.value[routeLocale.value] = true
    if (shouldRemember.value) statusLocalStorage.value[routeLocale.value] = true

    showComponent.value = false
  }

  const redirect = (): void => {
    void router.replace(
      routePath.value.replace(
        routeLocale.value,
        redirectInfo.value!.localePath,
      ),
    )
    persistUserAction()
  }

  onMounted(() => {
    watch(routePath, () => {
      showComponent.value = false
    })

    if (
      redirectInfo.value &&
      !statusSessionStorage.value[routeLocale.value] &&
      !statusLocalStorage.value[routeLocale.value]
    )
      showComponent.value = true
  })

  onBeforeUnmount(() => {
    showComponent.value = false
  })

  return {
    showComponent,
    shouldRemember,
    locale,
    persistUserAction,
    redirect,
  }
}
