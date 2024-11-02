import { webcrypto } from 'node:crypto'
import type {
  ContributorConfig,
  ContributorsOptions,
  GitContributor,
  GitType,
  MergedRawCommit,
} from '../types.js'

export const getAuthorNameWithNoreplyEmail = (
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

export const getRawContributors = (
  commits: MergedRawCommit[],
  list: ContributorConfig[] = [],
): GitContributor[] => {
  const contributors = new Map<string, GitContributor>()

  for (const commit of commits) {
    let { author } = commit
    const { email } = commit

    author = getAuthorNameWithNoreplyEmail(email) ?? author
    const config = getContributorWithConfig(list, author)

    if (config) author = config.username

    const contributor = contributors.get(author + email)
    if (contributor) {
      contributor.commits++
    } else {
      const item: GitContributor = {
        name: author,
        email,
        commits: 1,
      }

      if (config?.avatar) item.avatar = config.avatar
      if (config?.url) item.url = config.url

      contributors.set(author + email, item)
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
  { transform, list }: ContributorsOptions = {},
  gitType: GitType | null = null,
  extraContributors?: string[],
): Promise<GitContributor[]> => {
  let contributors = getRawContributors(commits, list)

  if (list?.length && extraContributors?.length) {
    for (const extraContributor of extraContributors) {
      const config = getContributorWithConfig(list, extraContributor)
      if (
        config &&
        !contributors.some((item) => item.name === extraContributor)
      ) {
        contributors.push({
          name: config.username,
          email: '',
          commits: 0,
          url: config.url,
          avatar: config.avatar,
        })
      }
    }
  }

  if (transform) contributors = await transform(contributors)

  for (const contributor of contributors) {
    if (gitType === 'github') {
      contributor.url ??= `https://github.com/${contributor.name}`
      contributor.avatar ??= `https://avatars.githubusercontent.com/${contributor.name}?v=4`
    } else {
      contributor.avatar ??= `https://gravatar.com/avatar/${await digestSHA256(contributor.email || contributor.name)}?d=retro`
    }
  }

  return contributors
}
