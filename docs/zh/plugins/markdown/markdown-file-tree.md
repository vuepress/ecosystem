---
icon: folder-tree
---

# markdown-file-tree

<NpmBadge package="@vuepress/plugin-markdown-file-tree" />

在 Markdown 中，使用 `::: file-tree` 容器 显示带有文件图标和可折叠子目录的目录结构。

## 使用

```bash
npm i -D @vuepress/plugin-markdown-file-tree@next
```

```ts title=".vuepress/config.ts"
import { markdownFileTreePlugin } from '@vuepress/plugin-markdown-file-tree'

export default {
  plugins: [markdownFileTreePlugin()],
}
```

## 语法

在 `::: file-tree` 容器，使用内置的 **Markdown 无序列表语法** 指定文件和目录的组织结构。
使用嵌套的列表项创建子目录；若希望某个目录不显示具体内容，可在列表项末尾添加斜杠 `/` 。

以下语法可用于自定义文件树的外观：

- 通过加粗文件名或目录名来突出显示，例如 `**README.md**`
- 通过在名称后添加以 `#` 开头的更多文本来为文件或目录添加注释
- 通过在名称前添加 `++` 或 `--` 来标记文件或目录为 **新增** 或 **删除**
- 使用 `...` 或 `…` 作为名称来添加占位符文件和目录。
- 在 `:::file-tree` 后空格添加任意文本 可以为文件树添加标题。

## 示例

**输入：**

```md
::: file-tree

- docs
  - .vuepress
    - ++ config.ts
  - -- page1.md
  - README.md
- theme # 一个 **主题** 目录
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

**输出：**

::: file-tree

- docs
  - .vuepress
    - ++ config.ts
  - -- page1.md
  - README.md
- theme # 一个 **主题** 目录
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
