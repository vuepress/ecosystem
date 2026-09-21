/**
 * Helpers building the embed URL of third-party video and audio platforms
 *
 * 构造第三方视频与音频平台嵌入链接的辅助方法
 *
 * Each helper accepts a URL or an id copied from the platform and returns the
 * matching iframe URL, or `null` when the value is not recognized. Query
 * parameters of the given URL are kept on the embed URL, so options documented
 * by the platform (like `dnt` of Vimeo or `theme` of Spotify) keep working.
 *
 * 每个方法都接受从平台复制的链接或 ID，并返回对应的 iframe 链接，值无法识别时返回 `null`。
 * 传入链接的查询参数会保留在嵌入链接上，因此平台文档中的选项（如 Vimeo 的 `dnt`、Spotify 的 `theme`）仍然有效。
 */

const YOUTUBE_ID_PATTERN = /^[\w-]{11}$/u
const YOUTUBE_VIDEO_PATTERN =
  /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))(?<id>[\w-]{11})/u
const YOUTUBE_PLAYLIST_PATTERN =
  /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/.*?[?&]list=)(?<id>[\w-]+)/u

const VIMEO_PATTERN =
  /vimeo\.com\/(?:video\/)?(?<id>\d+)(?:\/(?<hash>[\w-]+))?/u

const TWITCH_VIDEO_PATTERN =
  /(?:^|\/\/)(?:www\.|go\.)?twitch\.tv\/(?:videos?\/|\?video=)(?<id>\d+)\/?(?:$|[?&])/u
const TWITCH_CHANNEL_PATTERN =
  /(?:^|\/\/)(?:www\.|go\.)?twitch\.tv\/(?<channel>[a-zA-Z0-9_]+)\/?(?:$|[?&])/u

const DAILYMOTION_PATTERN =
  /(?:dailymotion\.com\/(?:video\/|embed\/video\/)|dai\.ly\/)(?<id>[a-zA-Z0-9]+)/u

const TIKTOK_PATTERN =
  /tiktok\.com\/(?:player\/v1\/|embed\/v2\/|embed\/|share\/video\/|@[^/]+\/video\/)(?<id>\d+)/u

const SPOTIFY_URI_PATTERN =
  /^spotify:(?<type>track|episode|album|playlist|show|artist):(?<id>\w+)$/iu
const SPOTIFY_PATTERN =
  /open\.spotify\.com\/(?:[\w-]+\/)*?(?<type>track|episode|album|playlist|show|artist)\/(?<id>\w+)/iu

const TIME_PATTERN =
  /^(?:(?<hours>\d+)h)?(?:(?<minutes>\d+)m)?(?:(?<seconds>\d+)s?)?$/u

/**
 * Read the query parameters of a URL
 *
 * 读取链接的查询参数
 *
 * @param src - Source URL / 源链接
 * @returns Query parameters / 查询参数
 */
const getSearchParams = (src: string): URLSearchParams =>
  new URLSearchParams(src.split('#')[0].split('?')[1] ?? '')

/**
 * Append query parameters to an embed URL
 *
 * 向嵌入链接添加查询参数
 *
 * @param base - Embed URL without query / 不带查询参数的嵌入链接
 * @param params - Query parameters / 查询参数
 * @returns Embed URL / 嵌入链接
 */
const buildEmbedUrl = (base: string, params: URLSearchParams): string => {
  const query = params.toString()

  return query ? `${base}?${query}` : base
}

/**
 * Convert a YouTube timestamp to seconds
 *
 * 将 YouTube 时间戳转换为秒数
 *
 * YouTube spells timestamps as `171`, `171s`, `2m51s`, or `1h30m15s`.
 *
 * YouTube 的时间戳格式为 `171`、`171s`、`2m51s` 或 `1h30m15s`。
 *
 * @param value - Timestamp / 时间戳
 * @returns Seconds, or `null` when the value is not a timestamp / 秒数，值不是时间戳时为
 *   `null`
 */
const parseTime = (value: string): number | null => {
  const { hours, minutes, seconds } =
    TIME_PATTERN.exec(value.trim().toLowerCase())?.groups ?? {}

  if (hours === undefined && minutes === undefined && seconds === undefined)
    return null

  return (
    Number(hours ?? 0) * 3600 + Number(minutes ?? 0) * 60 + Number(seconds ?? 0)
  )
}

/**
 * Get the embed URL of a YouTube video or playlist
 *
 * 获取 YouTube 视频或播放列表的嵌入链接
 *
 * `src` accepts an id, `youtu.be` short links, `watch?v=`, `embed/`, `v/`,
 * `shorts/`, `live/`, playlist URLs, and `youtube-nocookie.com` URLs. The `t`
 * parameter of the URL becomes the `start` parameter of the player.
 *
 * `src` 支持视频 ID、`youtu.be`
 * 短链、`watch?v=`、`embed/`、`v/`、`shorts/`、`live/`、播放列表链接，以及
 * `youtube-nocookie.com` 链接。链接中的 `t` 参数会转换为播放器的 `start` 参数。
 *
 * @example
 *   getYouTubeEmbedUrl('https://youtu.be/dQw4w9WgXcQ?t=30') // 'https://www.youtube.com/embed/dQw4w9WgXcQ?start=30'
 *   getYouTubeEmbedUrl('not-a-video-url') // null
 *
 * @param src - YouTube URL or video id / YouTube 链接或视频 ID
 * @returns Embed URL / 嵌入链接
 */
export const getYouTubeEmbedUrl = (src: string): string | null => {
  const url = src.trim()

  if (!url) return null

  const matchedId = YOUTUBE_ID_PATTERN.test(url)
    ? url
    : (YOUTUBE_VIDEO_PATTERN.exec(url)?.groups?.id ?? null)
  // `videoseries` is the placeholder YouTube uses for a playlist without a video
  const videoId = matchedId === 'videoseries' ? null : matchedId
  const hasPlaylist = YOUTUBE_PLAYLIST_PATTERN.test(url)

  if (!videoId && !hasPlaylist) return null

  const params = getSearchParams(url)
  params.delete('v')

  const start = parseTime(params.get('t') ?? '')

  params.delete('t')
  if (start != null) params.set('start', String(start))

  const base = url.includes('-nocookie')
    ? 'https://www.youtube-nocookie.com/embed'
    : 'https://www.youtube.com/embed'

  if (videoId) return buildEmbedUrl(`${base}/${videoId}`, params)

  params.set('listType', 'playlist')

  return buildEmbedUrl(`${base}/videoseries`, params)
}

/**
 * Get the embed URL of a Vimeo video
 *
 * 获取 Vimeo 视频的嵌入链接
 *
 * `src` accepts an id, `vimeo.com/<id>`, `vimeo.com/video/<id>`, and
 * `player.vimeo.com/video/<id>` URLs. The unlisted hash of the URL is kept, so
 * private videos play as well.
 *
 * `src` 支持视频 ID、`vimeo.com/<id>`、`vimeo.com/video/<id>` 与
 * `player.vimeo.com/video/<id>` 链接。链接中的非公开哈希会被保留，因此私密视频同样可以播放。
 *
 * @example
 *   getVimeoEmbedUrl('https://vimeo.com/76979871') // 'https://player.vimeo.com/video/76979871'
 *   getVimeoEmbedUrl('https://vimeo.com/76979871/abc123?dnt=1') // 'https://player.vimeo.com/video/76979871?h=abc123&dnt=1'
 *
 * @param src - Vimeo URL or video id / Vimeo 链接或视频 ID
 * @returns Embed URL / 嵌入链接
 */
export const getVimeoEmbedUrl = (src: string): string | null => {
  const url = src.trim()

  if (!url) return null

  const match = VIMEO_PATTERN.exec(url)
  const id = /^\d+$/u.test(url) ? url : (match?.groups?.id ?? null)

  if (!id) return null

  const params = getSearchParams(url)
  const hash = params.get('h') ?? match?.groups?.hash

  if (hash) params.set('h', hash)

  return buildEmbedUrl(`https://player.vimeo.com/video/${id}`, params)
}

/**
 * Get the embed URL of a Twitch live channel or video
 *
 * 获取 Twitch 直播频道或视频的嵌入链接
 *
 * `src` accepts a channel name, a channel URL (`twitch.tv/<channel>`), and a
 * VOD URL (`twitch.tv/videos/<id>`). Twitch refuses to play unless the embed
 * knows the hostname of the page framing it, so `parent` must be the hostname
 * the site is served from, which the component reads from the browser.
 *
 * Twitch autoplays unless `autoplay` is given, which browsers block and the
 * embed reports as a missing visibility requirement, so `autoplay=false` is
 * added when the URL gives no preference. Pass `?autoplay=true` to ask for it.
 *
 * `src` 支持频道名、频道链接（`twitch.tv/<channel>`）与视频链接（`twitch.tv/videos/<id>`）。Twitch
 * 只有在嵌入链接包含框架页面的主机名时才会播放，因此 `parent` 必须是站点的实际主机名，组件会从浏览器中读取它。
 *
 * Twitch 在未指定 `autoplay` 时会自动播放，而浏览器会阻止这种自动播放，嵌入页会将其报告为缺少可见性条件，因此链接中未表态时补上
 * `autoplay=false`。如需自动播放，传入 `?autoplay=true`。
 *
 * @example
 *   getTwitchEmbedUrl('https://www.twitch.tv/monstercat', 'example.com') // 'https://player.twitch.tv/?autoplay=false&channel=monstercat&parent=example.com'
 *   getTwitchEmbedUrl(
 *     'https://www.twitch.tv/monstercat?autoplay=true',
 *     'example.com',
 *   ) // 'https://player.twitch.tv/?autoplay=true&channel=monstercat&parent=example.com'
 *
 * @param src - Twitch URL or channel name / Twitch 链接或频道名
 * @param [parent] - Hostname framing the embed / 框架嵌入页面的主机名
 * @returns Embed URL / 嵌入链接
 */
export const getTwitchEmbedUrl = (
  src: string,
  parent?: string | string[],
): string | null => {
  const url = src.trim()

  if (!url) return null

  const videoId = TWITCH_VIDEO_PATTERN.exec(url)?.groups?.id
  const channel = videoId
    ? null
    : /^[a-zA-Z0-9_]+$/u.test(url)
      ? url
      : (TWITCH_CHANNEL_PATTERN.exec(url)?.groups?.channel ?? null)

  if (!videoId && !channel) return null

  const params = getSearchParams(url)
  params.delete('video')
  params.delete('channel')

  const hosts = [
    ...(Array.isArray(parent) ? parent : parent ? [parent] : []),
    ...(params.getAll('parent') ?? []),
  ]

  params.delete('parent')

  if (videoId) params.set('video', videoId)
  else if (channel) params.set('channel', channel)

  // Twitch autoplays unless `autoplay` is given, which browsers block and the
  // embed reports as a missing visibility requirement, so it is turned off
  if (!params.has('autoplay')) params.set('autoplay', 'false')

  // Twitch only plays when the framing hostname is included
  for (const host of new Set(hosts)) if (host) params.append('parent', host)

  return buildEmbedUrl('https://player.twitch.tv/', params)
}

/**
 * Get the embed URL of a Dailymotion video
 *
 * 获取 Dailymotion 视频的嵌入链接
 *
 * `src` accepts an id, `dailymotion.com/video/<id>`,
 * `dailymotion.com/embed/video/<id>`, and `dai.ly/<id>` URLs.
 *
 * `src` 支持视频 ID、`dailymotion.com/video/<id>`、`dailymotion.com/embed/video/<id>`
 * 与 `dai.ly/<id>` 链接。
 *
 * @example
 *   getDailymotionEmbedUrl('https://www.dailymotion.com/video/x8v5k1u') // 'https://geo.dailymotion.com/player.html?video=x8v5k1u'
 *
 * @param src - Dailymotion URL or video id / Dailymotion 链接或视频 ID
 * @returns Embed URL / 嵌入链接
 */
export const getDailymotionEmbedUrl = (src: string): string | null => {
  const url = src.trim()

  if (!url) return null

  const id = /^[a-zA-Z0-9]+$/u.test(url)
    ? url
    : (DAILYMOTION_PATTERN.exec(url)?.groups?.id ?? null)

  if (!id) return null

  const params = getSearchParams(url)

  params.delete('video')
  params.set('video', id)

  return buildEmbedUrl('https://geo.dailymotion.com/player.html', params)
}

/**
 * Get the embed URL of a TikTok video
 *
 * 获取 TikTok 视频的嵌入链接
 *
 * `src` accepts a numeric id and the `tiktok.com/@user/video/<id>`,
 * `tiktok.com/player/v1/<id>`, and `tiktok.com/embed/v2/<id>` URLs the app
 * hands out.
 *
 * The `player/v1` player is used, because the `embed/v2` card keeps a fixed
 * width (325px for vertical videos), which leaves large blank areas inside a
 * wider box. The player fills the whole box with the video and a blurred
 * backdrop.
 *
 * `src` 支持数字 ID，以及应用提供的
 * `tiktok.com/@user/video/<id>`、`tiktok.com/player/v1/<id>` 与
 * `tiktok.com/embed/v2/<id>` 链接。
 *
 * 此处使用 `player/v1` 播放器，因为 `embed/v2` 卡片的宽度固定（竖屏视频为
 * 325px），在更宽的容器中会留下大片空白。播放器会用视频与模糊背景铺满整个容器。
 *
 * @example
 *   getTikTokEmbedUrl(
 *     'https://www.tiktok.com/@scout2015/video/6718335390845095173',
 *   ) // 'https://www.tiktok.com/player/v1/6718335390845095173'
 *
 * @param src - TikTok URL or video id / TikTok 链接或视频 ID
 * @returns Embed URL / 嵌入链接
 */
export const getTikTokEmbedUrl = (src: string): string | null => {
  const url = src.trim()

  if (!url) return null

  const id = /^\d+$/u.test(url)
    ? url
    : (TIKTOK_PATTERN.exec(url)?.groups?.id ?? null)

  if (!id) return null

  return buildEmbedUrl(
    `https://www.tiktok.com/player/v1/${id}`,
    getSearchParams(url),
  )
}

/**
 * Get the embed URL of a Spotify track, episode, album, playlist, show, or
 * artist
 *
 * 获取 Spotify 单曲、单集、专辑、播放列表、节目或艺人的嵌入链接
 *
 * `src` accepts `open.spotify.com` URLs, including the localized and embedded
 * forms, and `spotify:<type>:<id>` URIs.
 *
 * `src` 支持 `open.spotify.com` 链接（含本地化与嵌入式形式）以及 `spotify:<type>:<id>` URI。
 *
 * @example
 *   getSpotifyEmbedUrl(
 *     'https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?theme=0',
 *   ) // 'https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC?theme=0'
 *
 * @param src - Spotify URL, URI, or entity id / Spotify 链接、URI 或实体 ID
 * @returns Embed URL / 嵌入链接
 */
export const getSpotifyEmbedUrl = (src: string): string | null => {
  const url = src.trim()

  if (!url) return null

  const match = SPOTIFY_URI_PATTERN.exec(url) ?? SPOTIFY_PATTERN.exec(url)
  const type = match?.groups?.type?.toLowerCase()
  const id = match?.groups?.id

  if (!type || !id) return null

  return buildEmbedUrl(
    `https://open.spotify.com/embed/${type}/${id}`,
    getSearchParams(url),
  )
}
