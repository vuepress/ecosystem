import { useToggle } from '@vueuse/core'
import type { Ref } from 'vue'

export type ActiveState = [
  isActive: Ref<boolean>,
  toggleActive: (value?: boolean) => void,
]

let activeState: ActiveState | null = null

// eslint-disable-next-line no-return-assign
export const useActiveState = (): ActiveState => (activeState ??= useToggle())
