import { readdirSync, statSync, readFileSync } from 'node:fs'
import path from 'node:path'

import picocolors from 'picocolors'
import { getDirname } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

const getSubDirectories = (dir: string): string[] =>
  readdirSync(dir).filter((item) =>
    statSync(path.join(dir, item)).isDirectory(),
  )

const pluginPackages = getSubDirectories(
  path.join(__dirname, '../plugins'),
).flatMap((category) =>
  getSubDirectories(path.join(__dirname, '../plugins', category)),
)
const themePackages = getSubDirectories(path.join(__dirname, '../themes'))
const toolPackages = getSubDirectories(path.join(__dirname, '../tools'))

const msgPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve('.git/COMMIT_EDITMSG')
const msg = readFileSync(msgPath, 'utf-8').trim()

const types = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'workflow',
  'build',
  'ci',
  'chore',
  'types',
  'release',
]
const scopes = [
  ...pluginPackages,
  ...themePackages,
  ...toolPackages,
  'deps',
  'e2e',
]

const commitRE =
  /^(revert: )?(?<type>[^(]*?)(?:\((?<scope>[^)]*?)\))?: .{1,50}$/

const match = commitRE.exec(msg)

if (!match) {
  console.error(
    `${picocolors.white(picocolors.bgRed(' ERROR '))} ${picocolors.red(
      `invalid commit message format.`,
    )}`,
  )
  // oxlint-disable-next-line unicorn/no-process-exit
  process.exit(1)
}

if (!types.includes(match.groups?.type ?? '')) {
  console.error(
    `${picocolors.white(picocolors.bgRed(' ERROR '))} ${picocolors.red(
      `invalid commit message type: "${match.groups?.type}".`,
    )}`,
  )
  // oxlint-disable-next-line unicorn/no-process-exit
  process.exit(1)
}

if (match.groups?.scope && !scopes.includes(match.groups.scope)) {
  console.error(
    `${picocolors.white(picocolors.bgRed(' ERROR '))} ${picocolors.red(
      `invalid commit message scope: "${match.groups.scope}".`,
    )}`,
  )
  // oxlint-disable-next-line unicorn/no-process-exit
  process.exit(1)
}
