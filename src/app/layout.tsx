
import type { Metadata } from "metadata";
import { Inter, Alegreya } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import IfoodPopup from "@/components/ifood-popup";
import WhatsappButton from "@/components/whatsapp-button";

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
  title: "OLIVA MONTADITOS – Eventos, Reservas & Experiência Gastronômica",
  description:
    "Explore a gastronomia artesanal no OLIVA MONTADITOS. Realize seu evento ou faça sua reserva para uma experiência única com ingredientes autênticos e momentos inesquecíveis.",
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
          <IfoodPopup />
          <WhatsappButton />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
