import { onMounted } from 'vue'

export const useKatexCopy = (): void => {
  onMounted(async () => {
    if (__VUEPRESS_SSR__) return

    await import(
      // @ts-expect-error: katex copy-tex plugin is not typed
      /* webpackChunkName: "katex" */ 'katex/dist/contrib/copy-tex.min.js'
    )
  })
}
