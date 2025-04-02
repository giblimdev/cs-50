// components/dashboard/nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/utils";
import { Home, Settings, Users, FileText, Bell } from "lucide-react";

export function DashboardNav() {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Tableau de bord",
    },
    {
      href: "/dashboard/users",
      icon: Users,
      label: "Utilisateurs",
    },
    {
      href: "/dashboard/posts",
      icon: FileText,
      label: "Articles",
    },
    {
      href: "/dashboard/notifications",
      icon: Bell,
      label: "Notifications",
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      label: "Paramètres",
    },
  ];

  return (
    <nav className="flex-1 overflow-y-auto py-2">
      <div className="space-y-1 px-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === link.href
                ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
