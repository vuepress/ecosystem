const CJK_LANG_REGEXP = /^(zh|ja|ko)\b/iu

export const isCJKLang = (lang: string): boolean => CJK_LANG_REGEXP.test(lang)
