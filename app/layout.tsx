import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="border-2 border-dashed border-white-500 p-2">
          Main Layout
          {children}
        </div>
      </body>
    </html>
  );
}
