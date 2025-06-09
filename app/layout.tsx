/*import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shaddyna",
  description: "Shop your style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
        font-sans antialiased 
        bg-background text-foreground
        selection:bg-purple-600 selection:text-white
        leading-relaxed tracking-tight
      `}
      >
        <AuthProvider> 
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}*/

import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shaddyna",
  description: "Shop your style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inconsolata.variable} font-mono antialiased 
        bg-background text-foreground
        selection:bg-purple-600 selection:text-white
        leading-relaxed tracking-tight
      `}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
