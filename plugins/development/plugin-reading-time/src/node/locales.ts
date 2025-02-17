import type { DefaultLocaleInfo } from '@vuepress/helper'
import type { ReadingTimePluginLocaleData } from '../shared/index.js'

/**
 * Default locale info for `@vuepress/plugin-reading-time`
 */
export const readingTimeLocaleInfo: DefaultLocaleInfo<ReadingTimePluginLocaleData> =
  [
    [
      ['en', 'en-US'],
      {
        word: 'About $word words',
        less1Minute: 'Less than 1 minute',
        time: 'About $time min',
      },
    ],
    [
      ['zh', 'zh-CN', 'zh-Hans'],
      {
        word: '约 $word 字',
        less1Minute: '小于 1 分钟',
        time: '大约 $time 分钟',
      },
    ],
    [
      ['zh-TW', 'zh-Hant'],
      {
        word: '約 $word 字',
        less1Minute: '小於 1 分鐘',
        time: '大约 $time 分鐘',
      },
    ],
    [
      ['de', 'de-DE'],
      {
        word: 'Ungefähr $word Wörter',
        less1Minute: 'Weniger als eine Minute',
        time: 'Ungefähr $time min',
      },
    ],
    [
      ['vi', 'vi-VN'],
      {
        word: 'Khoảng $word từ',
        less1Minute: 'Ít hơn 1 phút',
        time: 'Khoảng $time phút',
      },
    ],
    [
      ['uk'],
      {
        word: 'Про $word слова',
        less1Minute: 'Менше 1 хвилини',
        time: 'Приблизно $time хв',
      },
    ],
    [
      ['ru', 'ru-RU'],
      {
        word: 'Около $word слов',
        less1Minute: 'Меньше 1 минуты',
        time: 'Около $time мин',
      },
    ],
    [
      ['br'],
      {
        word: 'Por volta de $word palavras',
        less1Minute: 'Menos de 1 minuto',
        time: 'Por volta de $time min',
      },
    ],
    [
      ['pl', 'pl-PL'],
      {
        word: 'Około $word słów',
        less1Minute: 'Mniej niż 1 minuta',
        time: 'Około $time minut',
      },
    ],
    [
      ['sk', 'sk-SK'],
      {
        word: 'Okolo $word slov',
        less1Minute: 'Menej ako 1 minúta',
        time: 'Okolo $time minút',
      },
    ],
    [
      ['fr', 'fr-FR'],
      {
        word: 'Environ $word mots',
        less1Minute: 'Moins de 1 minute',
        time: 'Environ $time min',
      },
    ],
    [
      ['es', 'es-ES'],
      {
        word: 'Alrededor de $word palabras',
        less1Minute: 'Menos de 1 minuto',
        time: 'Alrededor de $time min',
      },
    ],
    [
      ['ja', 'ja-JP'],
      { word: '$word字程度', less1Minute: '1分以内', time: '約$time分' },
    ],
    [
      ['tr', 'tr-TR'],
      {
        word: 'Yaklaşık $word kelime',
        less1Minute: '1 dakikadan az',
        time: 'Yaklaşık $time dakika',
      },
    ],
    [
      ['ko', 'ko-KO'],
      { word: '약 $word 단어', less1Minute: '1분 미만', time: '약 $time 분' },
    ],
    [
      ['fi', 'fi-FI'],
      {
        word: 'Noin $word sanaa',
        less1Minute: 'Alle minuutti',
        time: 'Noin $time minuuttia',
      },
    ],
    [
      ['hu', 'hu-HU'],
      {
        word: 'Körülbelül $word szó',
        less1Minute: 'Kevesebb, mint 1 perc',
        time: 'Körülbelül $time perc',
      },
    ],
    [
      ['id', 'id-ID'],
      {
        word: 'Sekitar $word kata',
        less1Minute: 'Kurang dari 1 menit',
        time: 'Sekitar $time menit',
      },
    ],
    [
      ['nl', 'nl-NL'],
      {
        word: 'Ongeveer $word woorden',
        less1Minute: 'Minder dan 1 minuut',
        time: 'Ongeveer $time minuten',
      },
    ],
  ]
