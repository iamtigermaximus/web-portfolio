"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface ProficiencyBarProps {
  level: number;
  animated?: boolean;
}

const BarWrapper = styled.div`
  width: 100%;
  height: 6px;
  background: ${({ theme }) => theme.colors.cardBorder};
  overflow: hidden;
`;

const Fill = styled.div<{ $level: number }>`
  height: 100%;
  background: ${({ theme }) => theme.colors.textPrimary};
  width: ${({ $level }) => $level}%;
  transition: width 1s cubic-bezier(0.22, 0.61, 0.36, 1);
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
      <Fill $level={isVisible ? level : 0} />
    </BarWrapper>
  );
}
