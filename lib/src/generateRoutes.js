const getPagesNames = require("./getPagesNames");
const getHandler = require("./getHandler");
const renderHTML = require("./renderHTML");

const generateRoutes = async (app) => {
  const pageNames = await getPagesNames();

  pageNames.forEach(async (page) => {
    const route = `/${page}`;
    const handler = getHandler(page);
    console.log("Route created: ", route);
    app.get(route, (req, res) => renderHTML(handler(req), page)(req, res));
  });
};

module.exports = generateRoutes;
