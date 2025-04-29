#!/usr/bin/env node
/* eslint-disable no-console */

import childProcess from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import { promisify } from 'node:util'

const exec = promisify(childProcess.exec)

const docsDir = process.argv[2]
const replaceUrl = process.argv[3]
const scraperPath = process.argv[4]

async function generateOnlyUrls(files) {
  return files.map((file) => {
    let url
    if (/readme\.md/i.test(file)) {
      url = file.replace(/readme\.md/i, '').replace(docsDir, replaceUrl)
    } else {
      url = file.replace('.md', '.html').replace(docsDir, replaceUrl)
    }
    console.log(`${file} -> ${url}`)
    return url
  })
}

async function generateScrapeJson(onlyUrls) {
  let jsonData
  try {
    const buf = await readFile(scraperPath)
    jsonData = JSON.parse(buf)
    jsonData.only_urls = onlyUrls
  } catch (error) {
    console.error('File reading error:', error)
  }
  return JSON.stringify(jsonData, null, 2)
}

async function writeScrapeFile(content) {
  try {
    await writeFile(scraperPath, content)
  } catch (error) {
    console.log('File writing error:', error)
  }
}

async function getFilesByDiff() {
  const { stdout, stderr } = await exec('git diff HEAD~1 HEAD --name-only')
  if (stderr) {
    console.error(`Git error output: ${stderr}`)
  }
  const files = stdout.split('\n').filter((line) => line.includes('.md'))
  return files
}

async function getFilesByStatus() {
  const { stdout, stderr } = await exec('git status -s')
  if (stderr) {
    console.error(`Git error output: ${stderr}`)
  }
  const files = stdout
    .split('\n')
    .filter(
      (line) =>
        line.includes('.md') && (line.includes('M') || line.includes('A')),
    )
    .map((line) => line.substring(3))
  return files
}

async function main() {
  try {
    const { stdout, stderr } = await exec('git status')
    if (stderr) {
      console.error(`Git error output: ${stderr}`)
    }
    let files
    if (stdout.includes('nothing to commit, working tree clean')) {
      files = await getFilesByDiff()
    } else {
      files = await getFilesByStatus()
    }
    if (files.length === 0) {
      console.log('Nothing to do')
      return
    }
    const onlyUrls = await generateOnlyUrls(files)
    const content = await generateScrapeJson(onlyUrls)
    await writeScrapeFile(content)
  } catch (error) {
    console.error(`Command execution error: ${error.message}`)
  }
}

if (process.argv.length < 5) {
  console.log('Usage: npx gous <docsDir> <replaceUrl> <scraperPath>')
} else {
  main()
}
