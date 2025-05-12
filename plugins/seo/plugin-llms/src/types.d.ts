declare module '@vuepress/core' {
  export interface App {
    dir: {
      source(): string
      dest(): string
    }
    env: {
      isDev: boolean
    }
    siteData: {
      title: string
      description: string
    }
  }

  export interface Plugin {
    name: string
    onInitialized?(app: App): void
    onPrepared?(app: App): void
    onGenerated?(app: App): Promise<void>
  }
}

export interface GenerateLLMsFullTxtOptions {
  srcDir: string
  cleanUrls: boolean
  linksExtension: string
  domain?: string
  template?: string
}
