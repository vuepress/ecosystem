/**
 * Check if the user agent indicates iPhone or iPod.
 *
 * 检查用户代理是否表示 iPhone 或 iPod。
 *
 * @returns Whether it's iPhone or iPod / 是否为 iPhone 或 iPod
 */
export const isiPhone = (): boolean =>
  /\b(iPhone|iPod)\b/i.test(navigator.userAgent)

const hasMacUA = (): boolean => /macintosh|mac os x/i.test(navigator.userAgent)

/**
 * Check if the user agent indicates Windows.
 *
 * 检查用户代理是否表示 Windows。
 *
 * @returns Whether it's Windows / 是否为 Windows
 */
export const isWindows = (): boolean =>
  [
    /microsoft (windows) (vista|xp)/i,
    /(win(?=3|9|n)|win 9x )([nt\d.]+)/i,
    /(windows) nt 6\.2; (arm)/i,
    /(windows (?:phone(?: os)?|mobile))[/ ]?([\d.\w ]*)/i,
    /(windows)[/ ]?([ntce\d. ]+\w)(?!.+xbox)/i,
  ].some((item) => item.test(navigator.userAgent))

/**
 * Check if the user agent indicates iPad.
 *
 * 检查用户代理是否表示 iPad。
 *
 * @returns Whether it's iPad / 是否为 iPad
 */
export const isiPad = (): boolean => {
  const isTouch = !!(navigator.maxTouchPoints && navigator.maxTouchPoints > 0)

  return /\b(iPad)\b/i.test(navigator.userAgent) || (hasMacUA() && isTouch)
}

/**
 * Check if the user agent indicates iOS (iPhone, iPad, or iPod).
 *
 * 检查用户代理是否表示 iOS (iPhone, iPad, iPod)。
 *
 * @returns Whether it's iOS / 是否为 iOS
 */
export const isIOS = (): boolean => isiPhone() || isiPad()

/**
 * Check if the user agent indicates macOS.
 *
 * 检查用户代理是否表示 macOS。
 *
 * @returns Whether it's macOS / 是否为 macOS
 */
export const isMacOS = (): boolean => hasMacUA() && !isIOS()

/**
 * Check if the user agent indicates a mobile device.
 *
 * 检查用户代理是否表示移动设备。
 *
 * @returns Whether it's a mobile device / 是否为移动设备
 */
export const isMobile = (): boolean =>
  /\b(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS|FxiOS)\b/i.test(
    navigator.userAgent,
  )

/**
 * Check if the user agent indicates Chrome WebView.
 *
 * 检查用户代理是否表示 Chrome WebView。
 *
 * @returns Whether it's Chrome WebView / 是否为 Chrome WebView
 */
export const isChromeWebView = (): boolean =>
  /(?!Chrom.*OPR)wv\).*?Chrome\//i.test(navigator.userAgent)

/**
 * Check if the user agent indicates Safari.
 *
 * 检查用户代理是否表示 Safari。
 *
 * @returns Whether it's Safari / 是否为 Safari
 */
export const isSafari = (): boolean =>
  /safari/i.test(navigator.userAgent) &&
  !/chrome|crios|fxios|edgios/i.test(navigator.userAgent)

/**
 * Check if the user agent indicates Safari Mobile.
 *
 * 检查用户代理是否表示 Safari Mobile。
 *
 * @returns Whether it's Safari Mobile / 是否为 Safari Mobile
 */
export const isSafariMobile = (): boolean => isSafari() && isMobile()
