# Copilot Instructions for VuePress Ecosystem

## Content Requirements

All contents are targeting developers, so they must be concise and clear, avoid verbose descriptions and unnecessary details.

The content should be straightforward, focusing on essential information that developers need to understand and implement features effectively, without any typos and grammar errors.

## Style Requirements

### CSS Class Naming Rules

All CSS class names must follow these conventions:

- **VuePress Prefixed Classes**: All CSS class names must start with `vp-` prefix
- **External Integration Exception**: Classes for external content integration are exempt from the prefix requirement
  - Example: `waline-wrapper` for Waline comment system integration
  - Example: `giscus-container` for Giscus comment system integration
- **Component Classes**: Use descriptive names after the prefix
  - Good: `vp-comment-form`, `vp-back-to-top-button`, `vp-code-block`
  - Bad: `comment-form`, `btn`, `container`

## Documentation Requirements

## JSDoc Requirements

### Scope of Application

JSDocs is required for Any user-visible things

- **@example**: Only for exported functions
- **@default**:
  - user-visible things: Always include for user-visible things when there's a default value, including `@default false` for boolean options.
  - rest: Only when the default value is not clearly visible in the function parameters

User-invisible internal implementations does not required JSDoc comments, but existing comments should be correct.

### JSDoc Bilingual Rules

For all exported content, JSDoc must be bilingual (English + Chinese):

````typescript
/**
 * English description
 *
 * 中文描述
 *
 * @description (optional, only if it's necessary to explain more besides description) English detailed description
 *
 * 中文详细描述
 *
 * @default defaultValue
 * @example <Only for exported content>
 *
 * ```ts
 * // Example code in TypeScript
 * ```
 */
````

## Documentation Requirements

1. Use consistent terms across documentation, and all options should match the terminology used in the code.
2. Chinese and English content must be consistent in structure and content
3. Make the content concise and clear, shorten the content always if possible, remove unnecessary words, and avoid redundancy.
4. Use "你" instead of "您" in Chinese documentation.

In plugin/theme documentation files (\*.md), each option should include:

- **Type**: Always specify the type of the option, a code fence should be used for complicated types
  - English: "Type: `type`"
  - Chinese: "类型：`type`"
- **Required Options**: Always emphasize in documentation
  - English: "Required: Yes"
  - Chinese: "必填：是"
- **Optional Options**: Must not declare "Required: No"
- **Default Values**: Always mention default values for optional parameters, except for boolean options with `false` default (which should be removed)
  - English: "Default: `defaultValue`"
  - Chinese: "默认值：`defaultValue`"
- **Reference**: Optional, links to relevant documentation or external resources, should always be a list of links.
- **Details**: Provide a brief description of the option's purpose or usage, should not change any existing format.

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
