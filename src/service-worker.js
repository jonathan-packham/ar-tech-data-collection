/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('AR-Tech PWA')
      .then(function(cache) {
        cache.addAll([
          '/',
          '/index.html',
          '/App.css',
          '/App.js',
          '/index.js',
          '/index.css',
          '/components/Components.css',
          '/components/Auth.js',
          '/components/deactivated.js',
          '/components/eliminate.js',
          '/components/forms.js',
          '/components/hazardForm.js',
          '/components/hazards1.js',
          '/components/hazards2.js',
          '/components/identifyhazards.js',
          '/components/jobsteps.js',
          '/components/logout.js',
          '/components/ppe1.js',
          '/components/profile.js',
          '/components/reset.js',
          '/components/signature.js',
          '/components/withRouter.js',
          '/assets/artechlogoGrey.jpg',
          '/assets/artechlogoHorizontal.jpg',
          '/assets/eye-slash.svg',
          '/assets/htslogo.jpg',
          '/assets/perfSquare.png',
          '/assets/squareLogo.jpg'
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