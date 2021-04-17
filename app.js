const app = require("express")();
const mainRoutes = require("./src/routes/main-route");
const config = require("./src/config");
const { log } = require("./src/helper/logger");

// Routes
app.use(mainRoutes);

// Start server
app.listen(
  config.port,
  log(`Application started listening to port ${config.port}`)
);
