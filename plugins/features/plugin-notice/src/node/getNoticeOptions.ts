import type { NoticeAttrOptions, NoticeOptions } from '../shared/index.js'

export const getNoticeOptions = (
  options: NoticeOptions[] = [],
): NoticeAttrOptions[] =>
  options
    .map(({ key, ...item }) =>
      'match' in item
        ? {
            ...item,
            match: item.match.source,
            noticeKey: key,
          }
        : { ...item, noticeKey: key },
    )
    .sort((a, b) =>
      'match' in a
        ? 'match' in b
          ? b.match.localeCompare(a.match)
          : -1
        : 'match' in b
          ? 1
          : (b.path || '').localeCompare(a.path || ''),
    )
