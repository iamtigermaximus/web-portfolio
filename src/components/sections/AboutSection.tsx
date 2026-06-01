"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Wrapper = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: ${({ theme }) => theme.spacing.xxxl};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const AvatarColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Avatar = styled.div`
  width: 180px;
  height: 180px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}33,
    ${({ theme }) => theme.colors.accent}33
  );
  border: 2px solid ${({ theme }) => theme.colors.cardBorder};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Bio = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const BioText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 1.8;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s;

  &:hover {
    background: rgba(129, 140, 248, 0.15);
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function AboutSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <Wrapper id="about">
      <SectionHeading
        title="About Me"
        subtitle="A bit about my journey and what drives me"
        align="left"
      />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <GlassCard>
          <Content>
            <AvatarColumn>
              <Avatar>YN</Avatar>
              <SocialLinks>
                <SocialLink
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <GithubLogo size={22} weight="bold" />
                </SocialLink>
                <SocialLink
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedinLogo size={22} weight="bold" />
                </SocialLink>
              </SocialLinks>
            </AvatarColumn>
            <Bio>
              <BioText>
                I&apos;m a passionate full stack developer with a love for building
                beautiful, performant web applications. With experience across the
                entire stack — from crafting pixel-perfect UIs to designing scalable
                backend architectures — I thrive on turning complex problems into
                elegant solutions.
              </BioText>
              <BioText>
                When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                contributing to open source projects, or sharing knowledge through
                technical blog posts. I believe in continuous learning and the power
                of building things that make a difference.
              </BioText>
            </Bio>
          </Content>
        </GlassCard>
      </motion.div>
    </Wrapper>
  );
}
