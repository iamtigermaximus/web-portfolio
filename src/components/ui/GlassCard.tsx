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
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ $padding, theme }) => $padding || theme.spacing.xl};
  transition: all 0.3s ease;

  ${({ $hover, theme }) =>
    $hover &&
    css`
      cursor: pointer;
      &:hover {
        background: rgba(255, 255, 255, 0.06);
        border-color: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
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
