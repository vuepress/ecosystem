const POPUP_CONTAINER_ID = 'vp-share-popup-container'

let popupId = 0
let keydownBound = false
const popups = new Map<number, HTMLElement>()

const getContainer = (): HTMLElement => {
  const existing = document.querySelector<HTMLElement>(`#${POPUP_CONTAINER_ID}`)

  if (existing) return existing

  const container = document.createElement('div')

  container.id = POPUP_CONTAINER_ID
  document.body.append(container)

  return container
}

const removeContainer = (): void => {
  if (keydownBound) {
    // oxlint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', handleKeydown)
    keydownBound = false
  }

  document.querySelector(`#${POPUP_CONTAINER_ID}`)?.remove()
}

const closePopup = (id: number): void => {
  const wrapper = popups.get(id)

  if (!wrapper) return

  wrapper.classList.add('vp-share-popup-leave')

  const remove = (): void => {
    wrapper.remove()
    popups.delete(id)

    if (popups.size === 0) removeContainer()
  }

  wrapper.addEventListener('animationend', remove, { once: true })
  // Remove the popup even if the animation is disabled
  setTimeout(remove, 300)
}

const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') for (const id of popups.keys()) closePopup(id)
}

const bindKeydown = (): void => {
  if (keydownBound) return

  document.addEventListener('keydown', handleKeydown)
  keydownBound = true
}

const emitPopup = (html: string): number => {
  // Only one popup is shown at a time
  for (const wrapper of popups.values()) wrapper.remove()

  popups.clear()

  popupId += 1

  const id = popupId
  const wrapper = document.createElement('div')
  const content = document.createElement('div')

  wrapper.className = 'vp-share-popup-wrapper'
  wrapper.addEventListener('click', (event) => {
    if (event.target === wrapper) closePopup(id)
  })
  content.className = 'vp-share-popup-content'
  content.innerHTML = html
  content.setAttribute('role', 'dialog')
  content.setAttribute('aria-modal', 'true')
  content.setAttribute('tabindex', '-1')
  content.addEventListener('click', (event) => {
    event.stopPropagation()
  })
  wrapper.append(content)
  getContainer().append(wrapper)
  popups.set(id, wrapper)
  content.focus()
  bindKeydown()

  return id
}

/**
 * Popup manager for share content
 *
 * 分享内容的弹窗管理器
 */
export class Popup {
  /**
   * Emit a popup with the given HTML content
   *
   * 显示包含给定 HTML 内容的弹窗
   *
   * @param html - HTML content of the popup / 弹窗的 HTML 内容
   * @returns ID of the popup / 弹窗的 ID
   */
  // oxlint-disable-next-line class-methods-use-this
  emit(html: string): number {
    return emitPopup(html)
  }

  /**
   * Close a popup, or all popups when no ID is given
   *
   * 关闭指定弹窗，未提供 ID 时关闭全部弹窗
   *
   * @param id - ID of the popup / 弹窗的 ID
   */
  // oxlint-disable-next-line class-methods-use-this
  close(id?: number): void {
    if (typeof id === 'number') closePopup(id)
    else for (const popup of popups.keys()) closePopup(popup)
  }
}
