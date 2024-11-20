export const getUserNameWithNoreplyEmail = (email: string): string | null =>
  email.endsWith('@users.noreply.github.com')
    ? email.replace('@users.noreply.github.com', '').split('+')[1]
    : null
