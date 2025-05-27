import type { DemoOptions } from '../../shared/index.js'

export interface CodeInfo {
  html: [] | [code: string, type: string]
  js: [] | [code: string, type: string]
  css: [] | [code: string, type: string]
  isLegal: boolean
}

export interface DemoInfo extends DemoOptions {
  html: string
  js: string
  css: string
  isLegal: boolean
  jsx?: boolean
  getScript: () => string
}
