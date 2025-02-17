import type { DefaultLocaleInfo } from '@vuepress/helper'
import type { SearchPluginLocaleData } from '../shared/index.js'

/**
 * Default locale info for `@vuepress/plugin-search`
 */
export const searchLocaleInfo: DefaultLocaleInfo<SearchPluginLocaleData> = [
  [['en', 'en-US'], { placeholder: 'Search' }],
  [['zh', 'zh-CN', 'zh-Hans', 'zh-TW', 'zh-Hant'], { placeholder: '搜索' }],
  [['de', 'de-DE'], { placeholder: 'Suche' }],
  [['de-AT'], { placeholder: 'Suche' }],
  [['vi', 'vi-VN'], { placeholder: 'Tìm kiếm' }],
  [['uk'], { placeholder: 'Пошук' }],
  [['ru', 'ru-RU'], { placeholder: 'Поиск' }],
  [['br'], { placeholder: 'Pesquisar' }],
  [['pl', 'pl-PL'], { placeholder: 'Szukaj' }],
  [['sk', 'sk-SK'], { placeholder: 'Hľadať' }],
  [['fr', 'fr-FR'], { placeholder: 'Rechercher' }],
  [['es', 'es-ES'], { placeholder: 'Buscar' }],
  [['ja', 'ja-JP'], { placeholder: '検索' }],
  [['tr', 'tr-TR'], { placeholder: 'Ara' }],
  [['ko', 'ko-KO'], { placeholder: '검색' }],
  [['fi', 'fi-FI'], { placeholder: 'Etsi' }],
  [['hu', 'hu-HU'], { placeholder: 'Keresés' }],
  [['id', 'id-ID'], { placeholder: 'Cari sesuatu' }],
  [['nl', 'nl-NL'], { placeholder: 'Zoeken' }],
]
