const { body } = require("express-validator");

const validateSignup = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores.")
    .escape(),

  body("password")
    .notEmpty()
    .withMessage("Password cannto be empty.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character.")
    .trim(),
];

module.exports = validateSignup;
