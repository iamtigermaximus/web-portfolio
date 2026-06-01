"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { Image } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  currentUrl?: string | null;
}

const Preview = styled.div<{ $url: string | null }>`
  width: 100%;
  height: 120px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ $url, theme }) =>
    $url
      ? `url(${$url}) center/cover no-repeat`
      : theme.colors.surface};
  border: 1px dashed ${({ theme }) => theme.colors.cardBorder};
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default function CloudinaryUpload({
  onUpload,
  currentUrl,
}: CloudinaryUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      alert("Cloudinary cloud name not configured.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolio_upload");

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.secure_url) {
          onUpload(data.secure_url);
        } else {
          alert("Upload failed: " + (data.error?.message || "Unknown error"));
        }
      })
      .catch(() => alert("Upload failed"));
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => inputRef.current?.click()}
      >
        <Image size={16} weight="bold" />
        Upload Image
      </Button>
      {(currentUrl || currentUrl) && (
        <Preview $url={currentUrl || null}>
          {!currentUrl && "No image"}
        </Preview>
      )}
    </div>
  );
}
