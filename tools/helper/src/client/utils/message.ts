import { keys } from '../../shared/index.js'

const containerId = 'message-container'

export class Message {
  private elements: Record<number, HTMLDivElement>

  public constructor() {
    this.elements = {}
  }

  public static get containerElement(): HTMLElement {
    let containerElement = document.getElementById(containerId)

    if (containerElement) return containerElement

    containerElement = document.createElement('div')
    containerElement.id = containerId
    document.body.appendChild(containerElement)

    return containerElement
  }

  public getElement(messageId: number): HTMLDivElement {
    return this.elements[messageId]
  }

  public pop(html: string, duration = 2000, clickToClose = true): number {
    const messageId = Date.now()
    const messageElement = document.createElement('div')
    messageElement.className = 'message-item move-in'
    messageElement.innerHTML = html
    Message.containerElement.appendChild(messageElement)
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

  public close(messageId?: number): void {
    if (messageId) {
      const messageElement = this.elements[messageId]

      messageElement.classList.remove('move-in')
      messageElement.classList.add('move-out')
      messageElement.addEventListener('animationend', () => {
        messageElement.remove()
        delete this.elements[messageId]
      })
    } else {
      keys(this.elements).forEach((id) => {
        this.close(Number(id))
      })
    }
  }

  public destroy(): void {
    const containerElement = document.getElementById(containerId)
    if (containerElement) document.body.removeChild(containerElement)
    this.elements = {}
  }
}
