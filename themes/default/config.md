---
url: /ecosystem/themes/default/config.md
---
# Config

## Basic Config

:::: fields
@`hostname` type=string

Hostname to be deployed, e.g.: `https://example.com`

@`locales` type=`{ [path: string]: Partial<DefaultThemeLocaleData> }` default=`{}`

Specify locales for i18n support.

All the options inside the [Locale Config](#locale-config) section can be used in locales.

This option will only take effect in default theme, so don't confuse with `locales` in [Site Config](https://v2.vuepress.vuejs.org/reference/config.html#locales).

See also: [Guide > I18n](https://v2.vuepress.vuejs.org/guide/i18n.html)

::::

## Locale Config

Config of this section can be used as normal config, and can also be used in the [locales](#locales) option.

:::: fields
@`colorMode` type=`'auto' | 'light' | 'dark'` default=`'auto'`

Default color mode.

If set to `'auto'`, the initial color mode will be automatically set according to [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).

See also: [colorModeSwitch](#colormodeswitch)

@`colorModeSwitch` type=boolean default=`true`

Enable color mode switching or not.

If set to `true`, a button to switch color mode will be displayed in the navbar.

See also: [colorMode](#colormode) and [toggleColorMode](./locale.md#togglecolormode)

@`externalLinkIcon` type=boolean default=`true`

Show external link icon on external links or not.

@`home` type=string default=`/`

Specify the path of the homepage.

This will be used for:

* the logo link of the navbar
* the *back to home* link of the 404 page

@`navbar` type=`false | NavbarOptions` default=`[]`

Configuration of navbar.

Set to `false` to disable navbar.

To configure the navbar items, you can set it to a *navbar array*, each item of which could be a `NavbarLink` object, a `NavbarGroup` object, or a string:

* A `NavbarLink` object should have a `text` field and a `link` field, could have an optional `activeMatch` field.
* A `NavbarGroup` object should have a `text` field and a `children` field, could have an optional `prefix` field. The `children` field should be a *navbar array* too, and `prefix` will be prepended before every link inside it.
* A string should be the path to the target page file. It will be converted to a `NavbarLink` object, using the page title as `text`, and the page route path as `link`.

```ts title=".vuepress/config.ts"
export default {
  theme: defaultTheme({
    navbar: [
      // NavbarLink
      {
        text: 'Foo',
        link: '/foo/',
      },
      // NavbarGroup
      {
        text: 'Group',
        prefix: '/group/',
        children: ['foo.md', 'bar.md'],
      },
      // string - page file path
      '/bar/README.md',
    ],
  }),
}
```

```ts title=".vuepress/config.ts"
export default {
  theme: defaultTheme({
    navbar: [
      // nested group - max depth is 2
      {
        text: 'Group',
        children: [
          {
            text: 'SubGroup1',
            prefix: 'sub1/',
            children: [
              'foo.md', // resolved as `/guide/group/sub1/bar.md`
              'bar.md', // resolved as `/guide/group/sub1/bar.md`

              // an external link
              {
                text: 'Example',
                link: 'https://example.com',
              },
            ],
          },
          {
            text: 'SubGroup2',
            prefix: 'sub2/',
            // for project links, .md or .html suffix is optional
            children: [
              'foo', // resolved as `/guide/group/sub2/foo.md`
              'bar', // resolved as `/guide/group/sub2/bar.md`

              // link not inside SubGroup2
              '/baz/', // resolved as `/baz/README.md`
            ],
          },
        ],
      },
      // control when should the item be active
      {
        text: 'Group 2',
        children: [
          {
            text: 'Always active',
            link: '/',
            // this item will always be active
            activeMatch: '/',
          },
          {
            text: 'Active on /foo/',
            link: '/not-foo/',
            // this item will be active when current route path starts with /foo/
            // regular expression is supported
            activeMatch: '^/foo/',
          },
        ],
      },
    ],
  }),
}
```

@`logo` type=`null | string`

Specify the url of logo image.

The logo image will be displayed at the left end of the navbar.

Set to `null` to disable logo.

```ts title=".vuepress/config.ts"
export default {
  theme: defaultTheme({
    // public file path
    logo: '/hero.png',
    // url
    logo: 'https://vuepress.vuejs.org/images/hero.png',
  }),
}
```

See also: [Guide > Assets > Public Files](https://v2.vuepress.vuejs.org/guide/assets.html#public-files)

@`logoDark` type=`null | string`

Specify the url of logo image to be used in dark mode.

You can make use of this option if you want to use different logo config in dark mode.

Set to `null` to disable logo in dark mode. Omit this option to use [logo](#logo) in dark mode.

See also: [colorMode](#colormode)

@`logoAlt` type=`null | string`

Specify the alt text of the logo image.

If not specified, defaults to be the same as the site title.

@`repo` type=string

Specify the repository url of your project.

This will be used as the link of the *repository link*, which will be displayed as the last item of the navbar.

```ts title=".vuepress/config.ts"
export default {
  theme: defaultTheme({
    // If you set it in the form of `organization/repository`
    // we will take it as a GitHub repo
    repo: 'vuepress/ecosystem',
    // You can also set it to a URL directly
    repo: 'https://gitlab.com/foo/bar',
  }),
}
```

@`sidebar` type=`false | SidebarOptions` default=`'heading'`

Configuration of sidebar.

You can override this global option via [sidebar](./frontmatter.md#sidebar) frontmatter in your pages.

Set to `false` to disable sidebar.

If you set it to `'heading'`, the sidebar will be automatically generated from the page headers.

To configure the sidebar items manually, you can set this option to a *sidebar array*, each item of which could be a `SidebarItem` object or a string:

* A `SidebarItem` object should have a `text` field, could have an optional `link` field, an optional `children` field, an optional `collapsible` field and an optional `prefix` field. The `children` field should be a *sidebar array*, where `prefix` will be prepended to every link inside it. The `collapsible` field controls whether the item is collapsible.
* A string should be the path to the target page file. It will be converted to a `SidebarItem` object, whose `text` is the page title, `link` is the page route path, and `children` is automatically generated from the page headers.

If you want to set different sidebar for different sub paths, you can set this option to a *sidebar object*:

* The key should be the path prefix.
* The value should be a *sidebar array* or set to `'heading'` to automatically generate the sidebar from the page headers for just the corresponding path.

```ts title=".vuepress/config.ts"
export default {
  theme: defaultTheme({
    // sidebar array
    // all pages will use the same sidebar
    sidebar: [
      // SidebarItem
      {
        text: 'Foo',
        prefix: '/foo/',
        link: '/foo/',
        children: [
          // SidebarItem
          {
            text: 'github',
            link: 'https://github.com',
            children: [],
          },
          // string - page file path
          'bar.md', // resolved to `/foo/bar.md`
          '/ray.md', // resolved to `/ray.md`
        ],
      },
      // string - page file path
      '/bar/README.md',
    ],
  }),
}
```

```ts title=".vuepress/config.ts"
export default {
  theme: defaultTheme({
    // sidebar object
    // pages under different sub paths will use different sidebar
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          // prefix will be prepended to relative paths
          children: [
            'introduction.md', // resolved to `/guide/introduction.md`
            'getting-started.md', // resolved to `/guide/getting-started.md`
          ],
        },
      ],
      '/reference/': 'heading',
    },
  }),
}
```

```ts title=".vuepress/config.ts"
export default {
  theme: defaultTheme({
    // collapsible sidebar
    sidebar: {
      '/reference/': [
        {
          text: 'VuePress Reference',
          collapsible: true,
          // for project links, .md or .html suffix is optional
          children: ['cli', 'config'],
        },
        {
          text: 'Bundlers Reference',
          collapsible: true,
          // prefix can be a relative path, which is equivalent to `prefix: /reference/bundler/`
          prefix: 'bundler/',
          children: ['vite', 'webpack'],
        },
      ],
    },
  }),
}
```

@`sidebarDepth` type=number default=`2`

Set the maximum depth of the sidebar children which are automatically generated from the page headers.

* Set to `0` to disable all levels of headers.
* Set to `1` to include `<h2>` headers.
* Set to `2` to include `<h2>` and `<h3>` headers.
* ...

You can override this global option via [sidebarDepth](./frontmatter.md#sidebardepth) frontmatter in your pages.

@`editLink` type=boolean default=`true`

Enable the *edit this page* link or not.

You can override this global option via [editLink](./frontmatter.md#editlink) frontmatter in your pages.

@`editLinkPattern` type=string

Specify the pattern of the *edit this page* link.

This will be used for generating the *edit this page* link.

If you don't set this option, the pattern will be inferred from the [docsRepo](#docsrepo) option. But if your documentation repository is not hosted on a common platform, for example, GitHub, GitLab, Bitbucket, Gitee, etc., you have to set this option explicitly to make the *edit this page* link work.

| Pattern   | Description                                                                                         |
| --------- | --------------------------------------------------------------------------------------------------- |
| `:repo`   | The docs repo url, i.e. [docsRepo](#docsrepo)                                                       |
| `:branch` | The docs repo branch, i.e. [docsBranch](#docsbranch)                                                |
| `:path`   | The path of the page source file, i.e. [docsDir](#docsdir) joins the relative path of the page file |

```ts title=".vuepress/config.ts"
export default {
  theme: defaultTheme({
    docsRepo: 'https://gitlab.com/owner/name',
    docsBranch: 'master',
    docsDir: 'docs',
    editLinkPattern: ':repo/-/edit/:branch/:path',
  }),
}
```

The generated link will look like `'https://gitlab.com/owner/name/-/edit/master/docs/path/to/file.md'`.

@`docsRepo` type=string

Specify the repository url of your documentation source files.

This will be used for generating the *edit this page* link.

If you don't set this option, it will use the [repo](#repo) option by default. But if your documentation source files are in a different repository, you will need to set this option.

@`docsBranch` type=string default=`'main'`

Specify the repository branch of your documentation source files.

This will be used for generating the *edit this page* link.

@`docsDir` type=string default=`''`

Specify the directory of your documentation source files in the repository.

This will be used for generating the *edit this page* link.

@`lastUpdated` type=boolean default=`true`

Enable the *last updated timestamp* or not.

You can override this global option via [lastUpdated](./frontmatter.md#lastupdated) frontmatter in your pages. Notice that if you have already set this option to `false`, this feature will be disabled totally and could not be enabled in locales nor page frontmatter.

@`contributors` type=boolean default=`true`

Enable the *contributors list* or not.

You can override this global option via [contributors](./frontmatter.md#contributors) frontmatter in your pages. Notice that if you have already set this option to `false`, this feature will be disabled totally and could not be enabled in locales nor page frontmatter.

::::
