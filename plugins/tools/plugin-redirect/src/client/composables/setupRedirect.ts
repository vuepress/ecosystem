import { onMounted } from 'vue'
import { useData, useRouter } from 'vuepress/client'
import type { RedirectBehaviorConfig } from '../../shared/index.js'
import { statusSessionStorage } from '../utils/index.js'
import { useRedirectInfo } from './useRedirectInfo.js'

export interface LocaleInfo {
  lang: string
  localePath: string
}

export const setupRedirect = (behaviorConfig: RedirectBehaviorConfig): void => {
  const { routeLocale, routePath } = useData()
  const router = useRouter()
  const redirectInfo = useRedirectInfo(behaviorConfig)

  onMounted(() => {
    if (redirectInfo.value && !statusSessionStorage.value[routeLocale.value]) {
      void router.replace(
        routePath.value.replace(
          routeLocale.value,
          redirectInfo.value.localePath,
        ),
      )
      statusSessionStorage.value[routeLocale.value] = true
    }
  })
}
