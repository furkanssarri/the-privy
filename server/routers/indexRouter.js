const { Router } = require("express");
const { getAllPostsWithAuthors } = require("../controllers/queries");

const indexRouter = Router();

indexRouter.get("/", async (_req, res, next) => {
  try {
    const posts = await getAllPostsWithAuthors();
    res.render("pages/index", {
      title: "Home",
      posts: posts,
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = indexRouter;
