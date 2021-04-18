exports.homePage = (req, res) => {
  res.render("home", { pageTitle: "Home" });
};

exports.notFoundPage = (req, res) => {
  res.render("404", { pageTitle: "Page not found" });
};
