const CACHE_NAME = 'v1'
const SITE_MAP = '/sitemap.xml'
const FILES_TO_CACHE = ['/prism/prism.js', '/prism/prism.css', '/images/me-in-nyc.jpeg']

self.addEventListener('install', initialCache)
self.addEventListener('fetch', fetchHandler)
self.addEventListener('activate', () => self.clients.claim())

function initialCache(e) {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        cache.addAll(FILES_TO_CACHE)
        cachePages(cache)
      })
      .then(() => self.skipWaiting())
  )
}

function fetchHandler(e) {
  if (e.request.method !== 'GET') return
  if (/http:|chrome-extension:/.test(e.request.url)) return

  e.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return fetch(e.request)
        .then(response => {
          cache.put(e.request, response.clone())
          return response
        })
        .catch(() => cache.match(e.request))
    })
  )
}

function cachePages(cache) {
  fetch(SITE_MAP)
    .then(response => response.text())
    .then(text => {
      const pattern = /<loc>(.+?)</g
      const urls = getMatches(text, pattern)
      cache.addAll(urls)
    })
}

function getMatches(string, regex) {
  const matches = []
  let match
  while ((match = regex.exec(string))) {
    matches.push(match[1])
  }
  return matches
}
