"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(167, 139, 250, 0.06), transparent),
      radial-gradient(ellipse 50% 80% at 20% 50%, rgba(45, 212, 191, 0.03), transparent),
      radial-gradient(ellipse 50% 80% at 80% 50%, rgba(139, 92, 246, 0.03), transparent);
    pointer-events: none;
    z-index: 0;
  }

  ::selection {
    background: rgba(167, 139, 250, 0.4);
    color: white;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bg};
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, ${({ theme }) => theme.colors.primaryLight}, ${({ theme }) => theme.colors.accent});
    border-radius: 3px;

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
    }
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    line-height: 1.15;
    color: ${({ theme }) => theme.colors.textPrimary};
    letter-spacing: -0.02em;
  }

  h1 { font-size: ${({ theme }) => theme.fontSize.xxxl}; }
  h2 { font-size: ${({ theme }) => theme.fontSize.xxl}; }
  h3 { font-size: ${({ theme }) => theme.fontSize.xl}; }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ul, ol {
    list-style: none;
  }
`;
