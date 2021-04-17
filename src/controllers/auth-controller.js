const Auth = require("../models/auth");

exports.loginPage = (req, res) => {
  res.render("login", { pageTitle: "Login", isLoggedIn: true });
};

exports.login = (req, res) => {
  const auth = new Auth(req.body);
  const login = auth.login();

  if (login.err) return res.status(400).send(login.err);
  // On success
  // res.send(login);
  res.redirect("/");
};

exports.registerPage = (req, res) => {
  res.render("register", { pageTitle: "Register", isLoggedIn: true });
};
