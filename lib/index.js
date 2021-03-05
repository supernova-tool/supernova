#!/usr/bin/env node
const express = require("express");
const generateRoutes = require("./src/generateRoutes");
const app = express();

// TODO: client side init method with document passed
// TODO: image lazy loading
// TODO: traced svg images
// TODO: service workers cache management
// TODO: native amp pages
// TODO: make api calls possible

generateRoutes(app);

app.listen(3000, () => console.log("Server up"));
