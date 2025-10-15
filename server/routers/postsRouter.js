const { Router } = require("express");
const postsRouter = Router();
const {
  isAdmin,
  isMember,
  canAlterPost,
} = require("../controllers/authMiddleware.js");
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
        title: "Post Not Found | The Privy",
      });
    res.render("pages/post", {
      title: `View post | The Privy`,
      post: post,
    });
  } catch (err) {
    console.error("Error retrieving post", err);
  }
});

postsRouter.get("/:postId/edit", canAlterPost, async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await fetchPostById(postId);
    if (!post)
      return res.status(404).render("pages/404", { title: "Post not found" });
    res.render("pages/postForm", {
      title: `Edit post | The Privy`,
      post: post,
    });
  } catch (err) {
    console.error("Error rendering the post form", err);
  }
});
postsRouter.post("/:postId/edit", canAlterPost, updatePost);

postsRouter.delete("/:postId", canAlterPost, deletePost);

module.exports = postsRouter;
