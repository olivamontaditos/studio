'use client';

import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Flame,
    Sandwich,
    Wine,
    Gift,
    Cake,
    Grape,
    Coffee
} from "lucide-react";
import { menuCategories, promotions } from "./menu";

const iconMap: { [key: string]: React.ElementType } = {
    "Montaditos Salgados": Sandwich,
    "Sangria & Coquetelaria": Wine,
    "Torrones Artesanais 🇪🇸": Gift,
    "Sobremesas & Croissants Doces": Cake,
    "Sucos Naturais": Grape,
    "Cafeteria": Coffee,
};

export default function InteractiveMenu() {
    return (
        <div className="w-full max-w-2xl mx-auto py-12 px-4">
            <header className="text-center mb-12">
                <h1 className="font-headline text-5xl font-bold text-primary">
                    Cardápio
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Toque em uma categoria para começar sua jornada de sabores!
                </p>
            </header>

            <Accordion type="single" collapsible className="w-full space-y-4">
                {menuCategories.map((category) => {
                    const Icon = iconMap[category.name] || Sandwich;
                    return (
                        <AccordionItem value={category.name} key={category.name} className="border-b-0 rounded-lg bg-card text-card-foreground shadow-sm overflow-hidden">
                            <AccordionTrigger className="p-6 hover:no-underline text-left">
                                <div className="flex items-center gap-4 w-full">
                                    <Icon className="h-8 w-8 text-accent flex-shrink-0" />
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-headline">{category.name}</h3>
                                        {category.description && <p className="text-sm text-muted-foreground font-normal mt-1">{category.description}</p>}
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                                <ul className="space-y-6 pt-4 border-t border-dashed">
                                  {category.items.map((item) => (
                                    <li key={item.name}>
                                      <div className="flex items-start gap-4">
                                        {item.imageUrl && (
                                          <Dialog>
                                            <DialogTrigger asChild>
                                              <div className="relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-md">
                                                <Image
                                                  src={item.imageUrl}
                                                  alt={item.name}
                                                  fill
                                                  className="object-cover"
                                                  sizes="80px"
                                                />
                                              </div>
                                            </DialogTrigger>
                                            <DialogContent className="p-0 border-0 max-w-md bg-transparent shadow-none">
                                              <div className="relative aspect-square w-full">
                                                <Image
                                                  src={item.imageUrl}
                                                  alt={item.name}
                                                  fill
                                                  className="object-contain rounded-lg"
                                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                              </div>
                                            </DialogContent>
                                          </Dialog>
                                        )}
                                        <div className="flex-grow">
                                          <div className="flex justify-between items-start gap-2">
                                            <div className="flex-shrink">
                                                <p className="text-foreground font-medium">{item.name}</p>
                                                {item.description && (
                                                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                                )}
                                            </div>
                                            <p className="font-semibold text-foreground whitespace-nowrap pt-1">{item.price}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}

                {/* Promotions section */}
                <AccordionItem value="promocoes" className="border-b-0 rounded-lg bg-card text-card-foreground shadow-sm overflow-hidden">
                    <AccordionTrigger className="p-6 hover:no-underline text-left">
                        <div className="flex items-center gap-4 w-full">
                            <Flame className="h-8 w-8 text-accent flex-shrink-0" />
                            <div className="flex-grow">
                                <h3 className="text-xl font-headline">Promoções & Combos</h3>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                        <ul className="space-y-4 pt-4 border-t border-dashed">
                          {promotions.map((promo) => (
                            <li key={promo.title}>
                                <h4 className="text-accent font-bold">{promo.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{promo.description}</p>
                            </li>
                          ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </div>
    )
}
