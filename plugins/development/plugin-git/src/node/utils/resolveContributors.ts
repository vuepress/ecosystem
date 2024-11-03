import { webcrypto } from 'node:crypto'
import type {
  ContributorConfig,
  ContributorsOptions,
  GitContributor,
  GitType,
  MergedRawCommit,
} from '../types.js'

export const getUserNameWithNoreplyEmail = (
  email: string,
): string | undefined => {
  if (email.endsWith('@users.noreply.github.com')) {
    return email.replace('@users.noreply.github.com', '').split('+')[1]
  }
  return undefined
}

const toArray = (value?: string[] | string): string[] => {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

export const digestSHA256 = async (message: string): Promise<string> => {
  const encoded = new TextEncoder().encode(message)
  const buffer = await webcrypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export const getContributorWithConfig = (
  list: ContributorConfig[],
  name: string,
): ContributorConfig | undefined => {
  return list.find(
    (item) => item.username === name || toArray(item.alias).includes(name),
  )
}

export const getRawContributors = async (
  commits: MergedRawCommit[],
  options: ContributorsOptions,
  gitType: GitType | null = null,
): Promise<GitContributor[]> => {
  const contributors = new Map<string, GitContributor>()

  for (const commit of commits) {
    const { author, email } = commit
    const config = getContributorWithConfig(
      options.list ?? [],
      getUserNameWithNoreplyEmail(email) ?? author,
    )
    const username = config?.username ?? author
    const name = config?.name ?? username

    const contributor = contributors.get(name + email)
    if (contributor) {
      contributor.commits++
    } else {
      const item: GitContributor = {
        name,
        email,
        commits: 1,
      }

      if (options.avatar)
        item.avatar =
          config?.avatar ??
          (gitType === 'github'
            ? `https://avatars.githubusercontent.com/${username}?v=4`
            : `https://gravatar.com/avatar/${await digestSHA256(email || username)}?d=retro`)

      const url =
        (config?.url ?? gitType === 'github')
          ? `https://github.com/${username}`
          : undefined
      if (url) item.url = url

      contributors.set(name + email, item)
    }
  }

  return Array.from(contributors.values()).filter((item, index, self) => {
    // If one of the contributors is a "noreply" email address, and there's
    // already a contributor with the same name, it is very likely a duplicate,
    // so it can be removed.
    if (item.email.split('@')[1]?.match(/no-?reply/)) {
      const realIndex = self.findIndex((t) => t.name === item.name)
      if (realIndex !== index) {
        // Update the "real" contributor to also include the noreply's commits
        self[realIndex].commits += item.commits
        return false
      }
      return true
    }
    return true
  })
}

export const resolveContributors = async (
  commits: MergedRawCommit[],
  options: ContributorsOptions = {},
  gitType: GitType | null = null,
  extraContributors?: string[],
): Promise<GitContributor[]> => {
  let contributors = await getRawContributors(commits, options, gitType)

  if (options.list?.length && extraContributors?.length) {
    for (const extraContributor of extraContributors) {
      if (!contributors.some((item) => item.name === extraContributor)) {
        const config = getContributorWithConfig(options.list, extraContributor)
        if (!config) continue

        const item: GitContributor = {
          name: config.name ?? extraContributor,
          email: '',
          commits: 0,
        }

        if (options.avatar)
          item.avatar =
            config.avatar ??
            (gitType === 'github'
              ? `https://avatars.githubusercontent.com/${config.username}?v=4`
              : `https://gravatar.com/avatar/${await digestSHA256(config.username)}?d=retro`)

        const url =
          (config.url ?? gitType === 'github')
            ? `https://github.com/${config.username}`
            : undefined
        if (url) item.url = url

        contributors.push(item)
      }
    }
  }

  if (options.transform) contributors = await options.transform(contributors)

  return contributors
}
