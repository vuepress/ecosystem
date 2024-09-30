import { onMounted } from 'vue'
import { useRouteLocale, useRoutePath, useRouter } from 'vuepress/client'
import type { RedirectBehaviorConfig } from '../../shared/index.js'
import { statusSessionStorage } from '../utils/index.js'
import { useRedirectInfo } from './useRedirectInfo.js'

export interface LocaleInfo {
  lang: string
  localePath: string
}

export const setupRedirect = (behaviorConfig: RedirectBehaviorConfig): void => {
  const redirectInfo = useRedirectInfo(behaviorConfig)
  const routeLocale = useRouteLocale()
  const routePath = useRoutePath()
  const router = useRouter()

  onMounted(() => {
    if (redirectInfo.value && !statusSessionStorage.value[routeLocale.value]) {
      router.replace(
        routePath.value.replace(
          routeLocale.value,
          redirectInfo.value.localePath,
        ),
      )
      statusSessionStorage.value[routeLocale.value] = true
    }
  })
}
