"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface ProficiencyBarProps {
  level: number;
  animated?: boolean;
}

const BarWrapper = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const Fill = styled.div<{ $level: number; $animate: boolean }>`
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primaryLight},
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  background-size: 200% 100%;
  width: ${({ $level }) => $level}%;
  transition: width 1s cubic-bezier(0.22, 0.61, 0.36, 1);
  position: relative;
  box-shadow:
    0 0 12px rgba(167, 139, 250, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.15),
      transparent
    );
    border-radius: 4px 4px 0 0;
  }
`;

export default function ProficiencyBar({
  level,
  animated = true,
}: ProficiencyBarProps) {
  const [isVisible, setIsVisible] = useState(!animated);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [animated]);

  return (
    <BarWrapper ref={ref}>
      <Fill $level={level} $animate={!isVisible} />
    </BarWrapper>
  );
}
