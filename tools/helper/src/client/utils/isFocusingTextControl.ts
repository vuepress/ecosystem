/**
 * Determines whether the user is currently focusing a text control.
 * In this case, the search plugin shouldn't hijack any hotkeys because
 * the user might be typing into a text field, using type-ahead search
 * in a `select` element, etc.
 *
 * 判断用户当前是否正在聚焦文本控件。
 * 在这种情况下，搜索插件不应该劫持任何热键，因为
 * 用户可能正在文本字段中输入，在 `select` 元素中使用预输入搜索等。
 *
 * @param target - Event target / 事件目标
 *
 * @returns Whether user is focusing a text control / 用户是否正在聚焦文本控件
 */
export const isFocusingTextControl = (target: EventTarget): boolean => {
  if (!(target instanceof Element)) {
    return false
  }
  return (
    document.activeElement === target &&
    (['TEXTAREA', 'SELECT', 'INPUT'].includes(target.tagName) ||
      target.hasAttribute('contenteditable'))
  )
}
