import type MarkdownIt from 'markdown-it'
import type { MarkdownEnv } from 'vuepress/markdown'

/**
 * Markdown file path getter function type
 *
 * Markdown 文件路径获取器函数类型
 */
export type MarkdownFilePathGetter = () => string

/**
 * Create a function to get current markdown file path
 *
 * 创建获取当前 markdown 文件路径的函数
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 *
 * @returns Function to get current markdown file path / 获取当前 markdown 文件路径的函数
 */
export const createMarkdownFilePathGetter = (
  md: MarkdownIt,
): MarkdownFilePathGetter => {
  const store: { path?: string | null } = {}

  const rawRender = md.render.bind(md)

  // we need to store file path before each render
  md.render = (src, env: MarkdownEnv = {}) => {
    store.path = env.filePathRelative

    return rawRender(src, env)
  }

  return () => store.path || 'dynamic pages'
}
