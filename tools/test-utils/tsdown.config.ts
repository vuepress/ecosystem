import { tsdownConfig } from '../../scripts/tsdown.ts'

export default tsdownConfig([
  'node/index',
  'node/setup',
  'client/index',
  'shared/index',
  'node/virtual/clientConfigs',
  'node/virtual/routes',
  'node/virtual/siteData',
  'node/virtual/themeData',
  'node/virtual/userStyle',
])
