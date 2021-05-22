const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const mainRoutes = require("./src/routes/main-route");
const config = require("./src/helper/config");
const { log } = require("./src/helper/logger");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname, "src", "assets")));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(mainRoutes);

// Start server
app.listen(config.port, () => {
  log(`Application started listening to port ${config.port}`);

  // clear localstorage
  // const fs = require("fs"),
  //   ls = path.join(__dirname, "localstorage");
  // if (fs.existsSync(ls)) fs.rmdirSync(ls, { recursive: true });
});
