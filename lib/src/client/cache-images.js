const { registerRoute } = require("workbox-routing");
const { StaleWhileRevalidate } = require("workbox-strategies");

function CacheImages(imagesRegex = ".(png|svg|jpg|jpeg)$") {
  return registerRoute(
    new RegExp(imagesRegex),
    new StaleWhileRevalidate({ cacheName: "supernova-image-cache" })
  );
}

module.exports = CacheImages;
