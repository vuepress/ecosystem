import { isString } from '@vuepress/helper/client'
import { useEventListener } from '@vueuse/core'
import type { MaybeRef, Ref, ShallowRef } from 'vue'
import { computed, isRef, onMounted, ref, shallowRef, unref, watch } from 'vue'

const getValue = (value: number | string): string =>
  isString(value) && /(?:%|px|em|rem|vh|vw|auto)$/iu.test(value)
    ? value
    : `${value}px`

export interface SizeOptions {
  width: number | string | undefined
  height: number | string | undefined
  ratio: number | string | undefined
}

export interface SizeInfo<El extends HTMLElement> {
  el: ShallowRef<El | undefined>
  width: Ref<string>
  height: Ref<string>
  resize: () => void
}

const getRadio = (ratio: number | string | undefined): number => {
  if (isString(ratio)) {
    const [radioWidth, radioHeight] = ratio.split(':')
    const parsedRadio = Number(radioWidth) / Number(radioHeight)

    if (!Number.isNaN(parsedRadio)) return parsedRadio
  }

  return typeof ratio === 'number' ? ratio : 16 / 9
}

export const useSize = <El extends HTMLElement>(
  options: SizeOptions,
  extraHeight: MaybeRef<number> = 0,
): SizeInfo<El> => {
  const el = shallowRef<El>()
  const width = computed(() => getValue(unref(options.width) ?? '100%'))
  const height = ref('auto')

  const getHeight = (widthValue: number): string => {
    const heightValue = unref(options.height)
    const ratio = getRadio(unref(options.ratio))

    return heightValue
      ? getValue(heightValue)
      : `${widthValue / ratio + unref(extraHeight)}px`
  }

  const updateHeight = (): void => {
    if (el.value) height.value = getHeight(el.value.clientWidth)
  }

  onMounted(() => {
    updateHeight()
    if (isRef(extraHeight)) watch(extraHeight, updateHeight)
    useEventListener('orientationchange', updateHeight)
    useEventListener('resize', updateHeight)
  })

  return {
    el,
    width,
    height,
    resize: updateHeight,
  }
}
