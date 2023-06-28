/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('AR-Tech PWA')
      .then(function(cache) {
        cache.addAll([
          '/',
          '/src/index.html',
          '/src/App.css',
          '/src/App.js',
          '/src/index.js',
          '/src/index.css',
          '/src/components/Components.css',
          '/src/components/Auth.js',
          '/src/components/deactivated.js',
          '/src/components/eliminate.js',
          '/src/components/forms.js',
          '/src/components/hazardForm.js',
          '/src/components/hazards1.js',
          '/src/components/hazards2.js',
          '/src/components/identifyhazards.js',
          '/src/components/jobsteps.js',
          '/src/components/logout.js',
          '/src/components/ppe1.js',
          '/src/components/profile.js',
          '/src/components/reset.js',
          '/src/components/signature.js',
          '/src/components/withRouter.js',
          '/src/assets/artechlogoGrey.jpg',
          '/src/assets/artechlogoHorizontal.jpg',
          '/src/assets/eye-slash.svg',
          '/src/assets/htslogo.jpg',
          '/src/assets/perfSquare.png',
          '/src/assets/squareLogo.jpg'
        ])
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(res) {
        return res;
      })
  );
});