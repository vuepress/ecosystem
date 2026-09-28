import type { DefaultLocaleInfo } from '@vuepress/helper'

import type { ReadingTimePluginLocaleData } from '../shared/index.js'

/** Default locale info for `@vuepress/plugin-reading-time` */
export const readingTimeLocaleInfo: DefaultLocaleInfo<ReadingTimePluginLocaleData> =
  [
    [
      ['en', 'en-US'],
      {
        word: 'About $word words',
        subMinute: 'Less than 1 minute',
        time: 'About $time min',
      },
    ],
    [
      ['zh', 'zh-CN', 'zh-Hans'],
      {
        word: '约 $word 字',
        subMinute: '小于 1 分钟',
        time: '大约 $time 分钟',
      },
    ],
    [
      ['zh-TW', 'zh-Hant'],
      {
        word: '約 $word 字',
        subMinute: '小於 1 分鐘',
        time: '大約 $time 分鐘',
      },
    ],
    [
      ['de', 'de-DE'],
      {
        word: 'Ungefähr $word Wörter',
        subMinute: 'Weniger als eine Minute',
        time: 'Ungefähr $time min',
      },
    ],
    [
      ['de-AT'],
      {
        word: 'Ungefähr $word Wörter',
        subMinute: 'Weniger als eine Minute',
        time: 'Ungefähr $time min',
      },
    ],
    [
      ['vi', 'vi-VN'],
      {
        word: 'Khoảng $word từ',
        subMinute: 'Ít hơn 1 phút',
        time: 'Khoảng $time phút',
      },
    ],
    [
      ['uk'],
      {
        word: 'Про $word слова',
        subMinute: 'Менше 1 хвилини',
        time: 'Приблизно $time хв',
      },
    ],
    [
      ['ru', 'ru-RU'],
      {
        word: 'Около $word слов',
        subMinute: 'Меньше 1 минуты',
        time: 'Около $time мин',
      },
    ],
    [
      ['pt', 'pt-PT'],
      {
        word: 'Cerca de $word palavras',
        subMinute: 'Menos de 1 minuto',
        time: 'Cerca de $time min',
      },
    ],
    [
      ['pt-BR'],
      {
        word: 'Aproximadamente $word palavras',
        subMinute: 'Menos de 1 minuto',
        time: 'Aproximadamente $time min',
      },
    ],
    [
      ['pl', 'pl-PL'],
      {
        word: 'Około $word słów',
        subMinute: 'Mniej niż 1 minuta',
        time: 'Około $time minut',
      },
    ],
    [
      ['sk', 'sk-SK'],
      {
        word: 'Okolo $word slov',
        subMinute: 'Menej ako 1 minúta',
        time: 'Okolo $time minút',
      },
    ],
    [
      ['fr', 'fr-FR'],
      {
        word: 'Environ $word mots',
        subMinute: 'Moins de 1 minute',
        time: 'Environ $time min',
      },
    ],
    [
      ['es', 'es-ES'],
      {
        word: 'Alrededor de $word palabras',
        subMinute: 'Menos de 1 minuto',
        time: 'Alrededor de $time min',
      },
    ],
    [
      ['it', 'it-IT'],
      {
        word: 'Circa $word parole',
        subMinute: 'Meno di 1 minuto',
        time: 'Circa $time min',
      },
    ],
    [
      ['ja', 'ja-JP'],
      { word: '$word字程度', subMinute: '1分以内', time: '約$time分' },
    ],
    [
      ['tr', 'tr-TR'],
      {
        word: 'Yaklaşık $word kelime',
        subMinute: '1 dakikadan az',
        time: 'Yaklaşık $time dakika',
      },
    ],
    [
      ['ko', 'ko-KR'],
      { word: '약 $word 단어', subMinute: '1분 미만', time: '약 $time 분' },
    ],
    [
      ['fi', 'fi-FI'],
      {
        word: 'Noin $word sanaa',
        subMinute: 'Alle minuutin',
        time: 'Noin $time minuuttia',
      },
    ],
    [
      ['hu', 'hu-HU'],
      {
        word: 'Körülbelül $word szó',
        subMinute: 'Kevesebb, mint 1 perc',
        time: 'Körülbelül $time perc',
      },
    ],
    [
      ['id', 'id-ID'],
      {
        word: 'Sekitar $word kata',
        subMinute: 'Kurang dari 1 menit',
        time: 'Sekitar $time menit',
      },
    ],
    [
      ['nl', 'nl-NL'],
      {
        word: 'Ongeveer $word woorden',
        subMinute: 'Minder dan 1 minuut',
        time: 'Ongeveer $time minuten',
      },
    ],
  ]
