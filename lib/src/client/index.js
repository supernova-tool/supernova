const hotReload = require("./hot-reload");
const lazyLoadImages = require("./lazy-load-images");

function start() {
  hotReload();
  lazyLoadImages();
}

start();
