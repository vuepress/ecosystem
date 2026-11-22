// oxlint-disable import/max-dependencies
import { keys } from '@vuepress/helper'

import type {
  BuiltInShareService,
  ShareServiceConfig,
} from '../../shared/index.js'
import { buffer } from './buffer.js'
import { douban } from './douban.js'
import { email } from './email.js'
import { evernote } from './evernote.js'
import { facebook } from './facebook.js'
import { flipboard } from './flipboard.js'
import { line } from './line.js'
import { linkedin } from './linkedin.js'
import { messenger } from './messenger.js'
import { pinterest } from './pinterest.js'
import { qq } from './qq.js'
import { qrcode } from './qrcode.js'
import { qzone } from './qzone.js'
import { reddit } from './reddit.js'
import { skype } from './skype.js'
import { sms } from './sms.js'
import { snapchat } from './snapchat.js'
import { telegram } from './telegram.js'
import { tumblr } from './tumblr.js'
import { vk } from './vk.js'
import { weibo } from './weibo.js'
import { whatsapp } from './whatsapp.js'
import { wordpress } from './wordpress.js'
import { x } from './x.js'

/**
 * Configurations of all built-in share services
 *
 * 所有内置分享服务的配置
 */
export const SHARE_CONFIG: Record<BuiltInShareService, ShareServiceConfig> = {
  buffer,
  douban,
  email,
  evernote,
  facebook,
  flipboard,
  line,
  linkedin,
  messenger,
  pinterest,
  qq,
  qrcode,
  qzone,
  reddit,
  skype,
  sms,
  snapchat,
  telegram,
  tumblr,
  vk,
  weibo,
  whatsapp,
  wordpress,
  x,
}

/**
 * Names of all built-in share services
 *
 * 所有内置分享服务的名称
 */
export const AVAILABLE_SERVICES = keys(SHARE_CONFIG) as BuiltInShareService[]
