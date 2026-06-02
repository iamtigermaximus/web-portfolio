"use client";

import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Image, Spinner } from "@phosphor-icons/react";
import { normalizeImageUrl } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface CloudinaryUploadProps {
  onUpload: (url: string) => void;
  currentUrl?: string | null;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const Row = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`;

const UrlInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.base};
  transition: border-color 0.25s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.glow};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const Preview = styled.div<{ $url: string | null }>`
  width: 100%;
  height: 140px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ $url, theme }) =>
    $url
      ? `url(${$url}) center/cover no-repeat`
      : theme.colors.surface};
  border: 1px dashed ${({ theme }) => theme.colors.cardBorder};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const Divider = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0 ${({ theme }) => theme.spacing.xs};
`;

const Loader = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  svg {
    animation: spin 1s linear infinite;
  }
`;

export default function CloudinaryUpload({
  onUpload,
  currentUrl,
}: CloudinaryUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [urlText, setUrlText] = useState("");
  const [uploading, setUploading] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      alert("Cloudinary cloud name not configured. Use the URL field instead, or set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME.");
      return;
    }

    setUploading(true);
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
          setUrlText(data.secure_url);
        } else {
          alert("Upload failed: " + (data.error?.message || "Unknown error"));
        }
      })
      .catch(() => alert("Upload failed — check your network or Cloudinary upload preset"))
      .finally(() => setUploading(false));
  }

  function handleUrlApply() {
    const trimmed = urlText.trim();
    if (!trimmed) return;
    onUpload(normalizeImageUrl(trimmed) ?? trimmed);
  }

  return (
    <Wrapper>
      <Label>Image</Label>
      <Row>
        <UrlInput
          type="text"
          placeholder="Paste image URL…"
          value={urlText || currentUrl || ""}
          onChange={(e) => setUrlText(e.target.value)}
          onBlur={handleUrlApply}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleUrlApply();
            }
          }}
        />
        <input
          ref={inputRef}
          type="file"
          accept="image/*,application/pdf,.pdf"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {uploading ? (
          <Loader><Spinner size={16} />Uploading…</Loader>
        ) : (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => inputRef.current?.click()}
          >
            <Image size={16} weight="bold" />
            Upload
          </Button>
        )}
      </Row>
      {(currentUrl || urlText) && (
        <Preview $url={urlText || currentUrl || null}>
          {!currentUrl && !urlText && "No image"}
        </Preview>
      )}
    </Wrapper>
  );
}
