#!/usr/bin/env node
/* eslint-disable no-console */

import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { checkWorkSpaceStatus } from './isWorkSpaceClean.js'

const [, , docsDir, replaceUrl, scraperLocation] = process.argv

const README_REG_EXP = /README\.md$/i

const generateOnlyUrls = (markdownFilePaths: string[]): string[] =>
  markdownFilePaths.map((markdownFilePath) => {
    const url = README_REG_EXP.test(markdownFilePath)
      ? markdownFilePath
          .replace(README_REG_EXP, '')
          .replace(docsDir, replaceUrl)
      : markdownFilePath.replace('.md', '.html').replace(docsDir, replaceUrl)

    console.debug(`${markdownFilePath} -> ${url}`)

    return url
  })

const getFilesByDiff = (): string[] => {
  const { stdout, stderr } = spawnSync('git diff HEAD~1 HEAD --name-only', {
    encoding: 'utf-8',
  })

  if (stderr) {
    console.error(`Git error output: ${stderr}`)
  }

  return stdout
    .split('\n')
    .filter((line) => line.includes('.md') && line.includes(docsDir))
}

const getFilesByStatus = (): string[] => {
  const { stdout, stderr } = spawnSync('git status --porcelain', {
    encoding: 'utf-8',
  })

  if (stderr) {
    console.error(`Git error output: ${stderr}`)
  }

  return stdout
    .split('\n')
    .filter((line) => line.includes('.md') && line.includes(docsDir))
    .map((line) => {
      const statusX = line[0]
      const statusY = line[1]
      if (
        statusX === 'R' ||
        statusY === 'R' ||
        statusX === 'C' ||
        statusY === 'C'
      ) {
        return line.substring(3).split(' -> ')[1]
      }
      return line.substring(3)
    })
}

const main = (): void => {
  try {
    const scraperPath = resolve(scraperLocation)

    if (!existsSync(scraperPath)) {
      console.error(`Scraper file not found at ${scraperPath}`)
      return
    }

    const scraperConfig = JSON.parse(
      readFileSync(scraperLocation, { encoding: 'utf-8' }),
    ) as Record<string, unknown>

    const isWorkSpaceClean = checkWorkSpaceStatus()
    const files = (isWorkSpaceClean ? getFilesByDiff : getFilesByStatus)()

    if (files.length === 0) {
      console.log('No changed files found.')
      return
    }

    const onlyUrls = generateOnlyUrls(files)

    scraperConfig.only_urls = onlyUrls
    writeFileSync(scraperPath, JSON.stringify(scraperConfig, null, 2))
  } catch (error) {
    console.error(`Command execution error: ${(error as Error).message}`)
  }
}

if (process.argv.length < 5) {
  console.log('Usage: npx gous <docsDir> <replaceUrl> <scraperPath>')
} else {
  main()
}
