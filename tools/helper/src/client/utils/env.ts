import { isBoolean } from '../../shared/index.js'

interface NavigatorUAData {
  platform?: string
  mobile?: boolean
}

declare global {
  interface Navigator {
    userAgentData?: NavigatorUAData
  }
}

const getPlatform = (): string =>
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  navigator.userAgentData?.platform ?? navigator.platform
const getUA = (): string => navigator.userAgent

/**
 * Check if the user device is iPhone or iPod.
 *
 * 检查用户设备是否为 iPhone 或 iPod。
 *
 * @returns Whether it's iPhone or iPod / 是否为 iPhone 或 iPod
 */
export const isiPhone = (): boolean => /\biPhone\b/i.test(getPlatform())

/**
 * Check if the user device is Windows.
 *
 * 检查用户设备是否为 Windows。
 *
 * @returns Whether it's Windows / 是否为 Windows
 */
export const isWindows = (): boolean =>
  /\b(Windows|Win32)\b/i.test(getPlatform())

/**
 * Check if the user device is iPad.
 *
 * 检查用户设备是否为 iPad。
 *
 * @returns Whether it's iPad / 是否为 iPad
 */
export const isiPad = (): boolean => /\biPad\b/i.test(getPlatform())
/**
 * Check if the user device is iOS (iPhone, iPad, or iPod).
 *
 * 检查用户设备是否为 iOS (iPhone, iPad, iPod)。
 *
 * @returns Whether it's iOS / 是否为 iOS
 */
export const isIOS = (): boolean =>
  // UA-CH platform says iOS, or legacy detections
  /ios/i.test(getPlatform()) || isiPhone() || isiPad()

/**
 * Check if the user device is macOS.
 *
 * 检查用户设备是否为 macOS。
 *
 * @returns Whether it's macOS / 是否为 macOS
 */
export const isMacOS = (): boolean => {
  const platform = getPlatform()

  if (platform) return /mac/i.test(platform)

  // Explicit macOS platform or legacy UA, while excluding iOS (iPadOS desktop UA)
  return /macintosh|mac os x/i.test(getUA()) && !isIOS()
}

/**
 * Check if the user device is a mobile device.
 *
 * 检查用户设备是否为移动设备。
 *
 * @returns Whether it's a mobile device / 是否为移动设备
 */
export const isMobile = (): boolean => {
  // Use UA-CH first if available
  const uaDataMobile = navigator.userAgentData?.mobile

  if (isBoolean(uaDataMobile)) return uaDataMobile

  // Fallback to UA
  return /\b(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|CriOS|FxiOS)\b/i.test(
    getUA(),
  )
}

/**
 * Check if the user device is Safari.
 *
 * 检查用户设备是否为 Safari。
 *
 * @returns Whether it's Safari / 是否为 Safari
 */
export const isSafari = (): boolean => {
  const ua = getUA()

  return (
    /safari/i.test(ua) &&
    // Safari has 'Safari' but not these chromium/gecko/edge/opera flavors
    !/chrome|crios|fxios|edgios|edg|opr|opera|ucbrowser|qqbrowser|baidubrowser/i.test(
      ua,
    )
  )
}
