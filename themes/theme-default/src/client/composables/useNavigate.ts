import { isLinkAbsolute, isLinkWithProtocol } from '@vuepress/helper/client'
import { useRoute, useRouter } from 'vuepress/client'

export const useNavigate = (): ((url: string) => void) => {
  const router = useRouter()
  const route = useRoute()

  return (url) => {
    if (url) {
      if (isLinkAbsolute(url)) {
        // Inner absolute path
        if (route.fullPath !== url) void router.push(url)
      } else if (isLinkWithProtocol(url)) {
        // external url
        window.open(url)
      } else {
        // relative url
        void router.push(encodeURI(url))
      }
    }
  }
}
