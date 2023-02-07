const express = require("express");
const path = require("path");

const mainRoutes = require("./src/routes/main-route");
const config = require("./src/helper/config");
const { log, readAllAPI } = require("./src/helper/logger");
const session = require("express-session");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname, "src", "assets")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(
  session({
    secret: config.encryptionKey,
    resave: false,
    saveUninitialized: false,
  })
);

// Log all the triggered APIs
app.use(readAllAPI);

// Routes
app.use(mainRoutes);

// Start server
app.listen(config.port, () => {
  log(`Server: http://localhost:${config.port}/`, "yellow", false);
  log(`DB URL: ${config.fbdburl}`, "yellow", false);

  // clear localstorage
  // const fs = require("fs"),
  //   ls = path.join(__dirname, "localstorage");
  // if (fs.existsSync(ls)) fs.rmdirSync(ls, { recursive: true });
});
