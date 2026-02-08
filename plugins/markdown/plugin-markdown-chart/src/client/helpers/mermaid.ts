import type { MermaidOptions } from '../typings/index.js'

let mermaidOptions: MermaidOptions = {}

export const defineMermaidConfig = (options: MermaidOptions): void => {
  mermaidOptions = options
}

/**
 * @internal
 *
 * @returns Mermaid options defined by user / 用户定义的 Mermaid 配置
 */
export const useMermaidOptions = (): MermaidOptions => mermaidOptions
