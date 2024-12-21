export type PreProcessorType = 'css' | 'html' | 'js'

export const PRE_PROCESSOR_CONFIG: Record<
  PreProcessorType,
  {
    types: string[]
    map: Record<string, string | undefined>
  }
> = {
  html: {
    types: ['html', 'slim', 'haml', 'md', 'markdown', 'vue'],
    map: {
      html: 'none',
      vue: 'none',
      md: 'markdown',
    },
  },
  js: {
    types: [
      'js',
      'javascript',
      'coffee',
      'coffeescript',
      'ts',
      'typescript',
      'ls',
      'livescript',
    ],
    map: {
      js: 'none',
      javascript: 'none',
      coffee: 'coffeescript',
      ls: 'livescript',
      ts: 'typescript',
    },
  },
  css: {
    types: ['css', 'less', 'sass', 'scss', 'stylus', 'styl'],
    map: {
      css: 'none',
      styl: 'stylus',
    },
  },
}
