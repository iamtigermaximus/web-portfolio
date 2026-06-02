import type { Metadata } from "next";
import AppProviders from "@/components/contexts/AppProviders";

export const metadata: Metadata = {
  title: {
    default: "Portfolio — Full Stack Developer",
    template: "%s — Portfolio",
  },
  description:
    "Full stack developer portfolio showcasing projects, skills, and experience in web development.",
  openGraph: {
    title: "Portfolio — Full Stack Developer",
    description:
      "Full stack developer portfolio showcasing projects, skills, and experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
