/**
 * llms.txt 预期的基本结构（修改为实际内容的开头）
 */
export const expectedLlmsTxtStructure = `# VuePress Ecosystem E2E`

/**
 * llms-full.txt 预期的基本结构
 */
export const expectedLlmsFullTxtStructure = `URL: https://ecosystem-e2e-test.com/zh/README.md`

/**
 * llms.txt 中预期包含的页面标题
 */
export const expectedPageTitles = ['LLMs Test Page', 'Markdown', '主页', 'Home']

/**
 * llms-full.txt 中预期包含的内容片段
 */
export const expectedContentFragments = [
  'URL:',
  '---',
  'This page is used to test',
  'LLMs Test Page',
]

/**
 * llms.txt 中链接的预期格式
 */
export const expectedLinkFormat = /\[(.*?)\]\((.*?)\)/

/**
 * llms-full.txt 中链接的预期格式
 */
export const expectedFullLinkFormat =
  /URL: https:\/\/ecosystem-e2e-test\.com\/.*\.md/
