import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue'
import { useData, useRouter } from 'vuepress/client'
import { useRedirectLocation } from './useRedirectLocation.js'
import type { RedirectPluginLocaleConfig } from '../types.js'
import type { RedirectBehaviorConfig } from '../../shared/index.js'
import { statusLocalStorage, statusSessionStorage } from '../utils/index.js'

const AUTO_CLOSE_DELAY = 5000

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
  autoCloseProgress: Ref<number>
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
  const autoCloseProgress = ref(0)

  let autoCloseTimer: ReturnType<typeof setTimeout> | null = null
  let progressInterval: ReturnType<typeof setInterval> | null = null

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

  const clearTimers = (): void => {
    if (autoCloseTimer != null) {
      clearTimeout(autoCloseTimer)
      autoCloseTimer = null
    }
    if (progressInterval != null) {
      clearInterval(progressInterval)
      progressInterval = null
    }
  }

  const persistUserAction = (): void => {
    clearTimers()
    statusSessionStorage.value[routeLocale.value] = true
    if (shouldRemember.value) statusLocalStorage.value[routeLocale.value] = true

    showComponent.value = false
  }

  const startAutoClose = (): void => {
    autoCloseProgress.value = 0
    const startTime = Date.now()

    progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      autoCloseProgress.value = Math.min(elapsed / AUTO_CLOSE_DELAY, 1)
    }, 50)

    autoCloseTimer = setTimeout(() => {
      clearTimers()
      autoCloseProgress.value = 1
      persistUserAction()
    }, AUTO_CLOSE_DELAY)
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

  watch(routePath, () => {
    clearTimers()
    showComponent.value = false
  })

  onMounted(() => {
    if (
      redirectInfo.value &&
      !statusSessionStorage.value[routeLocale.value] &&
      !statusLocalStorage.value[routeLocale.value]
    ) {
      showComponent.value = true
      startAutoClose()
    }
  })

  onBeforeUnmount(() => {
    clearTimers()
    showComponent.value = false
  })

  return {
    showComponent,
    shouldRemember,
    autoCloseProgress,
    locale,
    persistUserAction,
    redirect,
  }
}
