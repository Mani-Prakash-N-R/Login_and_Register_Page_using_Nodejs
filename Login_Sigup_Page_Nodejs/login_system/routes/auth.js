const express = require("express");
const userController = require("../controllers/users");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

// New routes for forgot password
router.get("/forgot-password", (req, res) => {
  res.render("forgot-password");
});

router.post("/forgot-password", userController.forgotPassword);

// Route for resetting password
router.get("/reset-password/:token", (req, res) => {
  // Render your reset password form here
  res.render("reset-password", { token: req.params.token });
});

router.post("/reset-password/:token", userController.resetPassword);

module.exports = router;
