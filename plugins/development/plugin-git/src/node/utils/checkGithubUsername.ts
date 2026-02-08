/**
 * Check if the username is a valid github username
 *
 * - length <= 39
 * - starts with a letter
 * - contains only letters, numbers, and hyphens
 * - does not start or end with a hyphen
 * - does not contain consecutive hyphens
 *
 * @param username - The username to check
 * @returns Whether the username is a valid github username
 */
export const checkGithubUsername = (username: string): boolean => {
  if (username.length > 39) return false
  if (username.startsWith('-') || username.endsWith('-')) return false

  return /^[a-z\d](?:[a-z\d]|-(?=[a-z\d]))*$/i.test(username)
}
