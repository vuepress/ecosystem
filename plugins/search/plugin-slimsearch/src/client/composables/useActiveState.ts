import { useToggle } from '@vueuse/core'
import type { Ref } from 'vue'

export type ActiveState = [
  isActive: Ref<boolean>,
  toggleActive: (value?: boolean) => void,
]

export const useActiveState = (): ActiveState => useToggle()
