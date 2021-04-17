exports.homePage = (req, res) => {
  res.render("main-layout", { pageTitle: "Home", isLoggedIn: true });
};

exports.notFoundPage = (req, res) => {
  res.render("404", { pageTitle: "Page not found", isLoggedIn: true });
};
