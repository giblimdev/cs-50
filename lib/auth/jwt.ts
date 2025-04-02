// lib/auth/jwt.ts
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const encodedKey = new TextEncoder().encode(secretKey);

export interface SessionPayload extends JWTPayload {
  userId: string;
  email: string;
  name: string;
}

// Fonction pour le middleware (Edge compatible)
export async function verifyTokenForMiddleware(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify<SessionPayload>(token, encodedKey);
    return payload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

// Fonction pour le serveur Node.js standard
export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function verifyToken(
  token: string
): Promise<SessionPayload | null> {
  return verifyTokenForMiddleware(token);
}

// Nouvelle version qui doit être utilisée dans les Server Components
export async function getSession(token?: string) {
  if (!token) return null;
  return verifyTokenForMiddleware(token);
}