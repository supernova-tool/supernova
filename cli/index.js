#!/usr/bin/env node

const program = require("commander");
const inquirer = require("inquirer");
const chalk = require("chalk");
const { exec, cd } = require("shelljs");
const start = require("../lib/");
const package = require("../package.json");

program.version(package.version);

program
  .command("create <folder>")
  .description("Creates a default folder with supernova project")
  .action((folder) => {
    try {
      exec(`mkdir ${folder}`);
      cd(folder);
      exec(`npm i`);
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

program.parse(process.argv);
