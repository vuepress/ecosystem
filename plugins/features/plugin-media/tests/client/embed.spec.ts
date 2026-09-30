import { describe, expect, it } from 'vitest'

import {
  getDailymotionEmbedUrl,
  getSpotifyEmbedUrl,
  getTikTokEmbedUrl,
  getTwitchEmbedUrl,
  getVimeoEmbedUrl,
  getYouTubeEmbedUrl,
} from '../../src/client/utils/embed.js'

describe(getYouTubeEmbedUrl, () => {
  it('should build the embed URL from a bare video id', () => {
    expect(getYouTubeEmbedUrl('dQw4w9WgXcQ')).toBe(
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
    )
  })

  it('should support the watch, share and short URL forms', () => {
    const expected = 'https://www.youtube.com/embed/dQw4w9WgXcQ'

    expect(
      getYouTubeEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
    ).toBe(expected)
    expect(getYouTubeEmbedUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(expected)
    expect(
      getYouTubeEmbedUrl('https://www.youtube.com/shorts/dQw4w9WgXcQ'),
    ).toBe(expected)
  })

  it('should convert the start time to seconds', () => {
    expect(getYouTubeEmbedUrl('https://youtu.be/dQw4w9WgXcQ?t=2m51s')).toBe(
      'https://www.youtube.com/embed/dQw4w9WgXcQ?start=171',
    )
  })

  it('should keep the privacy enhanced host of nocookie URLs', () => {
    expect(
      getYouTubeEmbedUrl('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'),
    ).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ')
  })

  it('should embed a playlist without a video as videoseries', () => {
    const url = getYouTubeEmbedUrl(
      'https://www.youtube.com/playlist?list=PL1234567890',
    )

    expect(url).toContain('https://www.youtube.com/embed/videoseries')
    expect(url).toContain('list=PL1234567890')
    expect(url).toContain('listType=playlist')
  })

  it('should reject an unrecognized value', () => {
    expect(getYouTubeEmbedUrl('')).toBeNull()
    expect(
      getYouTubeEmbedUrl('https://example.com/watch?v=dQw4w9WgXcQ'),
    ).toBeNull()
    // the placeholder playlist id alone is not a video
    expect(getYouTubeEmbedUrl('videoseries')).toBeNull()
  })
})

describe(getVimeoEmbedUrl, () => {
  it('should build the embed URL from a URL or a bare id', () => {
    const expected = 'https://player.vimeo.com/video/76979871'

    expect(getVimeoEmbedUrl('76979871')).toBe(expected)
    expect(getVimeoEmbedUrl('https://vimeo.com/76979871')).toBe(expected)
    expect(getVimeoEmbedUrl('https://vimeo.com/video/76979871')).toBe(expected)
  })

  it('should keep the unlisted hash of a private video', () => {
    expect(getVimeoEmbedUrl('https://vimeo.com/76979871/abc123')).toBe(
      'https://player.vimeo.com/video/76979871?h=abc123',
    )
  })

  it('should keep the query parameters of the video URL', () => {
    expect(getVimeoEmbedUrl('https://vimeo.com/76979871?dnt=1')).toBe(
      'https://player.vimeo.com/video/76979871?dnt=1',
    )
  })

  it('should reject an unrecognized value', () => {
    expect(getVimeoEmbedUrl('https://vimeo.com/not-a-video')).toBeNull()
    expect(getVimeoEmbedUrl('')).toBeNull()
  })
})

describe(getSpotifyEmbedUrl, () => {
  it('should build the embed URL of a track and keep its options', () => {
    expect(
      getSpotifyEmbedUrl(
        'https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC?theme=0',
      ),
    ).toBe(
      'https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC?theme=0',
    )
  })

  it('should support the URI form', () => {
    expect(getSpotifyEmbedUrl('spotify:album:1DFixLWuPkv3KT3TnV35m3')).toBe(
      'https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3',
    )
  })

  it('should support a localized URL', () => {
    expect(
      getSpotifyEmbedUrl(
        'https://open.spotify.com/intl-de/playlist/37i9dQZF1DXcBWIGoYBM5M',
      ),
    ).toBe('https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M')
  })

  it('should reject an unrecognized value', () => {
    expect(getSpotifyEmbedUrl('https://example.com/track/abc')).toBeNull()
    expect(getSpotifyEmbedUrl('spotify:unknown:abc')).toBeNull()
  })
})

describe(getTwitchEmbedUrl, () => {
  it('should require the framing hostname and turn autoplay off by default', () => {
    const url = getTwitchEmbedUrl(
      'https://www.twitch.tv/monstercat',
      'example.com',
    )

    expect(url).toContain('channel=monstercat')
    expect(url).toContain('autoplay=false')
    expect(url).toContain('parent=example.com')
  })

  it('should combine the given and the in-URL hosts', () => {
    const url = getTwitchEmbedUrl(
      'https://www.twitch.tv/monstercat?parent=a.com',
      'b.com',
    )

    expect(url).toContain('parent=a.com')
    expect(url).toContain('parent=b.com')
  })

  it('should read the id of a VOD URL', () => {
    const url = getTwitchEmbedUrl(
      'https://www.twitch.tv/videos/123456',
      'a.com',
    )

    expect(url).toContain('video=123456')
  })
})

describe(getDailymotionEmbedUrl, () => {
  it('should build the player URL from a video URL or a bare id', () => {
    expect(
      getDailymotionEmbedUrl('https://www.dailymotion.com/video/x8v5k1u'),
    ).toBe('https://geo.dailymotion.com/player.html?video=x8v5k1u')
    expect(getDailymotionEmbedUrl('x8v5k1u')).toBe(
      'https://geo.dailymotion.com/player.html?video=x8v5k1u',
    )
  })

  it('should reject an unrecognized value', () => {
    expect(getDailymotionEmbedUrl('https://example.com/video/x')).toBeNull()
  })
})

describe(getTikTokEmbedUrl, () => {
  it('should use the player endpoint for a share URL and a bare id', () => {
    const expected = 'https://www.tiktok.com/player/v1/6718335390845095173'

    expect(
      getTikTokEmbedUrl(
        'https://www.tiktok.com/@scout2015/video/6718335390845095173',
      ),
    ).toBe(expected)
    expect(getTikTokEmbedUrl('6718335390845095173')).toBe(expected)
  })

  it('should reject an unrecognized value', () => {
    expect(getTikTokEmbedUrl('https://example.com/video/1')).toBeNull()
  })
})
