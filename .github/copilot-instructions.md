# VuePress Ecosystem Coding Standards

## Content Rules

- Target developers: concise, clear, essential information only
- Focus on essential information developers need to understand and implement features
- No typos or grammar errors

## Code Rules

### API Usage Restrictions

- No Node.js APIs in `client` folder
- No browser APIs in `node` folder
- No cross import between `client` and `node` folders
- No Node.js or browser APIs in `shared` folder

### Export Requirements

- **Plugin and theme exports** must satisfy:
  - Name: consistent with package name
  - Types: All types in export content shall be exported
- **Single function files**: filename should match export function/class name

### Import/Export Rules

- Relative imports/exports must use `.js` extension with `.ts` files
- No external dependencies warnings with `bundle` command

## CSS Rules

### Class Naming

- **Classes**: Must start with `vp-` prefix
- **External Integration Exception**: Classes for external content integration are exempt. E.g.: `waline-wrapper` for Waline comment system

### Variable Naming

- **Color variables**: Must contain `-c-`
- **Plugin variables**: Prefixed with plugin name
- **Theme variables**: Prefixed with `vp-`
- **Icon variables**: If in class definitions, `--icon` is required.

## JSDoc Rules

### Scope

- **Required for**: All user-visible exports
- **Not required for**: Internal implementations (but existing ones must be correct)

### Format Requirements

- **Bilingual**: English + Chinese for all exported content
- **@default**:
  - User-visible things: Always include if exists (including `@default false`)
  - Others: Only when not clearly visible in function parameters
- **@example**: Only for exported functions
- **@description**: Optional, only if necessary to explain more

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
 * @example <Only for exported content>
 *
 * ```ts
 * // Example code in TypeScript
 * ```
 */
````

#### Scope of Application

- ✅ **Exported Content**: Interfaces, functions, types, classes and other user-visible APIs
- ❌ **Internal Functions**: User-invisible internal implementations
- ✅ **@example**: Only for exported content
- ✅ **@default**: Only when default values are not obvious; can be omitted for internal function parameters with obvious defaults

### Markdown Language Style

- **English Documentation**: Keep concise and professional, avoid verbose descriptions, focus on clarity over detail
- **Chinese Documentation**: Use "你" instead of "您", keep concise and crisp, avoid verbose descriptions that slow reading and ensure sync with en docs.

### Documentation Option Requirements

- **Required Options**: Always emphasize that an option is required
  - English: "Required: Yes"
  - Chinese: "必填：是"
- **Default Values**: Always mention default values for optional parameters, except for boolean options with `false` default
  - English: "Default: `defaultValue`"
  - Chinese: "默认值：`defaultValue`"
- **Boolean False Default**: Do not provide default value declaration for boolean options with `false` default

### Content Refactoring Principles

- **Length Control**: Avoid significantly lengthening content during refactoring
- **Target Users**: Technical professionals who prefer concise descriptions
- **Remove Redundancy**: Eliminate unnecessary modifier words
- **Preserve Core**: Retain key information while simplifying expression

### Quality Checks

1. Spelling and grammar accuracy
2. Format consistency
3. Accurate English and Chinese expression
4. Appropriate content length
