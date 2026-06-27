import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Math Man",
  description: "Educational arcade maze game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
