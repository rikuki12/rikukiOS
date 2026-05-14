import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HOUSE OF MITCHELL — Apex Command Center",
  description: "Gamified command center for House of Mitchell operations.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="overflow-hidden">{children}</body>
    </html>
  );
}
