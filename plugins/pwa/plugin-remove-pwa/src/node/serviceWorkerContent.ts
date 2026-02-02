import type { App } from 'vuepress'
import { removeLeadingSlash } from 'vuepress/shared'
import { fs } from 'vuepress/utils'

/**
 * Generate an empty service worker that cleans caches and unregisters itself
 *
 * 生成一个清理缓存并注销自身的空 service worker
 *
 * @param app - VuePress App
 * @param swLocation - Service worker location / Service worker 位置
 * @param cachePatterns - Cache patterns / 缓存模式
 * @returns Promise that resolves when the service worker is generated / 生成 service worker 后解析的 Promise
 */
export const generateEmptyServiceWorker = async (
  app: App,
  swLocation: string,
  cachePatterns: string[],
): Promise<void> => {
  const serviceWorkerContent = `
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', async (event) => {
  try {
    await self.clients.claim();
    await self.registration.unregister();

    const cachePatterns = ${JSON.stringify(cachePatterns)}.map((pattern) => new RegExp(pattern));

    const cacheKeys = await self.caches.keys();
    const deletionPromises = cacheKeys
      .filter((name) => !cachePatterns.length || cachePatterns.some((pattern) => pattern.test(name)))
      .map((name) => self.caches.delete(name));
    await Promise.all(deletionPromises);

    const clients = await self.clients.matchAll({ type: 'window' });

    clients.forEach((client) => {
      client.navigate(client.url);
    });
  } catch (error) {
    console.error('Error during deactivation and cleanup:', error);
  }
});
`

  await fs.writeFile(
    app.dir.dest(removeLeadingSlash(swLocation)),
    serviceWorkerContent,
    'utf8',
  )
}
