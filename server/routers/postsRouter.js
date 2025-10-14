const { Router } = require("express");
const postsRouter = Router();
const { isAdmin, isMember } = require("../controllers/authMiddleware.js");
const {
  addPostToDb,
  deletePostFromDb,
  fetchPostById,
} = require("../controllers/queries.js");
const {
  updatePost,
  deletePost,
  createNewPost,
} = require("../controllers/postsController.js");

postsRouter.post("/", createNewPost);

postsRouter.get("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await fetchPostById(postId);
    if (!post)
      return res.status(404).render("pages/404", {
        title: "Post Not Found",
      });
    res.render("pages/post", {
      title: `View post`,
      post: post,
    });
  } catch (err) {
    console.error("Error retrieving post", err);
  }
});

postsRouter.get("/:postId/edit", isAdmin, async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await fetchPostById(postId);
    if (!post)
      return res.status(404).render("pages/404", { title: "Post not found" });
    res.render("pages/postForm", {
      title: `Edit post`,
      post: post,
    });
  } catch (err) {
    console.error("Error rendering the post form", err);
  }
});
postsRouter.post("/:postId/edit", isAdmin, updatePost);

postsRouter.delete("/:postId", isAdmin, deletePost);

module.exports = postsRouter;
