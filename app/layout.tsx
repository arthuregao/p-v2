import type { Metadata } from "next";
import { Inter, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });
const hyperlegible = Atkinson_Hyperlegible(
    {
      weight: "400",
      subsets: ["latin"]
    }
)

export const metadata: Metadata = {
  title: "Arthur Gao",
  description: "Personal Website for Arthur Gao",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={'scroll-smooth'}>
      <body className={`${hyperlegible.className} bg-slate-900 text-slate-400 leading-relaxed antialiased selection:bg-teal-300 selection:text-teal-900`}>{children}</body>
    </html>
  );
}
