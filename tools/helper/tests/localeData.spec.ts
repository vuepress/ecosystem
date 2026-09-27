import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

import { describe, expect, it } from 'vitest'

/*
 * Every plugin ships its built-in texts as a `DefaultLocaleInfo` table, so a
 * site should behave the same no matter which plugins it uses.
 *
 * This test enforces the convention documented in `AGENTS.md`: all tables carry
 * the same languages, in the same order, with the same fields and placeholders.
 */

// Canonical languages: `[primary code, accepted codes]`, in order.
const CANONICAL_LANGUAGES: [string, string[]][] = [
  ['en', ['en', 'en-US']],
  ['zh', ['zh', 'zh-CN', 'zh-Hans']],
  ['zh-TW', ['zh-TW', 'zh-Hant']],
  ['de', ['de', 'de-DE']],
  ['de-AT', ['de-AT']],
  ['vi', ['vi', 'vi-VN']],
  ['uk', ['uk', 'uk-UA']],
  ['ru', ['ru', 'ru-RU']],
  ['pt', ['pt', 'pt-PT']],
  ['pt-BR', ['pt-BR']],
  ['pl', ['pl', 'pl-PL']],
  ['sk', ['sk', 'sk-SK']],
  ['fr', ['fr', 'fr-FR']],
  ['es', ['es', 'es-ES']],
  ['it', ['it', 'it-IT']],
  ['ja', ['ja', 'ja-JP']],
  ['tr', ['tr', 'tr-TR']],
  ['ko', ['ko', 'ko-KR']],
  ['fi', ['fi', 'fi-FI']],
  ['hu', ['hu', 'hu-HU']],
  ['id', ['id', 'id-ID']],
  ['nl', ['nl', 'nl-NL']],
]

const CANONICAL_INDEX = new Map(
  CANONICAL_LANGUAGES.map(([code], index) => [code, index]),
)

// Codes that look valid but are typos, mapped to the language they mean.
const INVALID_CODES: Record<string, string | undefined> = {
  'br': 'pt-BR',
  'ko-KO': 'ko-KR',
}

// Repository root, resolved from this file: `tools/helper/tests` -> root.
const REPO_ROOT = path.resolve(import.meta.dirname, '../../..')

const LANGUAGE_CODE = /^[a-z]{2,3}(?:-[A-Za-z0-9]+)*$/u
const LOCALE_INFO_EXPORT = /export const \w*[Ll]ocales?Info/u
const PLACEHOLDER = /\$(?<name>[a-zA-Z0-9]\w*)|:(?<label>\w+)/gu
// `$1:een` is a placeholder with a language specific case suffix
const PLACEHOLDER_WITH_SUFFIX = /\$(?<index>\d+):\w+/gu

// Locale entry of a table, with nested data flattened.
interface LocaleEntry {
  codes: string[]
  fields: Record<string, string>
}

// Flatten nested locale data into `dotted.path -> value`.
const flatten = (value: unknown, prefix = ''): Record<string, string> => {
  if (typeof value === 'string') return prefix ? { [prefix]: value } : {}

  if (!value || typeof value !== 'object') return {}

  const result: Record<string, string> = {}

  for (const [key, child] of Object.entries(value))
    Object.assign(result, flatten(child, prefix ? `${prefix}.${key}` : key))

  return result
}

const findPlaceholders = (value: string): string[] => {
  const normalized = value.replaceAll(PLACEHOLDER_WITH_SUFFIX, '$$$<index>')

  return [...normalized.matchAll(PLACEHOLDER)]
    .map((match) => match[0].toLowerCase())
    .sort()
}

const isSameOrder = (first: string[], second: string[]): boolean =>
  first.length === second.length &&
  first.every((item, index) => item === second[index])

// Canonical code of the language an entry belongs to.
const resolveSlot = (codes: string[]): string => {
  const matched = CANONICAL_LANGUAGES.find(([, aliases]) =>
    aliases.some((alias) => codes.includes(alias)),
  )
  const [primary] = codes

  return matched ? matched[0] : primary
}

// Empty `en` entries are allowed: some clients ship English themselves.
const isBuiltInEnglish = (entry: LocaleEntry): boolean =>
  resolveSlot(entry.codes) === 'en' && Object.keys(entry.fields).length === 0

const findProblems = (entries: LocaleEntry[]): string[] => {
  const problems: string[] = []
  const slots = entries.map((entry) => resolveSlot(entry.codes))

  const missingLanguages = CANONICAL_LANGUAGES.filter(
    ([code]) => !slots.includes(code),
  ).map(([code]) => code)

  if (missingLanguages.length > 0)
    problems.push(`missing languages: ${missingLanguages.join(', ')}`)

  for (const { codes } of entries) {
    for (const code of codes) {
      const suggestion = INVALID_CODES[code]

      if (suggestion)
        problems.push(`invalid code "${code}", use "${suggestion}"`)
      else if (!LANGUAGE_CODE.test(code))
        problems.push(`invalid code "${code}"`)
    }
  }

  const actual = slots.filter((code) => CANONICAL_INDEX.has(code))
  const expected = [...actual].sort(
    (first, second) =>
      CANONICAL_INDEX.get(first)! - CANONICAL_INDEX.get(second)!,
  )

  if (!isSameOrder(actual, expected)) {
    problems.push(
      `languages are out of order, expected "${expected.join(' ')}" but got "${actual.join(' ')}"`,
    )
  }

  // compare against the most complete entry, because `en` may be empty
  const [reference] = [...entries].sort(
    (first, second) =>
      Object.keys(second.fields).length - Object.keys(first.fields).length,
  )

  if (!reference) return problems

  const referenceFields = Object.keys(reference.fields).sort()

  for (const entry of entries) {
    if (isBuiltInEnglish(entry)) continue

    const slot = resolveSlot(entry.codes)
    const fields = Object.keys(entry.fields).sort()
    const missingFields = referenceFields.filter(
      (field) => !fields.includes(field),
    )
    const extraFields = fields.filter(
      (field) => !referenceFields.includes(field),
    )

    if (missingFields.length > 0)
      problems.push(`${slot}: missing fields ${missingFields.join(', ')}`)

    if (extraFields.length > 0)
      problems.push(`${slot}: unexpected fields ${extraFields.join(', ')}`)

    if (missingFields.length > 0 || extraFields.length > 0) continue

    for (const field of referenceFields) {
      const wanted = findPlaceholders(reference.fields[field]).join(' ')
      const got = findPlaceholders(entry.fields[field]).join(' ')

      if (wanted !== got) {
        problems.push(
          `${slot}.${field}: placeholders "${got}" should be "${wanted}"`,
        )
      }
    }
  }

  return problems
}

const collectLocaleFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    if (name.startsWith('.') || name === 'node_modules' || name === 'dist')
      return []

    const fullPath = path.join(dir, name)

    if (statSync(fullPath).isDirectory()) return collectLocaleFiles(fullPath)

    return name === 'locales.ts' ? [fullPath] : []
  })

const checkLocaleTable = async (
  file: string,
): Promise<[file: string, problems: string[]]> => {
  const source = readFileSync(file, 'utf8')

  // only `DefaultLocaleInfo` tables are checked
  if (!LOCALE_INFO_EXPORT.test(source)) return [file, []]

  const module = (await import(pathToFileURL(file).href)) as Record<
    string,
    unknown
  >
  const table = Object.values(module).find((value) => Array.isArray(value)) as
    | [string[], unknown][]
    | undefined

  if (!table || table.length === 0) return [file, []]

  const entries = table.map(([codes, data]) => ({
    codes,
    fields: flatten(data),
  }))

  return [file, findProblems(entries)]
}

// Map of `relative file path -> problems`, only for tables with problems.
const checkLocaleTables = async (): Promise<Record<string, string[]>> => {
  const localeFiles = [
    ...collectLocaleFiles(path.join(REPO_ROOT, 'plugins')),
    ...collectLocaleFiles(path.join(REPO_ROOT, 'tools')),
  ].sort()

  const checked = await Promise.all(
    localeFiles.map((file) => checkLocaleTable(file)),
  )
  const problems: Record<string, string[]> = {}

  for (const [file, issues] of checked)
    if (issues.length > 0) problems[path.relative(REPO_ROOT, file)] = issues

  return problems
}

describe('locale data', () => {
  it('should define the same languages, fields and placeholders in every table', async () => {
    await expect(checkLocaleTables()).resolves.toStrictEqual({})
  })
})
