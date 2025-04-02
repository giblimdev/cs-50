// components/UserInitializer.tsx
"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { getSession } from "@/lib/auth/jwt";

export function UserInitializer() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    async function loadUser() {
      const session = await getSession();
      if (session) {
        setUser({
          id: session.userId,
          email: session.email,
          name: session.name,
          // Ajoutez d'autres champs si nécessaire
        });
      }
    }
    loadUser();
  }, [setUser]);

  return null;
}
