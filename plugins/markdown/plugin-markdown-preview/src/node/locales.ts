import type { DefaultLocaleInfo } from '@vuepress/helper'
import type { MarkdownPreviewPluginLocaleData } from '../shared/index.js'

export const previewLocaleInfo: DefaultLocaleInfo<MarkdownPreviewPluginLocaleData> =
  [
    [
      ['en', 'en-US'],
      {
        show: 'Show code',
        hide: 'Hide code',
      },
    ],
    [
      ['zh', 'zh-CN', 'zh-Hans'],
      {
        show: '显示代码',
        hide: '隐藏代码',
      },
    ],
    [
      ['zh-TW', 'zh-Hant'],
      {
        show: '顯示程式碼',
        hide: '隱藏程式碼',
      },
    ],
    [
      ['de', 'de-DE'],
      {
        show: 'Code anzeigen',
        hide: 'Code ausblenden',
      },
    ],
    [
      ['de-AT'],
      {
        show: 'Code anzeigen',
        hide: 'Code ausblenden',
      },
    ],
    [
      ['vi', 'vi-VN'],
      {
        show: 'Hiện mã',
        hide: 'Ẩn mã',
      },
    ],
    [
      ['uk'],
      {
        show: 'Показати код',
        hide: 'Приховати код',
      },
    ],
    [
      ['fr', 'fr-FR'],
      {
        show: 'Afficher le code',
        hide: 'Masquer le code',
      },
    ],
    [
      ['es', 'es-ES'],
      {
        show: 'Mostrar código',
        hide: 'Ocultar código',
      },
    ],
    [
      ['it', 'it-IT'],
      {
        show: 'Mostra codice',
        hide: 'Nascondi codice',
      },
    ],
    [
      ['ja', 'ja-JP'],
      {
        show: 'コードを表示',
        hide: 'コードを非表示',
      },
    ],
    [
      ['ko', 'ko-KR'],
      {
        show: '코드 보기',
        hide: '코드 숨기기',
      },
    ],
    [
      ['tr', 'tr-TR'],
      {
        show: 'Kodu göster',
        hide: 'Kodu gizle',
      },
    ],
    [
      ['pt', 'pt-PT'],
      {
        show: 'Mostrar código',
        hide: 'Ocultar código',
      },
    ],
    [
      ['pt-BR'],
      {
        show: 'Mostrar código',
        hide: 'Ocultar código',
      },
    ],
    [
      ['ru', 'ru-RU'],
      {
        show: 'Показать код',
        hide: 'Скрыть код',
      },
    ],
  ]
