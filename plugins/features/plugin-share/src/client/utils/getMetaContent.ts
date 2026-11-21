/**
 * Get the content of a meta tag by its name
 *
 * 通过名称获取 meta 标签的内容
 *
 * @param name - Name of the meta tag / meta 标签的名称
 * @returns Content of the meta tag, or `null` if it does not exist / meta
 *   标签的内容，不存在时返回 `null`
 */
export const getMetaContent = (name: string): string | null =>
  document
    .querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
    ?.getAttribute('content') ?? null
