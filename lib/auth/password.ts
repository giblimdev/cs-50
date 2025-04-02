import { hash, compare } from "bcryptjs";

/**
 * Hash un mot de passe avec bcryptjs
 * @param password Mot de passe en clair
 * @returns Mot de passe hashé
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    return await hash(password, 12); // 12 tours de salage
  } catch (error) {
    console.error("Erreur lors du hashage du mot de passe:", error);
    throw new Error("Erreur lors du hashage du mot de passe");
  }
}

/**
 * Compare un mot de passe en clair avec un hash bcryptjs
 * @param password Mot de passe en clair
 * @param hashedPassword Mot de passe hashé stocké
 * @returns Boolean indiquant si la correspondance est valide
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    return await compare(password, hashedPassword);
  } catch (error) {
    console.error("Erreur lors de la vérification du mot de passe:", error);
    throw new Error("Erreur lors de la vérification du mot de passe");
  }
}

/**
 * Vérifie si un mot de passe respecte les critères de sécurité
 * (optionnel - peut être utilisé avant le hashage)
 * @param password Mot de passe à valider
 * @returns Boolean indiquant si le mot de passe est valide
 */
export function validatePasswordStrength(password: string): boolean {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChars
  );
}