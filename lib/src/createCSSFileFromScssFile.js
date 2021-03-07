const sass = require("node-sass");
const fs = require("fs");
const crypto = require("crypto");
const findFilesWithRegex = require("./helpers/findFilesWithRegex");

function createCSSFileFromScssFile(page) {
  const cssFile = `${process.cwd()}/pages/${page}/styles.scss`;
  const staticPath = `${process.cwd()}/.static`;
  const staticPathExists = fs.existsSync(staticPath);

  if (!staticPathExists) {
    fs.mkdirSync(staticPath);
  }

  return new Promise(function (resolve, reject) {
    sass.render(
      {
        file: cssFile,
        outputStyle: "compressed",
      },
      function (err, result) {
        if (err) reject(err);
        else {
          const contentMd5Hash = crypto
            .createHash("md5")
            .update(result.css.toString())
            .digest("hex");

          const fileName = `${page}.${contentMd5Hash}.css`;
          const path = `${staticPath}/${fileName}`;
          const oldFiles = findFilesWithRegex(staticPath, page).filter(
            (f) => f !== fileName
          );

          if (!fs.existsSync(path)) {
            fs.writeFile(path, result.css.toString(), function (err) {
              if (err) throw err;
            });
          }

          oldFiles.forEach((file) =>
            fs.unlink(`${staticPath}/${file}`, console.log)
          );

          resolve(fileName);
        }
      }
    );
  });
}

module.exports = createCSSFileFromScssFile;
