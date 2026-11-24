import { resolveAutoLink } from '@theme/resolveAutoLink'

import type { AutoLinkOptions } from '../../shared/index.js'

/**
 * Resolve a link item, filling its text and icon from the metadata of the
 * linked page when it does not define them
 *
 * 解析链接条目，未定义文本与图标时从目标页面的元数据中补全
 *
 * @param item - The link item / 链接条目
 * @param link - The absolute link to resolve / 要解析的绝对链接
 * @returns Resolved link item with a text / 带文本的解析后链接条目
 */
export const resolveLinkItem = <T extends AutoLinkOptions>(
  item: T,
  link: string,
): T & { text: string } => {
  const { text: resolvedText, icon: resolvedIcon } = resolveAutoLink(link)

  return {
    ...item,
    link,
    text: item.text || resolvedText,
    ...(!item.icon && resolvedIcon ? { icon: resolvedIcon } : {}),
  }
}
