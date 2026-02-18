import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
