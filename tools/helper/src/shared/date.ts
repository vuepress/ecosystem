/**
 * Get Date info from user input
 *
 * @description return `null` when input is invalid
 */
export const getDate = (input: unknown): Date | null => {
  if (input) {
    if (typeof input === 'number') return new Date(input)

    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const date = Date.parse(input.toString())

    if (!Number.isNaN(date)) return new Date(date)
  }

  return null
}

/**
 * Date sorter from latest to oldest
 *
 * @description Inputs that are invalid date will appear at last
 */
export const dateSorter = (
  valueA: Date | number | string | undefined,
  valueB: Date | number | string | undefined,
): number => {
  const dateA = getDate(typeof valueA === 'number' ? new Date(valueA) : valueA)
  const dateB = getDate(typeof valueB === 'number' ? new Date(valueB) : valueB)

  if (!dateA) return dateB ? 1 : 0
  if (!dateB) return -1

  return dateB.getTime() - dateA.getTime()
}
