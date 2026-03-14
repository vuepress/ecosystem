declare module '@temp/revealjs/index.js' {
  import type { PluginFunction } from 'reveal.js'
  import type Reveal from 'reveal.js'

  export const useRevealJs: () => Promise<[typeof Reveal, ...PluginFunction[]]>
}
