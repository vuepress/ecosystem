import { isString, useLocaleConfig, wait } from '@vuepress/helper/client'
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { usePageData, usePageFrontmatter } from 'vuepress/client'
import type { PhotoSwipePluginLocaleData } from '../../shared/index.js'
import { usePhotoSwipeOptions } from '../helpers/index.js'
import type { PhotoSwipeBehaviorOptions } from '../utils/index.js'
import { getImages, registerPhotoSwipe } from '../utils/index.js'

import 'photoswipe/dist/photoswipe.css'
import '../styles/photo-swipe.css'

export interface UsePhotoSwipeOptions extends PhotoSwipeBehaviorOptions {
  selector: string[] | string
  locales: Record<
    string,
    Record<`${keyof PhotoSwipePluginLocaleData}Title`, string>
  >
  /** @default 500 */
  delay?: number
}

export const usePhotoSwipe = ({
  selector,
  locales,
  delay = 500,
  download = true,
  fullscreen = true,
  scrollToClose = true,
}: UsePhotoSwipeOptions): void => {
  const photoSwipeOptions = usePhotoSwipeOptions()
  const locale = useLocaleConfig(locales)
  const page = usePageData()
  const frontmatter = usePageFrontmatter<{ photoSwipe: boolean | string }>()

  let destroy: (() => void) | null = null

  const setupPhotoSwipe = async (): Promise<void> => {
    const { photoSwipe } = frontmatter.value

    if (photoSwipe !== false) {
      await nextTick()
      await wait(delay)

      const imageSelector = isString(photoSwipe) ? photoSwipe : selector

      destroy = await registerPhotoSwipe(getImages(imageSelector), {
        ...photoSwipeOptions.value,
        ...locale.value,
        download,
        fullscreen,
        scrollToClose,
      })
    }
  }

  onMounted(() => {
    void setupPhotoSwipe()

    watch(
      () => [page.value.path, photoSwipeOptions.value],
      () => {
        destroy?.()
        void setupPhotoSwipe()
      },
    )
  })

  onUnmounted(() => {
    destroy?.()
  })
}
