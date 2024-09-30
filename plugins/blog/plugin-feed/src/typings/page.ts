import type { GitData } from '@vuepress/plugin-git'
import type { Page } from 'vuepress'
import type { FeedPluginFrontmatter } from './frontmatter.js'

export type FeedPage = Page<
  Record<string, unknown> & { excerpt?: string; git?: GitData },
  FeedPluginFrontmatter
>
