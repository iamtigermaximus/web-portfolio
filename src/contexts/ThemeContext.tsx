"use client";

import React, { createContext, useContext } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { darkTheme, ThemeType } from "@/lib/theme";

const ThemeContext = createContext<ThemeType>(darkTheme);

export function useAppTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContext.Provider value={darkTheme}>
      <StyledThemeProvider theme={darkTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
}
