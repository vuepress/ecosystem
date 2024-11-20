import type { ContributorInfo } from '../options.js'

const toArray = <T = unknown>(value?: T | T[]): T[] =>
  Array.isArray(value) ? value : value ? [value] : []

export const getContributorInfo = (
  contributorName: string,
  infos: ContributorInfo[] = [],
): ContributorInfo | null =>
  infos.find(
    ({ username, alias }) =>
      username === contributorName || toArray(alias).includes(contributorName),
  ) ?? null
