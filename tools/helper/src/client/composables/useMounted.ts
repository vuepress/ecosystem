import type { Ref } from 'vue'
import { onMounted, onUnmounted, readonly, ref } from 'vue'

export const useMounted = (): Readonly<Ref<boolean>> => {
  const isMounted = ref(false)

  onMounted(() => {
    isMounted.value = true
  })

  onUnmounted(() => {
    isMounted.value = false
  })

  return readonly(isMounted)
}
