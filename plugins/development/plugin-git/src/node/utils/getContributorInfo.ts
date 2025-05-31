import type { ContributorInfo } from '../options.js'

const toArray = <T = unknown>(value?: T | T[]): T[] =>
  Array.isArray(value) ? value : value ? [value] : []

export const getContributorInfo = (
  contributor: { name: string; email?: string },
  infos: ContributorInfo[] = [],
): ContributorInfo | null =>
  infos.find(
    ({ username, alias, email, emailAlias }) =>
      username === contributor.name ||
      toArray(alias).includes(contributor.name) ||
      (contributor.email &&
        (contributor.email === email ||
          toArray(emailAlias).includes(contributor.email))),
  ) ?? null
