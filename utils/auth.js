import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

// إنشاء Token
export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });
};

// Verify Token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
};

// إعداد Cookie
export const setCookie = (payload) => {
  const token = generateToken(payload);
  return serialize("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 أيام
  });
};
