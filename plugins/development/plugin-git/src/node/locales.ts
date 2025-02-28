import type { DefaultLocaleInfo } from '@vuepress/helper'
import type { GitLocaleData } from '../shared/index.js'

export const DEFAULT_LOCALES: DefaultLocaleInfo<GitLocaleData> = [
  [
    ['en', 'en-US'],
    {
      contributors: 'Contributors',
      changelog: 'Changelog',
      changelogOn: 'on',
      changelogButton: 'View All Changelog',
      latestUpdated: 'Last Updated:',
    },
  ],
  [
    ['zh', 'zh-CN', 'zh-Hans'],
    {
      contributors: '贡献者',
      changelog: '更新日志',
      changelogOn: '于',
      changelogButton: '查看所有更新日志',
      latestUpdated: '最近更新：',
    },
  ],
  [
    ['zh-TW', 'zh-Hant'],
    {
      contributors: '貢獻者',
      changelog: '更新日誌',
      changelogOn: '於',
      changelogButton: '查看所有更新日誌',
      latestUpdated: '最近更新：',
    },
  ],
  [
    ['de', 'de-DE'],
    {
      contributors: 'Mitwirkende',
      changelog: 'Aenderungen',
      changelogOn: 'am',
      changelogButton: 'Alle Aenderungen anzeigen',
      latestUpdated: 'Zuletzt aktualisiert:',
    },
  ],
  [
    ['de-AT'],
    {
      contributors: 'Mitwirkende',
      changelog: 'Aenderungen',
      changelogOn: 'am',
      changelogButton: 'Alle Aenderungen anzeigen',
      latestUpdated: 'Zuletzt aktualisiert:',
    },
  ],
  [
    ['vi', 'vi-VN'],
    {
      contributors: 'Người tham gia',
      changelog: 'Lịch sử thay đổi',
      changelogOn: 'vào',
      changelogButton: 'Xem tất cả lịch sử thay đổi',
      latestUpdated: 'Cập nhật gần nhất:',
    },
  ],
  [
    ['uk'],
    {
      contributors: 'Учасники',
      changelog: 'Історія змін',
      changelogOn: 'в',
      changelogButton: 'Показати всю історію змін',
      latestUpdated: 'Останнє оновлення:',
    },
  ],
  [
    ['ru', 'ru-RU'],
    {
      contributors: 'Участники',
      changelog: 'История изменений',
      changelogOn: 'в',
      changelogButton: 'Показать всю историю изменений',
      latestUpdated: 'Последнее обновление:',
    },
  ],
  [
    ['br'],
    {
      contributors: 'Colaboradores',
      changelog: 'Log de Alterações',
      changelogOn: 'em',
      changelogButton: 'Ver todas as Alterações',
      latestUpdated: 'Atualizado em:',
    },
  ],
  [
    ['pl', 'pl-PL'],
    {
      contributors: 'Współpracownicy',
      changelog: 'Zmiany',
      changelogOn: 'w',
      changelogButton: 'Zobacz wszystkie zmiany',
      latestUpdated: 'Ostatnio zaktualizowano:',
    },
  ],
  [
    ['sk', 'sk-SK'],
    {
      contributors: 'Pracovnici',
      changelog: 'Zmeny',
      changelogOn: 'na',
      changelogButton: 'Zobrazit vsetky zmeny',
      latestUpdated: 'Poslednou aktualizaciu:',
    },
  ],
  [
    ['fr', 'fr-FR'],
    {
      contributors: 'Contribueurs',
      changelog: 'Historique des modifications',
      changelogOn: 'le',
      changelogButton: "Voir l'historique des modifications",
      latestUpdated: 'Dernière mise à jour:',
    },
  ],
  [
    ['es', 'es-ES'],
    {
      contributors: 'Colaboradores',
      changelog: 'Historial de cambios',
      changelogOn: 'el',
      changelogButton: 'Ver el historial de cambios',
      latestUpdated: 'Actualizado el:',
    },
  ],
  [
    ['ja', 'ja-JP'],
    {
      contributors: '貢献者',
      changelog: '変更履歴',
      changelogOn: '日',
      changelogButton: '全ての変更履歴を表示',
      latestUpdated: '最終更新:',
    },
  ],
  [
    ['tr', 'tr-TR'],
    {
      contributors: 'Katkıda bulunanlar',
      changelog: 'Düzenleme Girişimleri',
      changelogOn: 'de',
      changelogButton: 'Tüm düzenleme girişimlerini göster',
      latestUpdated: 'Son günceleme:',
    },
  ],
  [
    ['ko', 'ko-KO'],
    {
      contributors: '기업자',
      changelog: '변경 기록',
      changelogOn: '에서',
      changelogButton: '변경 기록 별 상세 내용 바보기',
      latestUpdated: '최근 수정:',
    },
  ],
  [
    ['fi', 'fi-FI'],
    {
      contributors: 'Osallistujat',
      changelog: 'Muutokset',
      changelogOn: 'kun',
      changelogButton: 'Näytä kaikki muutokset',
      latestUpdated: 'Viimeksi paivittynyt:',
    },
  ],
  [
    ['hu', 'hu-HU'],
    {
      contributors: 'Szerkesztők',
      changelog: 'Modosítások',
      changelogOn: 'ben',
      changelogButton: 'Minden modosítás megtekintése',
      latestUpdated: 'Legutóbb frissítés:',
    },
  ],
  [
    ['id', 'id-ID'],
    {
      contributors: 'Pembuat',
      changelog: 'Perubahan',
      changelogOn: 'pada',
      changelogButton: 'Lihat semua perubahan',
      latestUpdated: 'Diperbarui terakhir:',
    },
  ],
  [
    ['nl', 'nl-NL'],
    {
      contributors: 'Bijdragers',
      changelog: 'Wijzigingen',
      changelogOn: 'op',
      changelogButton: 'Bekijk alle wijzigingen',
      latestUpdated: 'Laatst bijgewerkt:',
    },
  ],
]
