import { readdirSync, readFileSync, rmSync } from 'node:fs'
import path from 'node:path'

import { defineConfig } from 'tsdown'
import type { Rolldown, UserConfig } from 'tsdown'
import { vueSfcPlugin } from 'vue-sfc-transformer/rolldown'

import { tsdownConfig } from '../../scripts/tsdown.ts'

const ROOT = import.meta.dirname

// Both builds emit files that the bundler does not track (`clean: false`), so
// remove the whole output directory before building to avoid stale artifacts
// (for example files of removed modules) leaking into the published package
rmSync(path.join(ROOT, 'dist'), {
  recursive: true,
  force: true,
})

const toPosixPath = (filePath: string): string => filePath.replaceAll('\\', '/')

/**
 * Emit CSS and font assets as raw files, keeping the CSS imports relative so
 * that the assets can be processed by the site bundler
 *
 * 将 CSS 与字体资源作为原始文件输出，并保留相对路径的 CSS 导入， 以便站点打包器处理这些资源
 *
 * @returns The rolldown plugin / rolldown 插件
 */
const clientAssets = (): Rolldown.Plugin => {
  const clientDir = path.join(ROOT, 'src/client')

  return {
    name: 'vuepress:theme-default-client-assets',
    resolveId(id) {
      if (id.endsWith('.css') && id[0] === '.')
        return { id, external: 'relative' }

      return null
    },
    buildStart() {
      for (const entry of readdirSync(clientDir, {
        recursive: true,
        encoding: 'utf8',
      })) {
        if (!/(?:\.(?:css|woff2)$|LICENSE\.txt$)/u.test(entry)) continue

        const file = path.join(clientDir, entry)

        this.addWatchFile(file)
        this.emitFile({
          type: 'asset',
          fileName: toPosixPath(entry),
          source: readFileSync(file),
        })
      }
    },
  }
}

const client: UserConfig = {
  entry: ['src/client/**/*.ts', '!src/client/**/*.d.ts'],
  outDir: 'dist/client',
  platform: 'neutral',
  unbundle: true,
  fixedExtension: false,
  minify: false,
  sourcemap: true,
  clean: false,
  plugins: [
    clientAssets(),
    vueSfcPlugin({
      srcDir: 'src/client',
      cwd: ROOT,
    }),
  ],
}

const node: UserConfig = tsdownConfig('node/index', {
  dts: true,
  clean: false,
})

export default defineConfig([client, node])
