const {
  addPostToDb,
  updatePostInDb,
  deletePostFromDb,
  fetchPostById,
} = require("./queries.js");

const createNewPost = async (req, res, next) => {
  const { content } = req.body;
  const authorId = req.user.id;
  try {
    const newPost = { content, authorId };
    await addPostToDb(newPost);
    res.redirect(`/`);
  } catch (err) {
    console.error("Error creating the new post.", err);
  }
};

const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  try {
    const updatedPost = await updatePostInDb(postId, content);
    if (!updatedPost) {
      return res.status(404).send("Post not found.");
    }
    res.redirect(`/posts/${postId}`);
  } catch (err) {
    console.error("Error updating post,", err);
    res.status(500).send("Server error");
  }
};

const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    await deletePostFromDb(postId);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting post", err);
    next(err);
  }
};

module.exports = {
  createNewPost,
  updatePost,
  deletePost,
};
