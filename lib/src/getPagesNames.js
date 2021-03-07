const chalk = require("chalk");
const fs = require("fs");
const { cat } = require("shelljs");
const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const getPagesNames = async () => {
  try {
    const pagesFolder = "./pages";
    const pages = await getDirectories(pagesFolder);

    return pages;
  } catch (e) {
    console.error(chalk.redBright(e.stack));
    process.exit();
  }
};

module.exports = getPagesNames;
