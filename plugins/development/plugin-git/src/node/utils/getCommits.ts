import { spawn } from 'node:child_process'
import type { GitContributorInfo } from '../../shared/index.js'
import type { GitPluginOptions } from '../options.js'
import type { MergedRawCommit, RawCommit } from '../typings.js'
import { logger } from './logger.js'

const INFO_SPLITTER = '[|]'
const COMMIT_SPLITTER = String.raw`\|/`
const RE_CO_AUTHOR = /^ *Co-authored-by: ?([^<]*)<([^>]*)> */gim

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
 * Helper function to run git command using spawn and return stdout as a promise.
 * Rejects if the git command exits with a non-zero code.
 */
const runGitLog = (args: string[], cwd: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const gitProcess = spawn('git', ['log', ...args], {
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
      reject(new Error(`Failed to spawn 'git log': ${error.message}`))
    })

    gitProcess.on('close', (code) => {
      if (code === 0) {
        resolve(stdoutData)
      } else {
        reject(
          new Error(
            `'git log' failed with exit code ${code}: ${stderrData.trim()}`,
          ),
        )
      }
    })
  })

/**
 * Get raw commits for a specific file
 *
 * ${commit_hash} ${author_name} ${author_email} ${author_date} ${subject} ${ref} ${body}
 *
 * @see {@link https://git-scm.com/docs/pretty-formats | documentation} for details.
 */
export const getRawCommits = async (
  filepath: string,
  cwd: string,
  options: GitPluginOptions,
): Promise<RawCommit[]> => {
  const format = getGitLogFormat(options)

  try {
    const stdout = await runGitLog(
      [
        '--max-count=-1',
        `--format=${format}${COMMIT_SPLITTER}`,
        '--date=unix',
        '--follow',
        '--',
        filepath,
      ],
      cwd,
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
        ] = rawString.split(INFO_SPLITTER).map((v) => v.trim())

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
 * @param commits - Raw commits
 *
 * 原始提交记录
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
 * @param filepaths - File paths to get commits for
 *
 * 要获取提交记录的文件路径
 *
 * @param cwd - Working directory
 *
 * 工作目录
 *
 * @param options - Git plugin options
 *
 * Git 插件选项
 */
export const getCommits = async (
  filepaths: string[],
  cwd: string,
  options: GitPluginOptions,
): Promise<MergedRawCommit[]> => {
  const rawCommits = (
    await Promise.all(
      filepaths.map((filepath) => getRawCommits(filepath, cwd, options)),
    )
  ).flat()

  return mergeRawCommits(rawCommits).sort((a, b) => b.time - a.time)
}
