"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";

const words = [
  "Full Stack Developer",
  "AI Enthusiast",
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
    background:
      radial-gradient(ellipse 60% 50% at 50% -10%, rgba(167, 139, 250, 0.1), transparent),
      radial-gradient(ellipse 40% 60% at 80% 80%, rgba(45, 212, 191, 0.06), transparent),
      radial-gradient(ellipse 40% 60% at 20% 80%, rgba(139, 92, 246, 0.04), transparent);
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
  }
`;

const Content = styled.div`
  text-align: center;
  max-width: 720px;
  z-index: 1;
`;

const Greeting = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.accent};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.08em;
`;

const Name = styled(motion.h1)`
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.textPrimary} 0%,
    ${({ theme }) => theme.colors.primary} 40%,
    ${({ theme }) => theme.colors.accent} 70%,
    ${({ theme }) => theme.colors.textPrimary} 100%
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientShift} 6s ease infinite;
  line-height: 1.05;
  letter-spacing: -0.03em;
  filter: drop-shadow(0 0 30px rgba(167, 139, 250, 0.2));
`;

const RoleWrapper = styled.div`
  height: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Role = styled(motion.span)`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.04em;
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
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.1em;
  cursor: pointer;
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
`;

const BouncingIcon = styled.div`
  animation: ${bounce} 2s ease infinite;
  display: flex;
  color: ${({ theme }) => theme.colors.accent};
`;

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Wrapper>
      <Content>
        <Greeting
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          &#123; hello &#125;
        </Greeting>

        <Name
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12 }}
        >
          Siegfred Gamboa
        </Name>

        <RoleWrapper>
          <AnimatePresence mode="wait">
            <Role
              key={wordIndex}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.35 }}
            >
              {words[wordIndex]}
            </Role>
          </AnimatePresence>
        </RoleWrapper>

        <Actions
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
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
        transition={{ delay: 1.4 }}
        onClick={scrollToNext}
      >
        <span>scroll</span>
        <BouncingIcon>
          <CaretDown size={18} weight="bold" />
        </BouncingIcon>
      </ScrollIndicator>
    </Wrapper>
  );
}
