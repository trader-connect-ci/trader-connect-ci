import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trader Connect CI",
  description: "Formation, trading et événements en Côte d'Ivoire",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
