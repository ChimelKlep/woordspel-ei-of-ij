self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('ei-ij-cache').then(function(cache) {
            return cache.addAll([
                '/woordspel-ei-of-ij/',
                '/woordspel-ei-of-ij/index.html',
                '/woordspel-ei-of-ij/manifest.json',
                '/woordspel-ei-of-ij/service-worker.js',
                '/woordspel-ei-of-ij/icon-192.png',
                '/woordspel-ei-of-ij/icon-512.png',
                '/woordspel-ei-of-ij/zinnen.json'
            ]);
        })
    );
});
