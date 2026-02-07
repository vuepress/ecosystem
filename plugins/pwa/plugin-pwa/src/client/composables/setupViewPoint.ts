import { onMounted } from 'vue'

/**
 * Setup viewport for PWA standalone mode
 *
 * 为 PWA 独立模式设置视口
 */
export const setupViewPoint = (): void => {
  onMounted(() => {
    const isStandAlone = window.matchMedia('(display-mode: standalone)').matches

    if (isStandAlone) {
      const head = document.head.querySelector('meta[name="viewport"]')

      if (head) {
        head.setAttribute(
          'content',
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
        )
        return
      }

      const viewportMeta = document.createElement('meta')

      viewportMeta.name = 'viewport'
      viewportMeta.content =
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'

      document.head.append(viewportMeta)
    }
  })
}
