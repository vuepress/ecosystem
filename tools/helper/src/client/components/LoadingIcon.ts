import type { FunctionalComponent, VNode } from 'vue'
import { h } from 'vue'

const getLength = (size: number | string): string =>
  typeof size === 'number' ? `${size}px` : size

/**
 * Loading icon
 */
export const LoadingIcon: FunctionalComponent<{
  size?: number
  stroke?: number
  wrapper?: boolean
  height?: number | string
}> = ({ size = 48, stroke = 4, wrapper = true, height = 2 * size }): VNode => {
  const icon = h('span', {
    style: `\
--loading-icon: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid' viewBox='25 25 50 50'%3E%3CanimateTransform attributeName='transform' type='rotate' dur='2s' keyTimes='0;1' repeatCount='indefinite' values='0;360'%3E%3C/animateTransform%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='currentColor' stroke-width='${stroke}' stroke-linecap='round'%3E%3Canimate attributeName='stroke-dasharray' dur='1.5s' keyTimes='0;0.5;1' repeatCount='indefinite' values='1,200;90,200;1,200'%3E%3C/animate%3E%3Canimate attributeName='stroke-dashoffset' dur='1.5s' keyTimes='0;0.5;1' repeatCount='indefinite' values='0;-35px;-125px'%3E%3C/animate%3E%3C/circle%3E%3C/svg%3E");
--icon-size: ${getLength(size)};
display: inline-block;
width: var(--icon-size);
height: var(--icon-size);
background-color: currentcolor;
-webkit-mask-image: var(--loading-icon);
mask-image: var(--loading-icon);
`,
  })

  return wrapper
    ? h(
        'div',
        {
          style: `\
display: flex;
align-items: center;
justify-content: center;
height: ${getLength(height)}`,
        },
        icon,
      )
    : icon
}

LoadingIcon.displayName = 'LoadingIcon'
