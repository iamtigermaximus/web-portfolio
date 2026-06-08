"use client";

import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const SpinnerElement = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: 2px solid ${({ theme }) => theme.colors.cardBorder};
  border-top: 2px solid ${({ theme }) => theme.colors.textPrimary};
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  margin: 0 auto;
`;

interface SpinnerProps {
  size?: number;
}

export default function Spinner({ size = 24 }: SpinnerProps) {
  return <SpinnerElement $size={size} />;
}
