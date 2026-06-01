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
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
