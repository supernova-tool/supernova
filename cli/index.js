#!/usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
const { exec, cd, cp } = require("shelljs");
const path = require("path");
const webpack = require("webpack");

const start = require("../lib/");
const package = require("../package.json");
const reloadWatcher = require("../lib/src/reloadWatcher");

const webpackCompileClient = function () {
  return new Promise(function (resolve, reject) {
    webpack(
      {
        entry: path.resolve(__dirname, "../lib/src/client/index.js"),
        mode: "production",
        stats: "verbose",
        output: {
          path: path.resolve(__dirname, "./template/.static"),
          filename: "supernova-client.js",
          clean: true,
        },
      },
      (err, stats) => {
        const [filename] = Object.keys(stats.compilation.assetsInfo);
        resolve(filename);

        if (err || stats.hasErrors()) {
          reject(err);
        }
      }
    );
  });
};

program.version(package.version);

program
  .command("create <folder>")
  .description("Creates a default folder with supernova project")
  .action(async (folder) => {
    try {
      await webpackCompileClient();
      console.log(chalk.green(`Compiled supernova-client.js`));
      cp("-R", `${__dirname}/template`, folder);
      cd(folder);
      exec(`npm i`);
      exec(`npm i @supernovajs/core`);
    } catch (e) {
      console.error(chalk.red(e.message));
    } finally {
      console.log(chalk.green("Done!"));
    }
  });

program
  .command("start")
  .description("Starts supernova server")
  .option("-p, --port <port>", "choose port to web application", 3000)
  .parse()
  .action(({ port }) => {
    try {
      process.env.NODE_ENV = "production";
      start(port);
    } catch (e) {
      console.error(chalk.red(e.message));
    } finally {
      console.log(chalk.green("Done!"));
    }
  });

program
  .command("dev")
  .description("Starts supernova server")
  .option("-p, --port <port>", "choose port to web application", 3000)
  .parse()
  .action(({ port }) => {
    try {
      process.env.NODE_ENV = "development";
      reloadWatcher();
      start(port);
    } catch (e) {
      console.error(chalk.red(e.message));
    } finally {
      console.log(chalk.green("Done!"));
    }
  });

program
  .command("generate-page <folder>")
  .description("Creates a default folder with supernova project")
  .action((folder) => {
    try {
      cp(
        "-R",
        `${__dirname}/template/pages/hello`,
        `${process.cwd()}/pages/${folder}`
      );
    } catch (e) {
      console.error(chalk.red(e.message));
    } finally {
      console.log(chalk.green("Done!"));
    }
  });

program.parse(process.argv);
