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
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <div className="container px-4">
          <h1 className="font-headline text-5xl font-bold tracking-tight text-primary-foreground md:text-7xl lg:text-8xl">
            Faça sua Reserva
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80 md:text-xl">
            Realizando a reserva com antecedência você garante seu lugar com
            mais conforto e praticidade.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="#reservas">RESERVE AGORA SUA MESA</Link>
            </Button>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="h-2 w-2 rounded-full bg-white"></span>
            <span className="h-2 w-2 rounded-full bg-white/50"></span>
            <span className="h-2 w-2 rounded-full bg-white/50"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
