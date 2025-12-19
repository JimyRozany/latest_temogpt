import { serialize } from "cookie";
import jwt from "jsonwebtoken";

export function generateToken({ id, username, email, role }) {
  // generate jwt token
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(
    { userId: id, username: username, email: email, role: role },
    secretKey,
    { expiresIn: "30d" }
  );
  return token;
}

export function setCookie(user) {
  const token = generateToken(user);

  const cookie = serialize("auth-token", token, {
    httpOnly: true,
    secure: false, //development=http , production=https
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return cookie;
}
