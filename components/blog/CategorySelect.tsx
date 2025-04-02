// components/blog/CategorySelect.tsx
"use client";

import { useEffect, useState } from "react";
import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
}

interface CategorySelectProps {
  selectedCategories: string[];
  onChange: (value: string[]) => void;
}

export default function CategorySelect({
  selectedCategories,
  onChange,
}: CategorySelectProps) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  function toggleCategory(categoryId: string) {
    if (selectedCategories.includes(categoryId)) {
      onChange(selectedCategories.filter((id) => id !== categoryId));
    } else {
      onChange([...selectedCategories, categoryId]);
    }
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            <span>
              {selectedCategories.length > 0
                ? `${selectedCategories.length} catégorie(s) sélectionnée(s)`
                : "Sélectionner des catégories"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Rechercher une catégorie..." />
            <CommandEmpty>Aucune catégorie trouvée.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {loading ? (
                <div className="p-2 text-center">Chargement...</div>
              ) : (
                categories.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={category.name}
                    onSelect={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <CheckIcon
                        className={`h-4 w-4 ${
                          selectedCategories.includes(category.id)
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                      <span>{category.name}</span>
                    </div>
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2">
        {selectedCategories.length > 0 &&
          categories
            .filter((cat) => selectedCategories.includes(cat.id))
            .map((category) => (
              <Badge key={category.id} variant="secondary">
                {category.name}
                <button
                  className="ml-1 text-xs"
                  onClick={() => toggleCategory(category.id)}
                >
                  ×
                </button>
              </Badge>
            ))}
      </div>
    </div>
  );
}
