const MOBILE_USERAGENT_REGEXP =
  /\b(?:Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini)/i

export const isMobile = (): boolean =>
  typeof window !== 'undefined' &&
  window.navigator &&
  'userAgent' in window.navigator &&
  MOBILE_USERAGENT_REGEXP.test(navigator.userAgent)
