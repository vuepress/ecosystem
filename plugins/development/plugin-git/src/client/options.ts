import type { GitInjectOptions } from '../shared/index.js'

declare const __GIT_OPTIONS__: GitInjectOptions

export const gitOptions =
  typeof __GIT_OPTIONS__ === 'undefined' ? {} : __GIT_OPTIONS__
