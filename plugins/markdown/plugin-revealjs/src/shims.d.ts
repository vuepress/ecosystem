/* eslint-disable import/no-rename-default */
declare module 'reveal.js/dist/reveal.esm.js' {
  import type Reveal from 'reveal.js'

  export default Reveal
}

declare module '@temp/revealjs/index.js' {
  import type { PluginFunction } from 'reveal.js'
  import type Reveal from 'reveal.js'

  export const useRevealJs: () => Promise<[typeof Reveal, ...PluginFunction[]]>
}
