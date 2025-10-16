import type { Option as ArtPlayerInitOptions } from 'artplayer'

export type ArtPlayerOptions = Partial<
  Omit<
    ArtPlayerInitOptions,
    | 'container'
    | 'contextmenu'
    | 'controls'
    | 'customType'
    | 'layers'
    | 'plugins'
    | 'settings'
    | 'type'
    | 'url'
  >
>
