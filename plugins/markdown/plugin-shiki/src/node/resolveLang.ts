// oxlint-disable no-unexpected-multiline
import type {
  DynamicImportLanguageRegistration,
  LanguageRegistration,
} from 'shiki'
import { bundledLanguages } from 'shiki'
import { runAsWorker } from 'synckit'

const resolveLang = async (lang: string): Promise<LanguageRegistration[]> =>
  (
    bundledLanguages as Record<
      string,
      DynamicImportLanguageRegistration | undefined
    >
  )
    [lang]?.()
    .then((mod) => mod.default) ?? []

runAsWorker(resolveLang)

export type ShikiResolveLang = typeof resolveLang
