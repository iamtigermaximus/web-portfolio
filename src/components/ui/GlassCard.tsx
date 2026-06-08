"use client";

import React from "react";
import styled, { css } from "styled-components";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: string;
  onClick?: () => void;
}

const StyledCard = styled.div<{ $hover: boolean; $padding?: string }>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: ${({ $padding, theme }) => $padding || theme.spacing.xl};
  transition: all 0.15s ease;

  ${({ $hover, theme }) =>
    $hover &&
    css`
      cursor: pointer;
      &:hover {
        border-color: ${theme.colors.textPrimary};
        background: ${theme.colors.cardHover};
      }
    `}
`;

export default function Card({
  children,
  className,
  hover = false,
  padding,
  onClick,
}: CardProps) {
  return (
    <StyledCard $hover={hover} $padding={padding} className={className} onClick={onClick}>
      {children}
    </StyledCard>
  );
}
