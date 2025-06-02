# Copilot Instructions for VuePress Ecosystem

## Documentation Improvement Requirements

Check spelling and grammar errors, refactor contents to provide better understanding while keeping language concise.

### Application Scope

- **All tasks** follow this standard
- **All exported content** must have bilingual JSDoc
- **All documentation** can be refactored and optimized

### JSDoc Bilingual Support Rules

For all exported content, JSDoc must be bilingual (English + Chinese):

````typescript
/**
 * English description
 *
 * 中文描述
 *
 * @description English detailed description
 *
 * 中文详细描述
 *
 * @default defaultValue
 * @example
 * ```ts
 * // Only for exported content
 * ```
 */
````

#### Scope of Application

- ✅ **Exported Content**: Interfaces, functions, types, classes and other user-visible APIs
- ❌ **Internal Functions**: User-invisible internal implementations
- ✅ **@example**: Only for exported content
- ✅ **@default**: Always include when there's a default value, including `@default false` for boolean options

### Markdown Documentation Option Requirements

**IMPORTANT**: The following rules apply to Markdown documentation files (\*.md), NOT to JSDoc comments in TypeScript files.

In plugin/theme documentation files, each option should include:

- **Required Options**: Always emphasize in documentation
  - English: "Required: Yes"
  - Chinese: "必填：是"
- **Optional Options**: Do not declare "Required: No" as it's redundant
- **Default Values**: Always mention default values for optional parameters, except for boolean options with `false` default
  - English: "Default: `defaultValue`"
  - Chinese: "默认值：`defaultValue`"
- **Boolean False Default**: Do not provide default value declaration in Markdown documentation for boolean options with `false` default

Example documentation format:

```markdown
### requiredOption

- Type: `string`
- Required: Yes
- Details: This option is required

### optionalOptionWithDefault

- Type: `string`
- Default: `"defaultValue"`
- Details: This option is optional with a default value

### optionalBooleanFalseDefault

- Type: `boolean`
- Details: This boolean option defaults to false (no default declaration needed)
```

### Markdown Language Style

- **English Documentation**: Keep concise and professional, avoid verbose descriptions, focus on clarity over detail
- **Chinese Documentation**: Use "你" instead of "您", keep concise and crisp, avoid verbose descriptions that slow reading and ensure sync with en docs.

- **Length Control**: Avoid significantly lengthening content during refactoring
- **Target Users**: Technical professionals who prefer concise descriptions
- **Remove Redundancy**: Eliminate unnecessary modifier words
- **Preserve Core**: Retain key information while simplifying expression

### Content Refactoring Principles

1. Spelling and grammar accuracy
2. Format consistency
3. Accurate English and Chinese expression
4. Appropriate content length
