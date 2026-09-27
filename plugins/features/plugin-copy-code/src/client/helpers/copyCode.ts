import { watchImmediate } from '@vueuse/core'
import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, isRef, ref, toValue } from 'vue'
import { isFunction } from 'vuepress/shared'

import type { CopyCodeClientOptions } from '../types.js'

/**
 * Default selector of code blocks
 *
 * 代码块默认选择器
 */
const DEFAULT_SELECTOR = '[vp-content] div[class*="language-"] pre'

/**
 * Default selector of inline code
 *
 * 行内代码默认选择器
 */
const DEFAULT_INLINE_SELECTOR = '[vp-content] :not(pre) > code'

/**
 * Copy code options used at runtime
 *
 * 运行时使用的复制代码选项
 */
export interface ResolvedCopyCodeOptions {
  selector: string
  ignoreSelector: string
  inlineSelector: string
  duration: number
  showInMobile: boolean
  transform?: (preElement: HTMLPreElement) => void
}

const copyCodeOptions = ref<CopyCodeClientOptions>({})

const resolveSelector = (
  selector: string[] | string | undefined,
  fallback = '',
): string =>
  Array.isArray(selector) ? selector.join(',') : (selector ?? fallback)

const resolveInlineSelector = (
  inline: boolean | string[] | string | undefined,
): string => {
  if (Array.isArray(inline)) return inline.join(',')
  if (typeof inline === 'string') return inline

  return inline ? DEFAULT_INLINE_SELECTOR : ''
}

/**
 * Define additional copy code configuration in the client-side.
 *
 * 在客户端定义额外的复制代码配置。
 *
 * In most cases, the majority of options should be defined in Node, but there
 * are some special situations. For example, it may be necessary to pass in
 * callbacks like `transform`, or to determine the options according to the
 * client context.
 *
 * 通常来说，大部分选项应该在 Node 中定义，但存在一些特殊情况。例如需要传入 `transform` 之类的回调函数，或者需要根据客户端环境来决定选项。
 *
 * Options defined here will override the ones defined in Node.
 *
 * 此处定义的选项会覆盖在 Node 中定义的选项。
 *
 * @example
 *   import { defineCopyCodeConfig } from '@vuepress/plugin-copy-code/client'
 *
 *   defineCopyCodeConfig({
 *     transform: (preElement) => {
 *       // Remove all `.ignore` elements
 *       preElement.querySelectorAll('.ignore').forEach((el) => el.remove())
 *       // insert copyright
 *       preElement.innerHTML += `\n Copied by VuePress`
 *     },
 *   })
 *
 * @param config - Copy code options / 复制代码选项
 */
export const defineCopyCodeConfig = (
  config: MaybeRefOrGetter<CopyCodeClientOptions>,
): void => {
  if (isRef(config)) {
    watchImmediate(config, (value) => {
      copyCodeOptions.value = value
    })
  } else if (isFunction(config)) {
    watchImmediate(computed(config), (value) => {
      copyCodeOptions.value = value
    })
  } else {
    copyCodeOptions.value = config
  }
}

/**
 * Resolve copy code options
 *
 * 解析复制代码选项
 *
 * @param options - Copy code options from Node / Node 中定义的复制代码选项
 * @returns Resolved copy code options / 解析后的复制代码选项
 * @internal
 */
export const useCopyCodeOptions = (
  options: MaybeRefOrGetter<CopyCodeClientOptions>,
): ComputedRef<ResolvedCopyCodeOptions> =>
  computed(() => {
    const baseOptions = toValue(options)
    const userOptions = copyCodeOptions.value
    const inline = userOptions.inline ?? baseOptions.inline

    return {
      selector: resolveSelector(
        userOptions.selector ?? baseOptions.selector,
        DEFAULT_SELECTOR,
      ),
      ignoreSelector: resolveSelector(
        userOptions.ignoreSelector ?? baseOptions.ignoreSelector,
      ),
      inlineSelector: resolveInlineSelector(inline),
      duration: userOptions.duration ?? baseOptions.duration ?? 2000,
      showInMobile:
        userOptions.showInMobile ?? baseOptions.showInMobile ?? false,
      transform: userOptions.transform ?? baseOptions.transform,
    }
  })
