const express = require("express");
const pageRouter = express.Router();
const apiRouter = express.Router();
const {
  loginPage,
  registerPage,
  forgotPasswordPage,
  login,
  registerUser,
  resetPassword,
} = require("../controllers/auth-controller");

pageRouter.get("/login", loginPage);
pageRouter.get("/register", registerPage);
pageRouter.get("/forgot-password", forgotPasswordPage);

apiRouter.post("/login", login);
apiRouter.post("/register", registerUser);
apiRouter.post("/forgot-password", resetPassword);

module.exports = {
  pageRouter,
  apiRouter,
};
