module.exports = {
  root: true,
  extends: 'vuepress',
  overrides: [
    {
      files: ['*.ts', '*.vue', '*.cts'],
      extends: 'vuepress-typescript',
      parserOptions: {
        project: ['tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      files: ['**/client/config.ts'],
      rules: {
        'vue/match-component-file-name': 'off',
      },
    },
    {
      files: ['e2e/**/*.cy.ts', 'e2e/cypress/**/*.ts'],
      extends: 'plugin:cypress/recommended',
    },
    {
      files: ['tools/create-vuepress/**/*.vue'],
      rules: {
        'vue/no-v-html': 'off',
      },
    },
    {
      files: ['**/tests/**/*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'import/no-extraneous-dependencies': 'off',
        'vue/one-component-per-file': 'off',
      },
    },
  ],
}
