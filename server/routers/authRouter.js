const { Router } = require("express");
const passport = require("passport");
const { getAllPostsWithAuthors } = require("../controllers/queries");
const { signupPost, signupGet } = require("../controllers/signupController");
const validateSignup = require("../validators/signupValidator.js");

const authRouter = Router();

authRouter.post("/signup", validateSignup, signupPost);

authRouter.get("/signup", signupGet);

authRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
    successRedirect: "/",
  }),
);

authRouter.get("/login", (req, res) => {
  try {
    const errorMessage = req.flash("error");
    res.render("pages/login", {
      title: "Login",
      errorMessage,
    });
  } catch (err) {
    console.error("Error getting the Login form", err);
  }
});

authRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = authRouter;
