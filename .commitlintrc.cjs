const fs = require('fs')
const path = require('path')

const getSubDirectories = (dir) =>
  fs
    .readdirSync(dir)
    .filter((item) => fs.statSync(path.join(dir, item)).isDirectory())

const pluginPackages = getSubDirectories(path.resolve(__dirname, 'plugins'))
const themePackages = getSubDirectories(path.resolve(__dirname, 'themes'))

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['e2e', ...pluginPackages, ...themePackages]],
    'footer-max-line-length': [0],
  },
}
