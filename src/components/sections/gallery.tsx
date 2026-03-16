import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const galleryImages = [
  "https://64.media.tumblr.com/6a8dc27de6262d8d1558ba98ce3d3a24/cd48f24a48804319-b6/s2048x3072/b3d350f1536821d9745c42175307fc7e6360e431.jpg",
  "https://64.media.tumblr.com/44753f6c919d3ef2c7e56cb66e218281/cd48f24a48804319-c8/s2048x3072/2b6fc56dcb785763a26f70765c3bef185bd12255.jpg",
  "https://64.media.tumblr.com/4fa9fb034fb28428fdbcb2d450208e01/d2c318eec32e2d61-4f/s2048x3072/625bece86a8f5bf7d1433630f7049d2805377253.jpg",
  "https://64.media.tumblr.com/4f4645deda13007e48770b6b3e13de9e/cd48f24a48804319-6b/s2048x3072/e649e344e8fdae6201de9b4173bb14b798e45582.jpg",
  "https://64.media.tumblr.com/346233e4ba1d29ad386f5a1b52f0d83f/cd48f24a48804319-de/s2048x3072/736be8851f5809c220d2c3c5866da7b16d9eecdc.jpg",
  "https://64.media.tumblr.com/ac6a270840b6b52acdd7611eae5c5300/cd48f24a48804319-53/s2048x3072/8091177ef315643234701650866b0b5e02e0d9ba.jpg",
  "https://64.media.tumblr.com/4d1872f83003f50e19737b4d4b32f2ee/cd48f24a48804319-10/s2048x3072/903110eed5c6f3fc8c15a699b6a3d220b7df8919.jpg",
  "https://64.media.tumblr.com/11a301697d75b4ecd670f3c9f378a1c5/cd48f24a48804319-f4/s2048x3072/ecf134661bb133889ca05fbdebcb0c39f77160a5.jpg",
  "https://64.media.tumblr.com/263fe1c12c7d5bb79cdcbfe9bc03618c/cd48f24a48804319-1f/s2048x3072/a95ea8884a0740738fbbfcc4ac8d9ecfc1a6dbe6.jpg",
];

export default function GallerySection() {
  return (
    <section id="nosso-espaco" className="bg-secondary py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
            Conheça
          </h2>
          <h3 className="mt-2 font-headline text-4xl font-bold text-foreground md:text-5xl">
            Nosso Espaço
          </h3>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Um ambiente acolhedor e charmoso para seus melhores momentos.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {galleryImages.map((src, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={src}
                      alt={`Nosso Espaço ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </div>
    </section>
  );
}
