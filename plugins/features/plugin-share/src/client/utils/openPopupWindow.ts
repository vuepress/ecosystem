/**
 * Open a link in a centered popup window
 *
 * 在居中的弹窗中打开链接
 *
 * @param link - Link to open / 要打开的链接
 * @param target - Window target / 窗口目标
 * @param features - Extra window features / 额外的窗口特性
 */
export const openPopupWindow = (
  link: string,
  target = '_blank',
  features: string[] = ['resizable', 'status'],
): void => {
  const { availWidth, availHeight } = screen
  const { screenLeft, screenTop, innerWidth, innerHeight } = globalThis
  const width = Math.max(availWidth / 2, 600)
  const height = Math.max(availHeight / 2, 400)
  const left = screenLeft + innerWidth / 2 - width / 2
  const top = screenTop + innerHeight / 2 - height / 2
  const popup = globalThis.open(
    link,
    target,
    `width=${width},height=${height},left=${left},top=${top},${features.join(',')}`,
  )

  if (popup) {
    // Prevent the opened page from accessing this window
    popup.opener = null
    popup.focus()
  } else {
    // The popup was blocked, fall back to a new tab
    globalThis.open(link, '_blank', 'noopener,noreferrer')
  }
}
