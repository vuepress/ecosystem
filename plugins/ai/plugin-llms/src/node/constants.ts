export const PLUGIN_NAME = '@vuepress/plugin-llms'

export const DEFAULT_LLMS_TITLE = 'LLM Documentation'
export const DEFAULT_LLMS_DETAILS =
  'This file contains links to all documentation sections.'

/** Default template for the `llms.txt` file */
export const DEFAULT_LLMSTXT_TEMPLATE = `\
# {title}

{description}

{alternateLinks}{details}

## Table of Contents

{toc}\
`

/**
 * Generates a regular expression that matches either an opening or closing HTML tag based on the provided parameters.
 *
 * @param tag - The HTML tag name to match (e.g., 'a' for <a>).
 * @param type - open or closed tag type to match (e.g., 'open' for <a>, 'closed' for </a>).
 * @param flags - Optional RegExp flags (e.g., 'i' for case-insensitive matching).
 *
 * @example
 *
 * ```ts
 * // To match an opening <a> tag:
 * const openTagRegex = tagRegex('a', 'open');
 * console.log(openTagRegex.test('<a>')); // true
 * console.log(openTagRegex.test('</a>')); // false
 *
 * // To match a closing </a> tag:
 * const closedTagRegex = tagRegex('a', 'closed');
 * console.log(closedTagRegex.test('<a>')); // false
 * console.log(closedTagRegex.test('</a>')); // true
 * ```
 *
 * @returns A RegExp that matches the specified tag type.
 */
export const tagRegex = (
  tag: RegExp | string,
  type: 'closed' | 'open',
  flags?: string,
): RegExp => new RegExp(`<${type === 'open' ? '' : '/'}${tag}>`, flags)

/**
 * Generates a regular expression that matches a complete custom tag, including its content.
 *
 * The resulting RegExp matches an opening tag, captures everything inside (non-greedily),
 * and then matches the corresponding closing tag. The tag name is provided as an argument.
 *
 * @param tag - The name of the tag to match (e.g., "note" will match <note>...</note>).
 * @param flags - Optional RegExp flags (e.g., "i" for case-insensitive matching).
 * @returns A RegExp that captures the entire tag block including its inner content.
 *
 * @example
 * ```ts
 * const regex = fullTagRegex('note');
 * const input = '<note>This is a note</note>';
 * const match = input.match(regex);
 * console.log(match?.[1]); // "This is a note"
 * ```
 */
export const fullTagRegex = (tag: RegExp | string, flags?: string): RegExp =>
  new RegExp(
    `${tagRegex(tag, 'open').source}([\\s\\S]*?)${tagRegex(tag, 'closed').source}`,
    flags,
  )
