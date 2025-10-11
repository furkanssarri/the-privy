const { Router } = require("express");

const signupRouter = Router();

signupRouter.get("/", (req, res) => {
  res.send("pages/signupForm", {
    title: "Sign Up",
  });
});

module.exports = signupRouter;
