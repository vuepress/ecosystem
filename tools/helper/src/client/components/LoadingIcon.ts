import type { FunctionalComponent, VNode } from 'vue'
import { h } from 'vue'
import { encodeSVG } from '../utils/index.js'

const getLength = (size: number | string): string =>
  typeof size === 'number' ? `${size}px` : size

export interface LoadingIconProps {
  /**
   * The size of the loading icon, default to 48
   */
  size?: number
  /**
   * The stroke width of the loading icon, default to 4
   */
  stroke?: number
  /**
   * Whether to wrap the loading icon with a div, default to true
   */
  wrapper?: boolean
  /**
   * The height of the wrapper div, default to 2 times the size of the loading icon
   */
  height?: number | string
}

/**
 * Loading icon
 *
 * 加载图标
 *
 * @returns A loading icon component
 *
 * @example
 *
 * ```html
 * <LoadingIcon :size="64" :stroke="6" :wrapper="false" />
 * ```
 */
export const LoadingIcon: FunctionalComponent<LoadingIconProps> = ({
  size = 48,
  stroke = 4,
  wrapper = true,
  height = 2 * size,
}): VNode => {
  const LOADING_ICON = `<svg preserveAspectRatio="xMidYMid" viewBox="25 25 50 50"><animateTransform attributeName="transform" type="rotate" dur="2s" keyTimes="0;1" repeatCount="indefinite" values="0;360"></animateTransform><circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round"><animate attributeName="stroke-dasharray" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1,200;90,200;1,200"></animate><animate attributeName="stroke-dashoffset" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="0;-35px;-125px"></animate></circle></svg>`

  const icon = h('span', {
    style: `\
--loading-icon: url("${encodeSVG(LOADING_ICON)}");\
--icon-size: ${getLength(size)};\
display: inline-block;\
width: var(--icon-size);\
height: var(--icon-size);\
background-color: currentcolor;\
-webkit-mask-image: var(--loading-icon);\
mask-image: var(--loading-icon)\
`,
  })

  return wrapper
    ? h(
        'div',
        {
          style: `\
display: flex;\
align-items: center;\
justify-content: center;\
height: ${getLength(height)}\
`,
        },
        icon,
      )
    : icon
}

LoadingIcon.displayName = 'LoadingIcon'
