import { readdirSync } from 'node:fs'
import { request } from 'node:https'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '../')

const pluginPkgJSONs = await Promise.all(
  readdirSync(path.resolve(root, 'plugins')).flatMap((category) =>
    readdirSync(path.resolve(root, 'plugins', category)).map(
      (packageName) =>
        import(`${root}/plugins/${category}/${packageName}/package.json`, {
          with: { type: 'json' },
        }),
    ),
  ),
)

const plugins = pluginPkgJSONs.map(
  ({ default: { name } }: { default: { name: string } }) => name,
)

const themePkgJSONs = await Promise.all(
  readdirSync(path.resolve(root, 'themes')).map(
    (packageName) =>
      import(`${root}/themes/${packageName}/package.json`, {
        with: { type: 'json' },
      }),
  ),
)

const themes = themePkgJSONs.map(
  ({ default: { name } }: { default: { name: string } }) => name,
)

const toolPkgJSONs = await Promise.all(
  readdirSync(path.resolve(root, 'tools')).map(
    (packageName) =>
      import(`${root}/tools/${packageName}/package.json`, {
        with: { type: 'json' },
      }),
  ),
)

const tools = toolPkgJSONs.map(
  ({ default: { name } }: { default: { name: string } }) => name,
)

const syncNpmMirror = (pkg: string): Promise<void> =>
  new Promise<void>((resolve) => {
    const req = request(
      `https://registry-direct.npmmirror.com/-/package/${pkg}/syncs`,
      {
        method: 'PUT',
        headers: {
          'Content-Length': 0,
        },
      },
    )

    req.write('')

    req.on('close', () => {
      resolve()
    })

    req.end()
  })

await Promise.all(
  [...plugins, ...themes, ...tools].map((pkg) => syncNpmMirror(pkg)),
)
