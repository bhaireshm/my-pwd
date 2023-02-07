const { getLocalStorage } = require("../helper");

exports.homePage = (req, res) => {
  let user = getLocalStorage("user-data");
  user = user ? user : null;
  res.render("home", { pageTitle: "Home", passbook: [], user: user });
};

exports.notFoundPage = (req, res) => {
  res.render("404", { pageTitle: "Page not found" });
};
