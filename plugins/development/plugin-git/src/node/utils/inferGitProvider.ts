import { execaCommandSync } from 'execa'
import type { KnownGitProvider } from '../typings.js'

export const getRemoteUrl = (cwd: string): string => {
  try {
    const { stdout } = execaCommandSync('git remote get-url origin', { cwd })
    return stdout
  } catch {
    try {
      const { stdout } = execaCommandSync('git remote', { cwd })
      const remote = stdout.split('\n')[0]?.trim()
      if (remote) {
        const { stdout: remoteUrl } = execaCommandSync(
          `git remote get-url ${remote}`,
          {
            cwd,
          },
        )
        return remoteUrl
      }
      return ''
    } catch {
      return ''
    }
  }
}

export const inferGitProvider = (cwd: string): KnownGitProvider | null => {
  const remoteUrl = getRemoteUrl(cwd)

  if (remoteUrl.includes('github.com')) {
    return 'github'
  }

  if (remoteUrl.includes('gitlab.com')) {
    return 'gitlab'
  }

  if (remoteUrl.includes('gitee.com')) {
    return 'gitee'
  }

  if (remoteUrl.includes('bitbucket.org')) {
    return 'bitbucket'
  }

  return null
}
