export const authorizeUser = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated." });
    }

    // Check role
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Unauthorized role." });
    }

    // Block unverified users (except ADMIN)
    if (!req.user.verified && req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Account not verified by admin yet." });
    }

    next();
  };
};
