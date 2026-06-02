"use client";

import React from "react";
import styled, { css } from "styled-components";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: string;
  onClick?: () => void;
}

const StyledCard = styled.div<{ $hover: boolean; $padding?: string }>`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.025) 0%,
    rgba(255, 255, 255, 0.04) 50%,
    rgba(255, 255, 255, 0.015) 100%
  );
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ $padding, theme }) => $padding || theme.spacing.xl};
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: ${({ theme }) => theme.radius.lg};
    background: linear-gradient(
      135deg,
      rgba(167, 139, 250, 0.12),
      transparent 40%,
      transparent 60%,
      rgba(45, 212, 191, 0.08)
    );
    z-index: -1;
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  ${({ $hover, theme }) =>
    $hover &&
    css`
      cursor: pointer;
      &:hover {
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.04) 0%,
          rgba(255, 255, 255, 0.06) 50%,
          rgba(255, 255, 255, 0.02) 100%
        );
        border-color: rgba(167, 139, 250, 0.2);
        transform: translateY(-3px);
        box-shadow:
          0 12px 40px rgba(0, 0, 0, 0.5),
          0 0 40px rgba(167, 139, 250, 0.06);

        &::before {
          opacity: 1;
        }
      }
    `}
`;

export default function GlassCard({
  children,
  className,
  hover = false,
  padding,
  onClick,
}: GlassCardProps) {
  return (
    <StyledCard $hover={hover} $padding={padding} className={className} onClick={onClick}>
      {children}
    </StyledCard>
  );
}
