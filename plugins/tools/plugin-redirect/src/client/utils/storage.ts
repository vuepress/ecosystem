import { useLocalStorage, useSessionStorage } from '@vueuse/core'

const REDIRECT_STORAGE_KEY = 'VUEPRESS_REDIRECT_STATUS'

export const statusLocalStorage = useLocalStorage<Record<string, boolean>>(
  REDIRECT_STORAGE_KEY,
  {},
)

export const statusSessionStorage = useSessionStorage<Record<string, boolean>>(
  REDIRECT_STORAGE_KEY,
  {},
)
