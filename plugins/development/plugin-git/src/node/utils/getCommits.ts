import { spawn } from 'node:child_process'
import type { GitContributorInfo } from '../../shared/index.js'
import type { GitPluginOptions } from '../options.js'
import type { MergedRawCommit, RawCommit } from '../typings.js'
import { logger } from './logger.js'

const SPLIT_CHAR = '[GIT_LOG_COMMIT_END]'
const RE_SPLIT = /\[GIT_LOG_COMMIT_END\]$/
const RE_CO_AUTHOR = /^ *Co-authored-by: ?([^<]*)<([^>]*)> */gim

const getCoAuthors = (
  body: string,
): Pick<GitContributorInfo, 'email' | 'name'>[] => {
  if (!body) return []

  return [...body.matchAll(RE_CO_AUTHOR)].map(([, name, email]) => ({
    name: name.trim(),
    email: email.trim(),
  }))
}

const getFormat = ({ contributors, changelog }: GitPluginOptions): string => {
  if (!contributors && !changelog)
    // hash | _ | _ | author_date | _ | _ | _
    return '%H|||%ad|||'

  if (contributors && !changelog)
    // hash | author_name | author_email | author_date | _ | _ | body
    return '%H|%an|%ae|%ad|||%b'

  // hash | author_name | author_email | author_date | subject | ref | body
  return '%H|%an|%ae|%ad|%s|%d|%b'
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
      stdoutData += chunk.toString('utf8')
    })

    gitProcess.stderr.on('data', (chunk: Buffer) => {
      stderrData += chunk.toString('utf8')
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
  const format = getFormat(options)

  try {
    const stdout = await runGitLog(
      [
        '--max-count=-1',
        `--format=${format}${SPLIT_CHAR}`,
        '--date=unix',
        '--follow',
        '--',
        filepath,
      ],
      cwd,
    )

    return stdout
      .replace(RE_SPLIT, '')
      .split(`${SPLIT_CHAR}\n`)
      .filter(Boolean)
      .map((rawString) => {
        const parts = rawString.split('|').map((v) => v.trim())
        const [
          hash = '',
          author = '',
          email = '',
          time = '0',
          message = '',
          refs = '',
        ] = parts
        // ensure body containing `|` is not splitted
        const body = parts.slice(6).join('|').trim()

        return {
          filepath,
          hash,
          time: Number.parseInt(time, 10) * 1000,
          message,
          body,
          refs,
          author,
          email,
          coAuthors: getCoAuthors(body),
        }
      })
  } catch (error) {
    logger.error(`Failed to get commits for ${filepath} in ${cwd}:`, error)

    return []
  }
}

export const mergeRawCommits = (commits: RawCommit[]): MergedRawCommit[] => {
  const commitMap = new Map<string, MergedRawCommit>()

  commits.forEach(({ filepath, ...commit }) => {
    const _commit = commitMap.get(commit.hash)

    if (_commit) _commit.filepaths.push(filepath)
    else commitMap.set(commit.hash, { ...commit, filepaths: [filepath] })
  })

  const result = Array.from(commitMap.values())
  return result
}

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
