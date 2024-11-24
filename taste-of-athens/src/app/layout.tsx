import "./globals.css";
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <title>Taste of Athens</title>
        <SessionProvider>
          {children}
        </SessionProvider>
       
      </body>
    </html>
  );
}
