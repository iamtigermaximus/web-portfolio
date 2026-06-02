"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { X } from "@phosphor-icons/react";

interface TagInputProps {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  error?: string;
}

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const Container = styled.div<{ $hasError: boolean; $focused: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid
    ${({ $hasError, $focused, theme }) =>
      $hasError
        ? theme.colors.error
        : $focused
        ? theme.colors.primary
        : "rgba(255, 255, 255, 0.08)"};
  border-radius: ${({ theme }) => theme.radius.sm};
  min-height: 48px;
  transition: all 0.25s ease;
  backdrop-filter: blur(8px);
  box-shadow: ${({ $focused, theme }) =>
    $focused ? `0 0 0 3px ${theme.colors.glow}` : "none"};
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background: rgba(167, 139, 250, 0.15);
  border: 1px solid rgba(167, 139, 250, 0.25);
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.primaryLight};
  line-height: 1.6;
`;

const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primaryLight};
  cursor: pointer;
  padding: 0;
  border-radius: 50%;
  opacity: 0.7;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  min-width: 120px;
  padding: 2px 4px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-family: inherit;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
`;

const Hint = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default function TagInput({
  label,
  value,
  onChange,
  placeholder = "Type and press Enter…",
  error,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);

  function addTag(raw: string) {
    const tag = raw.trim();
    if (!tag) return;
    if (value.includes(tag)) {
      setInputValue("");
      return;
    }
    onChange([...value, tag]);
    setInputValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === ",") {
      e.preventDefault();
      addTag(inputValue.replace(/,/g, ""));
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData.getData("text");
    if (pasted.includes(",")) {
      e.preventDefault();
      const newTags = pasted
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .filter((t) => !value.includes(t));
      if (newTags.length > 0) onChange([...value, ...newTags]);
    }
  }

  function removeTag(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <Field>
      {label && <Label>{label}</Label>}
      <Container $hasError={!!error} $focused={focused}>
        {value.map((tag, i) => (
          <Tag key={`${tag}-${i}`}>
            {tag}
            <RemoveButton
              type="button"
              onClick={() => removeTag(i)}
              aria-label={`Remove ${tag}`}
            >
              <X size={12} weight="bold" />
            </RemoveButton>
          </Tag>
        ))}
        <StyledInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            if (inputValue.trim()) addTag(inputValue);
          }}
          placeholder={value.length === 0 ? placeholder : ""}
        />
      </Container>
      {error && <ErrorText>{error}</ErrorText>}
      {!error && <Hint>Press Enter or comma to add</Hint>}
    </Field>
  );
}
