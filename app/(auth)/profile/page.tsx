// app/(auth)/profile/page.tsx doit afficher les information du store. mets ajours le composant

/*

// /store/userStore.ts
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage',
    }
  )
);


*/

// app/(auth)/profile/page.tsx
"use client";

import { useUserStore } from "@/stores/useUserStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
//import { EnvelopeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, isAuthenticated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/components/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Chargement du profil...</p>
      </div>
    );
  }

  // Récupérer les initiales pour l'avatar fallback
  const getInitials = () => {
    if (!user.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <Badge className="mt-1">{user.role}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span>{user.email}</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">ID utilisateur</p>
              <p className="font-medium">{user.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
