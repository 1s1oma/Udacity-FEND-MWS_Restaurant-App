/**
 * Files to be cached are saved in an array
 */
let filesToBeCached = [
    '/',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/index.html',
    '/restaurant.html',
    '/data/restaurants.json',
    '/css/styles.css',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js'
];

/* registering service worker*/
if('serviceWorker' in navigator){
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js')
      .then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error =>{
        console.error(error);
      });
    });
  }

/*event listener to cache files once service worker is installed*/  
self.addEventListener('install',function(event){
    event.waitUntil(
        caches.open('app-v1')
        .then( cache => {
            return cache.addAll(filesToBeCached);
        })
    );
});

self.addEventListener('fetch',function(event){
    event.respondWith(
        caches.match(event.request)
        .then( response =>{
            //If there was a reponse
            if(response){
                return response;
            }
            //If no response (undefined returned)
            else{console.log("no cache", event, event.request);
            //fetch those items
                return fetch(event.request).
                //then cache them
                then( response => {
                    caches.open('app-v1')
                    .then( cache => {
                        cache.put(event.request, response); 
                        return response;
                    }) //if the items weren't fetch or cached
                }).catch( error => {
                    console.error(error);
                })
            }
        })
    );
});

