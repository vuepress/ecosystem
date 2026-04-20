import type { MermaidOptions } from '../typings/index.js'

let mermaidOptions: MermaidOptions = {}

export const defineMermaidConfig = (options: MermaidOptions): void => {
  mermaidOptions = options
}

/**
 * @returns Mermaid options defined by user / 用户定义的 Mermaid 配置
 * @internal
 */
export const useMermaidOptions = (): MermaidOptions => mermaidOptions
