"use client";

import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 8px rgba(167, 139, 250, 0.2); }
  50% { box-shadow: 0 0 20px rgba(167, 139, 250, 0.5); }
`;

const SpinnerElement = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: 2px solid rgba(255, 255, 255, 0.05);
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-right: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite, ${pulse} 1.5s ease-in-out infinite;
`;

interface SpinnerProps {
  size?: number;
}

export default function Spinner({ size = 24 }: SpinnerProps) {
  return <SpinnerElement $size={size} />;
}
