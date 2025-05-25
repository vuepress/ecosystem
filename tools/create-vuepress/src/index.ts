#!/usr/bin/env node
import { createCommand } from 'commander'
import { mainAction } from './action.js'
import { version } from './utils/index.js'

const program = createCommand('create-vuepress')

program
  .argument('<dir>', 'Dir to create the template in')
  .option('-t, --theme [theme]', 'Theme to use')
  .option('-p, --preset [preset]', 'Preset to use, docs or blog only')
  .description(
    `\
Generate a new vuepress template

· pnpm create vuepress <dir>
· npm init vuepress@latest <dir>
· yarn create vuepress <dir>
`,
  )
  .action(mainAction)

program.version(version)
program.showHelpAfterError('add --help for additional information')

await program.parseAsync()
