const { generateHash } = require("./passwordUtils.js");
const { addUserToDb } = require("./queries.js");
const { validationResult } = require("express-validator");

const signupGet = (_req, res) => {
  try {
    res.render("pages/signup", {
      title: "Sign Up",
    });
  } catch (err) {
    console.error("Error getting the signup form", err);
  }
};
const signupPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("pages/signup", {
      title: "Sign up",
      errors: errors.array(),
      formData: req.body,
    });
  }
  try {
    const { hash, salt } = generateHash(req.body.password);
    const newUser = {
      username: req.body.username,
      hash: hash,
      salt: salt,
      isAdmin: false,
    };
    await addUserToDb(newUser);

    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  signupGet,
  signupPost,
};
