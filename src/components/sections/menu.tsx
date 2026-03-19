'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Sandwich,
    Wine,
    Gift,
    Cake,
    CupSoda,
    Coffee,
    Sparkles,
    Palette,
    GraduationCap,
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
      { name: "M05. Peito de Peru Light", description: "Peito de peru, búfala, tomate, alface e maionese de alho.", price: "R$ 24,90", imageUrl: "https://64.media.tumblr.com/acb78441e2b45ff3bb2ee86766693d57/0729a521a5d6cff4-ad/s2048x3072/5d7e4371e74beb499fc222df02db822b708f4265.jpg" },
      { name: "M06. Frango Cremoso Melt", description: "Frango ao creme de queijo, muçarela e batata crocante.", price: "R$ 22,90", imageUrl: "https://64.media.tumblr.com/b9e96594fc6d22353cd3cf7c94edeb77/0729a521a5d6cff4-fd/s2048x3072/f3f206f1e6853ae1d967dfc738653dc4fd5489a6.jpg" },
      { name: "M07. Frango Iscas Gourmet", description: "Iscas de frango, muçarela, maionese de alho e tomate cereja.", price: "R$ 22,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "M08. Mignon Gruyère", description: "Mignon, queijo gruyère, cebola caramelizada e maionese de alho.", price: "R$ 31,00", imageUrl: "https://64.media.tumblr.com/9e260afe66273c0a6158761992ceb67d/0729a521a5d6cff4-2b/s2048x3072/2bb44eb1a215e7d3eb24b197bf77581526abaf24.jpg" },
      { name: "M09. Pastrami Oliva", description: "Pastrami, queijo derretido, Vinagrete do William e creme de queijo.", price: "R$ 32,00", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
      { name: "M10. Queijo e presunto Royale", description: "Queijo e presunto.", price: "R$ 18,00", imageUrl: "https://64.media.tumblr.com/b52567a2d00f84d7f3651c2444b5bb85/0729a521a5d6cff4-e3/s2048x3072/25b5ca0786e1e362f1a7f8ec67a42e1fe6e14434.jpg" },
      { name: "M11. Clássico Madrileño", description: "Fatias finas de presunto cozido especial e muçarela derretida sobre uma base suculenta de tomate ralado fresco com um toque de alho e azeite de oliva servido no pão de coca crocante.", price: "R$ 15,90", imageUrl: "https://64.media.tumblr.com/8116c22f5cf7a8adb4976c25c86a48d6/d890e4f6673fd084-16/s1280x1920/764b8b6ebab26285d7a2569a2f7171e2da89fddb.jpg" },
    ],
  },
  {
    name: "COMBOS",
    items: [
      {
        name: 'Combo do Estudante (O "Clássico da Tarde")',
        description: "Montadito M11 - Clássico Madrileño + Batata Chips + Refrigerante (lata) ou Suco de Laranja.",
        price: "R$ 27,00",
        imageUrl: "https://picsum.photos/seed/student-combo/800/600",
      }
    ]
  },
  {
    name: "SOBREMESAS & CROISSANTS DOCES",
    items: [
        { name: "Torta Basca de San Sebastián", description: "A autêntica cheesecake espanhola, cremosa por dentro e tostada por fora. Adicional de calda artesanal (frutas vermelhas, pistache e caramelo com flor de sal): + R$ 6,00. Adicional de sorvete artesanal da casa por bola (baunilha, pistache e morango): + R$ 10,00", price: "R$ 29,00", imageUrl: "https://64.media.tumblr.com/95f517167d957247e9f30c53696aff10/ceb08f5edd305fa6-c1/s2048x3072/0ee3f770fd647672b4ec8d01b749ab44dcc7c69e.jpg" },
        { name: "Bolo Matilda", description: "Direto de um clássico para sua mesa: chocolate nobre, brilho intenso e muita cremosidade. Adicional de calda extra de chocolate: R$ 5,00", price: "" },
        { name: "Croissant Pistache Real", description: "Recheio de brigadeiro e ganache de pistache.", price: "R$ 39,00", imageUrl: "https://64.media.tumblr.com/0add055745496740cdac0ee959142a72/0729a521a5d6cff4-03/s2048x3072/11612a18f1c46df12f7d3274d3fedb0200c84372.jpg" },
        { name: "Croissant Nutella com Morangos", description: "Nutella original e morangos frescos.", price: "R$ 38,90", imageUrl: "https://64.media.tumblr.com/6c066210786fb0fe39f2cfa601994f94/3ff45e09a0c7dd34-ae/s2048x3072/7eed66c605a1a87e48ea908cfb53af3cfcc16037.jpg" },
        { name: "Croissant Chocolate Blend", description: "Chocolate ao leite premium.", price: "R$ 31,00", imageUrl: "https://64.media.tumblr.com/32d746d8e9cd9113ed6811ac3e7b91e2/0729a521a5d6cff4-e9/s2048x3072/8d98fc0f020c1d091ae10db68fda56c69d7ce1cc.jpg" },
        { name: "Croissant Doce de Leite com Nozes", description: "Doce de leite artesanal com nozes crocantes.", price: "R$ 26,00", imageUrl: "https://64.media.tumblr.com/637e23898d6edb025a548a8a7ba8a92d/0729a521a5d6cff4-24/s2048x3072/c644047e9495bdbbf9b225e4dfa1df70b4a664ac.jpg" },
        { name: "Brigadeiro Belga Gourmet", price: "R$ 5,90" },
    ],
  },
  {
    name: "TORRONES ARTESANAIS (Receita Original Espanhola)",
    description: "Receita original espanhola feita com mel e amêndoas torradas. Sabores: frutas vermelhas, pistache, nozes com limão siciliano ou chocolate 70%.",
    items: [
      { name: "Tamanho P", price: "R$ 9,90", imageUrl: "https://64.media.tumblr.com/d41f05c45254f28886f93a71091c6bc1/0168b23b368f7428-a9/s1280x1920/b4e5a6d3dcf66b752045e7acdfb93499316466ad.jpg" },
      { name: "Tamanho M", price: "R$ 29,90", imageUrl: "https://64.media.tumblr.com/867c6bd334f88f4e0ef6bf933ab8b83e/0168b23b368f7428-b1/s1280x1920/1a62c6f28db8d57f39ff8c0840df7ff015ad0b30.jpg" },
      { name: "Tamanho G", price: "R$ 35,90", imageUrl: "https://64.media.tumblr.com/636821a5e7b8a228cab209859655dc91/0168b23b368f7428-e5/s1280x1920/667ad64a566ff175a9fde6f31930c41c281d1e7b.jpg" },
    ],
  },
  {
    name: "EXPRESSOS",
    description: "Café gourmet moído na hora com aroma frutado.",
    items: [
      { name: "Expresso", description: "Intenso e com crema aveludada.", price: "R$ 8,00" },
      { name: "Ristreto", price: "R$ 8,00" },
      { name: "Coado", price: "R$ 9,90" },
      { name: "Macchiato tradicional", description: "O clássico manchado com uma nuvem de leite vaporizado.", price: "R$ 9,90" },
    ],
  },
  {
    name: "LATTE",
    description: "Expresso com leite vaporizado e uma fina camada de espuma.",
    items: [
      { name: "Caffè Latte Clássico", description: "Dose de expresso com leite vaporizado e uma fina camada de espuma.", price: "R$ 12,90" },
      { name: "Vanilla Latte", description: "Nosso latte clássico com um toque de extrato natural de baunilha.", price: "R$ 16,00" },
      { name: "Caramel Macchiato", description: "Expresso, uma camada generosa de espuma de leite finalizada com calda de caramelo.", price: "R$ 12,90" },
    ],
  },
  {
      name: "ESPECIAIS DO CAFÉ",
      items: [
        { name: "Expresso Pistache Imperial", description: "Xícara banhada em ganache e farofa crocante de pistache, expresso finalizado com nuvem de chantilly e pistache tostado por cima.", price: "R$ 26,00" },
        { name: "Cappuccino Clássico", description: "Expresso com leite vaporizado, finalizado com ganache de chocolate e canela em pó.", price: "R$ 16,90" },
      ]
  },
  {
      name: "CAFÉS GELADOS",
      description: "ADICIONAIS: Deixe seu pedido ainda mais gostoso. Chantilly R$ 5,00",
      items: [
          { name: "Café Bombom Gelado", description: "Camada de leite condensado, gelo, leite batido e uma dose de expresso por cima.", price: "R$ 16,00" },
          { name: "Affogato Oliva", description: "Uma bola generosa de sorvete de baunilha, com uma dose de expresso quente despejada por cima na hora, finalizada com farofa de pistache.", price: "R$ 22,00" },
          { name: "Ice Pistache", description: "Ganache de pistache nas paredes do copo, gelo, leite batido e expresso. Finalizado com chantilly e farofa de pistache.", price: "R$ 26,00" },
      ]
  },
  {
      name: "CHOCOLATES QUENTES",
      items: [
          { name: "Chocolate Quente Tradicional", description: "Leite vaporizado, cacau em pó 50%, toque de açúcar e canela.", price: "R$ 15,90" },
          { name: "Chocolate Suíço Cremoso", description: "Leite vaporizado, chocolate em pó 50% e um toque de amido para dar cremosidade.", price: "R$ 20,00" },
      ]
  },
  {
    name: "BEBIDAS & SODAS",
    items: [
      { name: "Soda Espanhola", description: "Maçã Verde, Framboesa, Limão Siciliano ou Pera.", price: "R$ 16,90" },
      { name: "Suco de laranja", price: "R$ 12,90" },
      { name: "Suco de abacaxi", price: "R$ 12,90" },
      { name: "Suco de morango com leite Ninho", description: "Ultra cremoso e batido na hora.", price: "R$ 18,00" },
      { name: "Suco de frutas vermelhas", description: "Natural (Morango, mirtilo e amora).", price: "R$ 18,00" },
      { name: "Água com ou sem gás", price: "R$ 6,00" },
      { name: "Refrigerante", price: "R$ 8,00" },
      { name: "Schweppes", price: "R$ 9,00" },
    ],
  },
  {
    name: "COQUETELARIA",
    items: [
      { name: "Sangria Oliva (300ml)", description: "Vinho tinto suave, mix de frutas e um toque de licor de laranja.", price: "R$ 31,00" },
      { name: "Oliva Sunset Gym", description: "Nossa criação exclusiva: gin premium combinado com o frescor do suco de laranja, toque aromático de licor de laranja, finalizado com dulçor e a cor intensa do Monin de framboesa.", price: "R$ 34,00" },
      { name: "Carajillo 43", description: "Licor 43 e café expresso premium batidos com gelo e monin de pera. Aveludado e icônico.", price: "R$39,00" },
    ],
  },
];

const iconMap: { [key: string]: React.ElementType } = {
    "MONTADITOS (No Pão de Coca Espanhol)": Sandwich,
    "COMBOS": GraduationCap,
    "SOBREMESAS & CROISSANTS DOCES": Cake,
    "TORRONES ARTESANAIS (Receita Original Espanhola)": Gift,
    "EXPRESSOS": Coffee,
    "LATTE": Coffee,
    "ESPECIAIS DO CAFÉ": Sparkles,
    "CAFÉS GELADOS": Coffee,
    "CHOCOLATES QUENTES": Coffee,
    "ADICIONAIS": Sparkles,
    "BEBIDAS & SODAS": CupSoda,
    "COQUETELARIA": Wine,
};

const textOnlyCategories = [
    "EXPRESSOS", 
    "LATTE", 
    "ESPECIAIS DO CAFÉ",
    "CAFÉS GELADOS",
    "CHOCOLATES QUENTES",
    "ADICIONAIS",
    "BEBIDAS & SODAS", 
    "COQUETELARIA",
];

const themes = ["default", "sutil", "dinamico", "neon"];

export default function MenuSection({ variant = 'full' }: { variant?: 'full' | 'summary' }) {
    const isSummary = variant === 'summary';
    const summaryItems = menuCategories
      .flatMap(category => category.items)
      .filter(item => item.imageUrl)
      .slice(0, 6);

    const [isHappyHour, setIsHappyHour] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(0);

    const cycleTheme = () => {
        setCurrentTheme((prevTheme) => (prevTheme + 1) % themes.length);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 't' || event.key === 'T') {
                cycleTheme();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const checkHappyHour = () => {
            const now = new Date();
            const currentHour = now.getHours();
            // Horário de Happy Hour: 18h às 20h
            if (currentHour >= 18 && currentHour < 20) {
                setIsHappyHour(true);
            } else {
                setIsHappyHour(false);
            }
        };

        checkHappyHour();
        const interval = setInterval(checkHappyHour, 60000); 

        return () => clearInterval(interval);
    }, []);

    const calculateDiscountedPrice = (priceStr: string) => {
        if (!priceStr) return priceStr;
        const numericPrice = parseFloat(priceStr.replace("R$ ", "").replace(",", "."));
        if (isNaN(numericPrice)) return priceStr;
        const discountedPrice = numericPrice * 0.9;
        return `R$ ${discountedPrice.toFixed(2).replace(".", ",")}`;
    };

    let secretMenuCategory = null;
    if (isHappyHour) {
        const m05 = menuCategories.find(c => c.name.includes("MONTADITOS"))?.items.find(i => i.name.startsWith("M05"));
        const m11 = menuCategories.find(c => c.name.includes("MONTADITOS"))?.items.find(i => i.name.startsWith("M11"));

        const discountedM05 = m05 ? {
            ...m05,
            originalPrice: m05.price,
            price: calculateDiscountedPrice(m05.price)
        } : null;

        const discountedM11 = m11 ? {
            ...m11,
            originalPrice: m11.price,
            price: calculateDiscountedPrice(m11.price)
        } : null;

        secretMenuCategory = {
            name: "Happy Hour",
            description: "Disponível apenas das 18h às 20h. Aproveite!",
            items: [
                { name: "50% OFF em Qualquer Chopp", description: "Válido para todos os chopes da casa durante o Happy Hour.", price: "", imageUrl: "https://64.media.tumblr.com/f0d702bcd612fa3f15e578b5bdb66828/390288e792d93a39-e9/s2048x3072/5937c5f7a5fb59c7f1a038b5cb2ca9aeccb92121.jpg" },
                ...([discountedM05, discountedM11].filter(Boolean) as any)
            ]
        };
    }
    
    const HappyHourAccordionItem = secretMenuCategory && (
        <AccordionItem 
            value={secretMenuCategory.name} 
            key={secretMenuCategory.name} 
            className={cn("border-b-0 rounded-lg bg-card shadow-lg transition-all", {
                '[data-theme="sutil"] &,[data-theme="neon"] &': 'border-2 border-accent shadow-[0_0_15px_-3px_hsl(var(--accent))]',
                '[data-theme="dinamico"] &': 'transform-gpu transition-transform will-change-transform hover:scale-[1.02]',
            })}
        >
            <AccordionTrigger className="p-4 hover:no-underline rounded-lg">
                <div className="flex items-center gap-4 text-left">
                    <Sparkles className="h-6 w-6 text-accent flex-shrink-0" />
                    <div>
                        <h3 className="text-lg font-headline text-accent">{secretMenuCategory.name}</h3>
                        {secretMenuCategory.description && <p className="text-sm text-muted-foreground font-normal mt-1">{secretMenuCategory.description}</p>}
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
                <div className={cn("pt-4 border-t", {
                    '[data-theme="sutil"] &': 'border-accent/50',
                    '[data-theme="neon"] &': 'border-accent',
                })}>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {(secretMenuCategory.items as any[]).map((item: any, index: number) => (
                    <div key={item.name} className={cn("bg-background rounded-lg shadow-sm overflow-hidden flex flex-col transition-all duration-300", {
                        '[data-theme="dinamico"] &': 'opacity-0 animate-in fade-in slide-in-from-bottom-5',
                        '[data-theme="sutil"] &': 'opacity-0 animate-in fade-in',
                    })} style={{ animationDelay: `${index * 100}ms` }}>
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
                                <Wine className="h-16 w-16 text-muted-foreground/50" />
                            </div>
                        )}
                        <div className="p-4 flex flex-col flex-grow">
                            <div className="flex-grow">
                                <p className="text-foreground font-semibold text-lg">{item.name}</p>
                                {item.description && (
                                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                )}
                            </div>
                            <div className="flex justify-end items-center mt-4">
                                {item.originalPrice ? (
                                    <div className="text-right">
                                        <p className="font-bold text-lg text-primary">{item.price}</p>
                                        <p className="text-sm text-muted-foreground line-through">{item.originalPrice}</p>
                                    </div>
                                ) : (
                                    <p className="font-bold text-xl text-primary">{item.price}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );

    return (
        <section 
            id="cardapio" 
            data-theme={themes[currentTheme]}
            className={cn(
                "w-full transition-colors duration-500",
                isSummary ? "bg-background py-20 md:py-32" : "bg-secondary pt-12 pb-20 md:pb-32",
                {
                  '[&_[data-theme="neon"]]:bg-gray-950': themes[currentTheme] === 'neon'
                }
            )}
        >
            <div className="w-full max-w-6xl mx-auto px-4">
                <header className="text-center mb-12">
                    <p className={cn("text-sm font-bold uppercase tracking-wider text-primary transition-all", {
                        '[data-theme="sutil"] &,[data-theme="neon"] &': 'text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]',
                    })}>
                        Cardápio
                    </p>
                    <h2 className={cn("mt-2 font-headline text-4xl font-bold text-foreground md:text-5xl transition-all", {
                       '[data-theme="sutil"] &,[data-theme="neon"] &': 'text-primary-foreground drop-shadow-[0_0_10px_hsl(var(--primary))]',
                       '[data-theme="neon"] &': 'animate-pulse'
                    })}>
                        Nossas Delícias
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        Explore nossas delícias artesanais, dos montaditos clássicos às sobremesas divinas.
                    </p>
                </header>

                <p className="text-center text-xs text-primary/70 -mt-8 mb-8 italic">Imagens meramente ilustrativas</p>

                {isSummary ? (
                    <>
                        {isHappyHour && secretMenuCategory && (
                             <Accordion type="single" collapsible defaultValue="Happy Hour" className="w-full space-y-4 mb-12">
                                {HappyHourAccordionItem}
                             </Accordion>
                        )}
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
                <>
                <Accordion type="multiple" className="w-full space-y-4">
                    {secretMenuCategory && HappyHourAccordionItem}

                    {menuCategories.map((category) => {
                        const Icon = iconMap[category.name] || Sandwich;
                        const isTextOnly = textOnlyCategories.includes(category.name);
                        return (
                        <AccordionItem 
                            value={category.name} 
                            key={category.name} 
                            className={cn("border-b-0 rounded-lg bg-card shadow-sm transition-all", {
                                '[data-theme="sutil"] &,[data-theme="neon"] &': 'hover:border-accent/50 hover:shadow-[0_0_15px_-5px_hsl(var(--accent))]',
                                '[data-theme="dinamico"] &': 'transform-gpu transition-transform will-change-transform hover:scale-[1.01]',
                            })}
                        >
                            <AccordionTrigger className="p-4 hover:no-underline rounded-lg">
                                <div className="flex items-center gap-4 text-left">
                                    <Icon className={cn("h-6 w-6 text-primary flex-shrink-0 transition-colors", {
                                        '[data-theme="dinamico"] &': 'group-hover:animate-bounce',
                                    })} />
                                    <div>
                                        <h3 className="text-lg font-headline text-foreground">{category.name}</h3>
                                        {category.description && <p className="text-sm text-muted-foreground font-normal mt-1">{category.description}</p>}
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 pt-0">
                                <div className={cn("pt-4 border-t", {
                                    '[data-theme="sutil"] &': 'border-accent/30',
                                    '[data-theme="neon"] &': 'border-accent/70',
                                })}>
                                {isTextOnly ? (
                                    <div className="space-y-6">
                                        {category.items.map((item, index) => (
                                            <div key={item.name} className={cn("flex justify-between items-start", {
                                                '[data-theme="dinamico"] &': 'opacity-0 animate-in fade-in slide-in-from-left-4',
                                                '[data-theme="sutil"] &': 'opacity-0 animate-in fade-in',
                                            })} style={{ animationDelay: `${index * 75}ms` }}>
                                                <div>
                                                    <p className="text-foreground font-semibold text-lg">{item.name}</p>
                                                    {item.description && (
                                                        <p className="text-sm text-muted-foreground mt-1 max-w-md">{item.description}</p>
                                                    )}
                                                </div>
                                                <p className="font-bold text-lg text-primary text-right pl-4 shrink-0">{item.price}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {category.items.map((item, index) => (
                                        <div key={item.name} className={cn("bg-background rounded-lg shadow-sm overflow-hidden flex flex-col transition-all duration-300", {
                                            '[data-theme="dinamico"] &': 'opacity-0 animate-in fade-in slide-in-from-bottom-5',
                                            '[data-theme="sutil"] &': 'opacity-0 animate-in fade-in',
                                        })} style={{ animationDelay: `${index * 100}ms` }}>
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
                                )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        );
                    })}
                </Accordion>
                {!isSummary && <div className="fixed bottom-6 left-6 z-50">
                    <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full shadow-lg backdrop-blur-sm bg-background/50"
                        onClick={cycleTheme}
                        aria-label="Mudar tema do menu"
                    >
                        <Palette className="h-5 w-5" />
                    </Button>
                </div>}
                </>
                )}
            </div>
        </section>
    );
}
