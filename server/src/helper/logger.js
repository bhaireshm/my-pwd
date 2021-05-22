const chalk = require("chalk");
const config = require("./config");
const name = config.projectName;

function log(msg, type) {
  type = type ? type : "LOG:";
  console.log(chalk.yellow(`[${name}] ${type} ${msg}`));
}

module.exports = {
  log,
};
