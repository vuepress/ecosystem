import type { ExactLocaleConfig, KeyOptions } from '@vuepress/helper/client'

import type {
  OramaCustomFieldFormatter,
  OramaLocaleData,
} from '../shared/index.js'

type OramaClientCustomFiledConfig = Record<string, OramaCustomFieldFormatter>

declare const __ORAMA_CUSTOM_FIELDS__: OramaClientCustomFiledConfig
declare const __ORAMA_OPTIONS__: {
  searchDelay: number
  suggestDelay: number
  queryHistoryCount: number
  resultHistoryCount: number
  hotKeys: KeyOptions[]
  worker: string
}
declare const __ORAMA_LOCALES__: ExactLocaleConfig<OramaLocaleData>

export const customFieldConfig = __ORAMA_CUSTOM_FIELDS__
export const options = __ORAMA_OPTIONS__
export const locales = __ORAMA_LOCALES__
