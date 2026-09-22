import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NavBar } from "./components/nav/NavBar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vertex",
  description: "Vertex — a learning platform with intelligent content search.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-50">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
