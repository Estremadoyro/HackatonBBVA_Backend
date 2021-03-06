const express = require("express");
const router = express.Router();
const passport = require("passport");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

router.get(
  "/",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

router.get(
  "/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:8080/",
    failureRedirect: "http://localhost:8080/login",
  }),
  (req, res) => {
    //if (!req.user) return res.status(400).json({ error: "Failed login" });
    res.status(200).json({ cliente: req.user });
  }
);

router.get("/logout", (req, res, next) => {
  req.logout();
  console.log(req.isAuthenticated());
  res.status(200).json({ msg: "User logged out" });
});

module.exports = router;
