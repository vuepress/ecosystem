import { load } from 'cheerio'
import type { CheerioAPI, CheerioOptions } from 'cheerio'

export const cheerioOptions: CheerioOptions = {
  xml: {
    xmlMode: false,
    recognizeSelfClosing: true,
    decodeEntities: false,
  },
}

export const cheerio: CheerioAPI = load('', cheerioOptions)
