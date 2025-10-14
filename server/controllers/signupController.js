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

  const ROLE_CODES = {
    [process.env.ADMIN_PASSCODE]: "admin",
    [process.env.MEMBER_PASSCODE]: "member",
  };

  if (!errors.isEmpty()) {
    return res.status(400).render("pages/signup", {
      title: "Sign up",
      errors: errors.array(),
      formData: req.body,
    });
  }

  try {
    const { username, password, accessCode } = req.body;
    const { hash, salt } = generateHash(req.body.password);

    const role = ROLE_CODES[accessCode] || "guest";
    const newUser = { username, hash, salt, role };
    await addUserToDb(newUser);

    res.redirect("/");
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Internal server error");
    return next(err);
  }
};

module.exports = {
  signupGet,
  signupPost,
};
