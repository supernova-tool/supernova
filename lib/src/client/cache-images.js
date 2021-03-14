const { registerRoute } = require("workbox-routing");
const { CacheFirst } = require("workbox-strategies");
const { ExpirationPlugin } = require("workbox-expiration");

function CacheImages() {
  const cache30DaysExpiration = 30 * 24 * 60 * 60;

  return registerRoute(
    ({ request }) => request.destination === "image",
    new CacheFirst({
      cacheName: "supernova-images-cache",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: cache30DaysExpiration,
        }),
      ],
    })
  );
}

module.exports = CacheImages;
