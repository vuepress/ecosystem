// oxlint-disable promise/prefer-await-to-callbacks
import { useEventListener } from '@vueuse/core'
import { onMounted } from 'vue'
import cssVariables from '../styles/_variables.module.scss'

export enum DeviceType {
  Mobile = 'mobile',
}

const DeviceTypeMap = {
  [DeviceType.Mobile]: Number.parseInt(
    cssVariables.mobile.replace('px', ''),
    10,
  ),
}

/**
 * add listener to detect screen though device type
 *
 * @param deviceType - Device type to detect / 要检测的设备类型
 * @param callback - Callback function to call when device status changes / 设备状态改变时调用的回调函数
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

  useEventListener('orientationchange', () => {
    callback(width)
  })
  useEventListener('resize', () => {
    callback(width)
  })

  onMounted(() => {
    callback(width)
  })
}
