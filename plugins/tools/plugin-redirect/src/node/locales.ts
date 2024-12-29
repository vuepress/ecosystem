import type { DefaultLocaleInfo } from '@vuepress/helper'
import type { RedirectPluginLocaleData } from '../shared/index.js'

/**
 * Default locale info for `@vuepress/plugin-redirect`
 */
export const redirectLocaleInfo: DefaultLocaleInfo<RedirectPluginLocaleData> = [
  [
    ['en', 'en-US'],
    {
      name: 'English',
      hint: 'Your primary language is $1, do you want to switch to it?',
      switch: 'Switch to $1',
      cancel: 'Cancel',
      remember: 'Remember my choice',
    },
  ],
  [
    ['zh', 'zh-CN', 'zh-Hans'],
    {
      name: '简体中文',
      hint: '您的首选语言是 $1，是否切换到该语言？',
      switch: '切换到 $1',
      cancel: '取消',
      remember: '记住我的选择',
    },
  ],
  [
    ['zh-TW', 'zh-Hant'],
    {
      name: '繁體中文',
      hint: '您的首選語言是 $1，是否切換到該語言？',
      switch: '切換到 $1',
      cancel: '取消',
      remember: '記住我的選擇',
    },
  ],
  [
    ['de', 'de-DE'],
    {
      name: 'Deutsch',
      hint: 'Ihre bevorzugte Sprache ist $1, möchten Sie zu dieser wechseln?',
      switch: 'Zu $1 wechseln',
      cancel: 'Abbrechen',
      remember: 'Meine Wahl merken',
    },
  ],
  [
    ['de-AT'],
    {
      name: 'Deutsch (Österreich)',
      hint: 'Ihre bevorzugte Sprache ist $1, möchten Sie zu dieser wechseln?',
      switch: 'Zu $1 wechseln',
      cancel: 'Abbrechen',
      remember: 'Meine Wahl merken',
    },
  ],
  [
    ['vi', 'vi-VN'],
    {
      name: 'Tiếng Việt',
      hint: 'Ngôn ngữ chính của bạn là $1, bạn có muốn chuyển sang nó?',
      switch: 'Chuyển sang $1',
      cancel: 'Hủy',
      remember: 'Nhớ lựa chọn của tôi',
    },
  ],
  [
    ['uk'],
    {
      name: 'Українська',
      hint: 'Вашою основною мовою є $1, чи бажаєте ви переключитися на неї?',
      switch: 'Переключитися на $1',
      cancel: 'Скасувати',
      remember: 'Запам’ятати мій вибір',
    },
  ],
  [
    ['ru', 'ru-RU'],
    {
      name: 'Русский',
      hint: 'Ваш основной язык - $1, вы хотите переключиться на него?',
      switch: 'Переключиться на $1',
      cancel: 'Отмена',
      remember: 'Запомнить мой выбор',
    },
  ],
  [
    ['br'],
    {
      name: 'Português (Brasil)',
      hint: 'A língua principal é $1, deseja mudar para ela?',
      switch: 'Mudar para $1',
      cancel: 'Cancelar',
      remember: 'Lembrar minha escolha',
    },
  ],
  [
    ['pl', 'pl-PL'],
    {
      name: 'Polski',
      hint: 'Twoim głównym językiem jest $1, czy chcesz przełączyć się na niego?',
      switch: 'Przełącz na $1',
      cancel: 'Anuluj',
      remember: 'Zapamiętaj moje wybory',
    },
  ],
  [
    ['sk', 'sk-SK'],
    {
      name: 'Slovenčina',
      hint: 'Vašou hlavnou jazykom je $1, chcete prepnúť naň?',
      switch: 'Prepnúť na $1',
      cancel: 'Zrušiť',
      remember: 'Zapamätať si moju voľbu',
    },
  ],
  [
    ['fr', 'fr-FR'],
    {
      name: 'Français',
      hint: 'Votre langue principale est $1, voulez-vous la changer ?',
      switch: 'Changer pour $1',
      cancel: 'Annuler',
      remember: 'Se souvenir de mon choix',
    },
  ],
  [
    ['tr', 'tr-TR'],
    {
      name: 'Türkçe',
      hint: 'Ana diliniz $1, ona geçmek ister misiniz?',
      switch: "$1'e geç",
      cancel: 'İptal',
      remember: 'Seçimimi hatırla',
    },
  ],
  [
    ['fi', 'fi-FI'],
    {
      name: 'Suomi',
      hint: 'Pääkielenäsi on $1, haluatko vaihtaa siihen?',
      switch: 'Vaihda $1:een',
      cancel: 'Peruuta',
      remember: 'Muista valintani',
    },
  ],
  [
    ['hu', 'hu-HU'],
    {
      name: 'Magyar',
      hint: 'A fő nyelvét $1, szeretné váltani?',
      switch: 'Váltás $1',
      cancel: 'Mégse',
      remember: 'Emlékezzen a választásomra',
    },
  ],
  [
    ['id', 'id-ID'],
    {
      name: 'Bahasa Indonesia',
      hint: 'Bahasa utama Anda adalah $1, apakah Anda ingin beralih ke sana?',
      switch: 'Beralih ke $1',
      cancel: 'Batal',
      remember: 'Ingat pilihan saya',
    },
  ],
  [
    ['nl', 'nl-NL'],
    {
      name: 'Nederlands',
      hint: 'Uw primaire taal is $1, wilt u overschakelen?',
      switch: 'Overschakelen naar $1',
      cancel: 'Annuleren',
      remember: 'Onthoud mijn keuze',
    },
  ],
  [
    ['ja', 'ja-JP'],
    {
      name: '日本語',
      hint: 'あなたの主要な言語は $1 です。それに切り替えますか？',
      switch: '$1 に切り替える',
      cancel: 'キャンセル',
      remember: '選択を記憶する',
    },
  ],
  [
    ['ko', 'ko-KO'],
    {
      name: '한국어',
      hint: '당신의 기본 언어는 $1입니다. 그것으로 전환 하시겠습니까?',
      switch: '$1로 전환',
      cancel: '취소',
      remember: '내 선택 기억하기',
    },
  ],
  [
    ['es', 'es-ES'],
    {
      name: 'Español',
      hint: 'Su idioma principal es $1, ¿desea cambiarlo?',
      switch: 'Cambiar a $1',
      cancel: 'Cancelar',
      remember: 'Recordar mi elección',
    },
  ],
  [
    ['/pt'],
    {
      name: 'Português',
      hint: 'Sua língua principal é $1, deseja mudar para ela?',
      switch: 'Mudar para $1',
      cancel: 'Cancelar',
      remember: 'Lembrar minha escolha',
    },
  ],
]
