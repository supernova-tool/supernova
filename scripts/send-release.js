const program = require("commander");
const inquirer = require("inquirer");
const { exec } = require("shelljs");
const package = require("../package.json");

program.version(package.version);

program
  .command("release")
  .description("Release to npm")
  .action((folder) => {
    try {
      inquirer
        .prompt([
          {
            type: "list",
            name: "type",
            message:
              "Informe o nivel de versionamento utilizando padrão SEMVER",
            choices: ["major", "minor", "patch"],
          },
        ])
        .then(({ type }) => {
          switch (type) {
            case "major":
              return exec("sh ./release-major.sh");
            case "minor":
              return exec("sh ./release-minor.sh");
            case "patch":
              return exec("sh ./release-patch.sh");
            default:
              throw new Error("Escolha uma das opções");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.error(chalk.red(e.message));
    } finally {
      console.log(chalk.green("Done!"));
    }
  });
