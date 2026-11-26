/**
 * The options that have already been warned about
 *
 * 已经警告过的配置项
 */
const warnedOptions = new Set<string>()

/**
 * Warn about a classic theme option that is deprecated
 *
 * The function is the single place that emits the deprecation warnings, so it
 * can be removed in a future major release without touching the normalization
 * logic.
 *
 * 对 classic 主题中已废弃的配置项给出警告
 *
 * 该函数是发出废弃警告的唯一位置，因此在未来的大版本中可以直接删除它，而不必改动归一化逻辑。
 *
 * @param option - The deprecated option name / 已废弃的配置项名称
 * @param replacement - How to replace it / 如何替换该配置项
 */
export const warnDeprecatedThemeOption = (
  option: string,
  replacement: string,
): void => {
  if (warnedOptions.has(option)) return

  warnedOptions.add(option)

  // oxlint-disable-next-line no-console -- the deprecation notice is the purpose of this module
  console.warn(
    `[theme-default] The \`${option}\` option is deprecated and will be removed in a future major release. ${replacement}`,
  )
}
