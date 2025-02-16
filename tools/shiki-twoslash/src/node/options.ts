import type { RendererRichOptions } from '@shikijs/twoslash'
import type { TransformerTwoslashOptions } from '@shikijs/twoslash/core'
import type { TwoslashReturn } from 'twoslash'
import type { VueSpecificOptions } from 'twoslash-vue'

export interface TwoslashFloatingVueOptions {
  classCopyIgnore?: string
  classFloatingPanel?: string
  classCode?: string
  classMarkdown?: string
  attrMarkdown?: string

  floatingVueTheme?: string
  floatingVueThemeQuery?: string
  floatingVueThemeCompletion?: string
}

export interface TwoslashFloatingVueRendererOptions
  extends RendererRichOptions {
  /**
   * Class and themes for floating-vue specific nodes
   */
  floatingVue?: TwoslashFloatingVueOptions
}

export interface ShikiTwoslashOptions
  extends TransformerTwoslashOptions,
    TwoslashFloatingVueRendererOptions {
  /**
   * Twoslash options
   */
  twoslashOptions?: TransformerTwoslashOptions['twoslashOptions'] &
    VueSpecificOptions
  /**
   * Requires adding `twoslash` to the code block explicitly to run twoslash
   *
   * @default true
   */
  explicitTrigger?: TransformerTwoslashOptions['explicitTrigger']

  /**
   * The options for caching resolved types
   */
  typesCache?: TwoslashTypesCache | false
}

export interface TwoslashTypesCache {
  /**
   * Read cached result
   *
   * @param code Source code
   */
  read: (code: string) => TwoslashReturn | null

  /**
   * Save result to cache
   *
   * @param code Source code
   * @param data Twoslash data
   */
  write: (code: string, data: TwoslashReturn) => void

  /**
   * On initialization
   */
  init?: () => void
}
