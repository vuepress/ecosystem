declare module '@temp/media/artplayer.js' {
  import type { I18n } from 'artplayer'
  import type Artplayer from 'artplayer'

  const ArtPlayer: typeof Artplayer
  export default ArtPlayer

  export const i18n: I18n
}
