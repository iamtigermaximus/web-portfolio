"use client";

import React from "react";
import styled from "styled-components";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

const Wrapper = styled.footer`
  padding: ${({ theme }) => `${theme.spacing.xxxl} ${theme.spacing.xxl}`};
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

const Inner = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Logo = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-transform: uppercase;
`;

const Tagline = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  max-width: 400px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.textPrimary};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const Copyright = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: 'JetBrains Mono', monospace;
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Wrapper>
      <Inner>
        <Logo>Siegfred Gamboa</Logo>
        <Tagline>
          Full stack developer building at the intersection of craftsmanship,
          curiosity, and AI.
        </Tagline>
        <SocialLinks>
          <SocialLink
            href="https://github.com/iamtigermaximus"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GithubLogo size={20} weight="bold" />
          </SocialLink>
          <SocialLink
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedinLogo size={20} weight="bold" />
          </SocialLink>
        </SocialLinks>
        <Copyright>
          &copy; {year} <Accent>Siegfred Gamboa</Accent> &middot; All rights reserved
        </Copyright>
      </Inner>
    </Wrapper>
  );
}
