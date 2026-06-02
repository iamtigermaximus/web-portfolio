"use client";

import React from "react";
import styled from "styled-components";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  number?: string;
}

const Wrapper = styled.div<{ $align: "left" | "center" }>`
  text-align: ${({ $align }) => $align};
  max-width: 640px;
  margin: ${({ $align }) => ($align === "center" ? "0 auto" : "0")};
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
`;

const NumberLabel = styled.span`
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.textPrimary} 0%,
    ${({ theme }) => theme.colors.textSecondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSize.xxl};
  }
`;

const Accent = styled.span`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`;

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  number,
}: SectionHeadingProps) {
  return (
    <Wrapper $align={align}>
      {number && <NumberLabel>{number}</NumberLabel>}
      <Title>
        <Accent>{title.charAt(0)}</Accent>
        {title.slice(1)}
      </Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Wrapper>
  );
}
