const util = require("util");
const fs = require("fs");

const getPagesNames = async () => {
  const pagesFolder = "./pages";
  const readDir = util.promisify(fs.readdir);
  const pages = await readDir(pagesFolder);

  return pages;
};

module.exports = getPagesNames;
