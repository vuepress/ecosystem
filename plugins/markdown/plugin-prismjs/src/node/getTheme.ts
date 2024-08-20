import type { PrismjsPluginOptions, PrismjsTheme } from './options.js'

const PRISMJS_THEMES: PrismjsTheme[] = [
  'ateliersulphurpool-light',
  'coldark-cold',
  'coy',
  'duotone-light',
  'ghcolors',
  'gruvbox-light',
  'material-light',
  'one-light',
  'vs',
  'atom-dark',
  'cb',
  'coldark-dark',
  'dark',
  'dracula',
  'duotone-dark',
  'duotone-earth',
  'duotone-forest',
  'duotone-sea',
  'duotone-space',
  'gruvbox-dark',
  'holi',
  'hopscotch',
  'lucario',
  'material-dark',
  'material-oceanic',
  'night-owl',
  'nord',
  'one-dark',
  'pojoaque',
  'shades-of-purple',
  'solarized-dark-atom',
  'tomorrow',
  'vsc-dark-plus',
  'xonokai',
  'z-touch',
]

const isValidTheme = (theme?: string): theme is PrismjsTheme =>
  // @ts-expect-error: Actual assertion here
  PRISMJS_THEMES.includes(theme)

export const getTheme = (
  options: Pick<PrismjsPluginOptions, 'theme' | 'themes'>,
): { light: PrismjsTheme; dark: PrismjsTheme } => ({
  light: isValidTheme(options.themes?.light)
    ? options.themes.light
    : isValidTheme(options.theme)
      ? options.theme
      : 'nord',
  dark: isValidTheme(options.themes?.dark)
    ? options.themes.dark
    : isValidTheme(options.theme)
      ? options.theme
      : 'nord',
})
