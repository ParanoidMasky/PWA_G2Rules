//asignar un nombre y versión al cache
const CACHE_NAME = 'Cache_saved';
const Data_CACHE_NAME = 'PokeCache';


//guardar en caché
const urlsToCache = [
    './',
    'https://fonts.googleapis.com/css?family=Teko&display=swap',
    './style.css',
    './script.js',
    './img/G2logo.png',
    './img/mini.png',
    './index.html',
    'https://pokeapi.co/api/v2/pokemon/blaziken',
    'https://pokeapi.co/api/v2/pokemon/decidueye',
    'https://pokeapi.co/api/v2/pokemon/heracross',
    'https://pokeapi.co/api/v2/pokemon/infernape',
    'https://pokeapi.co/api/v2/pokemon/garchomp'
]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    //Eliminamos lo que ya no se necesita en cache
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        // Le indica al SW activar el cache actual
        .then(() => self.clients.claim())
    )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
    //Url del cache
    var data_Url = '/blaziken';

    if (e.request.url.indexOf(data_Url) === 0) {
        //Manejador de datos 
        e.respondWith(
            fetch(e.request)
            .then(function(response) {
                return caches.open(Data_CACHE_NAME).then(function(cache) {
                    cache.put(e.request.url, response.clone());
                    console.log(response + 'Cloning');
                    return response;
                });
            })
        );
    } else {
        //Responder ya sea con el objeto en caché o continuar y buscar la url real
        e.respondWith(
            caches.match(e.request)
            .then(res => {
                console.log("Path2")
                return res || fetch(e.request)
            })
        )
    }
})