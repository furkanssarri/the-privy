const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {
  fetchUserByUsername,
  fetchUserById,
} = require("../controllers/queries.js");
const { validatePassword } = require("../controllers/passwordUtils.js");

const verifyCallback = async (username, password, done) => {
  try {
    const user = await fetchUserByUsername(username);
    if (!user)
      return done(null, false, { message: "Incorrect username or password." });

    const isValidPw = validatePassword(password, user);
    if (!isValidPw)
      return done(null, false, { message: "Incorrect username or password." });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  fetchUserById(userId, done)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
