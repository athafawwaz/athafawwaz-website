import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atha Fawwaz Firjatullah — Portfolio",
  description:
    "Web & Odoo ERP Developer | Automation Specialist. Building the future of digital workflows with Next.js, Odoo, n8n, and modern web technologies.",
  keywords: [
    "Atha Fawwaz",
    "Web Developer",
    "Odoo ERP",
    "Next.js",
    "Portfolio",
    "Automation",
  ],
  authors: [{ name: "Atha Fawwaz Firjatullah" }],
  openGraph: {
    title: "Atha Fawwaz Firjatullah — Portfolio",
    description:
      "Web & Odoo ERP Developer | Automation Specialist. Building the future of digital workflows.",
    type: "website",
  },
};

import Chatbot from "@/components/chatbot";
import SpeedtestWidget from "@/components/speedtest-widget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SpeedtestWidget />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
