const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

// Authorization
router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/logout", auth.logout);

module.exports = router;
