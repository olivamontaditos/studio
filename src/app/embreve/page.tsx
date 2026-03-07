import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Metadata } from "next";

const TikTokIcon = (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
);

const FacebookIcon = (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.5c-1.38 0-1.5.62-1.5 1.4V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z" />
    </svg>
);

export const metadata: Metadata = {
    title: "OLIVA MONTADITOS – Em Breve em Curitiba",
    description: "OLIVA MONTADITOS está chegando em Curitiba. Acompanhe nossas redes sociais para novidades.",
};
  
export default function ComingSoonPage() {
    const heroImage = PlaceHolderImages.find(
        (img) => img.id === "hero-background"
    );

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center text-white overflow-hidden">
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={heroImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div className="relative z-10 flex flex-col items-center text-center p-6">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-6xl">
                    OLIVA MONTADITOS
                </h1>
                <p className="mt-4 max-w-2xl text-2xl text-primary-foreground/90 md:text-3xl">
                    Em breve em Curitiba
                </p>

                <div className="mt-12">
                     <h4 className="font-semibold text-foreground text-lg">Nosso Endereço</h4>
                     <p className="mt-2 text-base text-muted-foreground">
                        Avenida Desembargador Hugo Simas 2010
                        <br />
                        Bom Retiro, Curitiba - PR
                     </p>
                </div>

                <div className="mt-12 flex items-center space-x-6">
                  <a
                    href="https://www.instagram.com/olivamontaditos/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-8 w-8" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@olivamontaditos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                    aria-label="TikTok"
                  >
                    <TikTokIcon className="h-8 w-8" />
                  </a>
                   <a
                    href="https://www.facebook.com/olivamontaditos/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="h-8 w-8" />
                  </a>
                </div>
            </div>
        </main>
    );
}
