const fs = require("fs");
const Mustache = require("mustache");

const renderHTML = (pageData = {}, page) => (req, res) => {
  const templateFile = `${process.cwd()}/pages/${page}/index.html`;

  fs.readFile(templateFile, "utf8", (err, htmlFileText) => {
    const renderedTemplate = Mustache.render(htmlFileText, pageData);

    res.send(renderedTemplate);
  });
};

module.exports = renderHTML;
