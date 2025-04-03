import Link from "next/link";

export default function ProjectPresentation() {
  const fileStructure = [
    {
      category: "Structure de Base",
      icon: "📂",
      files: [
        {
          path: "app/",
          desc: "Routes principales avec architecture App Router de Next.js",
          tech: ["Layouts", "Pages", "Templates"],
        },
        {
          path: "components/",
          desc: "Composants réutilisables organisés par fonctionnalité",
          tech: ["React", "TypeScript"],
        },
        {
          path: "lib/",
          desc: "Utilitaires, hooks et configurations partagés",
          tech: ["Helpers", "Hooks"],
        },
        {
          path: "prisma/",
          desc: "Modélisation des données et migrations",
          tech: ["Prisma", "PostgreSQL"],
        },
        {
          path: "public/",
          desc: "Ressources statiques (images, favicons)",
          tech: ["Assets"],
        },
      ],
    },
    {
      category: "Authentification",
      icon: "🔐",
      files: [
        {
          path: "app/auth/login/page.tsx",
          desc: "Page de connexion avec validation JWT, protection CSRF et gestion des erreurs",
          tech: ["React Hook Form", "Zod", "Bcrypt"],
        },
        {
          path: "app/auth/register/page.tsx",
          desc: "Inscription utilisateur avec vérification email et politique de mot de passe",
          tech: ["Server Actions"],
        },
        {
          path: "lib/auth/session.ts",
          desc: "Gestion centralisée des sessions (création/validation JWT)",
          tech: ["JWT", "Cookies"],
        },
        {
          path: "middleware.ts",
          desc: "Protection des routes et vérification des rôles",
          tech: ["Next.js Middleware"],
        },
        {
          path: "lib/store/auth-store.ts",
          desc: "État global pour la gestion de la session utilisateur",
          tech: ["Zustand"],
        },
      ],
    },
    {
      category: "Blog - Frontend",
      icon: "📝",
      files: [
        {
          path: "app/page.tsx",
          desc: "Page d'accueil avec articles en vedette et suggestions",
          tech: ["SWR", "SSG"],
        },
        {
          path: "app/posts/page.tsx",
          desc: "Liste paginée des articles avec filtres et tri",
          tech: ["Pagination", "Infinite Scroll"],
        },
        {
          path: "app/posts/[slug]/page.tsx",
          desc: "Détail d'article avec markdown, commentaires et suggestions",
          tech: ["MDX", "Syntax Highlighting"],
        },
        {
          path: "app/posts/new/page.tsx",
          desc: "Création d'article avec éditeur markdown enrichi",
          tech: ["Tiptap", "Draft.js"],
        },
        {
          path: "app/profile/page.tsx",
          desc: "Profil utilisateur avec statistiques et historique",
          tech: ["Chart.js"],
        },
        {
          path: "app/not-found.tsx",
          desc: "Page 404 personnalisée avec redirection intelligente",
          tech: ["Error Handling"],
        },
      ],
    },
    {
      category: "Composants",
      icon: "🧩",
      files: [
        {
          path: "components/layout/Header.tsx",
          desc: "En-tête responsive avec navigation adaptative",
          tech: ["Responsive Design"],
        },
        {
          path: "components/layout/Footer.tsx",
          desc: "Pied de page avec liens et informations",
          tech: ["Accessibilité"],
        },
        {
          path: "components/post/PostCard.tsx",
          desc: "Carte d'article optimisée pour SEO et performances",
          tech: ["next/image", "Lazy Loading"],
        },
        {
          path: "components/post/PostForm.tsx",
          desc: "Formulaire partagé pour création/édition d'articles",
          tech: ["Form Validation"],
        },
        {
          path: "components/comments/CommentForm.tsx",
          desc: "Formulaire de commentaire avec prévisualisation markdown",
          tech: ["Markdown Preview"],
        },
        {
          path: "components/comments/CommentList.tsx",
          desc: "Liste de commentaires avec système de votes",
          tech: ["Optimistic UI"],
        },
        {
          path: "components/ui/AuthGuard.tsx",
          desc: "Wrapper pour protéger les composants sensibles",
          tech: ["Higher-Order Component"],
        },
      ],
    },
    {
      category: "API & Backend",
      icon: "⚙️",
      files: [
        {
          path: "app/api/posts/route.ts",
          desc: "Endpoints CRUD pour la gestion des articles",
          tech: ["REST API"],
        },
        {
          path: "app/api/posts/[id]/route.ts",
          desc: "Gestion d'un article spécifique avec validation",
          tech: ["Zod"],
        },
        {
          path: "app/api/posts/[id]/comments/route.ts",
          desc: "API pour les commentaires avec modération",
          tech: ["Rate Limiting"],
        },
        {
          path: "app/api/profile/route.ts",
          desc: "Gestion du profil utilisateur et statistiques",
          tech: ["JWT Verification"],
        },
        {
          path: "prisma/schema.prisma",
          desc: "Modèles de données (User, Post, Comment, Category)",
          tech: ["Prisma"],
        },
        {
          path: "lib/prisma.ts",
          desc: "Instance partagée de client Prisma",
          tech: ["Singleton"],
        },
      ],
    },
    {
      category: "Utilitaires",
      icon: "🛠️",
      files: [
        {
          path: "lib/utils.ts",
          desc: "Fonctions utilitaires (formattage, helpers)",
          tech: ["TypeScript"],
        },
        {
          path: "lib/hooks/usePosts.ts",
          desc: "Hook personnalisé pour la gestion des articles",
          tech: ["SWR", "React Query"],
        },
        {
          path: "lib/hooks/useComments.ts",
          desc: "Hook pour la gestion des commentaires",
          tech: ["Optimistic Updates"],
        },
        {
          path: "types/index.ts",
          desc: "Définitions TypeScript globales",
          tech: ["TypeScript"],
        },
        {
          path: "config/site.ts",
          desc: "Configuration de l'application (constantes)",
          tech: ["Env Variables"],
        },
        {
          path: "next.config.js",
          desc: "Configuration avancée de Next.js",
          tech: ["Webpack", "Plugins"],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Architecture Complète du Blog
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Solution complète avec authentification maison, gestion des rôles et
            système de contenu
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              href="#files"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Structure des Fichiers
            </Link>
            <Link
              href="#features"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-md"
            >
              Fonctionnalités
            </Link>
            <Link
              href="#setup"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
            >
              Guide d&apos;Installation
            </Link>
          </div>
        </header>

        {/* Liste des fichiers */}
        <section id="files" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3 justify-center">
            <span className="bg-blue-100 p-3 rounded-full">📁</span>
            Architecture des Fichiers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fileStructure.map((section, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-xl mb-4 flex items-center gap-3">
                  <span className="text-2xl">{section.icon}</span>
                  {section.category}
                </h3>
                <ul className="space-y-4">
                  {section.files.map((file, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="bg-blue-100 text-blue-800 p-1.5 rounded-full mt-1 flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <div>
                        <p className="font-mono text-sm text-gray-800 bg-gray-100 px-2 py-1 rounded inline-block mb-1">
                          {file.path}
                        </p>
                        <p className="text-gray-600 mb-2">{file.desc}</p>
                        {file.tech && (
                          <div className="flex flex-wrap gap-2">
                            {file.tech.map((tech, i) => (
                              <span
                                key={i}
                                className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Fonctionnalités */}
        <section
          id="features"
          className="mb-20 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3 justify-center">
            <span className="bg-purple-100 p-3 rounded-full">✨</span>
            Fonctionnalités Principales
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sécurité */}
            <div className="border-l-4 border-blue-500 rounded-lg p-6 bg-blue-50 hover:shadow-md transition">
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-blue-600">🔒</span>
                Sécurité Avancée
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <span>Authentification JWT avec refresh tokens</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <span>Gestion fine des rôles (Admin/Editor/User)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <span>Protection CSRF pour les actions sensibles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <span>Cookies sécurisés (httpOnly, SameSite Strict)</span>
                </li>
              </ul>
            </div>

            {/* Performance */}
            <div className="border-l-4 border-green-500 rounded-lg p-6 bg-green-50 hover:shadow-md transition">
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-green-600">⚡</span>
                Performance
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <span>Rendu hybride (SSG, SSR, ISR)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <span>Optimisation des images (next/image)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <span>Cache intelligent des données</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <span>Code splitting automatique</span>
                </li>
              </ul>
            </div>

            {/* UX */}
            <div className="border-l-4 border-purple-500 rounded-lg p-6 bg-purple-50 hover:shadow-md transition">
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-purple-600">🎨</span>
                Expérience Utilisateur
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">•</span>
                  <span>Éditeur markdown avec prévisualisation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">•</span>
                  <span>Système de commentaires en temps réel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">•</span>
                  <span>Recherche full-text avec suggestions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">•</span>
                  <span>Dark mode automatique</span>
                </li>
              </ul>
            </div>

            {/* Gestion de contenu */}
            <div className="border-l-4 border-yellow-500 rounded-lg p-6 bg-yellow-50 hover:shadow-md transition">
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-yellow-600">📝</span>
                Gestion de Contenu
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2 mt-1">•</span>
                  <span>CRUD complet des articles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2 mt-1">•</span>
                  <span>Workflow de publication (brouillon/publié)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2 mt-1">•</span>
                  <span>Système de catégories et tags</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2 mt-1">•</span>
                  <span>Statistiques de lecture</span>
                </li>
              </ul>
            </div>

            {/* Administration */}
            <div className="border-l-4 border-red-500 rounded-lg p-6 bg-red-50 hover:shadow-md transition">
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-red-600">🛡️</span>
                Administration
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span>Tableau de bord analytique</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span>Gestion des utilisateurs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span>Modération des commentaires</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span>Backup automatique des données</span>
                </li>
              </ul>
            </div>

            {/* Développement */}
            <div className="border-l-4 border-indigo-500 rounded-lg p-6 bg-indigo-50 hover:shadow-md transition">
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-indigo-600">💻</span>
                Développement
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2 mt-1">•</span>
                  <span>TypeScript strict</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2 mt-1">•</span>
                  <span>Tests unitaires et E2E</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2 mt-1">•</span>
                  <span>Linting et formatting strict</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2 mt-1">•</span>
                  <span>CI/CD intégrée</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Guide d'installation */}
        <section
          id="setup"
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3 justify-center">
            <span className="bg-green-100 p-3 rounded-full">🚀</span>
            Guide d&apos;Installation
          </h2>

          <div className="bg-gray-900 text-gray-100 p-5 rounded-lg font-mono text-sm overflow-x-auto mb-6">
            <pre className="whitespace-pre-wrap">
              {`# 1. Cloner le dépôt
git clone https://github.com/votre-repo/blog-securise.git
cd blog-securise

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# → Modifier les variables dans .env

# 4. Lancer la base de données (Docker)
docker-compose up -d

# 5. Exécuter les migrations
npx prisma migrate dev --name init

# 6. Peupler la base de données (optionnel)
npx prisma db seed

# 7. Démarrer l'application
npm run dev

# 8. Accéder à l'interface
http://localhost:3000`}
            </pre>
          </div>

       
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <span className="text-blue-600">👤</span>
                Comptes de Test
              </h4>
              <ul className="text-sm space-y-1">
                <li><strong>Admin:</strong> admin@example.com / admin123</li>
                <li><strong>Éditeur:</strong> editor@example.com / editor123</li>
                <li><strong>Utilisateur:</strong> user@example.com / user123</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <span className="text-green-600">📟</span>
                Commandes Utiles
              </h4>
              <ul className="text-sm space-y-1">
                <li><code>npm run lint</code> - Vérification du code</li>
                <li><code>npm run test</code> - Lance les tests</li>
                <li><code>npx prisma studio</code> - Interface DB</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <span className="text-purple-600">🔧</span>
                Variables d&apos;Environnement
              </h4>
              <ul className="text-sm space-y-1">
                <li><code>DATABASE_URL</code> - URL PostgreSQL</li>
                <li><code>JWT_SECRET</code> - Clé de signature JWT</li>
                <li><code>NEXTAUTH_URL</code> - URL de base</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}