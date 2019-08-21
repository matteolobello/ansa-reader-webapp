const CACHE_NAME = "v1::CACHE"

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(
        [
          '/css/colors.css',
          '/css/index.css',
          '/css/nav-drawer.css',
          '/css/statusbar.css',
          '/external/fonts/fonts.css',
          '/external/fonts/iAWriterDuospace-Bold.eot',
          '/external/fonts/iAWriterDuospace-Bold.woff',
          '/external/fonts/iAWriterDuospace-Bold.woff2',
          '/external/fonts/iAWriterDuospace-Italic.eot',
          '/external/fonts/iAWriterDuospace-Italic.woff',
          '/external/fonts/iAWriterDuospace-Italic.woff2',
          '/external/fonts/iAWriterDuospace-Regular.eot',
          '/external/fonts/iAWriterDuospace-Regular.woff',
          '/external/fonts/iAWriterDuospace-Regular.woff2',
          '/external/hamburgers/hamburgers.min.css',
          '/external/jqeury/jquery.min.js',
          '/external/placeholder-loading/placeholder-loading.min.css',
          '/external/slideout/slideout.min.js',
          '/external/xml2json/xml2json.min.js',
          '/imgs/app-logo/logo.png',
          // No need to cache Splash screen icons
          '/js/dark-mode.js',
          '/js/data.js',
          '/js/index.js',
          '/js/service-worker.js',
          '/index.html'
        ]
      )
    })
  )
})

self.addEventListener('fetch', function (event) {
  var req = event.request
  return event.respondWith(function cacheFirst() {
    return self.caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(req).then(function (res) {
        if (!res) {
          return fetch(req.clone()).then(function (res) {
            return cache.put(req, res.clone()).then(function () {
              return res
            })
          })
        }
        return res
      })
    })
  })
})