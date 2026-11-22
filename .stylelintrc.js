import { defineHopeConfig } from 'stylelint-config-hope'
import html from 'stylelint-config-html/html'
import vue from 'stylelint-config-html/vue'

export default defineHopeConfig({
  scss: true,
  vue: true,
  scssInVue: true,
  ignoreFiles: [
    '.cache/',
    '.temp/',
    '**/__fixtures__/**',
    'node_modules/',
    '**/dist/**',
    '**/*.module.scss',
    '**/empty.scss',
  ],
  rules: {
    'declaration-block-no-redundant-longhand-properties': true,
    'media-feature-range-notation': 'prefix',
    'no-descending-specificity': null,
  },
  overrides: [
    {
      files: ['**/*.html'],
      extends: [html],
    },
    {
      files: ['**/*.vue'],
      extends: [vue],
      rules: {
        'function-no-unknown': [
          true,
          {
            ignoreFunctions: ['v-bind'],
          },
        ],
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['deep', 'global', 'slotted'],
          },
        ],
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
          },
        ],
      },
    },
    {
      // Layout styles ported from the VitePress default theme. They are kept
      // close to upstream so they can be diffed and re-synced, so the stricter
      // selector/number rules are relaxed for this layer.
      files: ['themes/theme-default/src/client/theme-default/**'],
      rules: {
        'number-max-precision': null,
        'selector-max-class': null,
        'selector-max-compound-selectors': null,
        'selector-max-attribute': null,
        'no-duplicate-selectors': null,
        'declaration-block-no-duplicate-properties': null,
        'property-no-deprecated': null,
        'layer-name-pattern': null,
        'declaration-property-value-no-unknown': null,
        'media-feature-range-notation': null,
      },
    },
  ],
})
