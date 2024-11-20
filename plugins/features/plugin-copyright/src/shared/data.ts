export interface CopyrightInfoData {
  author?: string
  license?: string
}

export interface CopyrightPluginPageData extends Record<string, unknown> {
  copyright?: CopyrightInfoData | string
}
