/**
 * Strategy to sort the search results.
 *
 * `max` means that the page having the highest single score is placed in front.
 * `total` means that the page having the highest total score is placed in
 * front.
 *
 * 搜索结果排序策略。
 *
 * `max` 表示最高分更高的页面会排在前面。`total` 表示总分更高的页面会排在前面。
 */
export type SearchSortStrategy = 'max' | 'total'
