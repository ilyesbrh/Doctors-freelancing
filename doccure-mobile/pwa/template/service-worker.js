'use strict';

// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';

// Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/appointments.html',
  '/patients-list.html',
  '/patient-profile.html',
  '/schedule-timings.html',
  '/invoices.html',
  '/invoice-view.html',
  '/pages.html',
  '/chat.html',
  '/chat-view.html',
  '/profile-settings.html',
  '/social-media.html',
  '/change-password.html',
  '/search-doctor.html',
  '/doctor-dashboard.html',
  '/doctor-profile.html',
  '/favourites.html',
  '/patient-profile-settings.html',
  '/patient-date-time.html',
  '/booking-success.html',
  '/voice-call.html',
  '/video-call.html',
  '/login.html',
  '/register.html',
  '/forgot-password.html',
  '/notifications.html',
  '/manifest.json',
  '/assets/css/bootstrap.min.css',
  '/assets/css/style.css',
  '/assets/css/circle.css',
  '/assets/css/jquery.datepicker2.css',
  '/assets/plugins/fontawesome/css/fontawesome.min.css',
  '/assets/plugins/fontawesome/css/all.min.css',
  '/assets/plugins/swiper/css/swiper.min.css',
  '/assets/plugins/fancybox/jquery.fancybox.min.css',
  '/assets/images/open-account-logout.svg',
  '/assets/images/kidneys.svg',
  '/assets/images/brain.svg',
  '/assets/images/cardiology.svg',
  '/assets/images/dentist.svg',
  '/assets/images/doctors/doctor-02.jpg',
  '/assets/images/doctors/doctor-thumb-01.jpg',
  '/assets/images/doctors/doctor-thumb-02.jpg',
  '/assets/images/doctors/doctor-thumb-03.jpg',
  '/assets/images/doctors/doctor-thumb-07.jpg',
  '/assets/images/specialities/specialities-05.png',
  '/assets/images/favicon.png',
  '/assets/images/icons/icon-144x144.png',
  '/assets/images/add-icon.svg',
  '/assets/images/Back.png',
  '/assets/images/calender-icon.svg',
  '/assets/images/call-bg.png',
  '/assets/images/call-close.svg',
  '/assets/images/chat.svg',
  '/assets/images/chat-icon.svg',
  '/assets/images/check-circle-big.svg',
  '/assets/images/credit-card.svg',
  '/assets/images/dentist-1.svg',
  '/assets/images/doctofemr.svg',
  '/assets/images/email.svg',
  '/assets/images/facebook.svg',
  '/assets/images/facebook-letter.svg',
  '/assets/images/filter.svg',
  '/assets/images/google-plus.svg',
  '/assets/images/google-plus-letter.svg',
  '/assets/images/green-tick.svg',
  '/assets/images/grid-icon.svg',
  '/assets/images/icon-awesome-eye.svg',
  '/assets/images/icon-awesome-user.svg',
  '/assets/images/icon-book.svg',
  '/assets/images/icon-checkmark.svg',
  '/assets/images/icon-clinic-medical.svg',
  '/assets/images/icon-feather-check-circle.svg',
  '/assets/images/icon-metro-calendar.svg',
  '/assets/images/icon-metro-calendar-big.svg',
  '/assets/images/icon-metro-printer.svg',
  '/assets/images/icon-settings.svg',
  '/assets/images/icon-user-nurse.svg',
  '/assets/images/i-icon.svg',
  '/assets/images/instagram.svg',
  '/assets/images/left-arrow.svg',
  '/assets/images/left-arrow-big.svg',
  '/assets/images/left-arrow-big-black.svg',
  '/assets/images/left-arrow-circle.svg',
  '/assets/images/likess.svg',
  '/assets/images/linkedin.svg',
  '/assets/images/lock-icon.svg',
  '/assets/images/logo.png',
  '/assets/images/logo.svg',
  '/assets/images/maledoc.svg',
  '/assets/images/man-icon.svg',
  '/assets/images/map-doctor.svg',
  '/assets/images/mic-icon.svg',
  '/assets/images/mute.svg',
  '/assets/images/patient.svg',
  '/assets/images/pause-icon.svg',
  '/assets/images/paypal.svg',
  '/assets/images/phone-icon.svg',
  '/assets/images/placeholder-small.svg',
  '/assets/images/price-check.svg',
  '/assets/images/purse.svg',
  '/assets/images/register-top-img.png',
  '/assets/images/right-arrow.svg',
  '/assets/images/right-arrow-circle.svg',
  '/assets/images/send.svg',
  '/assets/images/smartphone.svg',
  '/assets/images/smile.svg',
  '/assets/images/specker-icon.svg',
  '/assets/images/star.svg',
  '/assets/images/stethoscope.svg',
  '/assets/images/telephone.svg',
  '/assets/images/today-icon.svg',
  '/assets/images/twitter.svg',
  '/assets/images/user.jpg',
  '/assets/images/user-icon.svg',
  '/assets/images/video-call.png',
  '/assets/images/video-call.svg',
  '/assets/images/video-icon.svg',
  '/assets/images/patients/patient1.jpg',
  '/assets/images/patients/patient2.jpg',
  '/assets/images/patients/patient3.jpg',
  '/assets/images/patients/patient4.jpg',
  '/assets/images/patients/patient5.jpg',
  '/assets/images/patients/patient6.jpg',
  '/assets/images/patients/patient7.jpg',
  '/assets/images/patients/patient8.jpg',
  '/assets/images/patients/patient10.jpg',
  '/assets/images/patients/patient15.jpg',
  '/assets/images/features/feature-01.jpg',
  '/assets/images/features/feature-02.jpg',
  '/assets/images/features/feature-03.jpg',
  '/assets/images/features/feature-04.jpg',
  '/assets/js/jquery-3.5.1.min.js',
  '/assets/js/bootstrap.min.js',
  '/assets/js/bootstrap-datetimepicker.min.js',
  '/assets/js/Chart.bundle.js',
  '/assets/js/install.js',
  '/assets/js/jquery.datepicker2.js',
  '/assets/js/moment.min.js',
  '/assets/js/popper.min.js',
  '/assets/js/script.js',
  '/assets/plugins/swiper/js/swiper.min.js',
  '/assets/plugins/fancybox/jquery.fancybox.min.js',
  '/assets/fonts/MaterialIcons-Regular.woff',
  '/assets/fonts/MaterialIcons-Regular.woff2',
  '/assets/fonts/poppins-regular-webfont.woff2',
  '/assets/fonts/poppins-medium-webfont.woff2',
  '/assets/fonts/poppins-regular-webfont.woff',
  '/assets/fonts/poppins-medium-webfont.woff',
  '/assets/plugins/fontawesome/webfonts/fa-solid-900.woff2',
  '/assets/plugins/fontawesome/webfonts/fa-regular-400.woff2',
  '/assets/plugins/fontawesome/webfonts/fa-solid-900.woff',
  '/assets/plugins/fontawesome/webfonts/fa-regular-400.woff',
  '/assets/plugins/fontawesome/webfonts/fa-solid-900.ttf',
  '/assets/plugins/fontawesome/webfonts/fa-regular-400.ttf',
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // Add fetch event handler here.
  if (evt.request.url.includes('/forecast/')) {
  console.log('[Service Worker] Fetch (data)', evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            }).catch((err) => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
      }));
  return;
}
evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
          .then((response) => {
            return response || fetch(evt.request);
          });
    })
);
});