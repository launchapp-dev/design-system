import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LaunchApp Web - Design System Demo",
  description: "Example application consuming the LaunchApp Design System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
