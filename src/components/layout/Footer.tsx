"use client";

import React from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xxl};
  text-align: center;
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <Wrapper>
      <Text>
        &copy; {year} <Accent>Portfolio</Accent> &middot; Built with Next.js
      </Text>
    </Wrapper>
  );
}
