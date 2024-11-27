import { execa } from 'execa'
import type { GitPluginOptions } from '../options.js'
import type { GitContributor, MergedRawCommit, RawCommit } from '../typings.js'

const SPLIT_CHAR = '[GIT_LOG_COMMIT_END]'
const RE_SPLIT = /\[GIT_LOG_COMMIT_END\]$/

const RE_CO_AUTHOR = /^ *Co-authored-by: ?([^<]*)<([^>]*)> */gim

const getCoAuthors = (
  body: string,
): Pick<GitContributor, 'email' | 'name'>[] => {
  if (!body) return []

  return [...body.matchAll(RE_CO_AUTHOR)]
    .map(([, name, email]) => ({
      name: name.trim(),
      email: email.trim(),
    }))
    .filter(Boolean)
}

const getFormat = ({ contributors, changelog }: GitPluginOptions): string => {
  // hash | _ | _ | author_date | _ | _ | _
  if (!contributors && !changelog) return '%H|||%ad|||'
  // hash | author_name | author_email | author_date | _ | _ | body
  if (contributors && !changelog) return '%H|%an|%ae|%ad|||%b'
  // hash | author_name | author_email | author_date | subject | ref | body
  return '%H|%an|%ae|%ad|%s|%d|%b'
}

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
  options: GitPluginOptions,
): Promise<RawCommit[]> => {
  const format = getFormat(options)
  try {
    const { stdout } = await execa(
      'git',
      [
        'log',
        '--max-count=-1',
        `--format=${format}${SPLIT_CHAR}`,
        '--date=unix',
        '--follow',
        '--',
        filepath,
      ],
      { cwd },
    )

    return stdout
      .replace(RE_SPLIT, '')
      .split(`${SPLIT_CHAR}\n`)
      .filter(Boolean)
      .map((rawString) => {
        const [hash, author, email, date, message, refs, body] = rawString
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
          coAuthors: getCoAuthors(body),
        }
      })
  } catch {
    return []
  }
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
  options: GitPluginOptions,
): Promise<MergedRawCommit[]> => {
  const rawCommits = await Promise.all(
    filepaths.map((filepath) => getRawCommits(filepath, cwd, options)),
  )

  return mergeRawCommits(rawCommits.flat()).sort((a, b) =>
    b.date - a.date > 0 ? 1 : -1,
  )
}
