import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/themeProvider";
import { GlobalContextProvider } from "@/components/providers/globalStateProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Koard",
  description: "Create your own custom kanban board",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Navbar />
            <main>{children}</main>
          </ThemeProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
