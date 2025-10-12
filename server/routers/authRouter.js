const { Router } = require("express");
const passport = require("passport");
const { getAllPostsWithAuthors } = require("../controllers/queries");

const authRouter = Router();

authRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/auth/login-success",
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

authRouter.get("/login-success", async (req, res) => {
  try {
    const posts = await getAllPostsWithAuthors();

    res.render("pages/index", {
      title: "User | Home",
      posts: posts,
    });
  } catch (err) {
    console.error("Error retrieving posts", err);
  }
});

authRouter.get("/signup", (req, res) => {
  res.render("pages/signup", {
    title: "Sign Up",
  });
});

authRouter.post("/signup", async (req, res, next) => {
  try {
    const { hash, salt } = generateHash(req.body.password);
    const newUser = {
      username: req.body.username,
      hash: hash,
      salt: salt,
      isAdmin: false,
    };
    await createNewUser(newUser);

    res.redirect("/");
  } catch (err) {
    return next(err);
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
