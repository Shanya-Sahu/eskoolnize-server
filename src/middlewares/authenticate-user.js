// src/middlewares/authenticate-user.js
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/custom-error.js";

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthenticatedError("No token provided"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new UnauthenticatedError("Authentication invalid"));
  }
};
