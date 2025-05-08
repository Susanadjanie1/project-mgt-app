// lib/authMiddleware.js
import { getToken } from "next-auth/jwt";

export async function authorizeRole(req, res, next, allowedRoles) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !allowedRoles.includes(token.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  req.user = token; // Attach user to request
  next();
}
