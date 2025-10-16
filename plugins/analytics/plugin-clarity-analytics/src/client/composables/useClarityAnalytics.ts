import type { ClarityOptions } from '../../shared/index.js'

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void
  }
}

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

  const script = document.createElement('script')
  script.src = `https://www.clarity.ms/tag/${id}`
  script.async = true
  if (crossOrigin !== undefined) {
    script.crossOrigin = crossOrigin
  }

  document.head.appendChild(script)
}
