import { createPage } from '@vuepress/core'

const slugify = (name) =>
  name
    .replace(/[ _]/g, '-')
    .replace(/[:?*|\\/<>]/g, '')
    .toLowerCase()

const generateCategory = async (app, name) => {
  const map = {}

  await app.pages.map(async (page) => {
    const value = page.frontmatter[name]

    await (Array.isArray(value) ? value : [value]).map(async (item) => {
      if (item) {
        if (!map[item]) {
          const itemPath = `/${name}/${slugify(item)}/`

          map[item] = {
            path: itemPath,
            keys: [],
          }

          app.pages.push(
            await createPage(app, {
              path: itemPath,
              frontmatter: {
                title: `${name} > ${item}`,
                key: item,
                layout: name[0].toUpperCase() + name.slice(1),
                sidebar: false,
              },
            }),
          )
        }

        map[item].keys.push(page.key)
      }
    })
  })

  app.pages.push(
    await createPage(app, {
      path: `/${name}/`,
      frontmatter: {
        title: name,
        layout: name[0].toUpperCase() + name.slice(1),
        sidebar: false,
      },
    }),
  )

  await app.writeTemp(
    `blog/${name}.js`,
    `\
export const map = ${JSON.stringify(map)};
`,
  )
}

const generateType = async (
  app,
  name,
  { filter = () => true, sorter = () => 0 },
) => {
  app.pages.push(
    await createPage(app, {
      path: `/${name}/`,
      frontmatter: {
        title: name,
        layout: name[0].toUpperCase() + name.slice(1),
        sidebar: false,
      },
    }),
  )

  const keys = app.pages.filter(filter).map(({ key }) => key)

  await app.writeTemp(
    `blog/${name}.js`,
    `\
export const keys = ${JSON.stringify(keys)};
`,
  )
}

export const simpleBlogPlugin = ({
  filter = () => true,
  getInfo,
  category = [],
  type = [],
}) => ({
  name: 'simple-blog-plugin',

  onInitialized: async (app) => {
    // inject meta information
    app.pages.filter(filter).forEach((page) => {
      page.routeMeta = {
        ...page.routeMeta,
        ...getInfo(page),
      }
    })

    // generate pages and temp files
    await Promise.all([
      ...category.map((name) => generateCategory(app, name)),
      ...type.map(({ key, ...options }) => generateType(app, key, options)),
    ])
  },
})
