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

export const LOCALES_OPTIONS: Record<string, DefaultThemeLocaleData> = {
  '/en/': en, // en-US        English
  '/zh/': zh, // zh-CN        简体中文
  '/zh-tw/': zhTW, // zh-TW   繁體中文
  '/de/': de, // de-DE        Deutsch
  '/de-at/': deAT, // de-AT   Deutsch (Austria)
  '/ru/': ru, // ru-RU        Русский
  '/uk/': uk, // uk-UA        Українська
  '/vi/': vi, // vi-VN        Tiếng Việt
  '/pt/': pt, // pt-BR        Portugês
  '/pl/': pl, // pl-PL        Polski
  '/fr/': fr, // fr-FR        Français
  '/es/': es, // es-ES        Español
  '/sk/': sk, // sk-SK        Slovensky
  '/ja/': ja, // ja-JP        日本語
  '/tr/': tr, // tr-TR        Türkçe
  '/ko/': ko, // ko-KR        한국어
  '/fi/': fi, // fi-FI        Suomi
  '/id/': id, // id-ID        Bahasa
  '/nl/': nl, // nl-BE        Nederlands
}
