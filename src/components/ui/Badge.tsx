"use client";

import React from "react";
import styled, { css } from "styled-components";

type BadgeVariant = "default" | "accent" | "muted" | "success" | "error";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, ReturnType<typeof css>> = {
  default: css`
    background: ${({ theme }) => theme.colors.textPrimary};
    color: ${({ theme }) => theme.colors.bg};
  `,
  accent: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.accent};
    border: 1px solid ${({ theme }) => theme.colors.accent};
  `,
  muted: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  `,
  success: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.success};
    border: 1px solid ${({ theme }) => theme.colors.success};
  `,
  error: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.error};
    border: 1px solid ${({ theme }) => theme.colors.error};
  `,
};

const StyledBadge = styled.span<{ $variant: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  padding: 3px ${({ theme }) => theme.spacing.md};
  border-radius: 0;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  white-space: nowrap;
  letter-spacing: 0.02em;
  ${({ $variant }) => variantStyles[$variant]}
`;

export default function Badge({
  children,
  variant = "default",
}: BadgeProps) {
  return <StyledBadge $variant={variant}>{children}</StyledBadge>;
}
