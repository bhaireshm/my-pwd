const chalk = require("chalk");
const config = require("./config");
const name = config.projectName;

function log(msg = "", color, type = "LOG:") {
  msg = type === false ? "" + msg : type + " " + msg;
  color = color ? color : "yellow";
  console.log(chalk.hex(config.theme.primary)(`[${name}] ` + `${chalk[color](msg)}`));
}

function readAllAPI(req, res, next) {
  // log("API: " + req.url)
  const ignorePaths = ["android"];

  if (!ignorePaths.some(i => i.search(req.url)))
    log(
      `${chalk.green(alignContent(req.method))} ` +
      `${chalk.green(res.statusCode)} ` +
      `${chalk.green(`${req.protocol}://${req.hostname}`)}${req.url}`
    );
  next();
}

const alignContent = (d, l = 7) => {
  if (d.toString().length > l) return d;
  return d + " ".repeat(l - d.toString().length);
};

module.exports = {
  log,
  readAllAPI,
};
