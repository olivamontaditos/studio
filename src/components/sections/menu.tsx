'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
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
    CupSoda,
    Coffee
} from "lucide-react";
import { cn } from "@/lib/utils";

export const menuCategories = [
  {
    name: "MONTADITOS (No Pão de Coca Espanhol)",
    description: "Base: Emulsão de tomate, alho e azeite. Dica: Troque o pão por Croissant Amanteigado por + R$ 7,50.",
    items: [
      { name: "M01. El Clásico", description: "Muçarela derretida e orégano no pão artesanal.", price: "R$ 14,00", imageUrl: "https://64.media.tumblr.com/5d1bcf7ceba0e04ed8ce2e2412a3c4da/0729a521a5d6cff4-01/s2048x3072/11c42de505012a851baefc2ba66ad487dc7d3134.jpg" },
      { name: "M02. Salame & Cherry", description: "Salame italiano, tomate cereja, muçarela e maionese de alho.", price: "R$ 25,00", imageUrl: "https://64.media.tumblr.com/c438395e5096bd86e4c1fa290d489651/0729a521a5d6cff4-6b/s2048x3072/9b6910ba0895e79ed1954503aef0992c0b003e4b.jpg" },
      { name: "M03. Jamón Serrano Supremo", description: "Presunto cru espanhol, búfala, rúcula e pimentão no azeite.", price: "R$ 32,00", imageUrl: "https://64.media.tumblr.com/7fcab6e70efc0fce1fa7a286d2b2b316/0729a521a5d6cff4-cb/s2048x3072/bd1a81a520067e76c288a701d8889d820dd2ec19.jpg" },
      { name: "M04. Germânico-Ibérico", description: "Salsicha artesanal, Vinagrete do William e maionese de alho.", price: "R$ 24,00", imageUrl: "https://64.media.tumblr.com/80862ce7c59ba9297564ba9c92271ccc/0729a521a5d6cff4-1a/s2048x3072/a63b54494b40a8beac1c6dd677a9fbfa3ec3a86a.jpg" },
      { name: "M05. Peito de Peru Light", description: "Peito de peru, búfala, tomate, alface e maionese de alho.", price: "R$ 22,00", imageUrl: "https://64.media.tumblr.com/acb78441e2b45ff3bb2ee86766693d57/0729a521a5d6cff4-ad/s2048x3072/5d7e4371e74beb499fc222df02db822b708f4265.jpg" },
      { name: "M06. Frango Cremoso Melt", description: "Frango ao cream cheese, muçarela e batata crocante.", price: "R$ 22,90", imageUrl: "https://64.media.tumblr.com/b9e96594fc6d22353cd3cf7c94edeb77/0729a521a5d6cff4-fd/s2048x3072/f3f206f1e6853ae1d967dfc738653dc4fd5489a6.jpg" },
      { name: "M07. Frango Iscas Gourmet", description: "Iscas de frango, muçarela, maionese de alho e tomate cereja.", price: "R$ 22,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "M08. Mignon Gruyère", description: "Mignon, queijo gruyère, cebola caramelizada e maionese de alho.", price: "R$ 31,00", imageUrl: "https://64.media.tumblr.com/9e260afe66273c0a6158761992ceb67d/0729a521a5d6cff4-2b/s2048x3072/2bb44eb1a215e7d3eb24b197bf77581526abaf24.jpg" },
      { name: "M09. Pastrami Oliva", description: "Pastrami, queijo derretido, Vinagrete do William e creme de queijo.", price: "R$ 34,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "M10. Presunto Royale", description: "Queijo e presunto.", price: "R$ 18,00", imageUrl: "https://64.media.tumblr.com/b52567a2d00f84d7f3651c2444b5bb85/0729a521a5d6cff4-e3/s2048x3072/25b5ca0786e1e362f1a7f8ec67a42e1fe6e14434.jpg" },
    ],
  },
  {
    name: "SOBREMESAS & CROISSANTS DOCES",
    items: [
        { name: "Torta Basca de San Sebastián", description: "A autêntica cheesecake espanhola cremosa. Adicional de Calda Artesanal: + R$ 8,00", price: "R$ 34,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
        { name: "Croissant Pistache Real", description: "Recheio de brigadeiro e ganache de pistache.", price: "R$ 41,00", imageUrl: "https://64.media.tumblr.com/0add055745496740cdac0ee959142a72/0729a521a5d6cff4-03/s2048x3072/11612a18f1c46df12f7d3274d3fedb0200c84372.jpg" },
        { name: "Croissant Nutella com Morangos", description: "Nutella original e morangos frescos.", price: "R$ 38,90", imageUrl: "https://64.media.tumblr.com/6c066210786fb0fe39f2cfa601994f94/3ff45e09a0c7dd34-ae/s2048x3072/7eed66c605a1a87e48ea908cfb53af3cfcc16037.jpg" },
        { name: "Croissant Chocolate Blend", description: "Chocolate ao leite premium.", price: "R$ 31,00", imageUrl: "https://64.media.tumblr.com/32d746d8e9cd9113ed6811ac3e7b91e2/0729a521a5d6cff4-e9/s2048x3072/8d98fc0f020c1d091ae10db68fda56c69d7ce1cc.jpg" },
        { name: "Croissant Doce de Leite com Nozes", description: "Creme de doce de leite com nozes crocantes.", price: "R$ 26,00", imageUrl: "https://64.media.tumblr.com/637e23898d6edb025a548a8a7ba8a92d/0729a521a5d6cff4-24/s2048x3072/c644047e9495bdbbf9b225e4dfa1df70b4a664ac.jpg" },
    ],
  },
  {
    name: "TORRONES ARTESANAIS (Receita Original Espanhola)",
    description: "Sabores: Frutas Vermelhas, Pistache, Nozes com Limão ou Chocolate 70%.",
    items: [
      { name: "Tamanho P (25g)", price: "R$ 12,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "Tamanho M (70g)", price: "R$ 35,90", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "Tamanho G (90g)", price: "R$ 42,90", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
    ],
  },
  {
    name: "EXPRESSOS",
    description: "A base de tudo: café puro, intenso e aromático.",
    items: [
      { name: "Expresso Solo", description: "Curto, intenso e com crema aveludada.", price: "R$ 8,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "Expresso Doppio", description: "Dose dupla para quem precisa de energia extra.", price: "R$ 13,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "Expresso Macchiato", description: "O clássico manchado com uma nuvem de leite vaporizado.", price: "R$ 10,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "Espresso Panna", description: "Finalizado com uma generosa camada de chantilly artesanal.", price: "R$ 14,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
    ],
  },
  {
    name: "CAFÉ COM LEITE (LATTE & CIA)",
    description: "Bebidas mais longas, cremosas e perfeitas para fotos.",
    items: [
      { name: "Caffè Latte Clássico", description: "Dose de expresso com leite vaporizado e uma fina camada de espuma.", price: "R$ 14,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "Cappuccino Italiano", description: "Proporções iguais de expresso, leite e muita espuma (opção com canela ou cacau).", price: "R$ 15,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "Flat White", description: "Para os amantes de café; mais expresso, menos espuma, textura de seda.", price: "R$ 16,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "Vanilla Latte", description: "Nosso latte clássico com um toque de extrato natural de baunilha.", price: "R$ 18,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "Caramel Macchiato", description: "Camadas de leite, expresso e finalização com calda de caramelo salgado.", price: "R$ 20,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
    ],
  },
  {
    name: "BEBIDAS & SODAS",
    items: [
      { name: "Sodas Espanholas (400ml)", description: "Maçã Verde, Framboesa, Limão Siciliano ou Pera.", price: "R$ 19,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "Suco Morango com Leite Ninho", description: "Ultra cremoso e batido na hora.", price: "R$ 22,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "Suco de Frutas Vermelhas", description: "Natural (Morango, mirtilo e amora).", price: "R$ 19,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "Chocolate Suíço Cremoso (Quente)", description: "Receita densa europeia.", price: "R$ 22,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
    ],
  },
  {
    name: "COQUETELARIA (Para Viagem)",
    items: [
      { name: "Sangria Oliva (300ml)", description: "Nossa receita clássica em embalagem segura.", price: "R$ 31,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "Pear Sparkling", description: "Espumante brut com Monin de Pera.", price: "R$ 34,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "Carajillo 43", description: "Licor 43 e café expresso premium batidos com gelo e monin de pera. Aveludado e icônico.", price: "R$39,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
    ],
  },
];

const iconMap: { [key: string]: React.ElementType } = {
    "MONTADITOS (No Pão de Coca Espanhol)": Sandwich,
    "SOBREMESAS & CROISSANTS DOCES": Cake,
    "TORRONES ARTESANAIS (Receita Original Espanhola)": Gift,
    "EXPRESSOS": Coffee,
    "CAFÉ COM LEITE (LATTE & CIA)": Coffee,
    "BEBIDAS & SODAS": CupSoda,
    "COQUETELARIA (Para Viagem)": Wine,
};

export default function MenuSection({ variant = 'full' }: { variant?: 'full' | 'summary' }) {
    const isSummary = variant === 'summary';
    const summaryItems = menuCategories
      .flatMap(category => category.items)
      .filter(item => item.imageUrl)
      .slice(0, 6);
    
    return (
        <section id="cardapio" className="bg-background py-20 md:py-32">
            <div className="w-full max-w-6xl mx-auto px-4">
                <header className="text-center mb-12">
                    <p className="text-sm font-bold uppercase tracking-wider text-primary">
                        Cardápio
                    </p>
                    <h2 className="mt-2 font-headline text-4xl font-bold text-foreground md:text-5xl">
                        Nossas Delícias
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        Explore nossas delícias artesanais, dos montaditos clássicos às sobremesas divinas.
                    </p>
                </header>

                {isSummary ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {summaryItems.map((item) => (
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
                        <div className="text-center">
                            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                                <Link href="/menu">Ver Cardápio Completo</Link>
                            </Button>
                        </div>
                    </>
                ) : (
                <Tabs defaultValue={menuCategories[0].name} className="w-full">
                    <div className="flex justify-center">
                        <TabsList className="grid w-full grid-cols-2 h-auto sm:w-auto sm:grid-cols-4 lg:grid-cols-7">
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
                )}
            </div>
        </section>
    );
}
