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
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/accordion";
import {
    Sandwich,
    Wine,
    Gift,
    Cake,
    CupSoda,
    Coffee,
    GraduationCap,
    IceCream2,
    Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const menuCategories = [
  {
    name: "ALMOÇO",
    description: "Servido de Segunda a Sábado. A combinação perfeita para o seu meio-dia.",
    items: [
      {
        name: "Filé à Parmegiana (Frango ou Mignon)",
        description: "Clássico empanado e gratinado com muçarela derretida e nosso molho de tomate artesanal. Acompanha arroz branco soltinho e batatas chips artesanais crocantes. Inclui uma refrescante salada especial de entrada.",
        price: "Frango: 39,90 | Mignon: 69,90",
        imageUrl: "https://64.media.tumblr.com/a8af1961fee3050928960b91efeb21e3/c0372c031ba3dd4f-36/s2048x3072/ce7ecf84949535cf7cad5e7013317b67d7cc831b.jpg"
      },
      {
        name: "Strogonoff de Frango Premium",
        description: "Clássico e irresistível! Pedaços macios de peito de frango envoltos em um molho super cremoso e perfeitamente temperado. Acompanha arroz branco bem soltinho e crocantes batatas chips douradas na medida certa. Para completar, uma refrescante salada da casa.",
        price: "39,90 (+ 20,00 se for de Mignon)",
        imageUrl: "https://64.media.tumblr.com/f4f9ca90a9dcb9455244efe870e37e2f/fce141541680375c-36/s1280x1920/5dd818c0d3be583b15c51390f56c2f91ddbe88ae.jpg"
      },
      {
        name: "Penne (Molho Branco ou Ao Sugo)",
        description: "Massa penne servida com sua escolha de molho: branco cremoso ou ao sugo artesanal. Acompanha nossa salada especial da casa.",
        price: "29,90",
      },
      {
        name: "Adicionais para Penne",
        description: "Adicione uma proteína grelhada para completar sua massa. Frango: +10,00 | Mignon: +30,00",
        price: "Ver descrição",
      }
    ]
  },
  {
    name: "MONTADITOS (No Pan de Coca Espanhol)",
    description: "Base: Emulsão de tomate, alho e azeite. Dica: Troque o Pan de Coca por Croissant Amanteigado por + R$7,50.",
    items: [
      { 
        name: "M01. El Clásico", 
        description: "A essência da culinária espanhola em cada mordida. Nosso Pan de Coca artesanal, tostado na medida certa, abraça uma emulsão vibrante de tomate fresco, alho confitado e azeite extra virgem, coroado por uma generosa camada de muçarela derretida e orégano aromático.", 
        price: "14,00", 
        imageUrl: "https://64.media.tumblr.com/5d1bcf7ceba0e04ed8ce2e2412a3c4da/0729a521a5d6cff4-01/s2048x3072/11c42de505012a851baefc2ba66ad487dc7d3134.jpg" 
      },
      { 
        name: "M02. Salame & Cherry", 
        description: "O sabor intenso do salame italiano encontra o frescor do tomate cereja e a cremosidade da maionese de alho caseira, tudo envolto em muçarela derretida sobre nosso Pan de Coca artesanal.", 
        price: "25,00", 
        imageUrl: "https://64.media.tumblr.com/c438395e5096bd86e4c1fa290d489651/0729a521a5d6cff4-6b/s2048x3072/9b6910ba0895e79ed1954503aef0992c0b003e4b.jpg" 
      },
      { 
        name: "M03. Jamón Serrano Supremo", 
        description: "Uma viagem à Espanha: o autêntente presunto cru serrano harmonizado com muçarela de búfala fresca, rúcula crocante e o toque especial de pimentões marinados no azeite de oliva.", 
        price: "36,90", 
        imageUrl: "https://64.media.tumblr.com/7fcab6e70efc0fce1fa7a286d2b2b316/0729a521a5d6cff4-cb/s2048x3072/bd1a81a520067e76c288a701d8889d820dd2ec19.jpg" 
      },
      { 
        name: "M04. Germânico-Ibérico", 
        description: "A união perfeita de tradições. Nossa salsicha artesanal premium é acompanhada pelo clássico Vinagrete do William e um toque generoso de maionese de alho no Pan de Coca crocante.", 
        price: "24,00", 
        imageUrl: "https://64.media.tumblr.com/80862ce7c59ba9297564ba9c92271ccc/0729a521a5d6cff4-1a/s2048x3072/a63b54494b40a8beac1c6dd677a9fbfa3ec3a86a.jpg" 
      },
      { 
        name: "M05. Peito de Peru Light", 
        description: "Leveza e frescor em perfeita harmonia. Finas fatias de peito de peru, muçarela de búfala derretida, tomate fresco e alface crocante, finalizados com nossa maionese de alho especial.", 
        price: "24,90", 
        imageUrl: "https://64.media.tumblr.com/acb78441e2b45ff3bb2ee86766693d57/0729a521a5d6cff4-ad/s2048x3072/5d7e4371e74beb499fc222df02db822b708f4265.jpg" 
      },
      { 
        name: "M06. Frango Cremoso Melt", 
        description: "Frango em tiras grelhado na hora suculento, envolvido em um creme de queijo apimentado com chilli, com cobertura de muçarela derretida e o contraste crocante da batata palha sobre o Pan de Coca artesanal.", 
        price: "22,90", 
        imageUrl: "https://64.media.tumblr.com/5bca88fd3ae950b2a16db082dcf707ef/60a8116118a48c16-50/s2048x3072/7041b887ac6a1325a5bebb8fdc3585be10714ed5.pnj" 
      },
      { 
        name: "M07. Frango Iscas Gourmet", 
        description: "Iscas de frango grelhadas na hora, muçarela derretida e tomates cereja suculentos, tudo realçado pelo sabor único da nossa maionese de alho artesanal no Pan de Coca.", 
        price: "22,00", 
        imageUrl: "https://64.media.tumblr.com/1780edbad6756f637032ef2521f195af/7674f98079392f13-26/s2048x3072/6032e340b7e2fa34f787f6100785cf7da117d21a.jpg" 
      },
      { 
        name: "M08. Mignon Gruyère", 
        description: "O ápice do sabor: tiras suculentas de mignon grelhado, a sofisticação do queijo Gruyère derretido e a doçura da cebola caramelizada artesanal no nosso Pan de Coca crocante.", 
        price: "38,90", 
        imageUrl: "https://64.media.tumblr.com/9e260afe66273c0a6158761992ceb67d/0729a521a5d6cff4-2b/s2048x3072/2bb44eb1a215e7d3eb24b197bf77581526abaf24.jpg" 
      },
      { 
        name: "M09. Pastrami Oliva", 
        description: "Pastrami de alta qualidade, queijo derretido, o toque refrescante do Vinagrete do William e a cremosidade do nosso creme de queijo exclusivo.", 
        price: "36,90", 
        imageUrl: "https://64.media.tumblr.com/fb5479c4df91056aa58fb94de08f5ab9/c86b546fc7a1ad02-d0/s2048x3072/e0735eb06afe83a0512493e7c3e4a01bd5ed261b.jpg" 
      },
      { 
        name: "M10. Caprese", 
        description: "A leveza de um clássico: Pan de Coca artesanal, muçarela de búfala fresca e tomates tostados no azeite de oliva extra virgem.", 
        price: "24,00", 
        imageUrl: "https://64.media.tumblr.com/ba5f86c600e449dafba0667c2c2d1070/93565b85b6fa09f9-2f/s2048x3072/3f3eb87c1b18f6ad44bff3c0f59c4b90eb32b5db.jpg"
      },
      { 
        name: "M11. Clássico Madrileño", 
        description: "A tradição das ruas de Madri em Curitiba. Presunto cozido especial e muçarela derretida sobre tomate ralado fresco, alho e azeite de oliva no Pan de Coca artesanal crocante.", 
        price: "15,90", 
        imageUrl: "https://64.media.tumblr.com/41f9c00fe2df78e627106ecdd5981753/7674f98079392f13-9f/s2048x3072/a14f089ed5f234a683d5eaf62db4bd4732c3ef7f.jpg" 
      },
      { 
        name: "M12. Montadito Entrecot", 
        description: "Pão de coca, queijo muçarela, tiras de entrecot suculentas, vinagrete artesanal, chimichurri, maionese de alho e molho de tomate e alho.", 
        price: "35,90", 
        imageUrl: "https://64.media.tumblr.com/a4330071a86ebeee091a1370c742cdd3/9891cbcf8be8e474-e3/s2048x3072/3797d7dc4a26dbbee1a480588598a9d567ba3933.jpg" 
      },
    ],
  },
  {
    name: "SOBREMESAS & MONTADITOS DOCES",
    description: "Nossos doces irresistíveis, agora servidos no autêntico Pan de Coca Espanhol.",
    items: [
        { name: "Torta Basca de San Sebastián", description: "A autêntica cheesecake espanhola, cremosa por dentro e tostada por fora.", price: "29,00 (a fatia)", imageUrl: "https://64.media.tumblr.com/95f517167d957247e9f30c53696aff10/ceb08f5edd305fa6-c1/s2048x3072/0ee3f770fd647672b4ec8d01b749ab44dcc7c69e.jpg" },
        { name: "Bolo Matilda", description: "Direto de um clássico: chocolate nobre, brilho intenso e muita cremosidade.", price: "22,00 (a fatia)", imageUrl: "https://64.media.tumblr.com/f4a8e4a014dc6412f75a640dc7b101e9/3a06fb4d61c7f58f-d2/s2048x3072/e683ca0ca8be44cac2caf34aeb5244cac3884e2d.jpg" },
        { name: "Sensação Berry", description: "Doce de leite artesanal, calda de amoras e creme aveludado de leite ninho.", price: "23,90 (a fatia)", imageUrl: "https://64.media.tumblr.com/57c9ab311429fc6fb627881fb2f549e7/0695e7378c4b0476-ef/s2048x3072/0f25addf91e9a9f731ab0377007a0259a5cb876d.jpg" },
        { name: "Torta de Santiago", description: "Autêntica torta espanhola feita com farinha de amêndoas.", price: "17,90", imageUrl: "https://64.media.tumblr.com/d013b086e25020c5941ca4272ed18824/5a7c7989b503dee1-04/s2048x3072/8869b3d6769950d53a9cca7f6c4d5913d2ea8bb1.jpg" },
        { name: "El Montadito de Banoffi", description: "Doce de leite, banana prata, creme secreto e canela.", price: "19,90", imageUrl: "https://64.media.tumblr.com/c8dbfa862418350af0787d23f5644ca6/f6b720196de6fc4b-78/s2048x3072/47a3bac788ca6ca47f5f16b97d0109c04dc2db02.jpg" },
        { name: "Montadito Pistache Real", description: "No Pan de Coca. Recheio de ganache de pistache.", price: "39,00", imageUrl: "https://64.media.tumblr.com/0add055745496740cdac0ee959142a72/0729a521a5d6cff4-03/s2048x3072/11612a18f1c46df12f7d3274d3fedb0200c84372.jpg" },
        { name: "Montadito Nutella com Morangos", description: "No Pan de Coca. Nutella original e morangos frescos.", price: "38,90", imageUrl: "https://64.media.tumblr.com/6c066210786fb0fe39f2cfa601994f94/3ff45e09a0c7dd34-ae/s2048x3072/7eed66c605a1a87e48ea908cfb53af3cfcc16037.jpg" },
        { name: "Montadito Chocolate Blend", description: "No Pan de Coca. Chocolate ao leite premium.", price: "31,00", imageUrl: "https://64.media.tumblr.com/32d746d8e9cd9113ed6811ac3e7b91e2/0729a521a5d6cff4-e9/s2048x3072/8d98fc0f020c1d091ae10db68fda56c69d7ce1cc.jpg" },
        { name: "Montadito Doce de Leite com Nozes", description: "No Pan de Coca. Doce de leite artesanal com nozes crocantes.", price: "26,00", imageUrl: "https://64.media.tumblr.com/637e23898d6edb025a548a8a7ba8a92d/0729a521a5d6cff4-24/s2048x3072/c644047e9495bdbbf9b225e4dfa1df70b4a664ac.jpg" },
    ],
  },
  {
    name: "TORRONES ARTESANAIS (Receita Original Espanhola)",
    description: "Receita original espanhola feita com mel e amêndoas torradas.",
    items: [
      { name: "Tamanho P", price: "9,90", imageUrl: "https://64.media.tumblr.com/d41f05c45254f28886f93a71091c6bc1/0168b23b368f7428-a9/s2048x3072/c78762ee05bfbdc4f68e1ab0e1a6dcef42c11278.jpg" },
      { name: "Tamanho M", price: "29,90", imageUrl: "https://64.media.tumblr.com/867c6bd334f88f4e0ef6bf933ab8b83e/0168b23b368f7428-b1/s2048x3072/260534cb4553e67025ea7b685937d3689599250e.jpg" },
      { name: "Tamanho G", price: "35,90", imageUrl: "https://64.media.tumblr.com/636821a5e7b8a228cab20985955dc91/0168b23b368f7428-e5/s1280x1920/667ad64a566ff175a9fde6f31930c41c281d1e7b.jpg" },
    ],
  },
  {
    name: "COMBOS",
    items: [
      {
        name: 'Combo do Estudante (O "Clássico da Tarde")',
        description: "Montadito M11 + Batata Chips + Refrigerante (lata) ou Suco de Laranja.",
        price: "27,00",
        imageUrl: "https://64.media.tumblr.com/122bb499e0d332197eb0fc8b7fbcb01e/ef8bd0d492ebf856-a7/s2048x3072/9926e92285eca69d42d5ce6b3104778b25ffbf57.jpg"
      },
      {
        name: "Combo Refresh (Refrescância de Madrid)",
        description: "Montadito M05 + Soda Monin Batida.",
        price: "35,00",
        imageUrl: "https://64.media.tumblr.com/55b653be62959a66e2c6af8fcf1700c5/53f8a4be3e21104f-24/s2048x3072/a36cbb662cb027dc8e3555109de063d564b90c5f.jpg"
      }
    ]
  },
  {
    name: "SORVETES ARTESANAIS (PRODUÇÃO PRÓPRIA)",
    description: "Textura ultra cremosa aqui na Oliva.",
    items: [
      { name: "Baunilha Bourbon", price: "18,00" },
      { name: "Morango com Nutella", price: "24,00" },
      { name: "Pistache Premium", price: "28,00" },
    ],
  },
  {
    name: "EXPRESSOS",
    description: "Café gourmet moído na hora com aroma frutado.",
    items: [
      { name: "Expresso", price: "8,00" },
      { name: "Ristreto", price: "8,00" },
      { name: "Coado", price: "9,90" },
    ],
  },
  {
    name: "LATTE",
    description: "Cafés com leite vaporizado.",
    items: [
      { name: "Caffè Latte Clássico", price: "12,90" },
      { name: "Vanilla Latte", price: "16,00" },
      { name: "Macchiato tradicional", price: "9,90" },
      { name: "Caramel Macchiato", price: "12,90" },
    ],
  },
  {
      name: "ESPECIAIS DO CAFÉ",
      items: [
        { name: "Expresso Pistache Imperial", price: "26,00" },
        { name: "Cappuccino Clássico", price: "16,90" },
      ]
  },
  {
      name: "CAFÉS GELADOS",
      items: [
          { name: "Café Bombom Gelado", price: "16,00" },
          { name: "Affogato Oliva", price: "22,00" },
          { name: "Ice Pistache", price: "26,00" },
      ]
  },
  {
      name: "CHOCOLATES QUENTES",
      items: [
          { name: "Chocolate Quente Tradicional", price: "15,90" },
          { name: "Chocolate Suíço Cremoso", price: "20,00" },
      ]
  },
  {
    name: "BEBIDAS & SODAS",
    items: [
      { name: "Soda Espanhola", price: "16,90" },
      { name: "Suco de laranja", price: "12,90" },
      { name: "Suco de abacaxi", price: "12,90" },
      { name: "Suco de morango com leite Ninho", price: "18,00" },
      { name: "Suco de frutas vermelhas", price: "18,00" },
      { name: "Água com ou sem gás", price: "6,00" },
      { name: "Refrigerante", price: "8,00" },
      { name: "Heineken (330ml)", price: "18,90" },
    ],
  },
  {
    name: "COQUETELARIA",
    items: [
      { name: "Taça de vinho", price: "29,90" },
      { name: "Sangria Oliva (300ml)", price: "31,00" },
      { name: "Jarra de Sangria", price: "99,00" },
      { name: "Oliva Sunset Gym", price: "34,00" },
      { name: "Carajillo 43", price: "39,00" },
    ],
  },
];

const iconMap: { [key: string]: React.ElementType } = {
    "ALMOÇO": Sun,
    "MONTADITOS (No Pan de Coca Espanhol)": Sandwich,
    "SOBREMESAS & MONTADITOS DOCES": Cake,
    "TORRONES ARTESANAIS (Receita Original Espanhola)": Gift,
    "COMBOS": GraduationCap,
    "SORVETES ARTESANAIS (PRODUÇÃO PRÓPRIA)": IceCream2,
    "EXPRESSOS": Coffee,
    "LATTE": Coffee,
    "ESPECIAIS DO CAFÉ": Coffee,
    "CAFÉS GELADOS": Coffee,
    "CHOCOLATES QUENTES": Coffee,
    "BEBIDAS & SODAS": CupSoda,
    "COQUETELARIA": Wine,
};

const textOnlyCategories = [
    "SORVETES ARTESANAIS (PRODUÇÃO PRÓPRIA)",
    "EXPRESSOS", 
    "LATTE", 
    "ESPECIAIS DO CAFÉ",
    "CAFÉS GELADOS",
    "CHOCOLATES QUENTES",
    "BEBIDAS & SODAS", 
    "COQUETELARIA",
];

export default function MenuSection({ variant = 'full' }: { variant?: 'full' | 'summary' }) {
    const isSummary = variant === 'summary';
    
    const featuredNames = [
        "Filé à Parmegiana (Frango ou Mignon)",
        "Strogonoff de Frango Premium",
        "M01. El Clásico",
        "M03. Jamón Serrano Supremo",
        "M06. Frango Cremoso Melt",
        "M08. Mignon Gruyère",
        "Torta Basca de San Sebastián",
        "Bolo Matilda"
    ];

    const summaryItems = isSummary 
      ? menuCategories
          .flatMap(category => category.items)
          .filter(item => featuredNames.includes(item.name))
          .sort((a, b) => featuredNames.indexOf(a.name) - featuredNames.indexOf(b.name))
      : [];

    return (
        <section 
            id="cardapio"
            className={cn(
                "w-full",
                isSummary ? "bg-background py-20 md:py-32" : "bg-secondary pt-12 pb-20 md:pb-32"
            )}
        >
            <div className="w-full max-w-6xl mx-auto px-4">
                <header className="text-center mb-12">
                    <p className="text-sm font-bold uppercase tracking-wider text-primary">
                        {isSummary ? "Destaques da Casa" : "Cardápio"}
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-2">
                        <span className="text-3xl md:text-5xl">🇪🇸</span>
                        <h2 className="font-headline text-4xl font-bold text-foreground md:text-5xl">
                            {isSummary ? "Nossas Delícias Favoritas" : "Experiência Gastronômica"}
                        </h2>
                        <span className="text-3xl md:text-5xl">🇧🇷</span>
                    </div>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        {isSummary 
                          ? "Experimente os pratos mais amados pelos nossos clientes."
                          : "Explore nossas delícias artesanais, do almoço especial aos montaditos clássicos."}
                    </p>
                </header>

                <p className="text-center text-xs text-primary/70 -mt-8 mb-8 italic">Imagens meramente ilustrativas</p>

                {isSummary ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {summaryItems.map((item) => (
                                <div key={item.name} className="bg-card rounded-lg shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md animate-in fade-in slide-in-from-bottom-4">
                                    {item.imageUrl && (
                                        <Dialog>
                                        <DialogTrigger asChild>
                                            <div className="relative h-48 w-full cursor-pointer overflow-hidden">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-500 hover:scale-110"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
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
                                    )}
                                    <div className="p-4 flex flex-col flex-grow">
                                        <div className="flex-grow">
                                            <p className="text-foreground font-semibold text-base leading-tight">{item.name}</p>
                                        </div>
                                        <div className="flex justify-between items-center mt-3">
                                            <p className="font-bold text-lg text-primary">{item.price}</p>
                                        </div>
                                    </div>
                                </div>
                              ))}
                        </div>
                        <div className="text-center">
                            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 animate-pulse-slow">
                                <Link href="/menu">Ver Cardápio Completo</Link>
                            </Button>
                        </div>
                    </>
                ) : (
                <>
                <Accordion type="multiple" className="w-full space-y-4">
                    {menuCategories.map((category) => {
                        const Icon = iconMap[category.name] || Sandwich;
                        const isTextOnly = textOnlyCategories.includes(category.name);
                        
                        return (
                        <AccordionItem 
                            value={category.name} 
                            key={category.name} 
                            className="border-b-0 rounded-lg bg-card shadow-sm transition-all overflow-hidden"
                        >
                            <AccordionTrigger className="p-4 hover:no-underline rounded-lg group">
                                <div className="flex items-center gap-4 text-left">
                                    <Icon className="h-6 w-6 text-primary flex-shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                                    <div>
                                        <h3 className="text-lg font-headline text-foreground transition-colors group-hover:text-primary">{category.name}</h3>
                                        {category.description && <p className="text-sm text-muted-foreground font-normal mt-1">{category.description}</p>}
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 pt-0">
                                <div className="pt-4 border-t">
                                {isTextOnly ? (
                                    <div className="space-y-6">
                                        {category.items.map((item, index) => (
                                            <div key={item.name} className="flex justify-between items-start animate-in fade-in slide-in-from-left-2 duration-300">
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
                                    {category.items.map((item, index) => {
                                        return (
                                            <div key={item.name} className="bg-background rounded-lg shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md animate-in fade-in zoom-in-95 duration-300">
                                                {item.imageUrl && (
                                                    <Dialog>
                                                    <DialogTrigger asChild>
                                                        <div className="relative h-56 w-full cursor-pointer overflow-hidden">
                                                        <Image
                                                            src={item.imageUrl}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover transition-transform duration-500 hover:scale-110"
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
                                        );
                                    })}
                                    </div>
                                )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        );
                    })}
                </Accordion>
                </>
                )}
            </div>
        </section>
    );
}