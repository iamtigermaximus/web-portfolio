export interface ThemeType {
  name: string;
  mode: "light" | "dark";
  colors: {
    bg: string;
    surface: string;
    card: string;
    cardHover: string;
    cardBorder: string;
    primary: string;
    primaryHover: string;
    primaryLight: string;
    accent: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    success: string;
    error: string;
    glow: string;
    glowAccent: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    base: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadow: {
    glow: string;
    glowStrong: string;
    accentGlow: string;
    card: string;
  };
}

export const swissLightTheme: ThemeType = {
  mode: "light" as const,
  name: "swiss-light",
  colors: {
    bg: "#fafafa",
    surface: "#ffffff",
    card: "#ffffff",
    cardHover: "#f5f5f5",
    cardBorder: "#e5e5e5",
    primary: "#0a0a0a",
    primaryHover: "#404040",
    primaryLight: "#737373",
    accent: "#ff5f1f",
    textPrimary: "#0a0a0a",
    textSecondary: "#525252",
    textMuted: "#a3a3a3",
    success: "#059669",
    error: "#dc2626",
    glow: "transparent",
    glowAccent: "transparent",
  },
  radius: {
    sm: "0",
    md: "0",
    lg: "0",
    xl: "0",
    full: "9999px",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    xxxl: "64px",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "0.9375rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    xxl: "1.5rem",
    xxxl: "2.5rem",
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  shadow: {
    glow: "none",
    glowStrong: "none",
    accentGlow: "none",
    card: "none",
  },
};

export const swissDarkTheme: ThemeType = {
  mode: "dark" as const,
  name: "swiss-dark",
  colors: {
    bg: "#0a0a0a",
    surface: "#141414",
    card: "#141414",
    cardHover: "#1a1a1a",
    cardBorder: "#2a2a2a",
    primary: "#fafafa",
    primaryHover: "#e5e5e5",
    primaryLight: "#a3a3a3",
    accent: "#ff5f1f",
    textPrimary: "#fafafa",
    textSecondary: "#a3a3a3",
    textMuted: "#525252",
    success: "#34d399",
    error: "#f87171",
    glow: "transparent",
    glowAccent: "transparent",
  },
  radius: {
    sm: "0",
    md: "0",
    lg: "0",
    xl: "0",
    full: "9999px",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    xxxl: "64px",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "0.9375rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    xxl: "1.5rem",
    xxxl: "2.5rem",
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  shadow: {
    glow: "none",
    glowStrong: "none",
    accentGlow: "none",
    card: "none",
  },
};
