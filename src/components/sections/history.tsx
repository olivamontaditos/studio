import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function HistorySection() {
  const chefImage = PlaceHolderImages.find((img) => img.id === "history-chef");

  return (
    <section id="nossa-historia" className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1 text-center md:text-left">
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
              Conheça nossa história
            </h2>
            <h3 className="mt-2 font-headline text-4xl font-bold text-foreground md:text-5xl">
              OLIVA MONTADITOS
            </h3>
            <p className="mt-6 text-lg text-muted-foreground">
              O OLIVA MONTADITOS nasceu da paixão por ingredientes autênticos,
              receitas artesanais e momentos únicos à mesa.
            </p>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            {chefImage && (
              <div className="relative h-96 w-72 overflow-hidden rounded-lg shadow-2xl">
                <Image
                  src={chefImage.imageUrl}
                  alt={chefImage.description}
                  fill
                  className="object-cover grayscale"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  data-ai-hint={chefImage.imageHint}
                />
              </div>
            )}
          </div>
        </div>
        <div className="mt-20 text-center">
          <p className="font-headline text-3xl italic text-foreground/80 md:text-4xl">
            "O sabor do OLIVA MONTADITOS transforma cada momento em
            experiência."
          </p>
        </div>
      </div>
    </section>
  );
}
