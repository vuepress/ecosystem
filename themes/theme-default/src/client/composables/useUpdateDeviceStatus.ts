import { useEventListener } from '@vueuse/core'
import { onMounted } from 'vue'
import cssVars from '../styles/_variables.module.scss?module'

export enum DeviceType {
  MOBILE = 'mobile',
}

const DeviceTypeMap = {
  [DeviceType.MOBILE]: Number.parseInt(cssVars.mobile?.replace('px', ''), 10),
}

/**
 * add listener to detect screen though device type
 */
export const useUpdateDeviceStatus = (
  deviceType: DeviceType,
  callback: (width: number) => void,
): void => {
  const width = DeviceTypeMap[deviceType]
  if (!Number.isInteger(width)) {
    if (__VUEPRESS_DEV__) throw new Error('device width must be a integer')
    return
  }

  useEventListener('orientationchange', () => callback(width), false)
  useEventListener('resize', () => callback(width), false)

  onMounted(() => {
    callback(width)
  })
}
