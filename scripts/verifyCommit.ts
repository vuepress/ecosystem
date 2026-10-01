import { verifyCommitMessage } from '@mr-hope/verify-commit-message'

await verifyCommitMessage({
  importMeta: import.meta,
  process,
  packages: ['docs', 'e2e', 'plugins/*/*', 'themes/*', 'tools/*'],
  extraScopes: ['deps', 'e2e', 'release'],
})
