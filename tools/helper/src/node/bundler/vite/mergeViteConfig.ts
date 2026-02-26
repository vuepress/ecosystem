/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
Types from https://github.com/rollup/plugins/blob/master/packages/alias/types/index.d.ts
Inlined because the plugin is bundled.
https://github.com/rollup/plugins/blob/master/LICENSE
The MIT License (MIT)
Copyright (c) 2019 RollupJS Plugin Contributors (https://github.com/rollup/plugins/graphs/contributors)
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

Code from https://github.com/vitejs/vite
Inlined because vite is optional
https://github.com/vitejs/vite/blob/main/LICENSE

MIT License

Copyright (c) 2019-present, Yuxi (Evan) You and Vite contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import {
  endsWith,
  isArray,
  isString,
  keys,
  entries,
} from '../../../shared/index.js'

interface Alias {
  find: RegExp | string
  replacement: string
  /**
   * Instructs the plugin to use an alternative resolving algorithm,
   * rather than the Rollup's resolver.
   * @default null
   */
  customResolver?: ResolverFunction | ResolverObject | null
}

type ResolverFunction = (...args: unknown[]) => unknown

interface ResolverObject {
  buildStart?: (...args: unknown[]) => unknown
  resolveId: ResolverFunction
}

type AliasOptions = Record<string, string> | readonly Alias[]

const isObject = (value: unknown): value is Record<string, any> =>
  Object.prototype.toString.call(value) === '[object Object]'

const arraify = <T>(target: T | T[]): T[] =>
  isArray(target) ? target : [target]

const normalizeSingleAlias = ({
  find,
  replacement,
  customResolver,
}: Alias): Alias => {
  if (isString(find) && endsWith(find, '/') && endsWith(replacement, '/')) {
    find = find.slice(0, -1)
    replacement = replacement.slice(0, -1)
  }

  const alias: Alias = {
    find,
    replacement,
  }

  if (customResolver) alias.customResolver = customResolver

  return alias
}

const normalizeAlias = (aliasOption: AliasOptions = []): Alias[] =>
  isArray<Alias>(aliasOption)
    ? aliasOption.map((alias) => normalizeSingleAlias(alias))
    : keys(aliasOption).map((find) =>
        normalizeSingleAlias({
          find,
          replacement: (aliasOption as Record<string, string>)[find],
        }),
      )

const mergeAlias = (
  defaults?: AliasOptions,
  overrides?: AliasOptions,
): AliasOptions | undefined => {
  if (!defaults) return overrides
  if (!overrides) return defaults

  if (isObject(defaults) && isObject(overrides))
    // eslint-disable-next-line @typescript-eslint/no-misused-spread
    return { ...defaults, ...overrides }

  // the order is flipped because the alias is resolved from top-down,
  // where the later should have higher priority
  return [...normalizeAlias(overrides), ...normalizeAlias(defaults)]
}

const backwardCompatibleWorkerPlugins = (plugins: any): any[] => {
  if (Array.isArray(plugins)) return plugins

  if (typeof plugins === 'function') {
    // oxlint-disable-next-line typescript/no-unsafe-call
    return plugins() as any[]
  }

  return []
}

// oxlint-disable-next-line complexity
const mergeConfigRecursively = (
  { ...merged }: Record<string, any>,
  overrides: Record<string, any>,
  rootPath: string,
): Record<string, any> => {
  for (const [key, value] of entries(overrides)) {
    if (value == null) continue

    const existing = merged[key]

    if (existing == null) {
      merged[key] = value
      continue
    }

    // fields that require special handling
    if (key === 'alias' && (rootPath === 'resolve' || rootPath === '')) {
      merged[key] = mergeAlias(existing, value)
      continue
    } else if (key === 'assetsInclude' && rootPath === '') {
      // oxlint-disable-next-line unicorn/prefer-spread
      merged[key] = [].concat(existing, value)
      continue
    } else if (
      key === 'noExternal' &&
      (rootPath === 'ssr' || rootPath === 'resolve') &&
      (existing === true || value === true)
    ) {
      merged[key] = true
      continue
    } else if (key === 'plugins' && rootPath === 'worker') {
      // oxlint-disable-next-line typescript/no-unsafe-return
      merged[key] = (): any[] => [
        ...backwardCompatibleWorkerPlugins(existing),
        ...backwardCompatibleWorkerPlugins(value),
      ]
      continue
    } else if (key === 'server' && rootPath === 'server.hmr') {
      merged[key] = value
      continue
    }

    if (isArray(existing) || isArray(value)) {
      merged[key] = [...arraify(existing), ...arraify(value)]
      continue
    }

    if (isObject(existing) && isObject(value)) {
      merged[key] = mergeConfigRecursively(
        existing,
        value,
        rootPath ? `${rootPath}.${key}` : key,
      )
      continue
    }

    merged[key] = value
  }

  return merged
}

/**
 * Merge Vite configurations
 *
 * 合并 Vite 配置
 *
 * @param defaults - Default configuration / 默认配置
 * @param overrides - Override configuration / 覆盖配置
 * @param isRoot - Whether it's root level merge / 是否为根级别合并
 *
 * @returns Merged configuration / 合并后的配置
 */
export const mergeViteConfig = (
  defaults: Record<string, any>,
  overrides: Record<string, any>,
  isRoot = true,
): Record<string, any> =>
  mergeConfigRecursively(defaults, overrides, isRoot ? '' : '.')
