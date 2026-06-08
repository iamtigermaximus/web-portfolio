"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xxxl};
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.lg}`};
  }
`;

const Content = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
`;

const Name = styled(motion.h1)`
  font-size: clamp(4rem, 11vw, 9rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: clamp(3rem, 14vw, 5rem);
  }
`;

const Rule = styled(motion.div)`
  width: 80px;
  height: 3px;
  background: ${({ theme }) => theme.colors.accent};
  margin: ${({ theme }) => `${theme.spacing.xl} 0`};
`;

const Descriptor = styled(motion.p)`
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  max-width: 480px;
  letter-spacing: -0.01em;
`;

const Meta = styled(motion.p)`
  font-family: 'JetBrains Mono', monospace;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Actions = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  flex-wrap: wrap;
`;

export default function HeroSection() {
  return (
    <Wrapper>
      <Content>
        <Meta
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Developer &amp; Engineer
        </Meta>

        <Name
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Siegfred
          <br />
          Gamboa
        </Name>

        <Rule
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />

        <Descriptor
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          I build full-stack applications and AI-powered tools.
          Focused on clean architecture, thoughtful interfaces,
          and software that solves real problems.
        </Descriptor>

        <Actions
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Link href="/projects">
            <Button variant="primary" size="lg">
              View Projects
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Get In Touch
            </Button>
          </Link>
        </Actions>
      </Content>
    </Wrapper>
  );
}
