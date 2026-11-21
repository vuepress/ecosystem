import { tsdownConfig } from '../../scripts/tsdown.ts'

export default tsdownConfig(
  [
    'node/index',
    'node/setup',
    'client/index',
    'shared/index',
    'node/virtual/clientConfigs',
    'node/virtual/routes',
    'node/virtual/siteData',
    'node/virtual/themeData',
    'node/virtual/userStyle',
  ],
  {
    // `vuepressTestPlugin()` is a Vite plugin, so the declarations reference
    // the types of `vite`, whose declarations import the CommonJS declarations
    // of `postcss` and cannot be bundled.
    dtsNeverBundle: [/^vite$/u],
  },
)
