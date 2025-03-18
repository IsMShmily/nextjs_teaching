import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js",
  description: " Next.js",
};

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
        {/* Link 组件 路由跳转 */}
        <div className="flex gap-4">
          <Link href="/about/a" className="text-blue-500 hover:text-blue-600">
            AboutA
          </Link>
          <Link href="/about/b" className="text-blue-500 hover:text-blue-600">
            AboutB
          </Link>
        </div>

        <div className="border-2 border-dashed border-white-500 p-2">
          Main Layout
          {children}
        </div>
      </body>
    </html>
  );
}
