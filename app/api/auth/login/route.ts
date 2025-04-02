// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth/password";
import { encrypt } from "@/lib/auth/jwt";
import { prisma } from "@/lib/prisma/client";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { 
          error: "Email incorrect",
          message: "Aucun compte trouvé avec cet email" 
        },
        { status: 404 } // 404 pour "Non trouvé"
      );
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { 
          error: "Mot de passe incorrect",
          message: "Le mot de passe ne correspond pas à ce compte" 
        },
        { status: 401 } // 401 Unauthorized
      );
    }

    const session = await encrypt({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json(
      { user: { id: user.id, email: user.email, name: user.name } },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: session,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Erreur serveur", message: "Une erreur est survenue lors de la connexion" },
      { status: 500 }
    );
  }
}