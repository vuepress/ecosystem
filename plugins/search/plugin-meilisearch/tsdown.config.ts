import { tsdownConfig } from '../../../scripts/tsdown.ts'

export default tsdownConfig(
  ['cli/index', 'cli/generateScraperConfig', 'node/index', 'client/config'],
  {
    moduleSideEffects: [
      {
        test: /\.css$/u,
        sideEffects: true,
      },
      {
        test: /\.scss$/u,
        sideEffects: true,
      },
      {
        test: /^meilisearch-docsearch\/css/u,
        sideEffects: true,
      },
    ],
  },
)
