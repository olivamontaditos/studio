import type { Metadata } from "next";
import { Inter, Alegreya } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase/client-provider";

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const fontHeadline = Alegreya({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "OLIVA MONTADITOS – Reservas & Experiência Gastronômica",
  description:
    "Explore a gastronomia artesanal no OLIVA MONTADITOS. Reserve sua mesa para uma experiência única com ingredientes autênticos e momentos inesquecíveis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={cn(
          "min-h-screen font-body antialiased",
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
