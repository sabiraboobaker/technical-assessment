// auth.ts
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware to validate JWT tokens
export const authenticateToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "secret-key", (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Attach the user object to the request for use in the route handler
    req.user = user;
    next();
  });
};
