import type { ClarityOptions } from '../../shared/index.js'
import './declare.js'

/**
 * Initialize Clarity Analytics tracking
 *
 * 初始化 Clarity Analytics 追踪
 *
 * @param options - Clarity Analytics options
 *
 * @description Injects Clarity tracking script and configures tracking behavior.
 * The global `clarity()` function will be available for custom event tracking.
 *
 * 注入 Clarity 追踪脚本并配置追踪行为。
 * 全局 `clarity` 函数可用于自定义事件追踪。
 *
 * @see https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api
 */
export const useClarityAnalytics = ({
  id,
  crossOrigin,
}: ClarityOptions): void => {
  // avoid duplicated import
  if ('clarity' in window) return

  // init clarity
  // eslint-disable-next-line func-names
  window.clarity = function () {
    // @ts-expect-error: Property 'q' does not exist on type
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, prefer-rest-params
    ;(window.clarity.q = window.clarity.q ?? []).push(arguments)
  }

  const script = document.createElement('script')
  script.src = `https://www.clarity.ms/tag/${id}`
  script.async = true
  if (crossOrigin !== undefined) {
    script.crossOrigin = crossOrigin
  }

  document.head.append(script)
}
