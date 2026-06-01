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
    background: rgba(129, 140, 248, 0.15);
    color: ${({ theme }) => theme.colors.primaryLight};
  `,
  accent: css`
    background: rgba(34, 211, 238, 0.15);
    color: ${({ theme }) => theme.colors.accent};
  `,
  muted: css`
    background: rgba(148, 163, 184, 0.1);
    color: ${({ theme }) => theme.colors.textSecondary};
  `,
  success: css`
    background: rgba(52, 211, 153, 0.15);
    color: ${({ theme }) => theme.colors.success};
  `,
  error: css`
    background: rgba(248, 113, 113, 0.15);
    color: ${({ theme }) => theme.colors.error};
  `,
};

const StyledBadge = styled.span<{ $variant: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  padding: 2px ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  white-space: nowrap;
  ${({ $variant }) => variantStyles[$variant]}
`;

export default function Badge({
  children,
  variant = "default",
}: BadgeProps) {
  return <StyledBadge $variant={variant}>{children}</StyledBadge>;
}
