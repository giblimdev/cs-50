// components/blog/MediaUploader.tsx
"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Upload, FileText } from "lucide-react";
import Image from "next/image";

interface MediaUploaderProps {
  mediaIds: string[];
  onChange: (mediaIds: string[]) => void;
}

interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: string;
}

export default function MediaUploader({
  mediaIds,
  onChange,
}: MediaUploaderProps) {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const fetchMediaItems = useCallback(async () => {
    if (mediaIds.length === 0) {
      setMediaItems([]);
      return;
    }

    try {
      const response = await fetch(`/api/media?ids=${mediaIds.join(",")}`);
      if (!response.ok) throw new Error("Failed to load media");
      setMediaItems(await response.json());
    } catch (error) {
      console.error("Media loading error:", error);
      toast.error("Impossible de charger les médias");
    }
  }, [mediaIds]);

  useEffect(() => {
    fetchMediaItems();
  }, [fetchMediaItems]);

  const uploadFile = useCallback(
    async (file: File, tempId: string, newMediaIds: string[]) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const xhr = new XMLHttpRequest();
        const mediaId = await new Promise<string>((resolve, reject) => {
          xhr.open("POST", "/api/media/upload", true);

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percentComplete = Math.round(
                (event.loaded / event.total) * 100
              );
              setUploadProgress((prev) => ({
                ...prev,
                [tempId]: percentComplete,
              }));
            }
          };

          xhr.onload = () => {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText).id);
            } else {
              reject(new Error(`Échec du téléchargement: ${xhr.statusText}`));
            }
          };

          xhr.onerror = () => reject(new Error("Erreur réseau"));
          xhr.send(formData);
        });

        newMediaIds.push(mediaId);
        onChange(newMediaIds);
        await fetchMediaItems();
        toast.success(`${file.name} téléchargé avec succès`);
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(`Échec du téléchargement de ${file.name}`);
        throw error;
      } finally {
        setUploadProgress((prev) => {
          const newProgress = { ...prev };
          delete newProgress[tempId];
          return newProgress;
        });
      }
    },
    [fetchMediaItems, onChange]
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      setIsUploading(true);
      const newMediaIds = [...mediaIds];

      try {
        await Promise.all(
          acceptedFiles.map((file) => {
            const tempId = `temp-${Date.now()}-${file.name}`;
            setUploadProgress((prev) => ({ ...prev, [tempId]: 0 }));
            return uploadFile(file, tempId, newMediaIds);
          })
        );
      } finally {
        setIsUploading(false);
      }
    },
    [mediaIds, uploadFile]
  );

  const removeMedia = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`/api/media/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Échec de la suppression");

        onChange(mediaIds.filter((mediaId) => mediaId !== id));
        setMediaItems((prev) => prev.filter((item) => item.id !== id));
        toast.success("Média supprimé avec succès");
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Échec de la suppression du média");
      }
    },
    [mediaIds, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
      "video/*": [".mp4", ".webm", ".ogg"],
      "application/pdf": [".pdf"],
    },
    maxSize: 10485760, // 10MB
  });

  const progressEntries = useMemo(
    () => Object.entries(uploadProgress),
    [uploadProgress]
  );

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-gray-300 hover:border-primary/50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-10 w-10 text-gray-400" />
          <p className="text-sm text-gray-600">
            {isDragActive
              ? "Déposez les fichiers ici..."
              : "Glissez-déposez des fichiers ici, ou cliquez pour sélectionner"}
          </p>
          <p className="text-xs text-gray-500">
            Formats supportés: JPG, PNG, GIF, WEBP, MP4, PDF (Max 10MB)
          </p>
        </div>
      </div>

      {progressEntries.length > 0 && (
        <div className="space-y-2">
          {progressEntries.map(([id, progress]) => (
            <div key={id} className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>{id.replace(/^temp-\d+-/, "")}</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          ))}
        </div>
      )}

      {mediaItems.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {mediaItems.map((media) => (
            <div
              key={media.id}
              className="relative group border rounded-lg overflow-hidden"
            >
              {media.type.startsWith("image/") ? (
                <div className="relative w-full h-32">
                  <Image
                    src={media.url}
                    alt={media.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              ) : media.type.startsWith("video/") ? (
                <video
                  src={media.url}
                  className="w-full h-32 object-cover"
                  controls
                />
              ) : (
                <div className="w-full h-32 flex items-center justify-center bg-gray-100">
                  <FileText className="h-10 w-10 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeMedia(media.id);
                  }}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-2 text-xs truncate">{media.name}</div>
            </div>
          ))}
        </div>
      )}

      {isUploading && (
        <div className="text-center text-sm text-gray-500">
          Téléchargement en cours...
        </div>
      )}
    </div>
  );
}
