export const encodeSVG = (svg: string): string => {
  let encoded = svg
    .replace(/<br>/g, '<br />')
    .replace(/%/g, '%25')
    .replace(/"/g, '%22')
    .replace(/'/g, '%27')
    .replace(/&/g, '%26')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')

  if (!svg.includes('xmlns')) {
    encoded = encoded.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
  }

  return `data:image/svg+xml;charset=utf8,${encoded}`
}
