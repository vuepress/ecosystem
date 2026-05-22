// oxlint-disable-next-line no-control-regex
const RE_UNSAFE_PATH = /[\u0000\n\r;|&`$(){}[\]<>!]/u

/**
 * Check if a file path is safe to pass to git commands
 *
 * 检查文件路径是否可以安全传递给 git 命令
 *
 * @param filePath - The file path to validate / 要验证的文件路径
 * @returns Whether the path is safe / 路径是否安全
 */
export const isSafePath = (filePath: string): boolean =>
  !RE_UNSAFE_PATH.test(filePath) && !filePath.startsWith('..')
