import { describe, expect, it } from 'vitest'

import { flowchartPresets } from '../../src/client/utils/index.js'

describe('flowchart presets', () => {
  it('should provide the ant, pie and vue presets', () => {
    expect(Object.keys(flowchartPresets).sort()).toStrictEqual([
      'ant',
      'pie',
      'vue',
    ])
  })

  it('should inherit the base options', () => {
    for (const preset of Object.values(flowchartPresets)) {
      expect(preset['font-size']).toBe(14)
      expect(preset['yes-text']).toBe('Yes')
      expect(preset.symbols.start.class).toBe('start-element')
    }
  })

  it('should override the colors of the base options per preset', () => {
    expect(flowchartPresets.ant.symbols.start.fill).toBe('#595959')
    expect(flowchartPresets.vue.symbols.start.fill).toBe('#2F495F')
    expect(flowchartPresets.pie.symbols.start.fill).toBe('#ccc')
  })

  it('should let a preset override a shared option', () => {
    expect(flowchartPresets.vue['line-width']).toBe(2)
    expect(flowchartPresets.pie['line-width']).toBe(1)
  })
})
