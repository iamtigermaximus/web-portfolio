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
  background: rgba(255, 255, 255, 0.06);
  border-radius: 3px;
  overflow: hidden;
`;

const Fill = styled.div<{ $level: number; $animate: boolean }>`
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  width: ${({ $level, $animate }) => ($animate ? "0" : `${$level}%`)};
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
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
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
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
