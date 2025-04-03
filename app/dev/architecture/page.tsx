// app/architecture/page.tsx
import Link from "next/link";
import { FileText, Shield, Database, Layout, Settings } from "lucide-react";

export default function ArchitecturePage() {
  const categories = [
    {
      name: "Structure de Base",
      icon: <Layout className="w-5 h-5" />,
      files: [
        {
          path: "app/",
          description:
            "Contient toutes les routes et pages de l'application avec le nouveau App Router de Next.js 13+",
          technologies: ["Layouts", "Pages", "Templates"],
        },
        {
          path: "components/",
          description:
            "Composants React réutilisables organisés par fonctionnalité",
          technologies: ["React", "TypeScript"],
        },
        {
          path: "lib/",
          description:
            "Utilitaires, hooks et configurations partagés dans toute l'application",
          technologies: ["Helpers", "Hooks"],
        },
      ],
    },
    {
      name: "Authentification",
      icon: <Shield className="w-5 h-5" />,
      files: [
        {
          path: "app/auth/login/page.tsx",
          description:
            "Page de connexion avec validation JWT et protection contre les attaques CSRF",
          technologies: ["React Hook Form", "Zod"],
        },
        {
          path: "lib/auth/session.ts",
          description:
            "Gestion centralisée des sessions utilisateur avec cookies sécurisés",
          technologies: ["JWT", "HttpOnly Cookies"],
        },
      ],
    },
    {
      name: "Base de Données",
      icon: <Database className="w-5 h-5" />,
      files: [
        {
          path: "prisma/schema.prisma",
          description: "Définition des modèles de données et relations",
          technologies: ["Prisma", "PostgreSQL"],
        },
        {
          path: "lib/db.ts",
          description:
            "Instance singleton du client Prisma pour éviter les multiples connexions",
          technologies: ["Singleton Pattern"],
        },
      ],
    },
    {
      name: "UI Components",
      icon: <Layout className="w-5 h-5" />,
      files: [
        {
          path: "components/ui/",
          description:
            "Composants d'interface réutilisables (boutons, cartes, etc.)",
          technologies: ["Tailwind CSS", "ShadCN"],
        },
        {
          path: "components/layout/",
          description: "Composants structurels (en-tête, pied de page, etc.)",
          technologies: ["Responsive Design"],
        },
      ],
    },
    {
      name: "Fonctionnalités Blog",
      icon: <FileText className="w-5 h-5" />,
      files: [
        {
          path: "app/posts/[slug]/page.tsx",
          description: "Page de détail d'article avec système de commentaires",
          technologies: ["Markdown", "Syntax Highlighting"],
        },
        {
          path: "app/dashboard/page.tsx",
          description: "Tableau de bord utilisateur avec statistiques",
          technologies: ["Chart.js", "Data Fetching"],
        },
      ],
    },
    {
      name: "Configuration",
      icon: <Settings className="w-5 h-5" />,
      files: [
        {
          path: "next.config.js",
          description:
            "Configuration avancée de Next.js (optimisations, plugins)",
          technologies: ["Webpack", "Plugins"],
        },
        {
          path: "tailwind.config.js",
          description: "Configuration du système de design et des couleurs",
          technologies: ["Tailwind CSS"],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Architecture du Projet
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Structure technique complète de notre solution de blog avec
            authentification maison
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {category.name}
                  </h2>
                </div>

                <ul className="space-y-4">
                  {category.files.map((file, fileIndex) => (
                    <li
                      key={fileIndex}
                      className="border-t pt-4 first:border-t-0 first:pt-0"
                    >
                      <div className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-lg inline-block mb-2">
                        {file.path}
                      </div>
                      <p className="text-gray-600 mb-2">{file.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {file.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="text-xs bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Diagramme d&apos;Architecture
          </h2>
          <div className="bg-gray-100 rounded-lg p-6 flex justify-center items-center h-64">
            <div className="text-center text-gray-500">
              <p>Diagramme technique de l&apos;architecture</p>
              <p className="text-sm mt-2">
                (À remplacer par un vrai diagramme)
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              href="/docs/architecture-diagram"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Voir le diagramme détaillé →
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
