import { config } from 'oxc-config-hope/oxfmt'
import { defineConfig } from 'oxfmt'

export default defineConfig({
  extends: config,
  singleQuote: true,
  semi: false,
  printWidth: 80,
  quoteProps: 'consistent',
})
