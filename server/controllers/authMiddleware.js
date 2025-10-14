module.exports.isMember = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "member") {
    next();
  } else {
    return res.status(403).render("pages/unAuthorized", {
      title: "Access Denied",
      message: "This operation requires member priviledges.",
      user: req.user || null,
    });
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).render("pages/unAuthorized", {
      title: "Access Denied",
      message: "This operation requires admin priviledges.",
      user: req.user || null,
    });
  }
};
