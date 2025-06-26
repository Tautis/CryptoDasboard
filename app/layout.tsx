import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import NavBar from "@/components/NavBar";
import PageTransition from "@/components/PageTransition";

import "./globals.css";

// Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Best Crypto Coins",
  description: "Discover the best new crypto coins weekly",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// Root layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
