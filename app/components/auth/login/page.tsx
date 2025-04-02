// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { setUser } = useUserStore();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          form.setError("email", {
            type: "manual",
            message: data.message || "Aucun compte associé à cet email",
          });
          toast.error(data.error);
        } else if (response.status === 401) {
          form.setError("password", {
            type: "manual",
            message: data.message || "Mot de passe incorrect",
          });
          form.setValue("password", "");
          toast.error(data.error);
        } else {
          throw new Error(data.message || "Une erreur est survenue");
        }
        return;
      }

      setUser(data.user);

      const toastId = toast.success("Connexion réussie", {
        description: "Vous allez être redirigé vers votre tableau de bord",
      });

      setTimeout(() => {
        toast.dismiss(toastId);
        router.push("/dashboard");
      }, 100);
    } catch (error: unknown) {
      console.error("Login error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Une erreur inattendue est survenue"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Connexion à votre compte
          </h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse e-mail</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="votre@email.com"
                        type="email"
                        autoComplete="email"
                        className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Votre mot de passe"
                          autoComplete="current-password"
                          className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300"
              >
                {isSubmitting ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            Pas encore de compte ?{" "}
            <Link
              href="/components/auth/register"
              className="text-indigo-600 hover:text-indigo-500"
            >
              S&apos;inscrire
            </Link>
          </p>
          <p className="mt-2">
            <Link
              href="/forgot-password"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Mot de passe oublié ?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
