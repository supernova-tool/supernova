const chalk = require("chalk");
const fs = require("fs");
const Mustache = require("mustache");
const packageJSON = require('../../package.json');
const createCSSFileFromScssFile = require("./createCSSFileFromScssFile");

const renderHTML = (pageHandler = {}, page) => (req, res) => {
  const { data } = pageHandler;
  const templateFile = `${process.cwd()}/pages/${page}/index.html`;
  const clientScriptFileName = `hot-reload.js?version=${packageJSON.version}`;

  fs.readFile(templateFile, "utf8", async (err, htmlFileText) => {
    try {
      if (err) throw new Error(err);
      const cssFileName = await createCSSFileFromScssFile(page);

      const renderedTemplate = Mustache.render(htmlFileText, {
        clientScriptFileName,
        cssFileName,
        ...data,
        dev: process.env.NODE_ENV === 'development'
      });

      res.send(renderedTemplate);
    } catch (e) {
      console.error(chalk.redBright(e.stack));
      process.exit();
    }
  });
};

module.exports = renderHTML;
