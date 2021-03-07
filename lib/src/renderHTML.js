const chalk = require("chalk");
const fs = require("fs");
const Mustache = require("mustache");
const createCSSFileFromScssFile = require("./createCSSFileFromScssFile");

const renderHTML = (pageData = {}, page) => (req, res) => {
  const templateFile = `${process.cwd()}/pages/${page}/index.html`;

  fs.readFile(templateFile, "utf8", async (err, htmlFileText) => {
    try {
      if (err) throw new Error(err);
      const cssFileName = await createCSSFileFromScssFile(page);
      const renderedTemplate = Mustache.render(htmlFileText, {
        ...pageData,
        cssFileName,
      });

      res.send(renderedTemplate);
    } catch (e) {
      console.error(chalk.redBright(e.stack));
      process.exit();
    }
  });
};

module.exports = renderHTML;
