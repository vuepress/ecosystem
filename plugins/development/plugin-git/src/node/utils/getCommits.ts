import { execa } from 'execa'
import type { MergedRawCommit, RawCommit } from '../types.js'

const FORMAT = '%H|%an|%ae|%ad|%s|%d|%b'
const SPLIT_CHAR = '[GIT_LOG_COMMIT_END]'
const RE_SPLIT = /\[GIT_LOG_COMMIT_END\]$/

/**
 * Get raw commits
 *
 * ${commit_hash} ${author_name} ${author_email} ${author_date} ${subject} ${ref} ${body}
 *
 * @see {@link https://git-scm.com/docs/pretty-formats | documentation} for details.
 */
export const getRawCommits = async (
  filepath: string,
  cwd: string,
): Promise<string[]> => {
  try {
    const { stdout } = await execa(
      'git',
      [
        'log',
        '--max-count=-1',
        `--format=${FORMAT}${SPLIT_CHAR}`,
        '--date=unix',
        '--follow',
        '--',
        filepath,
      ],
      { cwd },
    )
    return stdout.replace(RE_SPLIT, '').split(`${SPLIT_CHAR}\n`)
  } catch {
    return []
  }
}

export const parseRawCommits = (
  rawCommits: string[],
  filepath: string,
): RawCommit[] => {
  return rawCommits
    .filter((commit) => !!commit)
    .map((raw) => {
      const [hash, author, email, date, message, refs, body] = raw
        .split('|')
        .map((v) => v.trim())
      return {
        filepath,
        hash,
        date: Number.parseInt(date, 10) * 1000,
        message,
        body,
        refs,
        author,
        email,
      }
    })
}

export const mergeRawCommits = (commits: RawCommit[]): MergedRawCommit[] => {
  const commitMap = new Map<string, MergedRawCommit>()

  commits.forEach(({ filepath, ...commit }) => {
    const _commit = commitMap.get(commit.hash)
    if (_commit) _commit.filepaths.push(filepath)
    else commitMap.set(commit.hash, { filepaths: [filepath], ...commit })
  })

  const result = Array.from(commitMap.values())
  return result
}

export const getCommits = async (
  filepaths: string[],
  cwd: string,
): Promise<MergedRawCommit[]> => {
  const commits = await Promise.all(
    filepaths.map(async (filepath) => {
      const rawCommits = await getRawCommits(filepath, cwd)
      return parseRawCommits(rawCommits, filepath)
    }),
  )
  return mergeRawCommits(commits.flat()).sort((a, b) =>
    b.date - a.date > 0 ? 1 : -1,
  )
}
