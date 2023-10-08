import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware to validate JWT tokens
export const authenticateToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // Get the JWT token from the "Authorization" header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // If no token is provided, return an unauthorized response
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify the JWT token with the secret key
  jwt.verify(token, "secret-key", (err: any, user: any) => {
    // If verification fails, return a forbidden response
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Attach the user object to the request for use in the route handler
    req.user = user;
    next();
  });
};
