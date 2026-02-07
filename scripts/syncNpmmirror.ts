import { readdirSync } from 'node:fs'
import { request } from 'node:https'
import { resolve as pathResolve } from 'node:path'

const pluginPkgJsons = await Promise.all(
  readdirSync(pathResolve(process.cwd(), 'plugins')).flatMap((category) =>
    readdirSync(pathResolve(process.cwd(), 'plugins', category)).map(
      (packageName) =>
        import(`../plugins/${category}/${packageName}/package.json`, {
          assert: { type: 'json' },
        }),
    ),
  ),
)

const plugins = pluginPkgJsons.map(
  ({ default: { name } }: { default: { name: string } }) => name,
)

const themePkgJsons = await Promise.all(
  readdirSync(pathResolve(process.cwd(), 'themes')).map(
    (packageName) =>
      import(`../themes/${packageName}/package.json`, {
        assert: { type: 'json' },
      }),
  ),
)

const themes = themePkgJsons.map(
  ({ default: { name } }: { default: { name: string } }) => name,
)

const toolPkgJsons = await Promise.all(
  readdirSync(pathResolve(process.cwd(), 'tools')).map(
    (packageName) =>
      import(`../tools/${packageName}/package.json`, {
        assert: { type: 'json' },
      }),
  ),
)

const tools = toolPkgJsons.map(
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
