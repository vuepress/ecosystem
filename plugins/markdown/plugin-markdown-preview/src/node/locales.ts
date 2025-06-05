import type { DefaultLocaleInfo } from '@vuepress/helper'
import type { MarkdownPreviewPluginLocaleData } from '../shared/index.js'

export const previewLocaleInfo: DefaultLocaleInfo<MarkdownPreviewPluginLocaleData> =
  [
    [
      ['en', 'en-US'],
      {
        toggle: 'Toggle code',
      },
    ],
    [
      ['zh', 'zh-CN', 'zh-Hans'],
      {
        toggle: '切换代码',
      },
    ],
    [
      ['zh-TW', 'zh-Hant'],
      {
        toggle: '切換程式碼',
      },
    ],
    [
      ['de', 'de-DE'],
      {
        toggle: 'Code umschalten',
      },
    ],
    [
      ['de-AT'],
      {
        toggle: 'Code umschalten',
      },
    ],
    [
      ['vi', 'vi-VN'],
      {
        toggle: 'Chuyển đổi mã',
      },
    ],
    [
      ['uk'],
      {
        toggle: 'Перемкнути код',
      },
    ],
    [
      ['fr', 'fr-FR'],
      {
        toggle: 'Basculer le code',
      },
    ],
    [
      ['es', 'es-ES'],
      {
        toggle: 'Alternar código',
      },
    ],
    [
      ['it', 'it-IT'],
      {
        toggle: 'Attiva/disattiva codice',
      },
    ],
    [
      ['ja', 'ja-JP'],
      {
        toggle: 'コードを切り替え',
      },
    ],
    [
      ['ko', 'ko-KR'],
      {
        toggle: '코드 전환',
      },
    ],
    [
      ['tr', 'tr-TR'],
      {
        toggle: 'Kodu değiştir',
      },
    ],
    [
      ['pt', 'pt-PT'],
      {
        toggle: 'Alternar código',
      },
    ],
    [
      ['pt-BR'],
      {
        toggle: 'Alternar código',
      },
    ],
    [
      ['ru', 'ru-RU'],
      {
        toggle: 'Переключить код',
      },
    ],
  ]
