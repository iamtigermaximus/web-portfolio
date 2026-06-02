"use client";

import React from "react";
import Image from "next/image";
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

const AvatarWrapper = styled.div`
  width: 180px;
  height: 180px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 2px solid rgba(167, 139, 250, 0.25);
  overflow: hidden;
  position: relative;
  box-shadow:
    0 0 30px rgba(167, 139, 250, 0.15),
    0 0 60px rgba(45, 212, 191, 0.06);

  img {
    object-fit: cover;
  }
`;

const Bio = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const BioText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
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
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);

  &:hover {
    background: rgba(167, 139, 250, 0.12);
    border-color: rgba(167, 139, 250, 0.3);
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 20px rgba(167, 139, 250, 0.15);
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
        number="01 // about"
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
              <AvatarWrapper>
                <Image
                  src="/LINKEDIN_IMAGE.jpeg"
                  alt="Siegfred Gamboa"
                  fill
                  sizes="180px"
                />
              </AvatarWrapper>
              <SocialLinks>
                <SocialLink
                  href="https://github.com/iamtigermaximus"
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
                I&apos;m a full stack developer who thrives at the intersection of
                craftsmanship and curiosity — building performant, polished web
                experiences from the database all the way to the last pixel.
                What drives me is the pursuit of elegant solutions: the kind where
                complexity disappears behind a smooth, intuitive interface.
              </BioText>
              <BioText>
                Lately, I&apos;ve been diving deep into artificial intelligence —
                exploring how large language models reason, how agents collaborate,
                and how AI-native tooling is reshaping the way we build software.
                This isn&apos;t just a passing interest; it&apos;s the direction I&apos;m
                steering my career toward. I spend my time experimenting with
                AI-powered workflows, studying prompt engineering, and learning
                how to bridge the gap between human intent and machine capability.
              </BioText>
              <BioText>
                Outside the editor, I&apos;m a perpetual learner — always chasing that
                next concept that reshapes how I see the stack. I believe the best
                engineers aren&apos;t just tool-users; they&apos;re tool-builders who
                understand the principles underneath.
              </BioText>
            </Bio>
          </Content>
        </GlassCard>
      </motion.div>
    </Wrapper>
  );
}
