
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
        <div className="w-full max-w-6xl mx-auto py-12 px-4">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                          {category.items.map((item) => (
                            <div key={item.name} className="bg-card rounded-lg shadow-sm overflow-hidden flex flex-col">
                                {item.imageUrl ? (
                                    <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="relative h-56 w-full cursor-pointer overflow-hidden">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            fill
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                        />
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="p-0 border-0 max-w-2xl bg-transparent shadow-none">
                                        <div className="relative aspect-square w-full">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            fill
                                            className="object-contain rounded-lg"
                                            sizes="100vw"
                                        />
                                        </div>
                                    </DialogContent>
                                    </Dialog>
                                ) : (
                                    <div className="relative h-56 w-full bg-secondary flex items-center justify-center">
                                        <Sandwich className="h-16 w-16 text-muted-foreground/50" />
                                    </div>
                                )}
                                <div className="p-4 flex flex-col flex-grow">
                                    <div className="flex-grow">
                                        <p className="text-foreground font-semibold text-lg">{item.name}</p>
                                        {item.description && (
                                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="font-bold text-xl text-primary">{item.price}</p>
                                    </div>
                                </div>
                            </div>
                          ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
