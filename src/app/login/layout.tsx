"use client";

import React from "react";
import StyledComponentsRegistry from "@/lib/registry";
import ThemeProvider from "@/contexts/ThemeContext";
import { GlobalStyles } from "@/lib/global-styles";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
