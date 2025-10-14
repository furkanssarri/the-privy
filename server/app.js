require("dotenv").config();
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const PgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const flash = require("connect-flash");
const pool = require("./db/pool.js");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

const indexRouter = require("./routers/indexRouter.js");
const authRouter = require("./routers/authRouter.js");
const postsRouter = require("./routers/postsRouter.js");

const app = express();

app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(flash());

app.use(
  session({
    store: new PgSession({
      pool: pool,
      tableName: "user_sessions",
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

// make currently-authenticated user available as `user` in all views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use((_req, res, next) => {
  res.locals.errors = [];
  res.locals.formData = {};
  next();
});

app.use("/auth", authRouter);
app.use("/posts", postsRouter);

app.use("/", indexRouter);

app.use((req, res) => {
  res.status(404).render("pages/404", {
    title: "Not found",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening on port ${PORT}...`);
});
