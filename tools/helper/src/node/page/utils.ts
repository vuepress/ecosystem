import { load } from 'cheerio'
import type { CheerioOptions } from 'cheerio'

export const parseOptions: CheerioOptions = {
  xml: {
    xmlMode: false,
    recognizeSelfClosing: true,
    decodeEntities: false,
  },
}

export const cheerio = load('', parseOptions)
