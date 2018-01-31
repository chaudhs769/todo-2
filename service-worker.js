// configuration
`use strict`;

const
    version = '1.0.0',
    CACHE = version + '::PWAsite',
    offlineURL = '/',
    installFilesEssential = [
        '/',
        '/manifest.json',
        '/dist/static/css/app.b7a1f41b6bd89f87a7051da0e007e391.css',
        '/dist/static/js/app.e2edcc91e82aeea4735d.js',
        '/dist/static/js/manifest.eb4aed2eb940b671ff9a.js',
        '/dist/static/js/vendor.17d770379dd0b1b3199f.js',
        // '/js/offlinepage.js',
        // '/images/logo/logo152.png'
    ].concat(offlineURL),
    installFilesDesirable = [
        '/favicon.ico',
        '/dist/static/css/app.b7a1f41b6bd89f87a7051da0e007e391.map',
        '/dist/static/js/app.e2edcc91e82aeea4735d.map',
        '/dist/static/js/manifest.eb4aed2eb940b671ff9a.map',
        '/dist/static/js/vendor.17d770379dd0b1b3199f.map',
        // '/images/hero/power-hi.jpg'
    ];

// install static assets
function installStaticFiles() {

    return caches.open(CACHE)
        .then(cache => {

            // cache desirable files
            cache.addAll(installFilesDesirable);

            // cache essential files
            return cache.addAll(installFilesEssential);

        });

}

// clear old caches
function clearOldCaches() {

    return caches.keys()
        .then(keylist => {

            return Promise.all(
                keylist
                    .filter(key => key !== CACHE)
                    .map(key => caches.delete(key))
            );

        });

}

// application installation
self.addEventListener('install', event => {

    console.log('service worker: install');

    // cache core files
    event.waitUntil(
        installStaticFiles()
            .then(() => self.skipWaiting())
    );

});


// application activated
self.addEventListener('activate', event => {

    console.log('service worker: activate');

    // delete old caches
    event.waitUntil(
        clearOldCaches()
            .then(() => self.clients.claim())
    );

});


// is image URL?
let iExt = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'].map(f => '.' + f);
function isImage(url) {

    return iExt.reduce((ret, ext) => ret || url.endsWith(ext), false);

}


// return offline asset
function offlineAsset(url) {

    if (isImage(url)) {

        // return image
        return new Response(
            '<svg role="img" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title>offline</title><path d="M0 0h400v300H0z" fill="#eee" /><text x="200" y="150" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="50" fill="#ccc">offline</text></svg>',
            {
                headers: {
                    'Content-Type': 'image/svg+xml',
                    'Cache-Control': 'no-store'
                }
            }
        );

    }
    else {

        // return page
        return caches.match(offlineURL);

    }

}


// application fetch network data
self.addEventListener('fetch', event => {

    // abandon non-GET requests
    if (event.request.method !== 'GET') return;

    let url = event.request.url;

    event.respondWith(

        caches.open(CACHE)
            .then(cache => {

                return cache.match(event.request)
                    .then(response => {

                        if (response) {
                            // return cached file
                            console.log('cache fetch: ' + url);
                            return response;
                        }

                        // make network request
                        return fetch(event.request)
                            .then(newreq => {

                                console.log('network fetch: ' + url);
                                if (newreq.ok) cache.put(event.request, newreq.clone());
                                return newreq;

                            })
                            // app is offline
                            .catch(() => offlineAsset(url));

                    });

            })

    );

});
