// app/components/layout/Header.tsx

"use client";

import Link from "next/link";
import { useUserStore } from "@/stores/useUserStore";
import UserButton from "@/app/components/layout/UserButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Header() {
  const { isAuthenticated } = useUserStore();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={120} height={40} priority />
        </Link>
      </div>
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold">
          Mon Application
        </Link>
      </div>
      <nav className="flex items-center space-x-4">
        <Link href="/" className="hover:underline">
          Accueil
        </Link>
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/blog/create" className="hover:underline">
          New post
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        {!isAuthenticated ? (
          <Button asChild>
            <Link href="/components/auth/login">Connexion</Link>
          </Button>
        ) : (
          <UserButton />
        )}
      </div>
    </header>
  );
}

/*

"use client";

import Link from "next/link";
import { useUserStore } from "@/stores/useUserStore";
import UserButton from "@/app/components/auth/UserButton";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { isAuthenticated } = useUserStore();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold">
          Mon Application
        </Link>
      </div>
      <nav className="flex items-center space-x-4">
        <Link href="/" className="hover:underline">
          Accueil
        </Link>
        <Link href="/" className="hover:underline">
          Accueil
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        {!isAuthenticated ? (
          <Button asChild>
            <Link href="app/login">Connexion</Link>
          </Button>
        ) : (
          <UserButton />
        )}
      </div>
    </header>
  );
}
*/
