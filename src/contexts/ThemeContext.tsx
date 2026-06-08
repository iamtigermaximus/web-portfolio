"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { swissLightTheme, swissDarkTheme, ThemeType } from "@/lib/theme";

type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeType;
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: swissLightTheme,
  mode: "light",
  toggleTheme: () => {},
});

export function useAppTheme() {
  return useContext(ThemeContext);
}

function getInitialMode(): ThemeMode {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem("theme-mode");
    if (stored === "dark" || stored === "light") return stored;
  } catch {}
  return "light";
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    setMode(getInitialMode());
  }, []);

  const toggleTheme = useCallback(() => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      try {
        window.localStorage.setItem("theme-mode", next);
      } catch {}
      return next;
    });
  }, []);

  const theme = mode === "dark" ? swissDarkTheme : swissLightTheme;

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
}
