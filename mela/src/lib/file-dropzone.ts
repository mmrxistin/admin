// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

"use client";

// Local replacement for @uploadthing/react's useDropzone.
// Provides the same minimal API: getRootProps, getInputProps, isDragActive.

import { useCallback, useRef, useState } from "react";

export function useDropzone({
  onDrop,
  accept = "image/*,video/*",
  multiple = true,
  disabled = false,
}: {
  onDrop: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const dragDepth = useRef(0);

  const open = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      const files = Array.from(fileList || []);
      if (files.length) onDrop(files);
    },
    [onDrop],
  );

  const getRootProps = useCallback(
    () => ({
      onClick: open,
      onDragEnter: (e: React.DragEvent) => {
        e.preventDefault();
        dragDepth.current++;
        setIsDragActive(true);
      },
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragActive(true);
      },
      onDragLeave: (e: React.DragEvent) => {
        e.preventDefault();
        dragDepth.current--;
        if (dragDepth.current <= 0) {
          dragDepth.current = 0;
          setIsDragActive(false);
        }
      },
      onDrop: (e: React.DragEvent) => {
        e.preventDefault();
        dragDepth.current = 0;
        setIsDragActive(false);
        handleFiles(e.dataTransfer.files);
      },
      // Note: intentionally no onClick, same as how uploadthing's getRootProps
      // was used in this codebase (the editors stripped onClick themselves).
    }),
    [handleFiles, open],
  );

  const getInputProps = useCallback(
    () => ({
      type: "file" as const,
      accept,
      multiple,
      className: "sr-only hidden",
      ref: inputRef,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
        e.target.value = "";
      },
    }),
    [accept, multiple, handleFiles],
  );

  return { getRootProps, getInputProps, isDragActive, open, inputRef };
}
