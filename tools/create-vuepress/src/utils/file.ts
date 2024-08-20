import {
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { dirname } from 'node:path'

export const ensureDirExistSync = (dirPath: string): void => {
  try {
    readdirSync(dirPath)
  } catch {
    try {
      mkdirSync(dirPath, { recursive: true })
    } catch {
      // this is the case where the directory already exists but can not read, e.g.: D:\
    }
  }
}

export const copyFile = (srcFile: string, targetFile: string): void => {
  const targetDir = dirname(targetFile)

  ensureDirExistSync(targetDir)
  writeFileSync(targetFile, readFileSync(srcFile))
}

export const copyDir = (srcDir: string, targetDir: string): void => {
  ensureDirExistSync(targetDir)

  const files = readdirSync(srcDir, { withFileTypes: true })

  files.forEach((file) => {
    if (file.isFile())
      copyFile(`${srcDir}/${file.name}`, `${targetDir}/${file.name}`)
    else if (file.isDirectory())
      copyDir(`${srcDir}/${file.name}`, `${targetDir}/${file.name}`)
  })
}

export const copy = (src: string, target: string): void => {
  if (statSync(src).isDirectory()) copyDir(src, target)
  else if (statSync(src).isFile()) copyFile(src, target)
}
