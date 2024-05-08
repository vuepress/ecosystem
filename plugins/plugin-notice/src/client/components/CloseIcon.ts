import type { FunctionalComponent } from 'vue'
import { h } from 'vue'

export const CloseIcon: FunctionalComponent = () =>
  h(
    'svg',
    {
      'xmlns': 'http://www.w3.org/2000/svg',
      'class': 'close-icon',
      'viewBox': '0 0 1024 1024',
      'fill': 'currentColor',
      'aria-label': 'close icon',
    },
    h('path', {
      d: 'm925.468 822.294-303.27-310.288L925.51 201.674c34.683-27.842 38.3-75.802 8.122-107.217-30.135-31.37-82.733-34.259-117.408-6.463L512.001 399.257 207.777 87.993C173.1 60.197 120.504 63.087 90.369 94.456c-30.179 31.415-26.561 79.376 8.122 107.217L401.8 512.005l-303.27 310.29c-34.724 27.82-38.34 75.846-8.117 107.194 30.135 31.437 82.729 34.327 117.408 6.486L512 624.756l304.177 311.22c34.68 27.84 87.272 24.95 117.408-6.487 30.223-31.348 26.56-79.375-8.118-107.195z',
    }),
  )

CloseIcon.displayName = 'CloseIcon'
