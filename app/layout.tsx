import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "RAGs to Rich AIs with LLM Agents",
  description:
    "A PESU I/O Slot 18 ECC course being conducted by Vyoman and Samarth on Gen AI, Retrieval Augmented Generation and Agentic AI systems",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <MainNav />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
