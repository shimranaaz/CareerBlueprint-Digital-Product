import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AdminRequest extends Request {
  isAdmin?: boolean;
}

export const adminAuth = (req: AdminRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.admin_token;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    req.isAdmin = true;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired session" });
  }
};