const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.get(["/", "/login"], (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", userController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("profile", { user: req.user });
  } else {
    res.redirect("/login");
  }
});

router.get("/home", userController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("home", { user: req.user });
  } else {
    res.redirect("/login");
  }
});

// New routes for the forgot password and reset password pages
router.get("/forgot-password", (req, res) => {
  res.render("forgot-password");
});

router.get("/reset-password/:token", (req, res) => {
  const { token } = req.params;
  res.render("reset-password", { token });
});

module.exports = router;
