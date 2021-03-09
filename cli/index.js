#!/usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
const { exec, cd } = require("shelljs");
const start = require("../lib/");
const package = require("../package.json");
const reloadWatcher = require("../lib/src/reloadWatcher");

program.version(package.version);

program
  .command("create <folder>")
  .description("Creates a default folder with supernova project")
  .action((folder) => {
    try {
      exec(`cp -r ${__dirname}/template ${folder}`);
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
      exec(
        `cp -r ${__dirname}/template/pages/hello ${process.cwd()}/pages/${folder}`
      );
    } catch (e) {
      console.error(chalk.red(e.message));
    } finally {
      console.log(chalk.green("Done!"));
    }
  });

program.parse(process.argv);
