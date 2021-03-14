const { registerRoute } = require("workbox-routing");
const { StaleWhileRevalidate } = require("workbox-strategies");

function CacheCss() {
  return registerRoute(
    new RegExp(".css$"),
    new StaleWhileRevalidate({ cacheName: "supernova-stylesheet-cache" })
  );
}

module.exports = CacheCss;
