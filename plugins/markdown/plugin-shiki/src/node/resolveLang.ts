import type {
  DynamicImportLanguageRegistration,
  LanguageRegistration,
} from 'shiki'
import { bundledLanguages } from 'shiki'
import { runAsWorker } from 'synckit'

async function resolveLang(lang: string): Promise<LanguageRegistration[]> {
  return (
    (
      bundledLanguages as Record<
        string,
        DynamicImportLanguageRegistration | undefined
      >
    )
      [lang]?.()
      .then((m) => m.default) ?? []
  )
}

runAsWorker(resolveLang)

export type ShikiResolveLang = typeof resolveLang
