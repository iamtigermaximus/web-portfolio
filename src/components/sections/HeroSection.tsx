"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";

const words = [
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Lifelong Learner",
];

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.xxl};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(129, 140, 248, 0.08) 0%,
      rgba(34, 211, 238, 0.03) 40%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

const Content = styled.div`
  text-align: center;
  max-width: 720px;
  z-index: 1;
`;

const Greeting = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: monospace;
`;

const Name = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.textPrimary} 0%,
    ${({ theme }) => theme.colors.primaryLight} 50%,
    ${({ theme }) => theme.colors.accent} 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientShift} 4s ease infinite;
`;

const RoleWrapper = styled.div`
  height: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Role = styled(motion.span)`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Actions = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
`;

const BouncingIcon = styled.div`
  animation: ${bounce} 2s ease infinite;
  display: flex;
`;

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <Content>
        <Greeting
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hi, I&apos;m
        </Greeting>

        <Name
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Siegfred Gamboa
        </Name>

        <RoleWrapper>
          <AnimatePresence mode="wait">
            <Role
              key={wordIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {words[wordIndex]}
            </Role>
          </AnimatePresence>
        </RoleWrapper>

        <Actions
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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

      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span>Scroll</span>
        <BouncingIcon>
          <CaretDown size={16} weight="bold" />
        </BouncingIcon>
      </ScrollIndicator>
    </Wrapper>
  );
}
