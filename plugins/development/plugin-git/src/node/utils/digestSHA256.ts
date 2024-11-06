import { createHash } from 'node:crypto'

const hash = createHash('sha256')

export const digestSHA256 = (message: string): string => {
  hash.update(message)

  return hash.digest('hex')
}
