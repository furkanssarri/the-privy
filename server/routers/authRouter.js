const { Router } = require("express");
const passport = require("passport");
const { getAllPostsWithAuthors } = require("../controllers/queries");
const { signupPost, signupGet } = require("../controllers/signupController");
const signupValidator = require("../validators/signupValidator.js");

const authRouter = Router();

authRouter.get("/signup", signupGet);
authRouter.post("/signup", signupValidator, signupPost);

authRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/",
  }),
);

authRouter.get("/login", (_req, res) => {
  try {
    res.render("pages/login", {
      title: "Login",
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
