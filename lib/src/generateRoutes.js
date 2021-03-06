const getPagesNames = require("./getPagesNames");
const getHandler = require("./getHandler");
const renderHTML = require("./renderHTML");
const chalk = require("chalk");

const generateRoutes = async (app) => {
  const pageNames = await getPagesNames();

  pageNames.forEach(async (page) => {
    const route = `/${page}`;
    const handler = getHandler(page);

    console.log(chalk.greenBright("Route created: "), route);

    app.get(route, async (req, res) =>
      renderHTML(await handler(req), page)(req, res)
    );
  });
};

module.exports = generateRoutes;
