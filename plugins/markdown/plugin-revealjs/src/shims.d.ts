declare module 'reveal.js/dist/reveal.esm.js' {
  // eslint-disable-next-line import/no-rename-default
  import Reveal from 'reveal.js'

  export default Reveal
}

declare module '@temp/revealjs/index.js' {
  import type { PluginFunction } from 'reveal.js'

  export const useRevealJs: () => [
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    Promise<typeof import('reveal.js/dist/reveal.esm.js')>,
    ...Promise<{ default: PluginFunction }>[],
  ]
}

declare module '*.css' {
  export {}
}
