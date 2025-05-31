import type { DefaultLocaleInfo } from '@vuepress/helper'
import type { DefaultThemeLocaleData } from '../../shared/index.js'
import { de } from './de.js'
import { deAT } from './deAT.js'
import { en } from './en.js'
import { es } from './es.js'
import { fi } from './fi.js'
import { fr } from './fr.js'
import { id } from './id.js'
import { ja } from './ja.js'
import { ko } from './ko.js'
import { nl } from './nl.js'
import { pl } from './pl.js'
import { pt } from './pt.js'
import { ru } from './ru.js'
import { sk } from './sk.js'
import { tr } from './tr.js'
import { uk } from './uk.js'
import { vi } from './vi.js'
import { zh } from './zh.js'
import { zhTW } from './zhTW.js'

export const LOCALES_OPTIONS: DefaultLocaleInfo<DefaultThemeLocaleData> = [
  [['en', 'en-US'], en], // English
  [['zh', 'zh-CN', 'zh-Hans'], zh], // 简体中文
  [['zh-TW', 'zh-Hant'], zhTW], // 繁體中文
  [['de', 'de-DE'], de], // Deutsch
  [['de-AT'], deAT], // Deutsch (Austria)
  [['ru', 'ru-RU'], ru], // Русский
  [['uk', 'uk-UA'], uk], // Українська
  [['vi', 'vi-VN'], vi], // Việt Nam
  [['pt', 'pt-BR'], pt], // Portugês
  [['pl', 'pl-PL'], pl], // Polski
  [['fr', 'fr-FR'], fr], // Français
  [['es', 'es-ES'], es], // Español
  [['sk', 'sk-SK'], sk], // Slovensky
  [['ja', 'ja-JP'], ja], // 日本語
  [['ko', 'ko-KR'], ko], // 한국어
  [['nl', 'nl-NL'], nl], // Nederlands
  [['id', 'id-ID'], id], // Bahasa
  [['fi', 'fi-FI'], fi], // Suomi
  [['tr', 'tr-TR'], tr], // Türkçe
]
