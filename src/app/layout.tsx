import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Staark Inc — Lead Intelligence Platform",
    template: "%s | Staark Inc",
  },
  description:
    "Staark Inc is the premium SaaS platform for managing leads, clients, and pipelines with unmatched intelligence.",
  keywords: ["leads", "SaaS", "CRM", "pipeline", "clients", "sales"],
  openGraph: {
    title: "Staark Inc — Lead Intelligence Platform",
    description: "Premium SaaS for lead and client management.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
