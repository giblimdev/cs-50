import Link from "next/link";

export default function UserStoriesPage() {
  const userStories = [
    {
      id: 1,
      category: "Authentification",
      icon: "🔐",
      color: "bg-blue-100",
      stories: [
        "En tant qu'utilisateur, je veux pouvoir créer un compte pour accéder aux fonctionnalités",
        "En tant qu'administrateur, je veux gérer les accès utilisateurs pour maintenir la sécurité",
        "En tant qu'utilisateur, je veux réinitialiser mon mot de passe en cas d'oubli"
      ]
    },
    {
      id: 2,
      category: "Contenu",
      icon: "📝",
      color: "bg-green-100",
      stories: [
        "En tant qu'éditeur, je veux publier des articles pour partager du contenu",
        "En tant que lecteur, je veux filtrer les articles par catégorie pour trouver facilement",
        "En tant qu'utilisateur, je veux commenter les articles pour participer aux discussions"
      ]
    },
    {
      id: 3,
      category: "Profil",
      icon: "👤",
      color: "bg-purple-100",
      stories: [
        "En tant qu'utilisateur, je veux modifier mon profil pour mettre à jour mes informations",
        "En tant qu'utilisateur, je veux voir mon historique d'activité pour suivre mes contributions",
        "En tant qu'administrateur, je veux voir les statistiques d'utilisation pour analyser l'engagement"
      ]
    },
    {
      id: 4,
      category: "Performance",
      icon: "⚡",
      color: "bg-yellow-100",
      stories: [
        "En tant qu'utilisateur, je veux un chargement rapide des pages pour une meilleure expérience",
        "En tant qu'utilisateur mobile, je veux une interface responsive pour utiliser l'application partout",
        "En tant qu'administrateur, je veux suivre les performances du site pour optimiser les ressources"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            User Stories du Projet
          </h1>
          <p className="text-xl text-gray-600 mt-4">
            Exigences fonctionnelles organisées par catégories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {userStories.map((category) => (
            <div
              key={category.id}
              className={`${category.color} rounded-lg shadow-lg p-6 hover:transform hover:scale-105 transition-all duration-200`}
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {category.category}
                </h2>
              </div>
              
              <ul className="space-y-4">
                {category.stories.map((story, index) => (
                  <li
                    key={index}
                    className="flex items-start bg-white p-4 rounded-lg shadow-sm"
                  >
                    <span className="flex-shrink-0 mt-1 mr-3">•</span>
                    <p className="text-gray-700 leading-relaxed">{story}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}