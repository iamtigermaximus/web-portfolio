"use client";

import React from "react";
import styled, { css } from "styled-components";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSize.sm};
  `,
  md: css`
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    font-size: ${({ theme }) => theme.fontSize.base};
  `,
  lg: css`
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xxl};
    font-size: ${({ theme }) => theme.fontSize.lg};
  `,
};

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primaryLight},
      ${({ theme }) => theme.colors.primary}
    );
    color: white;
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);

    &:hover:not(:disabled) {
      box-shadow:
        0 6px 30px rgba(139, 92, 246, 0.5),
        0 0 40px rgba(167, 139, 250, 0.15);
      transform: translateY(-1px);
    }
  `,
  secondary: css`
    background: rgba(255, 255, 255, 0.04);
    color: ${({ theme }) => theme.colors.textPrimary};
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(167, 139, 250, 0.25);
      box-shadow: 0 0 20px rgba(167, 139, 250, 0.08);
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.04);
      color: ${({ theme }) => theme.colors.textPrimary};
    }
  `,
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  letter-spacing: 0.01em;

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <StyledButton $variant={variant} $size={size} disabled={loading || props.disabled} {...props}>
      {loading ? "Loading..." : children}
    </StyledButton>
  );
}
