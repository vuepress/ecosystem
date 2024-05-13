import type { DefaultThemeLocaleData } from '../../shared/index.js'
import { en } from './en.js'
import { zh } from './zh.js'

export const LOCALES_OPTIONS: Record<string, DefaultThemeLocaleData> = {
  '/en/': en,
  '/zh/': zh,
}
