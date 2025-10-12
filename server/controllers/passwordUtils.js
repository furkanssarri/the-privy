const crypto = require("node:crypto");

const generateHash = (password) => {
  const salt = crypto.randomBytes(31).toString("hex");
  const generateHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    hash: generateHash,
    salt: salt,
  };
};

const validatePassword = (password, { password_hash, salt }) => {
  const verifyHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return password_hash === verifyHash;
};

module.exports = {
  generateHash,
  validatePassword,
};
