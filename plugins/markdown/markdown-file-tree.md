---
url: /ecosystem/plugins/markdown/markdown-file-tree.md
---
# markdown-file-tree

In Markdown, use the `::: file-tree` container to display a directory structure with file icons and collapsible subdirectories.

## Usage

```bash
npm i -D @vuepress/plugin-markdown-file-tree@next
```

```ts title=".vuepress/config.ts"
import { markdownFileTreePlugin } from '@vuepress/plugin-markdown-file-tree'

export default {
  plugins: [markdownFileTreePlugin()],
}
```

## Syntax

In the `::: file-tree` container, use the built-in **Markdown unordered list syntax** to specify the file and directory structure.
Use nested list items to create subdirectories; if you want a directory to not display its contents, add a trailing slash `/` to the list item.

The following syntax can be used to customize the appearance of the file tree:

* By bolding the filename or directory name, you can highlight it, e.g. `**README.md**`
* By appending additional text starting with `#` to the filename or directory name, you can add a comment to the file or directory, e.g. `README.md # a README file`
* By prefixing the filename or directory name with `++` or `--`, you can mark the file or directory as **added** or **deleted**, e.g. `++ new-file.md` or `-- old-file.md`
* Use `...` or `…` as the name to add placeholder files and directories.
* Add any text after `:::file-tree` container to add a title to the file tree.

## Example

**Input：**

```md
::: file-tree

- docs
  - .vuepress
    - ++ config.ts
  - -- page1.md
  - README.md
- theme # a **theme** directory
  - client
    - components
      - **Navbar.vue**
    - composables
      - useNavbar.ts
    - styles
      - navbar.css
    - config.ts
  - node/
- package.json
- pnpm-lock.yaml
- .gitignore
- README.md
- …
  :::
```

**Output：**

::: file-tree

* docs
  * .vuepress
    * ++ config.ts
  * \-- page1.md
  * README.md
* theme # a **theme** directory
  * client
    * components
      * **Navbar.vue**
    * composables
      * useNavbar.ts
    * styles
      * navbar.css
    * config.ts
  * node/
* package.json
* pnpm-lock.yaml
* .gitignore
* README.md
* …
  :::
