import { defineConfig, devices } from '@playwright/test'
import { BASE, BUNDLER, IS_CI, IS_DEV } from './utils/env.js'

const commandPart1 = IS_DEV ? 'docs:dev' : 'docs:build'
const commandPart2 = BUNDLER === 'vite' ? '' : `-${BUNDLER}`
const commandPart3 = IS_DEV ? '' : ' && pnpm docs:serve'

export default defineConfig({
  testDir: 'tests',
  forbidOnly: IS_CI,
  reporter: IS_CI ? 'github' : 'line',
  retries: IS_CI ? 2 : 0,
  workers: IS_DEV ? 1 : undefined,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  use: {
    baseURL: `http://127.0.0.1:9080${BASE}`,
    trace: 'on-first-retry',
  },
  webServer: {
    command: `pnpm docs:clean && pnpm ${commandPart1}${commandPart2}${commandPart3}`,
    url: 'http://127.0.0.1:9080',
    reuseExistingServer: !IS_CI,
  },
})
