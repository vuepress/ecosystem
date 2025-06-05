import type { MarkdownItPlantumlOptions } from '@mdit/plugin-plantuml'
import { plantuml as _plantuml } from '@mdit/plugin-plantuml'
import type { PluginWithOptions } from 'markdown-it'

/**
 * PlantUML markdown-it plugin
 *
 * PlantUML markdown-it 插件
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 * @param options - PlantUML options / PlantUML 选项
 */
export const plantuml: PluginWithOptions<MarkdownItPlantumlOptions[]> = (
  md,
  options = [
    'chronology',
    'gantt',
    'json',
    'latex',
    'math',
    'mindmap',
    'regex',
    'salt',
    'uml',
    'wbs',
    'yaml',
  ].map((name) => ({ name })),
) => {
  options.forEach((option) => {
    md.use(_plantuml, option)
  })
}
