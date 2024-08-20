import { onMounted } from 'vue'

export const useKatexCopy = (): void => {
  onMounted(async () => {
    await import(
      /* webpackChunkName: "katex" */ 'katex/dist/contrib/copy-tex.min.js'
    )
  })
}
