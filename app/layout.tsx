import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">
        <div className="border-2 border-dashed border-white-500 p-2">
          Main Layout
          {children}
        </div>
      </body>
    </html>
  );
}
