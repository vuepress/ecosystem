import type { FunctionalComponent, VNode } from 'vue'
import { h } from 'vue'
import { encodeSVG } from '../utils/index.js'

const getLength = (size: number | string): string =>
  typeof size === 'number' ? `${size}px` : size

/**
 * Loading icon
 *
 * 加载图标
 */
export const LoadingIcon: FunctionalComponent<{
  size?: number
  stroke?: number
  wrapper?: boolean
  height?: number | string
}> = ({ size = 48, stroke = 4, wrapper = true, height = 2 * size }): VNode => {
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
