import { isArray, isString } from '@vuepress/helper'

export const getFeedCategory = (
  category: string[] | string | undefined,
): string[] => {
  if (category) {
    if (isArray(category) && category.every((item) => isString(item)))
      return category
    if (isString(category)) return [category]
  }

  return []
}
