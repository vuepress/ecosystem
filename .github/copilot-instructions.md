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
- ✅ **@default**: Only when default values are not obvious; can be omitted for internal function parameters with obvious defaults

### Markdown Language Style

- **English Documentation**: Keep concise and professional, avoid verbose descriptions, focus on clarity over detail
- **Chinese Documentation**: Use "你" instead of "您", keep concise and crisp, avoid verbose descriptions that slow reading and ensure sync with en docs.

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
