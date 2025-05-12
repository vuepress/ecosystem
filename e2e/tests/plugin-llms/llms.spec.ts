import { expect, test } from '@playwright/test'
import { BASE, COMMAND } from '../../utils/env.js'
import {
  getLlmsTxtPath,
  getLlmsFullTxtPath,
  readLlmsTxt,
  readLlmsFullTxt,
  parseLlmsTxt,
  validateLlmsTxt,
  validateLlmsFullTxt,
  checkLinkFormat,
  extractLinks,
} from './helpers.js'
import {
  expectedLlmsTxtStructure,
  expectedLlmsFullTxtStructure,
  expectedPageTitles,
  expectedContentFragments,
  expectedLinkFormat,
  expectedFullLinkFormat,
} from './__snapshots__/expected-content.js'
import fs from 'node:fs'

test.describe('plugin-llms', () => {
  test('should generate llms.txt with correct structure', async ({
    request,
  }) => {
    // 通过 HTTP 请求测试文件是否可访问
    const response = await request.get('llms.txt')
    await expect(response).toBeOK()

    // 文件应该存在
    expect(fs.existsSync(getLlmsTxtPath())).toBe(true)

    // 读取内容并验证
    const content = readLlmsTxt()

    // 使用快照验证基本结构
    expect(content.includes(expectedLlmsTxtStructure)).toBe(true)

    // 验证预期的页面标题都包含在内容中
    for (const title of expectedPageTitles) {
      expect(content.includes(title)).toBe(true)
    }

    // 验证必要的结构元素
    expect(content.includes('## Table of Contents')).toBe(true)
  })

  test('should generate llms-full.txt with correct structure', async ({
    request,
  }) => {
    // 通过 HTTP 请求测试文件是否可访问
    const response = await request.get('llms-full.txt')
    await expect(response).toBeOK()

    // 文件应该存在
    expect(fs.existsSync(getLlmsFullTxtPath())).toBe(true)

    // 读取内容并验证
    const content = readLlmsFullTxt()

    // 使用快照验证基本结构
    expect(content.includes(expectedLlmsFullTxtStructure)).toBe(true)

    // 验证预期的内容片段都包含在内容中
    for (const fragment of expectedContentFragments) {
      expect(content.includes(fragment)).toBe(true)
    }

    // 验证URL格式
    expect(expectedFullLinkFormat.test(content)).toBe(true)
  })

  test('should have proper table of contents in llms.txt', async () => {
    // 解析目录结构
    const parsed = parseLlmsTxt()

    // 验证基本结构
    expect(parsed.title).toBe('# VuePress Ecosystem E2E')

    // 验证内容中包含必要的页面标题
    const hasLlmsTestPage = parsed.content.includes('LLMs Test Page')
    expect(hasLlmsTestPage).toBe(true)

    // 验证内容中有链接
    expect(expectedLinkFormat.test(parsed.content)).toBe(true)
  })

  test('should have proper link formats in llms.txt', async () => {
    const content = readLlmsTxt()

    // 验证链接格式与预期相符
    expect(expectedLinkFormat.test(content)).toBe(true)

    // 验证链接存在
    const hasLinks = content.includes('[') && content.includes(']')
    expect(hasLinks).toBe(true)

    // 确认链接格式
    expect(content.includes('https://ecosystem-e2e-test.com/')).toBe(true)
  })
})
