import { useLocaleConfig } from '@vuepress/helper/client'
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { usePageData } from 'vuepress/client'
import type { PhotoSwipePluginLocaleData } from '../../shared/index.js'
import { usePhotoSwipeOptions } from '../helpers/index.js'
import { getImages, registerPhotoSwipe } from '../utils/index.js'

import 'photoswipe/dist/photoswipe.css'
import '../styles/photo-swipe.scss'

export interface UsePhotoSwipeOptions {
  selector: string | string[]
  locales: Record<
    string,
    Record<`${keyof PhotoSwipePluginLocaleData}Title`, string>
  >
  /** @default 500 */
  delay?: number
  /** @default true */
  scrollToClose?: boolean
}

export const usePhotoSwipe = ({
  selector,
  locales,
  delay = 500,
  scrollToClose = true,
}: UsePhotoSwipeOptions): void => {
  const photoSwipeOptions = usePhotoSwipeOptions()
  const locale = useLocaleConfig(locales)
  const page = usePageData()

  let destroy: (() => void) | null = null

  const setupPhotoSwipe = (): Promise<void> =>
    new Promise<void>((resolve) => setTimeout(resolve, delay))
      .then(() => nextTick())
      .then(async () => {
        destroy = await registerPhotoSwipe(
          getImages(selector),
          {
            ...photoSwipeOptions,
            ...locale.value,
          },
          scrollToClose,
        )
      })

  onMounted(() => {
    setupPhotoSwipe()

    watch(
      () => page.value.path,
      () => {
        destroy?.()
        setupPhotoSwipe()
      },
    )
  })

  onUnmounted(() => {
    destroy?.()
  })
}
