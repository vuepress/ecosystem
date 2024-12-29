import type { DefaultLocaleInfo } from '@vuepress/helper'
import type { CatalogPluginLocaleData } from '../shared/index.js'

/**
 * Default locale info for `@vuepress/plugin-catalog`
 */
export const catalogLocaleInfo: DefaultLocaleInfo<CatalogPluginLocaleData> = [
  [['en', 'en-US'], { title: 'Catalog', empty: 'No catalog' }],
  [['zh', 'zh-CN', 'zh-Hans'], { title: '目录', empty: '暂无目录' }],
  [['zh-TW', 'zh-Hant'], { title: '目錄', empty: '暫無目錄' }],
  [['de', 'de-DE'], { title: 'Katalog', empty: 'Kein Katalog' }],
  [['vi', 'vi-VN'], { title: 'Danh mục', empty: 'Không có danh mục' }],
  [['uk'], { title: 'Каталог', empty: 'Немає каталогу' }],
  [['ru', 'ru-RU'], { title: 'Каталог', empty: 'Нет каталога' }],
  [['br'], { title: 'Catálogo', empty: 'Sem catálogo' }],
  [['pl', 'pl-PL'], { title: 'Katalog', empty: 'Brak katalogu' }],
  [['sk', 'sk-SK'], { title: 'Katalóg', empty: 'Žiadny katalóg' }],
  [['fr', 'fr-FR'], { title: 'Catalogue', empty: 'Pas de catalogue' }],
  [['es', 'es-ES'], { title: 'Catálogo', empty: 'Sin catálogo' }],
  [['ja', 'ja-JP'], { title: 'カタログ', empty: 'カタログなし' }],
  [['tr', 'tr-TR'], { title: 'Katalog', empty: 'Katalog yok' }],
  [['ko', 'ko-KO'], { title: '목차', empty: '목차 없음' }],
  [['fi', 'fi-FI'], { title: 'Luettelo', empty: 'Ei luetteloa' }],
  [['hu', 'hu-HU'], { title: 'Katalógus', empty: 'Nincs katalógus' }],
  [['id', 'id-ID'], { title: 'Katalog', empty: 'Tidak ada katalog' }],
  [['nl', 'nl-NL'], { title: 'Catalogus', empty: 'Geen catalogus' }],
]
