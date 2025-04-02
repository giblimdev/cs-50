// app/blog/create/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RichTextEditor from "@/components/blog/RichTextEditor";
import MediaUploader from "@/components/blog/MediaUploader";
import CategorySelect from "@/components/blog/CategorySelect";
import TagInput from "@/components/blog/TagInput";
import { useUserStore } from "@/stores/useUserStore";

const postFormSchema = z.object({
  title: z
    .string()
    .min(5, "Le titre doit contenir au moins 5 caractères")
    .max(100, "Le titre ne peut pas dépasser 100 caractères"),
  content: z
    .string()
    .min(50, "Le contenu doit contenir au moins 50 caractères"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  categoryIds: z
    .array(z.string())
    .min(1, "Sélectionnez au moins une catégorie"),
  tags: z.array(z.string()),
  mediaIds: z.array(z.string()),
});

type PostFormValues = z.infer<typeof postFormSchema>;

export default function CreatePostPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
      status: "DRAFT",
      categoryIds: [],
      tags: [],
      mediaIds: [],
    },
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      router.push("/components/auth/login");
    }
  }, [isAuthenticated, user, router, isLoading]);

  useEffect(() => {
    // Simuler un temps de chargement pour l'initialisation
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  async function onSubmit(values: PostFormValues) {
    if (!user) {
      toast.error("Vous devez être connecté pour créer un article");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          authorId: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Erreur lors de la création de l'article"
        );
      }

      toast.success("Article créé avec succès", {
        description:
          values.status === "PUBLISHED"
            ? "Votre article a été publié"
            : "Votre article a été enregistré comme brouillon",
      });

      router.push(
        values.status === "PUBLISHED" ? `/blog/${data.slug}` : "/blog/my-posts"
      );
    } catch (error) {
      console.error("Erreur lors de la création de l'article:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Une erreur inattendue est survenue"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // La redirection est gérée par le useEffect
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Créer un nouvel article</h1>

      <Card>
        <CardHeader>
          <CardTitle>Informations de l&apos;article</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input placeholder="Titre de l'article" {...field} />
                    </FormControl>
                    <FormDescription>
                      Un titre accrocheur pour votre article
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contenu</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DRAFT">Brouillon</SelectItem>
                          <SelectItem value="PUBLISHED">Publié</SelectItem>
                          <SelectItem value="ARCHIVED">Archivé</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Définir le statut de visibilité de l&apos;article
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégories</FormLabel>
                      <FormControl>
                        <CategorySelect
                          selectedCategories={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>
                        Sélectionnez une ou plusieurs catégories
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <TagInput tags={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormDescription>
                      Ajoutez des tags pour améliorer la découvrabilité de votre
                      article
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mediaIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Médias</FormLabel>
                    <FormControl>
                      <MediaUploader
                        mediaIds={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Ajoutez des images ou vidéos à votre article
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Création en cours..." : "Créer l'article"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
