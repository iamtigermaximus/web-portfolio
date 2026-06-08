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
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: #ffffff;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bg};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.textMuted};
    border-radius: 0;

    &:hover {
      background: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  a {
    color: ${({ theme }) => theme.colors.textPrimary};
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    line-height: 1.1;
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
    background: none;
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
