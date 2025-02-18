import type { DefaultThemeLocaleData } from '../../shared/index.js'

export const fi: DefaultThemeLocaleData = {
  // appearance
  darkModeSwitchLabel: 'Ulkoasu',
  lightModeSwitchTitle: 'Vaihda vaaleaan teemaan',
  darkModeSwitchTitle: 'Vaihda tummaan teemaan',

  selectLanguageText: 'Kielet',
  selectLanguageName: 'Suomi',

  // nav
  returnToTopLabel: 'Palaa ylös',
  sidebarMenuLabel: 'Valikko',
  outlineTitle: 'Tällä sivulla',

  // page meta
  editLinkText: 'Muokkaa tätä sivua',
  lastUpdatedText: 'Viimeksi päivitetty',
  contributorsText: 'Osallistujat',
  docFooter: {
    prev: 'Edellinen sivu',
    next: 'Seuraava sivu',
  },

  // 404 page messages
  notFound: {
    title: 'SIVUA EI LÖYDY',
    quote:
      'Mutta jos et vaihda suuntaasi ja jatkat etsimistä, saatat päätyä sinne, minne olet menossa.',
    linkLabel: 'mene kotiin',
    linkText: 'Vie minut kotiin',
    code: '404',
  },
}
