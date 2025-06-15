
/*import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  //subsets: ["latin"],
 subsets: ["vietnamese",],
 
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
*/

import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/components/ui/toast";

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: "Shaddyna",
  description: "Shop your style",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inconsolata.variable} font-mono antialiased
          bg-background text-foreground
          selection:bg-purple-600 selection:text-white
          leading-relaxed tracking-tight
        `}
      >
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
