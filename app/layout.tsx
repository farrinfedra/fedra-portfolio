import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import ThemeContextProvider from "@/context/theme-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Farrin Sofian",
  description:
    "Farrin Sofian is a Ph.D. student at UC Irvine working on controllable and scalable generative AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${inter.className} bg-[#f5f5f7] text-[#1d1d1f] relative pt-24 sm:pt-28 dark:bg-[#050505] dark:text-[#f5f5f7] dark:text-opacity-95`}
      >
        <ThemeContextProvider>
          <Navbar />
        
          {children}
        </ThemeContextProvider>
        
        {/* <Footer /> */}
      </body>
    </html>
  );
}
