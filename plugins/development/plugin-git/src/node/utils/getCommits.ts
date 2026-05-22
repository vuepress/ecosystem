import { spawn } from 'node:child_process'

import { path } from 'vuepress/utils'

import type { GitContributorInfo, SubmoduleInfo } from '../../shared/index.js'
import type { GitPluginOptions } from '../options.js'
import type { MergedRawCommit, RawCommit } from '../typings.js'
import { getRemoteUrl, normalizeRepoUrl } from './inferGitProvider.js'
import { logger } from './logger.js'
import { isSafePath } from './safePath.js'

const INFO_SPLITTER = '[|]'
const COMMIT_SPLITTER = String.raw`\|/`
const RE_CO_AUTHOR = /^ *Co-authored-by: ?([^<]*)<([^>]*)> */gimu

const gitRepoRootResultCache = new Map<string, string | null>()
const gitRepoRootTaskCache = new Map<string, Promise<string | null>>()

const getCoAuthorsFromCommitBody = (
  body: string,
): Pick<GitContributorInfo, 'email' | 'name'>[] =>
  body
    ? Array.from(body.matchAll(RE_CO_AUTHOR), ([, name, email]) => ({
        name: name.trim(),
        email: email.trim(),
      }))
    : []

const getGitLogFormat = ({
  contributors,
  changelog,
}: GitPluginOptions): string => {
  if (!contributors && !changelog)
    // hash | author_date
    return ['%H', '%ad'].join(INFO_SPLITTER)

  if (contributors && !changelog)
    // hash | author_date | author_name | author_email | body
    return ['%H', '%ad', '%an', '%ae', '%b'].join(INFO_SPLITTER)

  // hash | author_date | author_name | author_email | body | subject | ref
  return ['%H', '%ad', '%an', '%ae', '%b', '%s', '%d'].join(INFO_SPLITTER)
}

/**
 * Helper function to run git command using spawn and return stdout as a
 * promise. Rejects if the git command exits with a non-zero code.
 *
 * @param args - The arguments to pass to the git command
 * @param cwd - The working directory to run the git command in
 * @returns A promise that resolves with the stdout of the git command
 */
const runGit = (args: string[], cwd: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const gitProcess = spawn('git', args, {
      cwd,
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    let stdoutData = ''
    let stderrData = ''

    gitProcess.stdout.on('data', (chunk: Buffer) => {
      stdoutData += chunk.toString('utf-8')
    })

    gitProcess.stderr.on('data', (chunk: Buffer) => {
      stderrData += chunk.toString('utf-8')
    })

    gitProcess.on('error', (error) => {
      reject(new Error(`Failed to spawn 'git ${args[0]}': ${error.message}`))
    })

    gitProcess.on('close', (code) => {
      if (code === 0) {
        resolve(stdoutData)
      } else {
        reject(
          new Error(
            `'git ${args[0]}' failed with exit code ${code}: ${stderrData.trim()}`,
          ),
        )
      }
    })
  })

/**
 * Get git repository root directory for a given file path.
 *
 * This function runs `git rev-parse --show-toplevel` in the directory of the
 * target file to determine the top-level directory of the git repository.
 *
 * @param filePath - File path (relative or absolute) whose repository root is
 *   requested
 * @param cwd - Current working directory
 * @returns Promise that resolves to normalized git root path, or null if not in
 *   a git repository
 */
export const getGitRepoRoot = async (
  filePath: string,
  cwd: string,
): Promise<string | null> => {
  if (!isSafePath(filePath)) return null

  const absFilePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(cwd, filePath)

  const dir = path.normalize(path.dirname(absFilePath))

  if (gitRepoRootResultCache.has(dir))
    return gitRepoRootResultCache.get(dir) ?? null

  const cachedTask = gitRepoRootTaskCache.get(dir)
  if (cachedTask) return cachedTask

  const task = runGit(['rev-parse', '--show-toplevel'], dir)
    .then((stdout) => path.normalize(stdout.trim()))
    // oxlint-disable-next-line promise/prefer-await-to-callbacks
    .catch((err: unknown) => {
      logger.error(err instanceof Error ? err.message : String(err))

      return null
    })

  gitRepoRootTaskCache.set(dir, task)

  try {
    const gitRoot = await task

    gitRepoRootResultCache.set(dir, gitRoot)

    return gitRoot
  } finally {
    gitRepoRootTaskCache.delete(dir)
  }
}

/**
 * Get raw commits for a specific file
 *
 * ${commit_hash} ${author_name} ${author_email} ${author_date} ${subject}
 * ${ref} ${body}
 *
 * @param filepath - The file path to get commits for / 要获取提交记录的文件路径
 * @param cwd - The working directory to run git command / 运行 git 命令的工作目录
 * @param options - Git plugin options / Git 插件选项
 * @returns Raw commits for the specified file / 指定文件的原始提交记录
 * @see {@link https://git-scm.com/docs/pretty-formats | documentation} for details.
 */
export const getRawCommits = async (
  filepath: string,
  cwd: string,
  options: GitPluginOptions,
): Promise<RawCommit[]> => {
  const format = getGitLogFormat(options)
  const gitRoot = await getGitRepoRoot(filepath, cwd)

  try {
    const absFilePath = path.isAbsolute(filepath)
      ? filepath
      : path.resolve(cwd, filepath)

    let repoRelativeFilePath = filepath
    let submodule: SubmoduleInfo | null = null

    if (gitRoot) {
      repoRelativeFilePath = path.relative(gitRoot, absFilePath)

      const relative = path.relative(cwd, gitRoot)
      const isSubmodule =
        gitRoot !== cwd && relative !== '' && !relative.startsWith('..')

      if (isSubmodule) {
        const remoteUrl = getRemoteUrl(gitRoot)

        if (remoteUrl) submodule = { repoUrl: normalizeRepoUrl(remoteUrl) }
      }
    }

    if (!isSafePath(repoRelativeFilePath)) {
      logger.warn(`Skipping unsafe file path: ${filepath}`)

      return []
    }

    const stdout = await runGit(
      [
        'log',
        '--max-count=-1',
        `--format=${format}${COMMIT_SPLITTER}`,
        '--date=unix',
        '--follow',
        '--',
        repoRelativeFilePath,
      ],
      gitRoot || cwd,
    )

    return stdout
      .slice(0, -1 - COMMIT_SPLITTER.length)
      .split(`${COMMIT_SPLITTER}\n`)
      .filter(Boolean)
      .map((rawString) => {
        const [
          hash,
          time,
          author = '',
          email = '',
          body = '',
          message = '',
          refs = '',
        ] = rawString.split(INFO_SPLITTER).map((val) => val.trim())

        return {
          filepath,
          hash,
          time: Number.parseInt(time, 10) * 1000,
          message,
          body,
          refs,
          author,
          email,
          coAuthors: getCoAuthorsFromCommitBody(body),
          submodule,
        }
      })
  } catch (err) {
    logger.error(`Failed to get commits for ${filepath} in ${cwd}:`, err)

    return []
  }
}

/**
 * Merge raw commits by hash
 *
 * 按哈希值合并原始提交记录
 *
 * @param commits - Raw commits / 原始提交记录
 * @returns Merged raw commits / 合并后的原始提交记录
 */
export const mergeRawCommits = (commits: RawCommit[]): MergedRawCommit[] => {
  const commitMap = new Map<string, MergedRawCommit>()

  commits.forEach(({ filepath, ...commit }) => {
    const _commit = commitMap.get(commit.hash)

    if (_commit) _commit.filepaths.push(filepath)
    else commitMap.set(commit.hash, { ...commit, filepaths: [filepath] })
  })

  return [...commitMap.values()]
}

/**
 * Get merged commits for multiple file paths
 *
 * 获取多个文件路径的合并提交记录
 *
 * @param filepaths - File paths to get commits for / 要获取提交记录的文件路径
 * @param cwd - Working directory / 工作目录
 * @param options - Git plugin options / Git 插件选项
 * @returns Merged commits for the specified file paths / 指定文件路径的合并提交记录
 */
export const getCommits = async (
  filepaths: string[],
  cwd: string,
  options: GitPluginOptions,
): Promise<MergedRawCommit[]> => {
  if (filepaths.length === 0) return []

  const roots = await Promise.all(
    filepaths.map((filepath) => getGitRepoRoot(filepath, cwd)),
  )
  const [primaryRoot] = roots

  const validFilepaths = filepaths.filter((filepath, index) => {
    if (roots[index] === primaryRoot) return true

    logger.warn(
      `Skipping '${filepath}': file belongs to a different git repository`,
    )

    return false
  })

  const rawCommits = (
    await Promise.all(
      validFilepaths.map((filepath) => getRawCommits(filepath, cwd, options)),
    )
  ).flat()

  return mergeRawCommits(rawCommits).sort((a, b) => b.time - a.time)
}

export const clearGitRepoRootCache = (): void => {
  gitRepoRootResultCache.clear()
  gitRepoRootTaskCache.clear()
}
