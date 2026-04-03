import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === "hero-background"
  );

  return (
    <section id="inicio" className="relative h-screen w-full">
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center pb-24 text-center text-white">
        <div className="container px-4">
          <h1 className="font-headline text-6xl font-bold tracking-tight text-primary-foreground md:text-8xl">
            Faça sua reserva
            <br />
            Realize seu evento
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-primary-foreground/90 md:text-2xl">
            Celebre momentos, crie memórias e desfrute de uma
            <br />
            experiência gastronômica única.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="https://wa.me/5541991773334" target="_blank" rel="noopener noreferrer">Eventos & Reservas</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
