#!/usr/bin/env node
const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const generateRoutes = require("./src/generateRoutes");
const app = express();

// TODO: client side init method with document passed
// TODO: image lazy loading
// TODO: traced svg images
// TODO: service workers cache management
// TODO: native amp pages
// TODO: make api calls possible

function start(port = 3000) {
  generateRoutes(app);
  app.use(morgan("short"));
  app.listen(port, () =>
    console.log(
      chalk.green("Supernova server started! port: "),
      chalk.yellow(port)
    )
  );
}

module.exports = start;
