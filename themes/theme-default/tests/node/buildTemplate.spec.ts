// @vitest-environment happy-dom
import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it, vi } from 'vitest'

const template = readFileSync(
  path.resolve(import.meta.dirname, '../../templates/build.html'),
  'utf8',
)

// the inline script is the only one in the template, it applies the theme
// before the first paint
const script =
  /<script[^>]*>(?<script>[\s\S]*?)<\/script\b[^>]*>/iu.exec(template)?.groups
    ?.script ?? ''

const renderFirstPaint = (appearance: string, storage?: string): string => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: false })),
  )

  document.documentElement.dataset.appearance = appearance
  delete document.documentElement.dataset.theme

  localStorage.clear()
  if (storage !== undefined)
    localStorage.setItem('vuepress-color-scheme', storage)

  // oxlint-disable-next-line eslint/no-eval -- the inline template script must be executed verbatim
  globalThis.eval(script)

  return document.documentElement.dataset.theme!
}

describe('build template appearance', () => {
  it('should paint the stored preference over the initial light mode', () => {
    expect(renderFirstPaint('light', 'dark')).toBe('dark')
    expect(renderFirstPaint('light')).toBe('light')
    expect(renderFirstPaint('dark', 'light')).toBe('light')
  })

  it('should ignore the stored preference for a fixed appearance', () => {
    expect(renderFirstPaint('force-light', 'dark')).toBe('light')
    expect(renderFirstPaint('force-dark', 'light')).toBe('dark')
  })

  it('should follow the stored preference for the auto appearance', () => {
    expect(renderFirstPaint('auto', 'dark')).toBe('dark')
    expect(renderFirstPaint('auto')).toBe('light')
  })
})
