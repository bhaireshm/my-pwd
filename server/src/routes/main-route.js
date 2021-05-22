const express = require("express");
const { verifyUser } = require("../controllers/auth-controller");
const { homePage, notFoundPage } = require("../controllers/landing-controller");
const authRoutes = require("./auth-route");
const router = express.Router();

// Pages
router.use("/auth", authRoutes.pageRouter);
router.get("/", verifyUser, homePage);
router.get("/**", notFoundPage);

// API
router.use("/api", authRoutes.apiRouter);

module.exports = router;
