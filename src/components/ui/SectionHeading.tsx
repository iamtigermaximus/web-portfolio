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
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  letter-spacing: -0.03em;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSize.xxl};
  }
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
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Wrapper>
  );
}
