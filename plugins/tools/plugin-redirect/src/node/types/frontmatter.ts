import type { PageFrontmatter } from 'vuepress'

export interface RedirectPluginFrontmatter extends PageFrontmatter {
  redirectFrom?: string[] | string
  redirectTo?: string
}
