import type { DefaultLocaleInfo } from '@vuepress/helper'

import type { MarkdownFieldPluginLocaleData } from './options.js'

export const fieldLocaleInfo: DefaultLocaleInfo<MarkdownFieldPluginLocaleData> =
  [
    [
      ['en', 'en-US'],
      {
        default: 'Default',
        required: 'Required',
        optional: 'Optional',
        deprecated: 'Deprecated',
      },
    ],
    [
      ['zh', 'zh-CN', 'zh-Hans'],
      {
        default: '默认值',
        required: '必填',
        optional: '可选',
        deprecated: '已弃用',
      },
    ],
    [
      ['zh-TW', 'zh-Hant'],
      {
        default: '預設值',
        required: '必填',
        optional: '選填',
        deprecated: '已棄用',
      },
    ],
    [
      ['de', 'de-DE'],
      {
        default: 'Standard',
        required: 'Erforderlich',
        optional: 'Optional',
        deprecated: 'Veraltet',
      },
    ],
    [
      ['de-AT'],
      {
        default: 'Standard',
        required: 'Erforderlich',
        optional: 'Optional',
        deprecated: 'Veraltet',
      },
    ],
    [
      ['vi', 'vi-VN'],
      {
        default: 'Mặc định',
        required: 'Bắt buộc',
        optional: 'Tùy chọn',
        deprecated: 'Không dùng nữa',
      },
    ],
    [
      ['uk'],
      {
        default: 'За замовчуванням',
        required: "Обов'язково",
        optional: 'Необов’язково',
        deprecated: 'Застаріло',
      },
    ],
    [
      ['ru', 'ru-RU'],
      {
        default: 'По умолчанию',
        required: 'Обязательно',
        optional: 'Необязательно',
        deprecated: 'Устарело',
      },
    ],
    [
      ['br'],
      {
        default: 'Padrão',
        required: 'Obrigatório',
        optional: 'Opcional',
        deprecated: 'Obsoleto',
      },
    ],
    [
      ['pl', 'pl-PL'],
      {
        default: 'Domyślne',
        required: 'Wymagane',
        optional: 'Opcjonalne',
        deprecated: 'Przestarzałe',
      },
    ],
    [
      ['sk', 'sk-SK'],
      {
        default: 'Predvolené',
        required: 'Povinné',
        optional: 'Voliteľné',
        deprecated: 'Zastarané',
      },
    ],
    [
      ['fr', 'fr-FR'],
      {
        default: 'Par défaut',
        required: 'Requis',
        optional: 'Optionnel',
        deprecated: 'Obsolète',
      },
    ],
    [
      ['es', 'es-ES'],
      {
        default: 'Predeterminado',
        required: 'Obligatorio',
        optional: 'Opcional',
        deprecated: 'Obsoleto',
      },
    ],
    [
      ['ja', 'ja-JP'],
      {
        default: 'デフォルト',
        required: '必須',
        optional: '任意',
        deprecated: '非推奨',
      },
    ],
    [
      ['tr', 'tr-TR'],
      {
        default: 'Varsayılan',
        required: 'Gerekli',
        optional: 'İsteğe bağlı',
        deprecated: 'Kullanımdan kaldırıldı',
      },
    ],
    [
      ['ko', 'ko-KO'],
      {
        default: '기본값',
        required: '필수',
        optional: '선택',
        deprecated: '더 이상 사용되지 않음',
      },
    ],
    [
      ['fi', 'fi-FI'],
      {
        default: 'Oletus',
        required: 'Pakollinen',
        optional: 'Valinnainen',
        deprecated: 'Vanhentunut',
      },
    ],
    [
      ['hu', 'hu-HU'],
      {
        default: 'Alapértelmezett',
        required: 'Kötelező',
        optional: 'Opcionális',
        deprecated: 'Elavult',
      },
    ],
    [
      ['id', 'id-ID'],
      {
        default: 'Bawaan',
        required: 'Wajib',
        optional: 'Opsional',
        deprecated: 'Usang',
      },
    ],
    [
      ['nl', 'nl-NL'],
      {
        default: 'Standaard',
        required: 'Verplicht',
        optional: 'Optioneel',
        deprecated: 'Verouderd',
      },
    ],
  ]
