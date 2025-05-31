import { throttleAndDebounce } from '@theme/throttleAndDebounce'
import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'

export type GridSetting = Record<string, [number, number][]>

export type GridSize = 'big' | 'medium' | 'mini' | 'small' | 'xmini'

export interface UseSponsorsGridOptions {
  el: Ref<HTMLElement | null>
  size?: GridSize
}

/**
 * Defines grid configuration for each sponsor size in tuple.
 *
 * [Screen width, Column size]
 *
 * It sets grid size on matching screen size. For example, `[768, 5]` will
 * set 5 columns when screen size is bigger or equal to 768px.
 *
 * Column will set only when item size is bigger than the column size. For
 * example, even we define 5 columns, if we only have 1 sponsor yet, we would
 * like to show it in 1 column to make it stand out.
 */
const GridSettings: GridSetting = {
  xmini: [[0, 2]],
  mini: [],
  small: [
    [920, 6],
    [768, 5],
    [640, 4],
    [480, 3],
    [0, 2],
  ],
  medium: [
    [960, 5],
    [832, 4],
    [640, 3],
    [480, 2],
  ],
  big: [
    [832, 3],
    [640, 2],
  ],
}

const setGridData = (el: HTMLElement, value: number): void => {
  el.dataset.vpGrid = String(value)
}

const setGrid = (el: HTMLElement, size: GridSize, items: number): number => {
  const settings = GridSettings[size]
  const screen = window.innerWidth

  let grid = 1

  settings.some(([breakpoint, value]) => {
    if (screen >= breakpoint) {
      grid = items < value ? items : value
      return true
    }
    return false
  })

  setGridData(el, grid)

  return grid
}

const addSlots = (el: HTMLElement, count: number): void => {
  for (let i = 0; i < count; i++) {
    const slot = document.createElement('div')

    slot.classList.add('vp-sponsor-grid-item', 'empty')

    el.append(slot)
  }
}

const removeSlots = (el: HTMLElement, count: number): void => {
  for (let i = 0; i < count; i++) {
    el.removeChild(el.lastElementChild!)
  }
}

const neutralizeSlots = (el: HTMLElement, count: number): void => {
  if (count === 0) {
    return
  }

  if (count > 0) {
    addSlots(el, count)
  } else {
    removeSlots(el, count * -1)
  }
}

const manageSlots = (
  el: HTMLElement,
  grid: number,
  tsize: number,
  asize: number,
): void => {
  const diff = tsize - asize
  const rem = asize % grid
  const drem = rem === 0 ? rem : grid - rem

  neutralizeSlots(el, drem - diff)
}

const adjustSlots = (el: HTMLElement, size: GridSize): void => {
  const tsize = el.children.length
  const asize = el.querySelectorAll('.vp-sponsor-grid-item:not(.empty)').length

  const grid = setGrid(el, size, asize)

  manageSlots(el, grid, tsize, asize)
}

export const useSponsorsGrid = ({
  el,
  size = 'medium',
}: UseSponsorsGridOptions): void => {
  const manage = (): void => {
    adjustSlots(el.value!, size)
  }

  const onResize = throttleAndDebounce(manage, 100)

  onMounted(() => {
    manage()
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })
}
