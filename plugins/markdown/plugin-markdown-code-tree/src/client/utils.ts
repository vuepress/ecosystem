import type { InjectionKey, Ref } from 'vue'

/**
 * Injection key of the current active file path
 *
 * 当前激活文件路径的注入 key
 */
export const activeFileKey: InjectionKey<Ref<string>> =
  Symbol('codeTreeActiveFile')
