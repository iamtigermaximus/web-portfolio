"use client";

import React from "react";
import styled from "styled-components";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const Wrapper = styled.div<{ $align: "left" | "center" }>`
  text-align: ${({ $align }) => $align};
  max-width: 640px;
  margin: ${({ $align }) => ($align === "center" ? "0 auto" : "0")};
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSize.xxl};
  }
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Wrapper $align={align}>
      <Title>
        <Accent>{title.charAt(0)}</Accent>
        {title.slice(1)}
      </Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Wrapper>
  );
}
