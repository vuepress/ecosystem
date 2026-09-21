/**
 * Platforms whose own player is embedded
 *
 * 嵌入平台自带播放器的平台
 *
 * They need no extra packages, because the video or audio is played by the
 * player of the platform inside an iframe.
 *
 * 它们不需要额外安装包，因为视频或音频是由平台自带的播放器在 iframe 内播放的。
 */
export const EMBED_NAMES = [
  'bilibili',
  'youtube',
  'vimeo',
  'twitch',
  'dailymotion',
  'tiktok',
  'spotify',
] as const

/**
 * Platform whose own player is embedded
 *
 * 嵌入自带播放器的平台
 */
export type EmbedName = (typeof EMBED_NAMES)[number]
