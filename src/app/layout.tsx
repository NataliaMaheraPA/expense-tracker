import type { Metadata } from 'next';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Next Template',
  description: 'Next Template',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col antialiased md:min-h-screen">
        <main className="flex-1 overflow-y-hidden">{children}</main>
      </body>
    </html>
  );
}
