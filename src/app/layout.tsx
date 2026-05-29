import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../index.css";
import "../App.css";

export const metadata: Metadata = {
  title: "React + TypeScript",
  description: "Apresentacao sobre React com TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
