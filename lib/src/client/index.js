const hotReload = require("./hot-reload");
const lazyLoadImages = require("./lazy-load-images");

function start() {
  hotReload();
  lazyLoadImages();

  if ("serviceWorker" in navigator) {
    const { serviceWorker } = navigator;
    const serviceWorkerPath = "/static/caches-sw.js";
    serviceWorker
      .register(serviceWorkerPath)
      .then(function (reg) {
        console.log(reg);
        console.log("Registration succeeded. Scope is " + reg.scope);
      })
      .catch(function (error) {
        // registration failed
        console.log("Registration failed with " + error);
      });
  }
}

start();
