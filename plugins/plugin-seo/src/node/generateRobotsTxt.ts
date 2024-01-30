import type { App } from 'vuepress/core'
import { fs } from 'vuepress/utils'
import { logger } from './utils/index.js'

export const generateRobotsTxt = async (app: App): Promise<void> => {
  const { succeed, fail } = logger.load('Generating robots.txt')
  const publicPath = app.dir.public('robots.txt')

  let content = fs.existsSync(publicPath)
    ? await fs.readFile(publicPath, { encoding: 'utf8' })
    : ''

  if (content && !content.includes('User-agent')) {
    fail('robots.txt seems invalid!')
  } else {
    content += '\nUser-agent:*\nDisallow:\n'

    await fs.writeFile(app.dir.dest('robots.txt'), content, {
      flag: 'w',
    })

    succeed()
  }
}
