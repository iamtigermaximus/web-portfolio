export interface ThemeType {
  name: string;
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

export const darkTheme: ThemeType = {
  name: "dark",
  colors: {
    bg: "#060b14",
    surface: "#0c1225",
    card: "rgba(255, 255, 255, 0.02)",
    cardHover: "rgba(255, 255, 255, 0.05)",
    cardBorder: "rgba(255, 255, 255, 0.08)",
    primary: "#a78bfa",
    primaryHover: "#c4b5fd",
    primaryLight: "#8b5cf6",
    accent: "#2dd4bf",
    textPrimary: "#f1f5f9",
    textSecondary: "#94a3b8",
    textMuted: "#475569",
    success: "#34d399",
    error: "#f87171",
    glow: "rgba(167, 139, 250, 0.25)",
    glowAccent: "rgba(45, 212, 191, 0.2)",
  },
  radius: {
    sm: "10px",
    md: "14px",
    lg: "20px",
    xl: "28px",
    full: "9999px",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    xxl: "32px",
    xxxl: "48px",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.8125rem",
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
    glow: "0 0 30px rgba(167, 139, 250, 0.15)",
    glowStrong: "0 0 50px rgba(167, 139, 250, 0.25)",
    accentGlow: "0 0 30px rgba(45, 212, 191, 0.12)",
    card: "0 4px 30px rgba(0, 0, 0, 0.4)",
  },
};
