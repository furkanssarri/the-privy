const { fetchAllPostsWithAuthors, fetchPostById } = require("./queries.js");

module.exports.canAlterPost = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(403).render("pages/unAuthorized", {
      title: "Access Denied | The Privy",
      message: "You need to be logged in to delete posts.",
    });
  }

  const user = req.user;
  const { postId } = req.params;

  try {
    const post = await fetchPostById(postId);
    if (!post) {
      return res.status(404).render("pages/404", { title: "Post not found" });
    }

    // Admin can delete any post
    if (user.role === "admin") {
      return next();
    }

    // Member can delete their own posts only
    if (
      user.role === "member" &&
      post.author_id.toString() === user.id.toString()
    ) {
      return next();
    }

    // Otherwise, deny
    return res.status(403).render("pages/unAuthorized", {
      title: "Access Denied | The Privy",
      message: "You are not allowed to delete this post.",
      posts: {},
    });
  } catch (err) {
    console.error("Error checking delete permissions:", err);
    return res.status(500).render("pages/404", { title: "Server Error" });
  }
};

module.exports.isMember = async (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "member") {
    next();
  } else {
    const posts = await fetchAllPostsWithAuthors();
    return res.status(403).render("pages/unAuthorized", {
      title: "Access Denied | The Privy",
      message: "This operation requires member priviledges.",
      user: req.user || null,
      posts: posts,
    });
  }
};

module.exports.isAdmin = async (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    next();
  } else {
    const posts = await fetchAllPostsWithAuthors();
    return res.status(403).render("pages/unAuthorized", {
      title: "Access Denied | The Privy",
      message: "This operation requires admin priviledges.",
      user: req.user || null,
      posts: posts,
    });
  }
};
