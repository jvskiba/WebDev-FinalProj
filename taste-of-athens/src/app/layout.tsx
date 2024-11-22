import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <title>Taste of Athens</title>
        {children}
      </body>
    </html>
  );
}
