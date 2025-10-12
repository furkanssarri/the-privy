const { Router } = require("express");
const {
  getAllPostsWithAuthors,
  getPostById,
} = require("../controllers/queries");

const indexRouter = Router();

indexRouter.get("/", async (_req, res, next) => {
  try {
    const posts = await getAllPostsWithAuthors();
    res.render("pages/index", {
      title: "Home",
      posts: posts,
    });
  } catch (err) {
    next(err);
  }
});

indexRouter.get("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await getPostById(postId);
    if (!post)
      return res.status(404).render("pages/404", {
        title: "Post Not Found",
      });
    res.render("pages/post", {
      title: post.title,
      post: post,
    });
  } catch (err) {
    console.error("Error retrieving post", err);
  }
});

module.exports = indexRouter;
