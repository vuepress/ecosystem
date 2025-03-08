import type { GitInjectOptions } from '../shared/index.js'

declare const __GIT_OPTIONS__: GitInjectOptions

export const gitOptions = __GIT_OPTIONS__
