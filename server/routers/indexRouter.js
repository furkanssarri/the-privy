const { Router } = require("express");
const { isAuth, isAdmin } = require("../controllers/authMiddleware.js");
const { fetchAllPostsWithAuthors } = require("../controllers/queries");
const { updatePost } = require("../controllers/postsController.js");

const indexRouter = Router();

indexRouter.get("/", async (_req, res, next) => {
  try {
    const posts = await fetchAllPostsWithAuthors();
    res.render("pages/index", {
      title: "Home | The Privy",
      posts: posts,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = indexRouter;
