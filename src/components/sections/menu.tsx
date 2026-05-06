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
} from "@/components/ui/accordion";
import {
    Sandwich,
    Wine,
    Gift,
    Cake,
    CupSoda,
    Coffee,
    GraduationCap,
    IceCream2,
    UtensilsCrossed,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const menuCategories = [
  {
    name: "MONTADITOS (No Pan de Coca Espanhol)",
    description: "Base: Emulsão de tomate, alho e azeite. Dica: Troque o Pan de Coca por Croissant Amanteigado por + R$ 5,00.",
    items: [
      { 
        name: "M01. El Clásico", 
        description: "A essência da culinária espanhola em cada mordida. Nosso Pan de Coca artesanal, tostado na medida certa, abraça uma emulsão vibrante de tomate fresco, alho confitado e azeite extra virgem, coroado por uma generosa camada de muçarela derretida e orégano aromático.", 
        price: "R$ 14,00", 
        imageUrl: "https://64.media.tumblr.com/5d1bcf7ceba0e04ed8ce2e2412a3c4da/0729a521a5d6cff4-01/s2048x3072/11c42de505012a851baefc2ba66ad487dc7d3134.jpg" 
      },
      { 
        name: "M02. Salame & Cherry", 
        description: "O sabor intenso do salame italiano encontra o frescor do tomate cereja e a cremosidade da maionese de alho caseira, tudo envolto em muçarela derretida sobre nosso Pan de Coca artesanal.", 
        price: "R$ 25,00", 
        imageUrl: "https://64.media.tumblr.com/c438395e5096bd86e4c1fa290d489651/0729a521a5d6cff4-6b/s2048x3072/9b6910ba0895e79ed1954503aef0992c0b003e4b.jpg" 
      },
      { 
        name: "M03. Jamón Serrano Supremo", 
        description: "Uma viagem à Espanha: o autêntico presunto cru serrano harmonizado com muçarela de búfala fresca, rúcula crocante e o toque especial de pimentões marinados no azeite de oliva.", 
        price: "R$ 32,00", 
        imageUrl: "https://64.media.tumblr.com/7fcab6e70efc0fce1fa7a286d2b2b316/0729a521a5d6cff4-cb/s2048x3072/bd1a81a520067e76c288a701d8889d820dd2ec19.jpg" 
      },
      { 
        name: "M04. Germânico-Ibérico", 
        description: "A união perfeita de tradições. Nossa salsicha artesanal premium é acompanhada pelo clássico Vinagrete do William e um toque generoso de maionese de alho no Pan de Coca crocante.", 
        price: "R$ 24,00", 
        imageUrl: "https://64.media.tumblr.com/80862ce7c59ba9297564ba9c92271ccc/0729a521a5d6cff4-1a/s2048x3072/a63b54494b40a8beac1c6dd677a9fbfa3ec3a86a.jpg" 
      },
      { 
        name: "M05. Peito de Peru Light", 
        description: "Leveza e frescor em perfeita harmonia. Finas fatias de peito de peru, muçarela de búfala derretida, tomate fresco e alface crocante, finalizados com nossa maionese de alho especial.", 
        price: "R$ 24,90", 
        imageUrl: "https://64.media.tumblr.com/acb78441e2b45ff3bb2ee86766693d57/0729a521a5d6cff4-ad/s2048x3072/5d7e4371e74beb499fc222df02db822b708f4265.jpg" 
      },
      { 
        name: "M06. Frango Cremoso Melt", 
        description: "Frango em tiras grelhada na hora suculento envolvido em um creme de queijo irresistível, com cobertura de muçarela derretida e o contraste crocante da batata palha sobre o Pan de Coca artesanal.", 
        price: "R$ 22,90", 
        imageUrl: "https://64.media.tumblr.com/5bca88fd3ae950b2a16db082dcf707ef/60a8116118a48c16-50/s2048x3072/7041b887ac6a1325a5bebb8fdc3585be10714ed5.pnj" 
      },
      { 
        name: "M07. Frango Iscas Gourmet", 
        description: "Iscas de frango grelhadas na hora, muçarela derretida e tomates cereja suculentos, tudo realçado pelo sabor único da nossa maionese de alho artesanal no Pan de Coca.", 
        price: "R$ 22,00", 
        imageUrl: "https://64.media.tumblr.com/1780edbad6756f637032ef2521f195af/7674f98079392f13-26/s2048x3072/6032e340b7e2fa34f787f6100785cf7da117d21a.jpg" 
      },
      { 
        name: "M08. Mignon Gruyère", 
        description: "O ápice do sabor: tiras suculentas de mignon grelhado, a sofisticação do queijo Gruyère derretido e a doçura da cebola caramelizada artesanal no nosso Pan de Coca crocante.", 
        price: "R$ 38,90", 
        imageUrl: "https://64.media.tumblr.com/9e260afe66273c0a6158761992ceb67d/0729a521a5d6cff4-2b/s2048x3072/2bb44eb1a215e7d3eb24b197bf77581526abaf24.jpg" 
      },
      { 
        name: "M09. Pastrami Oliva", 
        description: "Pastrami defumado artesanal de alta qualidade, queijo derretido, o toque refrescante do Vinagrete do William e a cremosidade do nosso creme de queijo exclusivo.", 
        price: "R$ 32,00", 
        imageUrl: "https://64.media.tumblr.com/fb5479c4df91056aa58fb94de08f5ab9/c86b546fc7a1ad02-d0/s2048x3072/e0735eb06afe83a0512493e7c3e4a01bd5ed261b.jpg" 
      },
      { 
        name: "M10. Caprese", 
        description: "A leveza de um clássico: Pan de Coca artesanal, muçarela de búfala fresca e tomates tostados no azeite de oliva extra virgem.", 
        price: "R$ 24,00", 
        imageUrl: "https://64.media.tumblr.com/ba5f86c600e449dafba0667c2c2d1070/93565b85b6fa09f9-2f/s2048x3072/3f3eb87c1b18f6ad44bff3c0f59c4b90eb32b5db.jpg"
      },
      { 
        name: "M11. Clássico Madrileño", 
        description: "A tradição das ruas de Madri em Curitiba. Presunto cozido especial e muçarela derretida sobre tomate ralado fresco, alho e azeite de oliva no Pan de Coca artesanal crocante.", 
        price: "R$ 15,90", 
        imageUrl: "https://64.media.tumblr.com/41f9c00fe2df78e627106ecdd5981753/7674f98079392f13-9f/s2048x3072/a14f089ed5f234a683d5eaf62db4bd4732c3ef7f.jpg" 
      },
    ],
  },
  {
    name: "SOBREMESAS & MONTADITOS DOCES",
    description: "Nossos doces irresistíveis, agora servidos no autêntico Pan de Coca Espanhol.",
    items: [
        { name: "Torta Basca de San Sebastián", description: "A autêntica cheesecake espanhola, cremosa por dentro e tostada por fora. Disponível também inteira (sob encomenda): 15cm - R$ 159,00 | 17,5cm - R$ 199,00 | 20cm - R$ 239,00. Adicional de calda artesanal (frutas vermelhas, pistache e caramelo com flor de sal): + R$ 6,00. Adicional de sorvete artesanal da casa por bola (baunilha, pistache e morango): + R$ 10,00.", price: "R$ 29,00 (a fatia)", imageUrl: "https://64.media.tumblr.com/95f517167d957247e9f30c53696aff10/ceb08f5edd305fa6-c1/s2048x3072/0ee3f770fd647672b4ec8d01b749ab44dcc7c69e.jpg" },
        { name: "Bolo Matilda", description: "Direto de um clássico para sua mesa: chocolate nobre, brilho intenso e muita cremosidade. Disponível também inteiro (sob consulta). Adicional de calda extra de chocolate: R$ 5,00.", price: "R$ 22,00 (a fatia)", imageUrl: "https://64.media.tumblr.com/f4a8e4a014dc6412f75a640dc7b101e9/3a06fb4d61c7f58f-d2/s2048x3072/e683ca0ca8be44cac2caf34aeb5244cac3884e2d.jpg" },
        { name: "Sensação Berry", description: "Doce de leite artesanal, calda de amoras e creme aveludado de leite ninho.", price: "R$ 23,90 (a fatia)", imageUrl: "https://64.media.tumblr.com/57c9ab311429fc6fb627881fb2f549e7/0695e7378c4b0476-ef/s2048x3072/0f25addf91e9a9f731ab0377007a0259a5cb876d.jpg" },
        { name: "Torta de Santiago", description: "Autêntica torta espanhola feita com farinha de amêndoas.", price: "R$ 17,90", imageUrl: "https://64.media.tumblr.com/d013b086e25020c5941ca4272ed18824/5a7c7989b503dee1-04/s2048x3072/8869b3d6769950d53a9cca7f6c4d5913d2ea8bb1.jpg" },
        { name: "El Montadito de Banoffi", description: "Bolacha amanteigada, doce de leite artesanal, banana prata selecionadas, creme secreto da casa, calda de caramelo e uma pitada de canela.", price: "R$ 19,90", imageUrl: "https://64.media.tumblr.com/c8dbfa862418350af0787d23f5644ca6/f6b720196de6fc4b-78/s2048x3072/47a3bac788ca6ca47f5f16b97d0109c04dc2db02.jpg" },
        { name: "Montadito Pistache Real", description: "No Pan de Coca. Recheio de ganache de pistache.", price: "R$ 39,00", imageUrl: "https://64.media.tumblr.com/0add055745496740cdac0ee959142a72/0729a521a5d6cff4-03/s2048x3072/11612a18f1c46df12f7d3274d3fedb0200c84372.jpg" },
        { name: "Montadito Nutella com Morangos", description: "No Pan de Coca. Nutella original e morangos frescos.", price: "R$ 38,90", imageUrl: "https://64.media.tumblr.com/6c066210786fb0fe39f2cfa601994f94/3ff45e09a0c7dd34-ae/s2048x3072/7eed66c605a1a87e48ea908cfb53af3cfcc16037.jpg" },
        { name: "Montadito Chocolate Blend", description: "No Pan de Coca. Chocolate ao leite premium.", price: "R$ 31,00", imageUrl: "https://64.media.tumblr.com/32d746d8e9cd9113ed6811ac3e7b91e2/0729a521a5d6cff4-e9/s2048x3072/8d98fc0f020c1d091ae10db68fda56c69d7ce1cc.jpg" },
        { name: "Montadito Doce de Leite com Nozes", description: "No Pan de Coca. Doce de leite artesanal com nozes crocantes.", price: "R$ 26,00", imageUrl: "https://64.media.tumblr.com/637e23898d6edb025a548a8a7ba8a92d/0729a521a5d6cff4-24/s2048x3072/c644047e9495bdbbf9b225e4dfa1df70b4a664ac.jpg" },
    ],
  },
  {
    name: "TORRONES ARTESANAIS (Receita Original Espanhola)",
    description: "Receita original espanhola feita com mel e amêndoas torradas. Sabores: frutas vermelhas, pistache, nozes com limão siciliano ou chocolate 70%.",
    items: [
      { name: "Tamanho P", price: "R$ 9,90", imageUrl: "https://64.media.tumblr.com/d41f05c45254f28886f93a71091c6bc1/0168b23b368f7428-a9/s2048x3072/c78762ee05bfbdc4f68e1ab0e1a6dcef42c11278.jpg" },
      { name: "Tamanho M", price: "R$ 29,90", imageUrl: "https://64.media.tumblr.com/867c6bd334f88f4e0ef6bf933ab8b83e/0168b23b368f7428-b1/s1280x1920/1a62c6f28db8d57f39ff8c0840df7ff015ad0b30.jpg" },
      { name: "Tamanho G", price: "R$ 35,90", imageUrl: "https://64.media.tumblr.com/636821a5e7b8a228cab209859655dc91/0168b23b368f7428-e5/s1280x1920/667ad64a566ff175a9fde6f31930c41c281d1e7b.jpg" },
    ],
  },
  {
    name: "ESPECIAIS",
    description: "Pratos autênticos e porções para compartilhar.",
    items: [
      {
        name: "Tortilha de Batatas com Salada Especial",
        description: "A clássica tortilha espanhola (batata e ovos) servida com nossa salada especial da casa. Opcional: Adicione Mignon ou Jamón Serrano por + R$ 20,00.",
        price: "R$ 39,90",
      }
    ]
  },
  {
    name: "SORVETES ARTESANAIS (PRODUÇÃO PRÓPRIA)",
    description: "Textura ultra cremosa aqui na Oliva. Servido na taça com 1 bola de 120g. Dica da Chef: Peça uma bola de sorvete de Baunilha para acompanhar sua fatia de Torta Matilda quente!",
    items: [
      { name: "Baunilha Bourbon", description: "O clássico com favas naturais, perfeito para acompanhar nossas tortas.", price: "R$ 18,00" },
      { name: "Morango com Nutella", description: "Sorvete de morango natural com uma generosa camada de Nutella legítima por cima.", price: "R$ 24,00" },
      { name: "Pistache Premium", description: "Elaborado com pistaches selecionados para um sabor intenso.", price: "R$ 28,00" },
    ],
  },
  {
    name: "COMBOS",
    items: [
      {
        name: 'Combo do Estudante (O "Clássico da Tarde")',
        description: "Montadito M11 - Clássico Madrileño + Batata Chips + Refrigerante (lata) ou Suco de Laranja. Quer trocar o refrigerante pelo Suco de Morango com Ninho por apenas + R$ 8,00?",
        price: "R$ 27,00",
      },
      {
        name: "Combo Refresh (Refrescância de Madrid)",
        description: "Montadito M05: Madrid Fresh (Peru e Muçarela de Búfala no Pan de Coca crocante) + Soda Monin Batida (Sabor à escolha: Maçã Verde, Morango ou Framboesa).",
        price: "R$ 35,00",
      }
    ]
  },
  {
    name: "EXPRESSOS",
    description: "Café gourmet moído na hora com aroma frutado.",
    items: [
      { name: "Expresso", description: "Intenso e com crema aveludada.", price: "R$ 8,00" },
      { name: "Ristreto", price: "R$ 8,00" },
      { name: "Coado", price: "R$ 9,90" },
    ],
  },
  {
    name: "LATTE",
    description: "Expresso com leite vaporizado e uma fina camada de espuma.",
    items: [
      { name: "Caffè Latte Clássico", description: "Dose de expresso com leite vaporizado e uma fina camada de espuma.", price: "R$ 12,90" },
      { name: "Vanilla Latte", description: "Nosso latte clássico com um toque de extrato natural de baunilha.", price: "R$ 16,00" },
      { name: "Macchiato tradicional", description: "O clássico manchado com uma nuvem de leite vaporizado.", price: "R$ 9,90" },
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
      { name: "Monster", description: "473ml", price: "R$ 15,00" },
      { name: "Schweppes", price: "R$ 9,00" },
      { name: "Heineken (330ml)", price: "R$ 18,90" },
    ],
  },
  {
    name: "CHOPP",
    items: [
      { name: "Pilsen (300ml)", price: "R$ 12,00" },
      { name: "Pilsen (500ml)", price: "R$ 18,00" },
      { name: "APA (300ml)", price: "R$ 16,00" },
      { name: "APA (500ml)", price: "R$ 22,00" },
    ],
  },
  {
    name: "COQUETELARIA",
    items: [
      { name: "Taça de vinho (Tinto ou Branco)", price: "R$ 29,90" },
      { name: "Sangria Oliva (300ml)", description: "Vinho tinto suave, mix de frutas e um toque de licor de laranja.", price: "R$ 31,00" },
      { name: "Jarra de Sangria", description: "Nossa sangria especial em uma jarra de 1L, perfeita para compartilhar.", price: "R$ 99,00" },
      { name: "Oliva Sunset Gym", description: "Nossa criação exclusiva: gin premium combinado com o frescor do suco de laranja, toque aromático de licor de laranja, finalizado com dulçor e a cor intensa do Monin de framboesa.", price: "R$ 34,00" },
      { name: "Carajillo 43", description: "Licor 43 e café expresso premium batidos com gelo e monin de pera. Aveludado e icônico.", price: "R$39,00" },
      { name: "Jägermeister", description: "Licor Fino de Ervas (dose 50ml).", price: "R$ 35,00" },
      { name: "Jägerbomb", description: "Jägermeister (50ml) com Monster (473ml).", price: "R$ 55,00" },
    ],
  },
];

const iconMap: { [key: string]: React.ElementType } = {
    "ESPECIAIS": UtensilsCrossed,
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
    "CHOPP": Wine,
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
    "CHOPP",
    "COQUETELARIA",
    "COMBOS",
];

export default function MenuSection({ variant = 'full' }: { variant?: 'full' | 'summary' }) {
    const isSummary = variant === 'summary';
    const summaryItems = menuCategories
      .flatMap(category => category.items)
      .filter(item => item.imageUrl)
      .slice(0, 6);

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
                        Cardápio
                    </p>
                    <h2 className="mt-2 font-headline text-4xl font-bold text-foreground md:text-5xl">
                        Nossas Delícias
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        Explore nossas delícias artesanais, dos montaditos clássicos às sobremesas divinas.
                    </p>
                </header>

                <p className="text-center text-xs text-primary/70 -mt-8 mb-8 italic">Imagens meramente ilustrativas</p>

                {isSummary ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {summaryItems.map((item) => (
                                <div key={item.name} className="bg-card rounded-lg shadow-sm overflow-hidden flex flex-col">
                                    {item.imageUrl && (
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
                    {menuCategories.map((category) => {
                        const Icon = iconMap[category.name] || Sandwich;
                        const isTextOnly = textOnlyCategories.includes(category.name);
                        return (
                        <AccordionItem 
                            value={category.name} 
                            key={category.name} 
                            className="border-b-0 rounded-lg bg-card shadow-sm transition-all"
                        >
                            <AccordionTrigger className="p-4 hover:no-underline rounded-lg">
                                <div className="flex items-center gap-4 text-left">
                                    <Icon className="h-6 w-6 text-primary flex-shrink-0 transition-colors" />
                                    <div>
                                        <h3 className="text-lg font-headline text-foreground">{category.name}</h3>
                                        {category.description && <p className="text-sm text-muted-foreground font-normal mt-1">{category.description}</p>}
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 pt-0">
                                <div className="pt-4 border-t">
                                {isTextOnly ? (
                                    <div className="space-y-6">
                                        {category.items.map((item, index) => (
                                            <div key={item.name} className="flex justify-between items-start">
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
                                        <div key={item.name} className="bg-background rounded-lg shadow-sm overflow-hidden flex flex-col transition-all duration-300">
                                            {item.imageUrl && (
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
                </>
                )}
            </div>
        </section>
    );
}