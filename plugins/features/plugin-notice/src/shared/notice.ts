export interface NoticeActionOption {
  /**
   * Action text
   *
   * 操作文字
   */
  text: string

  /**
   * Action link
   *
   * 操作链接
   */
  link?: string

  /**
   * Action type
   *
   * 操作类型
   *
   * @default "default"
   */
  type?: 'default' | 'primary'
}

export interface NoticeItemOptions {
  /**
   * Notice title
   *
   * 通知标题
   */
  title: string

  /**
   * Notice content type
   *
   * 通知内容类型
   *
   * @default 'html'
   */
  contentType?: 'html' | 'markdown'

  /**
   * Notice content file absolute path, file format should be `.md` or `.html`.
   * Prioritize using the file content as `content`.
   *
   * 通知内容文件绝对路径, 文件格式支持 `.md` 或 `.html`。
   * 优先使用文件内容作为 `content`。
   *
   * @example '/path/to/notice.md'
   */
  contentFile?: string

  /**
   * Notice content
   *
   * 通知内容
   */
  content?: string

  /**
   * Notice key
   *
   * @description Used to identify and store the notice status
   *
   * Notice 的 key
   *
   * @description 用于标识和存储 notice 的状态
   */
  key?: string

  /**
   * Whether show notice only once or show it in every visit
   *
   * 是否只显示一次通知
   *
   * @default false
   */
  showOnce?: boolean

  /**
   * Whether the notice shall be confirmed
   *
   * 通知是否需要确认
   *
   * @default false
   */
  confirm?: boolean

  /**
   * Whether the notice should appear fullscreen
   *
   * 通知是否应该全屏显示
   *
   * @default false
   */
  fullscreen?: boolean

  /**
   * Notice actions
   *
   * 通知操作
   */
  actions?: NoticeActionOption[]
}

export interface NoticePathOptions extends NoticeItemOptions {
  /**
   * Path prefix to match
   *
   * 公告需要匹配的前缀路径
   */
  path: string
}

export interface NoticeMatchOptions extends NoticeItemOptions {
  /**
   * A regexp matching notice path
   *
   * 公告路径的正则匹配
   */
  match: RegExp
}

export type NoticeOptions = NoticeMatchOptions | NoticePathOptions
export type NoticeAttrOptions =
  | (Omit<
      NoticeMatchOptions,
      'contentFile' | 'contentType' | 'key' | 'match'
    > & {
      noticeKey?: string
      match: string
    })
  | (Omit<NoticePathOptions, 'contentFile' | 'contentType' | 'key'> & {
      noticeKey?: string
    })
