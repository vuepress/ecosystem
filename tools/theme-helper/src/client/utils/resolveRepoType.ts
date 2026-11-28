// the repo type util lives in the shared layer so the node helpers can reuse
// it; keep the client entry to preserve the existing module path
export type { RepoType } from '../../shared/editLink.js'
export { resolveRepoType } from '../../shared/editLink.js'
