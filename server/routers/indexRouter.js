const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (_req, res) => {
  res.send("<h1>Welcome to the homepage</h1>");
});

module.exports = indexRouter;
