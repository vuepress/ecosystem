export type BuiltInIcon = 'fontawesome-with-brands' | 'fontawesome' | 'iconify'

export type IconLink =
  | `//${string}`
  | `/${string}`
  | `http://${string}`
  | `https://${string}`

export type IconAsset = (BuiltInIcon | IconLink)[] | BuiltInIcon | IconLink

export interface IconPluginOptions {
  /**
   * Link of font icon asset
   *
   * 字体图标资源链接
   *
   * @description `"iconify"`, `"fontawesome"` and `"fontawesome-with-brands"` keywords are supported
   *
   * @default "iconify"
   */
  assets?: IconAsset

  /**
   * Class prefix of font icon
   *
   * 字体图标的 Class 前缀
   *
   * @default ""
   */
  prefix?: string
}
