import type { ContributorsOptions } from './options.js'
import type {
  GitContributor,
  KnownGitProvider,
  MergedRawCommit,
} from './typings.js'
import {
  digestSHA256,
  getContributorInfo,
  getUserNameWithNoreplyEmail,
} from './utils/index.js'

export const getRawContributors = (
  commits: MergedRawCommit[],
  options: ContributorsOptions,
  gitProvider: KnownGitProvider | null,
): GitContributor[] => {
  const contributors = new Map<string, GitContributor>()

  for (const commit of commits.reverse()) {
    const authors = [
      { name: commit.author, email: commit.email },
      ...commit.coAuthors,
    ]

    for (const { name: author, email } of authors) {
      const config = getContributorInfo(
        getUserNameWithNoreplyEmail(email) ?? author,
        options.info,
      )
      const username = config?.username ?? author
      const name = config?.name ?? username

      const contributor = contributors.get(name + email)

      if (contributor) {
        contributor.commits++
      } else {
        const item: GitContributor = {
          name,
          username,
          email,
          commits: 1,
        }

        if (options.avatar)
          item.avatar =
            config?.avatar ??
            options.avatarPattern?.replace(':username', username) ??
            (gitProvider === 'github'
              ? `https://avatars.githubusercontent.com/${username}?v=4`
              : `https://gravatar.com/avatar/${digestSHA256(email || username)}?d=retro`)

        const url =
          (config?.url ?? gitProvider === 'github')
            ? `https://github.com/${username}`
            : undefined
        if (url) item.url = url

        contributors.set(name + email, item)
      }
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

export const resolveContributors = (
  commits: MergedRawCommit[],
  gitProvider: KnownGitProvider | null,
  options: ContributorsOptions,
  extraContributors: string[] = [],
): GitContributor[] => {
  const contributors = getRawContributors(commits, options, gitProvider)

  if (options.info?.length && extraContributors.length) {
    for (const extraContributor of extraContributors) {
      if (contributors.every((item) => item.name !== extraContributor)) {
        const contributorInfo = getContributorInfo(
          extraContributor,
          options.info,
        )

        if (!contributorInfo) continue

        const result: GitContributor = {
          name: contributorInfo.name ?? extraContributor,
          username: contributorInfo.name ?? extraContributor,
          email: '',
          commits: 0,
        }

        const url =
          contributorInfo.url ??
          (gitProvider === 'github'
            ? `https://github.com/${contributorInfo.username}`
            : null)

        if (options.avatar)
          result.avatar =
            contributorInfo.avatar ??
            options.avatarPattern?.replace(
              ':username',
              contributorInfo.username,
            ) ??
            (gitProvider === 'github'
              ? `https://avatars.githubusercontent.com/${contributorInfo.username}?v=4`
              : `https://gravatar.com/avatar/${digestSHA256(contributorInfo.username)}?d=retro`)

        if (url) result.url = url

        contributors.push(result)
      }
    }
  }

  return options.transform?.(contributors) ?? contributors
}
