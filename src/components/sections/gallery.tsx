export default function GallerySection() {
  return (
    <section id="nosso-espaco" className="bg-secondary py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            Conheça
          </p>
          <h2 className="mt-2 font-headline text-4xl font-bold text-foreground md:text-5xl">
            Nosso Espaço
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Sinta a experiência e o ambiente do Oliva Montaditos através dos nossos vídeos.
          </p>
        </div>

        <div className="w-full max-w-5xl mx-auto overflow-hidden rounded-xl shadow-2xl bg-black animate-in fade-in zoom-in duration-700">
          <div className="aspect-video w-full">
            <iframe
              src="https://www.youtube.com/embed/videoseries?list=PLQ95Z5MmN3UM"
              title="Playlist Oliva Montaditos - Nosso Espaço"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
