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
}

export const darkTheme: ThemeType = {
  name: "dark",
  colors: {
    bg: "#0f172a",
    surface: "#1e293b",
    card: "rgba(255, 255, 255, 0.03)",
    cardHover: "rgba(255, 255, 255, 0.06)",
    cardBorder: "rgba(255, 255, 255, 0.06)",
    primary: "#818cf8",
    primaryHover: "#6366f1",
    primaryLight: "#a5b4fc",
    accent: "#22d3ee",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    textMuted: "#64748b",
    success: "#34d399",
    error: "#f87171",
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
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
};
