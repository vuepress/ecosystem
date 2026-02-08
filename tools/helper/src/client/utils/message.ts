import { keys } from '../../shared/index.js'

const containerId = 'message-container'

/**
 * Message utility class for displaying toast messages
 *
 * 用于显示提示消息的消息工具类
 */
export class Message {
  private elements: Record<number, HTMLDivElement>

  public constructor() {
    this.elements = {}
  }

  /**
   * Get the message container element
   *
   * 获取消息容器元素
   *
   * @returns Message container element / 消息容器元素
   */
  public static get containerElement(): HTMLElement {
    let containerElement = document.querySelector<HTMLElement>(
      `#${containerId}`,
    )

    if (containerElement) return containerElement

    containerElement = document.createElement('div')
    containerElement.id = containerId
    document.body.append(containerElement)

    return containerElement
  }

  /**
   * Get message element by ID
   *
   * 根据 ID 获取消息元素
   *
   * @param messageId - Message ID / 消息 ID
   *
   * @returns Message element / 消息元素
   */
  public getElement(messageId: number): HTMLDivElement {
    return this.elements[messageId]
  }

  /**
   * Pop a new message
   *
   * 弹出新消息
   *
   * @param html - Message HTML content / 消息 HTML 内容
   * @param duration - Duration to display in milliseconds / 显示持续时间（毫秒）
   * @param clickToClose - Whether to close on click / 是否点击关闭
   *
   * @returns Message ID / 消息 ID
   */
  public pop(html: string, duration = 2000, clickToClose = true): number {
    const messageId = Date.now()
    const messageElement = document.createElement('div')
    messageElement.className = 'message-item move-in'
    messageElement.innerHTML = html
    Message.containerElement.append(messageElement)
    this.elements[messageId] = messageElement

    if (clickToClose)
      messageElement.addEventListener('click', () => {
        this.close(messageId)
      })

    if (duration > 0)
      setTimeout(() => {
        this.close(messageId)
      }, duration)

    return messageId
  }

  /**
   * Close message by ID or close all messages
   *
   * 根据 ID 关闭消息或关闭所有消息
   *
   * @param messageId - Message ID to close, if not provided, close all / 要关闭的消息 ID，如果未提供则关闭所有
   */
  public close(messageId?: number): void {
    if (messageId == null) {
      // close all messages
      keys(this.elements).forEach((id) => {
        this.close(Number(id))
      })
    } else {
      const messageElement = this.elements[messageId]

      messageElement.classList.remove('move-in')
      messageElement.classList.add('move-out')
      messageElement.addEventListener('animationend', () => {
        messageElement.remove()
        // oxlint-disable-next-line typescript/no-dynamic-delete
        delete this.elements[messageId]
      })
    }
  }

  /**
   * Destroy the message instance
   *
   * 销毁消息实例
   */
  public destroy(): void {
    document.querySelector<HTMLElement>(`#${containerId}`)?.remove()
    this.elements = {}
  }
}
