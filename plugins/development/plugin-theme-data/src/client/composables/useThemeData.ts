import { themeData as themeDataRaw } from '@internal/themeData'
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { ThemeData } from '../../shared/index.js'

declare const __VUE_HMR_RUNTIME__: Record<string, unknown>

/**
 * Theme data ref type
 *
 * 主题数据响应式引用类型
 */
export type ThemeDataRef<T extends ThemeData = ThemeData> = Ref<T>

export const themeData: ThemeDataRef = ref(themeDataRaw)

/**
 * Use theme data
 *
 * 使用主题数据
 *
 * @returns Theme data ref object / 主题数据响应式引用对象
 */
export const useThemeData = <
  T extends ThemeData = ThemeData,
>(): ThemeDataRef<T> => themeData as ThemeDataRef<T>

if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  __VUE_HMR_RUNTIME__.updateThemeData = (data: ThemeData): void => {
    themeData.value = data
  }
}
