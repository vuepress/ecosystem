import { readFileSync } from 'node:fs'
import path from 'node:path'

import picocolors from 'picocolors'

const msgPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve('.git/COMMIT_EDITMSG')
const msg = readFileSync(msgPath, 'utf-8').trim()

const commitRE =
  /^(revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|types|release)(\([^)]+\))?: .{1,50}$/

if (!commitRE.test(msg)) {
  console.error(
    `${picocolors.white(picocolors.bgRed(' ERROR '))} ${picocolors.red(
      `invalid commit message format.`,
    )}`,
  )
  // oxlint-disable-next-line unicorn/no-process-exit
  process.exit(1)
}
