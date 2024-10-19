self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('ei-ij-cache').then(function(cache) {
            return cache.addAll([
                'https://chimelklep.github.io/woordspel-ei-of-ij/',
                'https://chimelklep.github.io/woordspel-ei-of-ij/index.html',
                'https://chimelklep.github.io/woordspel-ei-of-ij/manifest.json',
                'https://chimelklep.github.io/woordspel-ei-of-ij/service-worker.js',
                'https://chimelklep.github.io/woordspel-ei-of-ij/icon-192.png',
                'https://chimelklep.github.io/woordspel-ei-of-ij/icon-512.png',
                'https://chimelklep.github.io/woordspel-ei-of-ij/zinnen.json'
            ]);
        }).catch(function(error) {
            console.error('Failed to cache files:', error);
        })
    );
});
