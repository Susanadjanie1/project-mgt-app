// lib/authMiddleware.js
import { getToken } from "next-auth/jwt";

export async function authorizeRole(req, res, next, allowedRoles) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Allow admin to access any dashboard or route
  if (token.role === "admin") {
    req.user = token; // Attach user to request
    return next();
  }

  // If not admin, ensure they have a valid role
  if (!allowedRoles.includes(token.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  req.user = token; // Attach user to request
  next();
}
