export const encodeSVG = (svg: string): string => {
  let encoded = svg
    .replaceAll('<br>', '<br />')
    .replaceAll('%', '%25')
    .replaceAll('"', '%22')
    .replaceAll("'", '%27')
    .replaceAll('&', '%26')
    .replaceAll('#', '%23')
    .replaceAll('{', '%7B')
    .replaceAll('}', '%7D')
    .replaceAll('<', '%3C')
    .replaceAll('>', '%3E')

  if (!svg.includes('xmlns'))
    encoded = encoded.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')

  return `data:image/svg+xml;charset=utf8,${encoded}`
}
