
'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Sandwich,
    Wine,
    Gift,
    Cake,
    CupSoda
} from "lucide-react";
import { menuCategories } from "./menu";

const iconMap: { [key: string]: React.ElementType } = {
    "MONTADITOS (No Pão de Coca Espanhol)": Sandwich,
    "SOBREMESAS & CROISSANTS DOCES": Cake,
    "TORRONES ARTESANAIS (Receita Original Espanhola)": Gift,
    "BEBIDAS & SODAS": CupSoda,
    "COQUETELARIA (Para Viagem)": Wine,
};

export default function InteractiveMenu() {
    return (
        <div className="w-full max-w-4xl mx-auto py-12 px-4">
            <header className="text-center mb-12">
                <h1 className="font-headline text-5xl font-bold text-primary">
                    Nosso Cardápio
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Explore nossas delícias artesanais.
                </p>
            </header>

            <Tabs defaultValue={menuCategories[0].name} className="w-full">
                <div className="flex justify-center">
                    <TabsList className="grid w-full grid-cols-2 h-auto sm:w-auto sm:grid-cols-3 md:grid-cols-5">
                        {menuCategories.map((category) => {
                             const Icon = iconMap[category.name] || Sandwich;
                             return (
                                <TabsTrigger value={category.name} key={category.name} className="flex flex-col sm:flex-row items-center gap-2 py-3 px-4 h-full whitespace-normal">
                                    <Icon className="h-5 w-5" />
                                    <span className="text-xs sm:text-sm text-center sm:text-left">{category.name.split(' (')[0]}</span>
                                </TabsTrigger>
                             )
                        })}
                    </TabsList>
                </div>
                {menuCategories.map((category) => (
                    <TabsContent value={category.name} key={category.name} className="mt-8">
                         <div className="text-left mb-6">
                            <h3 className="text-2xl font-headline text-foreground">{category.name}</h3>
                            {category.description && <p className="text-sm text-muted-foreground font-normal mt-1">{category.description}</p>}
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {category.items.map((item) => (
                            <li key={item.name} className="bg-card p-4 rounded-lg shadow-sm">
                              <div className="flex items-start gap-4">
                                {item.imageUrl && (
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <div className="relative h-24 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-md">
                                        <Image
                                          src={item.imageUrl}
                                          alt={item.name}
                                          fill
                                          className="object-cover transition-transform hover:scale-105"
                                          sizes="96px"
                                        />
                                      </div>
                                    </DialogTrigger>
                                    <DialogContent className="p-0 border-0 max-w-lg bg-transparent shadow-none">
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
                                        <p className="text-foreground font-semibold">{item.name}</p>
                                        {item.description && (
                                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                        )}
                                    </div>
                                    <p className="font-bold text-lg text-primary whitespace-nowrap pt-1">{item.price}</p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
