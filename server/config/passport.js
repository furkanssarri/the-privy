const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { getUserByUsername, getUserById } = require("../controllers/queries.js");
const { validatePassword } = require("../controllers/passwordUtils.js");

const verifyCallback = async (username, password, done) => {
  try {
    const user = await getUserByUsername(username);
    if (!user) return done(null, false);

    const isValidPw = validatePassword(password, user);
    if (!isValidPw) return done(null, false);

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
  getUserById(userId, done)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
