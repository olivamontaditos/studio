import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function GastronomySection() {
    const gastronomyImage = PlaceHolderImages.find(img => img.id === 'gastronomy-montaditos');
    
    return (
        <section className="relative h-[60vh] md:h-[80vh] w-full">
            {gastronomyImage && (
                <Image
                    src={gastronomyImage.imageUrl}
                    alt={gastronomyImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={gastronomyImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/50" />
        </section>
    );
}
