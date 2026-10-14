import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Crimson_Pro, JetBrains_Mono } from "next/font/google";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import BackToTop from "@/components/back-to-top";
import { themeInitScript } from "@/context/theme-context";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const serif = Crimson_Pro({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Farrin Sofian",
  description:
    "Farrin Marouf Sofian is a Ph.D. student at UC Irvine working on generative modeling with diffusion models.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans">
        <Providers>
          <Navbar />
          {children}
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
