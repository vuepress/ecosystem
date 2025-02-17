import type { DefaultLocaleInfo } from '@vuepress/helper'
import type { CopyCodePluginLocaleData } from '../shared/index.js'

/**
 * Default locale info for `@vuepress/plugin-copy-code`
 */
export const copyCodeLocaleInfo: DefaultLocaleInfo<CopyCodePluginLocaleData> = [
  [['en', 'en-US'], { copy: 'Copy code', copied: 'Copied' }],
  [['zh', 'zh-CN', 'zh-Hans'], { copy: '复制代码', copied: '已复制' }],
  [['zh-TW', 'zh-Hant'], { copy: '複製代碼', copied: '已複製' }],
  [['de', 'de-DE'], { copy: 'Kopiere den Code.', copied: 'Kopiert' }],
  [['de-AT'], { copy: 'Kopiere den Code.', copied: 'Kopierter' }],
  [['vi', 'vi-VN'], { copy: 'Sao chép code', copied: 'Đã sao chép' }],
  [['uk'], { copy: 'Скопіюйте код', copied: 'Скопійовано' }],
  [['ru', 'ru-RU'], { copy: 'Скопировать код', copied: 'Скопировано' }],
  [['br'], { copy: 'Copiar o código', copied: 'Código' }],
  [['pl', 'pl-PL'], { copy: 'Skopiuj kod', copied: 'Skopiowane' }],
  [['sk', 'sk-SK'], { copy: 'Skopíruj kód', copied: 'Skopírované' }],
  [['fr', 'fr-FR'], { copy: 'Copier le code', copied: 'Copié' }],
  [['es', 'es-ES'], { copy: 'Copiar código', copied: 'Copiado' }],
  [['ja', 'ja-JP'], { copy: 'コードをコピー', copied: 'コピーしました' }],
  [['tr', 'tr-TR'], { copy: 'Kodu kopyala', copied: 'Kopyalandı' }],
  [['ko', 'ko-KO'], { copy: '코드 복사', copied: '복사됨' }],
  [['fi', 'fi-FI'], { copy: 'Kopioi koodi', copied: 'Kopioitu' }],
  [['hu', 'hu-HU'], { copy: 'Kód másolása', copied: 'Másolva' }],
  [['id', 'id-ID'], { copy: 'Salin kode', copied: 'Disalin' }],
  [['nl', 'nl-NL'], { copy: 'Kopieer code', copied: 'Gekopieerd' }],
]
