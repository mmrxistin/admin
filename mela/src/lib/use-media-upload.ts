// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

"use client";

// Local-storage based media upload hook (replaces uploadthing).
// Uploads files to /api/uploads which stores them in public/uploads
// and creates Media records in the database.

import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export interface Attachment {
  file: File;
  mediaId?: string;
  isUploading: boolean;
}

interface UploadResult {
  name: string;
  mediaId: string;
  url: string;
  type: string;
}

export default function useMediaUploadShared() {
  const { toast } = useToast();

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>();
  const [isUploading, setIsUploading] = useState(false);

  async function uploadFiles(files: File[]) {
    // Rename files to unique names, same behavior as before
    const renamedFiles = files.map((file) => {
      const extension = file.name.split(".").pop();
      return new File(
        [file],
        `attachment_${crypto.randomUUID()}.${extension}`,
        { type: file.type },
      );
    });

    setAttachments((prev) => [
      ...prev,
      ...renamedFiles.map((file) => ({ file, isUploading: true })),
    ]);

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    renamedFiles.forEach((file) => formData.append("files", file));

    // Use XHR so we can track upload progress
    await new Promise<void>((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/uploads");

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      xhr.onload = () => {
        try {
          if (xhr.status >= 200 && xhr.status < 300) {
            const res: UploadResult[] = JSON.parse(xhr.responseText);
            setAttachments((prev) =>
              prev.map((a) => {
                const uploadResult = res.find((r) => r.name === a.file.name);
                if (!uploadResult) return a;
                return {
                  ...a,
                  mediaId: uploadResult.mediaId,
                  isUploading: false,
                };
              }),
            );
          } else {
            const err = JSON.parse(xhr.responseText || "{}");
            setAttachments((prev) => prev.filter((a) => !a.isUploading));
            toast({
              variant: "destructive",
              description: err.error || "Upload failed.",
            });
          }
        } catch {
          setAttachments((prev) => prev.filter((a) => !a.isUploading));
          toast({
            variant: "destructive",
            description: "Upload failed. Please try again.",
          });
        }
        resolve();
      };

      xhr.onerror = () => {
        setAttachments((prev) => prev.filter((a) => !a.isUploading));
        toast({
          variant: "destructive",
          description: "Network error during upload.",
        });
        resolve();
      };

      xhr.send(formData);
    });

    setIsUploading(false);
    setUploadProgress(undefined);
  }

  function handleStartUpload(files: File[]) {
    if (isUploading) {
      toast({
        variant: "destructive",
        description: "Please wait for the current upload to finish.",
      });
      return;
    }

    if (attachments.length + files.length > 5) {
      toast({
        variant: "destructive",
        description: "You can only upload up to 5 attachments per post.",
      });
      return;
    }

    const validFiles = files.filter((f) => f.type.startsWith("image/") || f.type.startsWith("video/"));
    if (!validFiles.length) {
      toast({
        variant: "destructive",
        description: "Only image and video files are supported.",
      });
      return;
    }

    void uploadFiles(validFiles);
  }

  function removeAttachment(fileName: string) {
    setAttachments((prev) => prev.filter((a) => a.file.name !== fileName));
  }

  function reset() {
    setAttachments([]);
    setUploadProgress(undefined);
  }

  return {
    startUpload: handleStartUpload,
    attachments,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset,
  };
}
