const THEME_PREFIX = 'vuepress-theme-'

/**
 * Normalize theme name
 *
 * 规范化主题名称
 *
 * @param name - Theme name / 主题名称
 * @returns Normalized theme name / 规范化后的主题名称
 */
export const normalizeThemeName = (name: string): string => {
  // scoped package pattern
  const scopedMatch = name.match(/^@(.*)\/(.*)$/)

  // handle non-scoped package
  if (scopedMatch == null)
    return name.startsWith(THEME_PREFIX) ? name : `${THEME_PREFIX}${name}`

  // handle scoped package
  const [, reqOrg, reqName] = scopedMatch

  // handle @vuepress/ themes
  if (reqOrg === 'vuepress')
    return reqName.startsWith('theme-') ? name : `@vuepress/theme-${reqName}`

  // handle other org
  return reqName.startsWith(THEME_PREFIX)
    ? name
    : `@${reqOrg}/${THEME_PREFIX}${reqName}`
}
