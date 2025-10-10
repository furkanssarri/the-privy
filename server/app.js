require("dotenv").config();
const express = require("express");
const session = require("express-session");
const PgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const crypto = require("crypto");
const pool = require("./db/pool.js");
const indexRouter = require("./routers/indexRouter.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new PgSession({
      pool: pool,
      tableName: "user_sessions",
      // schemaName: "public",
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (_req, res) => {
  res.send("<h1>Hello world</h1>");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening on port ${PORT}...`);
});
