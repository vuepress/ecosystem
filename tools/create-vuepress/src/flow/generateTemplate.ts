/* eslint-disable no-console */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { confirm } from '@inquirer/prompts'
import type { CreateLocaleOptions, Lang } from '../i18n/index.js'
import type { PackageManager } from '../utils/index.js'
import { copy, ensureDirExistSync } from '../utils/index.js'

const templateFolder = join(
  dirname(import.meta.resolve('create-vuepress/package.json')),
  './template',
)

const getWorkflowContent = (
  packageManager: PackageManager,
  lang: Lang,
): string =>
  `
name: ${lang === 'zh' ? '部署文档' : 'Deploy Docs'}

on:
  push:
    branches:
      # ${
        lang === 'zh'
          ? '确保这是你正在使用的分支名称'
          : 'make sure this is the branch you are using'
      }
      - main

permissions:
  contents: write

jobs:
  deploy-gh-pages:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          # ${
            lang === 'zh'
              ? '如果你文档需要 Git 子模块，取消注释下一行'
              : 'if your docs needs submodules, uncomment the following line'
          }
          # submodules: true

${
  packageManager === 'pnpm'
    ? `\
      - name: ${lang === 'zh' ? '安装 pnpm' : 'Install pnpm'}
        uses: pnpm/action-setup@v4
`
    : ''
}

      - name: ${lang === 'zh' ? '设置 Node.js' : 'Setup Node.js'}
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: ${packageManager}

      - name: ${lang === 'zh' ? '安装依赖' : 'Install Deps'}
        run: ${
          packageManager === 'npm'
            ? 'npm ci'
            : `${packageManager} install --frozen-lockfile`
        }

      - name: ${lang === 'zh' ? '构建文档' : 'Build Docs'}
        env:
          NODE_OPTIONS: --max_old_space_size=8192
        run: |-
          ${packageManager} run docs:build
          > docs/.vuepress/dist/.nojekyll

      - name: ${lang === 'zh' ? '部署文档' : 'Deploy Docs'}
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          # ${
            lang === 'zh'
              ? '这是文档部署到的分支名称'
              : 'This is the branch where the docs are deployed to'
          }
          branch: gh-pages
          folder: docs/.vuepress/dist
`

interface GenerateTemplateOptions {
  targetDirPath: string
  lang: Lang
  packageManager: PackageManager
  locale: CreateLocaleOptions
  preset: 'blog' | 'docs'
  bundler: 'vite' | 'webpack'
}

export const generateTemplate = async ({
  targetDirPath,
  packageManager,
  lang,
  locale,
  preset,
  bundler,
}: GenerateTemplateOptions): Promise<void> => {
  const enableWorkflow = await confirm({
    message: locale.question.workflow,
    default: true,
  })

  console.info(locale.flow.generateTemplate)

  // copy template
  copy(join(templateFolder, preset), join(targetDirPath, 'docs'))

  const configFilePath = join(targetDirPath, 'docs/.vuepress/config.js')

  const content = readFileSync(configFilePath, { encoding: 'utf-8' })

  writeFileSync(
    configFilePath,
    content
      .replace(
        /\n\nexport default defineUserConfig\(\{/,
        `\nimport { ${bundler}Bundler } from '@vuepress/bundler-${bundler}'\n\nexport default defineUserConfig({`,
      )
      .replace(/\}\)\n$/, `\n  bundler: ${bundler}Bundler(),\n})\n`),
    { encoding: 'utf-8' },
  )

  if (enableWorkflow) {
    const workflowDir = join(targetDirPath, '.github/workflows')

    ensureDirExistSync(workflowDir)

    writeFileSync(
      join(workflowDir, 'deploy-docs.yml'),
      getWorkflowContent(packageManager, lang),
      { encoding: 'utf-8' },
    )
  }
}
