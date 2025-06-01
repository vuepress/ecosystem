export interface ContributorOptions {
  /**
   * @kind Page meta / 页面元数据
   *
   * Whether to show contributors
   *
   * 是否显示贡献者
   *
   * @default true
   */
  contributors?: boolean
}

export type ContributorFrontmatter = ContributorOptions

export type ContributorThemeData = ContributorOptions
