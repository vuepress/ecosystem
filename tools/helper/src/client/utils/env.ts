/**
 * Check if the user agent indicates a mobile device
 *
 * 检查用户代理是否表示移动设备
 *
 * @param ua - User agent string / 用户代理字符串
 *
 * @returns Whether it's a mobile device / 是否为移动设备
 */
export const isMobile = (ua: string): boolean =>
  /\b(?:Android|iPhone)/i.test(ua)

/**
 * Check if the user agent indicates Chrome WebView
 *
 * 检查用户代理是否表示 Chrome WebView
 *
 * @param ua - User agent string / 用户代理字符串
 *
 * @returns Whether it's Chrome WebView / 是否为 Chrome WebView
 */
export const isChromeWebView = (ua: string): boolean =>
  / wv\).+(chrome)\/([\w.]+)/i.test(ua)

/**
 * Check if the user agent indicates Safari Mobile
 *
 * 检查用户代理是否表示 Safari Mobile
 *
 * @param ua - User agent string / 用户代理字符串
 *
 * @returns Whether it's Safari Mobile / 是否为 Safari Mobile
 */
export const isSafariMobile = (ua: string): boolean =>
  /version\/([\w.]+) .*mobile\/\w+ (safari)/i.test(ua)

/**
 * Check if the user agent indicates Safari
 *
 * 检查用户代理是否表示 Safari
 *
 * @param ua - User agent string / 用户代理字符串
 *
 * @returns Whether it's Safari / 是否为 Safari
 */
export const isSafari = (ua: string): boolean =>
  /version\/([\w.]+) .*(mobile ?safari|safari)/i.test(ua)

/**
 * Check if the user agent indicates iPhone
 *
 * 检查用户代理是否表示 iPhone
 *
 * @param ua - User agent string / 用户代理字符串
 *
 * @returns Whether it's iPhone / 是否为 iPhone
 */
export const isiPhone = (ua: string): boolean =>
  /\((ip(?:hone|od)[\w ]*);/i.test(ua)

/**
 * Check if the user agent indicates iPad
 *
 * 检查用户代理是否表示 iPad
 *
 * @param ua - User agent string / 用户代理字符串
 *
 * @returns Whether it's iPad / 是否为 iPad
 */
export const isiPad = (ua: string): boolean =>
  [
    /\((ipad);[-\w),; ]+apple/i,
    /applecoremedia\/[\w.]+ \((ipad)/i,
    /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
  ].some((item) => item.test(ua))

/**
 * Check if the user agent indicates Windows
 *
 * 检查用户代理是否表示 Windows
 *
 * @param ua - User agent string / 用户代理字符串
 *
 * @returns Whether it's Windows / 是否为 Windows
 */
export const isWindows = (ua: string): boolean =>
  [
    /microsoft (windows) (vista|xp)/i,
    /(win(?=3|9|n)|win 9x )([nt\d.]+)/i,
    /(windows) nt 6\.2; (arm)/i,
    /(windows (?:phone(?: os)?|mobile))[/ ]?([\d.\w ]*)/i,
    /(windows)[/ ]?([ntce\d. ]+\w)(?!.+xbox)/i,
  ].some((item) => item.test(ua))

/**
 * Check if the user agent indicates iOS
 *
 * 检查用户代理是否表示 iOS
 *
 * @param ua - User agent string / 用户代理字符串
 *
 * @returns Whether it's iOS / 是否为 iOS
 */
export const isIOS = (ua: string): boolean =>
  [
    /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
    /cfnetwork\/.+darwin/i,
  ].some((item) => item.test(ua))

/**
 * Check if the user agent indicates macOS
 *
 * 检查用户代理是否表示 macOS
 *
 * @param ua - User agent string / 用户代理字符串
 *
 * @returns Whether it's macOS / 是否为 macOS
 */
export const isMacOS = (ua: string): boolean =>
  [/(mac os x) ?([\w. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i].some(
    (item) => item.test(ua),
  )
