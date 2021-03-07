const fs = require("fs");

const findFilesWithIncludes = (folder, page) => {
  return fs.readdirSync(folder).filter((file) => file.includes(page));
};

module.exports = findFilesWithIncludes;
