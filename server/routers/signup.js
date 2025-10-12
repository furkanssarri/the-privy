const { Router } = require("express");
const pool = require("../db/pool.js");
const { generateHash } = require("../controllers/passwordUtils.js");
const { createNewUser } = require("../controllers/queries.js");

const signupRouter = Router();

signupRouter.get("/", (req, res) => {
  res.render("pages/signup", {
    title: "Sign Up",
  });
});

signupRouter.post("/", async (req, res, next) => {
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

module.exports = signupRouter;
