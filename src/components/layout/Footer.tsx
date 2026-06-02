"use client";

import React from "react";
import styled from "styled-components";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

const Wrapper = styled.footer`
  position: relative;
  padding: ${({ theme }) => `${theme.spacing.xxxl} ${theme.spacing.xxl}`};
  text-align: center;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(12, 18, 37, 0.3) 100%
  );

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.accent},
      transparent
    );
  }
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
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  letter-spacing: 0.06em;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.accent} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 10px ${({ theme }) => theme.colors.glow});
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
  border-radius: ${({ theme }) => theme.radius.sm};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);

  &:hover {
    background: rgba(167, 139, 250, 0.12);
    border-color: rgba(167, 139, 250, 0.3);
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.glow};
    transform: translateY(-2px);
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
        <Logo>SIEGFRED GAMBOA</Logo>
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
          &copy; {year} <Accent>SIEGFRED GAMBOA</Accent> &middot; Built with
          Next.js &middot; Deployed on Vercel
        </Copyright>
      </Inner>
    </Wrapper>
  );
}
