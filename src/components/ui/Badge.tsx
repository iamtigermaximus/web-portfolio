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
    background: rgba(167, 139, 250, 0.12);
    color: #c4b5fd;
    border: 1px solid rgba(167, 139, 250, 0.18);
  `,
  accent: css`
    background: rgba(45, 212, 191, 0.1);
    color: ${({ theme }) => theme.colors.accent};
    border: 1px solid rgba(45, 212, 191, 0.18);
  `,
  muted: css`
    background: rgba(148, 163, 184, 0.06);
    color: ${({ theme }) => theme.colors.textSecondary};
    border: 1px solid rgba(148, 163, 184, 0.1);
  `,
  success: css`
    background: rgba(52, 211, 153, 0.1);
    color: #6ee7b7;
    border: 1px solid rgba(52, 211, 153, 0.18);
  `,
  error: css`
    background: rgba(248, 113, 113, 0.1);
    color: ${({ theme }) => theme.colors.error};
    border: 1px solid rgba(248, 113, 113, 0.18);
  `,
};

const StyledBadge = styled.span<{ $variant: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  padding: 3px ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  white-space: nowrap;
  letter-spacing: 0.02em;
  backdrop-filter: blur(8px);
  ${({ $variant }) => variantStyles[$variant]}
`;

export default function Badge({
  children,
  variant = "default",
}: BadgeProps) {
  return <StyledBadge $variant={variant}>{children}</StyledBadge>;
}
