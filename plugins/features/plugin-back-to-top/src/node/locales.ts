import type { DefaultLocaleInfo } from '@vuepress/helper'

import type { BackToTopPluginLocaleData } from '../shared/index.js'

/** Default locale info for `@vuepress/plugin-back-to-top` */
export const backToTopLocaleInfo: DefaultLocaleInfo<BackToTopPluginLocaleData> =
  [
    [['en', 'en-US'], { backToTop: 'Back to top' }],
    [['zh', 'zh-CN', 'zh-Hans'], { backToTop: '返回顶部' }],
    [['zh-TW', 'zh-Hant'], { backToTop: '返回頂部' }],
    [['de', 'de-DE'], { backToTop: 'Zurück nach oben' }],
    [['de-AT'], { backToTop: 'Zurück nach oben' }],
    [['vi', 'vi-VN'], { backToTop: 'Trở lại đầu trang' }],
    [['uk'], { backToTop: 'Повернутися до початку' }],
    [['ru', 'ru-RU'], { backToTop: 'Вернуться к началу' }],
    [['pt', 'pt-PT'], { backToTop: 'Voltar ao topo' }],
    [['pt-BR'], { backToTop: 'Voltar para o topo' }],
    [['pl', 'pl-PL'], { backToTop: 'Wróć na górę' }],
    [['sk', 'sk-SK'], { backToTop: 'Späť nahor' }],
    [['fr', 'fr-FR'], { backToTop: 'Retour en haut' }],
    [['es', 'es-ES'], { backToTop: 'Volver arriba' }],
    [['it', 'it-IT'], { backToTop: 'Torna in cima' }],
    [['ja', 'ja-JP'], { backToTop: 'このページのトップへ戻る' }],
    [['tr', 'tr-TR'], { backToTop: 'En başa dön' }],
    [['ko', 'ko-KR'], { backToTop: '맨 위로' }],
    [['fi', 'fi-FI'], { backToTop: 'Takaisin ylös' }],
    [['hu', 'hu-HU'], { backToTop: 'Vissza a tetejére' }],
    [['id', 'id-ID'], { backToTop: 'Kembali ke atas' }],
    [['nl', 'nl-NL'], { backToTop: 'Ga terug naar boven' }],
  ]
