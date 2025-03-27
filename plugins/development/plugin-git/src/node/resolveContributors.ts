import type { GitContributorInfo, KnownGitProvider } from '../shared/index.js'
import type { ContributorsOptions } from './options.js'
import type { MergedRawCommit } from './typings.js'
import {
  checkGithubUsername,
  digestSHA256,
  getContributorInfo,
  getUserNameWithNoreplyEmail,
} from './utils/index.js'

export const getRawContributors = (
  commits: MergedRawCommit[],
  options: ContributorsOptions,
  gitProvider: KnownGitProvider | null,
): GitContributorInfo[] => {
  const contributors = new Map<string, GitContributorInfo>()

  // copy and reverse commits
  for (const commit of [...commits].reverse()) {
    const authors = [
      { name: commit.author, email: commit.email },
      ...commit.coAuthors,
    ]

    for (const { name, email } of authors) {
      const usernameWithNoreplyEmail = getUserNameWithNoreplyEmail(email)
      const config = getContributorInfo(
        { name: usernameWithNoreplyEmail ?? name, email },
        options.info,
      )

      // Only trust the username from `info` and `noreply email`.
      const username = config?.username ?? usernameWithNoreplyEmail

      const contributor = contributors.get(username ?? name)

      if (contributor) {
        contributor.commits++
        // try to rewrite the no-reply email to a genuine email
        if (contributor.email.includes('@users.noreply.github.com')) {
          contributor.email = config?.email ?? email
        }
      } else {
        const item: GitContributorInfo = {
          name: config?.name ?? username ?? name,
          // if `username` not found, check if `name` is a valid github username
          username:
            username ??
            (gitProvider === 'github' && checkGithubUsername(name) ? name : ''),
          email: config?.email || email,
          commits: 1,
        }

        if (options.avatar)
          item.avatar =
            config?.avatar ??
            (item.username
              ? options.avatarPattern?.replace(':username', item.username)
              : null) ??
            (item.username
              ? `https://avatars.githubusercontent.com/${item.username}?v=4`
              : `https://gravatar.com/avatar/${digestSHA256(email)}?d=retro`)

        const url =
          config?.url ??
          (item.username ? `https://github.com/${item.username}` : undefined)

        if (url) item.url = url

        contributors.set(username ?? name, item)
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
): GitContributorInfo[] => {
  const contributors = getRawContributors(commits, options, gitProvider)

  if (options.info?.length && extraContributors.length) {
    for (const extraContributor of extraContributors) {
      if (
        contributors.every(
          (item) =>
            item.username !== extraContributor &&
            item.name !== extraContributor,
        )
      ) {
        const contributorInfo = getContributorInfo(
          { name: extraContributor },
          options.info,
        )

        if (!contributorInfo) continue

        const result: GitContributorInfo = {
          name: contributorInfo.name ?? extraContributor,
          username: contributorInfo.username,
          email: contributorInfo.email ?? '',
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
