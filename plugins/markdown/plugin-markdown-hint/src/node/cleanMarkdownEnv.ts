import type { MarkdownEnv } from 'vuepress/markdown'

export type ClearMarkdownEnv = MarkdownEnv & {
  references?: unknown
}

export const cleanMarkdownEnv = (env: ClearMarkdownEnv): ClearMarkdownEnv => ({
  filePath: env.filePath,
  filePathRelative: env.filePathRelative,
  base: env.base,
  references: env.references,
})
