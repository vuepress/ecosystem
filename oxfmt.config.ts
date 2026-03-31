import { defineHopeConfig } from 'oxc-config-hope/oxfmt'

export default defineHopeConfig({
  singleQuote: true,
  semi: false,
  printWidth: 80,
  quoteProps: 'consistent',
  sortImports: {
    internalPattern: ['@internal', '@temp', '@theme'],
  },
})
