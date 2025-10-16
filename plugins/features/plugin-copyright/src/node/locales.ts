import type { DefaultLocaleInfo } from '@vuepress/helper'
import type { CopyrightPluginLocaleData } from '../shared/index.js'

/**
 * Default locale info for copyright plugin
 *
 * 版权插件的默认多语言信息
 */
export const copyrightLocaleInfo: DefaultLocaleInfo<CopyrightPluginLocaleData> =
  [
    [
      ['en', 'en-US'],
      {
        author: 'Copyright by :author',
        license: 'License under :license',
        link: ':link',
      },
    ],
    [
      ['zh', 'zh-CN', 'zh-Hans'],
      {
        author: '著作权归:author所有',
        license: '基于:license协议',
        link: '原文链接：:link',
      },
    ],
    [
      ['zh-TW', 'zh-Hant'],
      {
        author: '著作權歸:author所有',
        license: '基於:license協議',
        link: '原文鏈接：:link',
      },
    ],
    [
      ['ru', 'ru-RU'],
      {
        author: 'Авторские права :author',
        license: 'Лицензия :license',
        link: ':link',
      },
    ],
    [
      ['uk', 'uk-UA'],
      {
        author: 'Авторські права :author',
        license: 'Ліцензія :license',
        link: ':link',
      },
    ],
    [
      ['vi', 'vi-VN'],
      {
        author: 'Bản quyền thuộc về :author',
        license: 'Cấp phép theo :license',
        link: ':link',
      },
    ],
    [
      ['pt', 'pt-PT'],
      {
        author: 'Direitos autorais de :author',
        license: 'Licenciado sob :license',
        link: ':link',
      },
    ],
    [
      ['pl', 'pl-PL'],
      {
        author: 'Prawa autorskie :author',
        license: 'Licencja :license',
        link: ':link',
      },
    ],
    [
      ['sk', 'sk-SK'],
      {
        author: 'Autorské práva :author',
        license: 'Licencia :license',
        link: ':link',
      },
    ],
    [
      ['fr', 'fr-FR'],
      {
        author: 'Copyright par :author',
        license: 'Sous licence :license',
        link: ':link',
      },
    ],
    [
      ['es', 'es-ES'],
      {
        author: 'Derechos de autor :author',
        license: 'Licencia :license',
        link: ':link',
      },
    ],
    [
      ['ja', 'ja-JP'],
      {
        author: '著作権者 :author',
        license: ':license ライセンスに基づく',
        link: ':link',
      },
    ],
    [
      ['tr', 'tr-TR'],
      {
        author: 'Telif hakkı sahibi :author',
        license: 'Lisans :license',
        link: ':link',
      },
    ],
    [
      ['ko', 'ko-KR'],
      {
        author: '저작권자 :author',
        license: ':license 라이선스에 따라',
        link: ':link',
      },
    ],
    [
      ['fi', 'fi-FI'],
      {
        author: 'Tekijänoikeus :author',
        license: 'Lisenssi :license',
        link: ':link',
      },
    ],
    [
      ['de', 'de-DE'],
      {
        author: 'Copyright by :author',
        license: 'Lizenziert unter :license',
        link: ':link',
      },
    ],
    [
      ['hu', 'hu-HU'],
      {
        author: 'Szerzői jog :author',
        license: 'Licenc: :license',
        link: ':link',
      },
    ],
    [
      ['id', 'id-ID'],
      {
        author: 'Hak cipta oleh :author',
        license: 'Di bawah lisensi :license',
        link: ':link',
      },
    ],
    [
      ['nl', 'nl-NL'],
      {
        author: 'Auteursrecht van :author',
        license: 'Licentie onder :license',
        link: ':link',
      },
    ],
  ]
