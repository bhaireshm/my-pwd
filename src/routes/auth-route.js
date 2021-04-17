const express = require("express");
const pageRouter = express.Router();
const apiRouter = express.Router();
const {
  loginPage,
  registerPage,
  login,
} = require("../controllers/auth-controller");

pageRouter.get("/login", loginPage);
pageRouter.get("/register", registerPage);

apiRouter.post("/login", login);

module.exports = {
  pageRouter,
  apiRouter,
};
