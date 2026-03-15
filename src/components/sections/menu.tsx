import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const menuCategories = [
  {
    name: "MONTADITOS (No Pão de Coca Espanhol)",
    description: "Base: Emulsão de tomate, alho e azeite. Dica: Troque o pão por Croissant Amanteigado por + R$ 7,50.",
    items: [
      { name: "M01. El Clásico", description: "Muçarela derretida e orégano no pão artesanal.", price: "R$ 16,90", imageUrl: "https://64.media.tumblr.com/5d1bcf7ceba0e04ed8ce2e2412a3c4da/0729a521a5d6cff4-01/s2048x3072/11c42de505012a851baefc2ba66ad487dc7d3134.jpg" },
      { name: "M02. Salame & Cherry", description: "Salame italiano, tomate cereja, muçarela e maionese de alho.", price: "R$ 25,00", imageUrl: "https://64.media.tumblr.com/c438395e5096bd86e4c1fa290d489651/0729a521a5d6cff4-6b/s2048x3072/9b6910ba0895e79ed1954503aef0992c0b003e4b.jpg" },
      { name: "M03. Jamón Serrano Supremo", description: "Presunto cru espanhol, búfala, rúcula e pimentão no azeite.", price: "R$ 38,90", imageUrl: "https://64.media.tumblr.com/7fcab6e70efc0fce1fa7a286d2b2b316/0729a521a5d6cff4-cb/s2048x3072/bd1a81a520067e76c288a701d8889d820dd2ec19.jpg" },
      { name: "M04. Germânico-Ibérico", description: "Salsicha artesanal, Vinagrete do William e maionese de alho.", price: "R$ 28,90", imageUrl: "https://64.media.tumblr.com/80862ce7c59ba9297564ba9c92271ccc/0729a521a5d6cff4-1a/s2048x3072/a63b54494b40a8beac1c6dd677a9fbfa3ec3a86a.jpg" },
      { name: "M05. Peito de Peru Light", description: "Peito de peru, búfala, tomate, alface e maionese de alho.", price: "R$ 26,90", imageUrl: "https://64.media.tumblr.com/acb78441e2b45ff3bb2ee86766693d57/0729a521a5d6cff4-ad/s2048x3072/5d7e4371e74beb499fc222df02db822b708f4265.jpg" },
      { name: "M06. Frango Cremoso Melt", description: "Frango ao cream cheese, muçarela e batata crocante.", price: "R$ 22,90", imageUrl: "https://64.media.tumblr.com/b9e96594fc6d22353cd3cf7c94edeb77/0729a521a5d6cff4-fd/s2048x3072/f3f206f1e6853ae1d967dfc738653dc4fd5489a6.jpg" },
      { name: "M07. Frango Iscas Gourmet", description: "Iscas de frango, muçarela, maionese de alho e tomate cereja.", price: "R$ 26,90" },
      { name: "M08. Mignon Gruyère", description: "Mignon, queijo gruyère, cebola caramelizada e maionese de alho.", price: "R$ 37,00", imageUrl: "https://64.media.tumblr.com/9e260afe66273c0a6158761992ceb67d/0729a521a5d6cff4-2b/s2048x3072/2bb44eb1a215e7d3eb24b197bf77581526abaf24.jpg" },
      { name: "M09. Pastrami Oliva", description: "Pastrami, queijo derretido, Vinagrete do William e creme de queijo.", price: "R$ 41,00", imageUrl: "https://64.media.tumblr.com/b52567a2d00f84d7f3651c2444b5bb85/0729a521a5d6cff4-e3/s2048x3072/25b5ca0786e1e362f1a7f8ec67a42e1fe6e14434.jpg" },
    ],
  },
  {
    name: "TORRONES ARTESANAIS (Receita Original Espanhola)",
    description: "Sabores: Frutas Vermelhas, Pistache, Nozes com Limão ou Chocolate 70%.",
    items: [
      { name: "Tamanho P (25g)", price: "R$ 12,00" },
      { name: "Tamanho M (70g)", price: "R$ 35,90" },
      { name: "Tamanho G (90g)", price: "R$ 42,90" },
    ],
  },
  {
    name: "SOBREMESAS & CROISSANTS DOCES",
    items: [
        { name: "Torta Basca de San Sebastián", description: "A autêntica cheesecake espanhola cremosa. Adicional de Calda Artesanal: + R$ 8,00", price: "R$ 34,00" },
        { name: "Croissant Pistache Real", description: "Recheio de brigadeiro e ganache de pistache.", price: "R$ 41,00", imageUrl: "https://64.media.tumblr.com/0add055745496740cdac0ee959142a72/0729a521a5d6cff4-03/s2048x3072/11612a18f1c46df12f7d3274d3fedb0200c84372.jpg" },
        { name: "Croissant Nutella com Morangos", description: "Nutella original e morangos frescos.", price: "R$ 38,90", imageUrl: "https://64.media.tumblr.com/6c066210786fb0fe39f2cfa601994f94/3ff45e09a0c7dd34-ae/s2048x3072/7eed66c605a1a87e48ea908cfb53af3cfcc16037.jpg" },
        { name: "Croissant Chocolate Blend", description: "Chocolate ao leite premium.", price: "R$ 31,00", imageUrl: "https://64.media.tumblr.com/32d746d8e9cd9113ed6811ac3e7b91e2/0729a521a5d6cff4-e9/s2048x3072/8d98fc0f020c1d091ae10db68fda56c69d7ce1cc.jpg" },
        { name: "Croissant Doce de Leite com Nozes", description: "Creme de doce de leite com nozes crocantes.", price: "R$ 26,00", imageUrl: "https://64.media.tumblr.com/637e23898d6edb025a548a8a7ba8a92d/0729a521a5d6cff4-24/s2048x3072/c644047e9495bdbbf9b225e4dfa1df70b4a664ac.jpg" },
    ],
  },
  {
    name: "BEBIDAS & SODAS",
    items: [
      { name: "Sodas Espanholas (400ml)", description: "Maçã Verde, Framboesa, Limão Siciliano ou Pera.", price: "R$ 19,00" },
      { name: "Suco Morango com Leite Ninho", description: "Ultra cremoso e batido na hora.", price: "R$ 22,00" },
      { name: "Suco de Frutas Vermelhas", description: "Natural (Morango, mirtilo e amora).", price: "R$ 19,00" },
      { name: "Chocolate Suíço Cremoso (Quente)", description: "Receita densa europeia.", price: "R$ 22,00" },
    ],
  },
  {
    name: "COQUETELARIA (Para Viagem)",
    items: [
      { name: "Sangria Oliva (300ml)", description: "Nossa receita clássica em embalagem segura.", price: "R$ 31,00" },
      { name: "Pear Sparkling", description: "Espumante brut com Monin de Pera.", price: "R$ 34,00" },
    ],
  },
];

export default function MenuSection({ isPage = false }: { isPage?: boolean }) {
  return (
    <section id="cardapio" className={cn("bg-secondary", isPage ? "py-8 md:py-12" : "py-20 md:py-32")}>
      <div className="container mx-auto px-6">
        <div className="text-center">
            <h2 className="font-headline text-4xl font-bold text-primary">
                🥖 OLIVA MONTADITOS 🇪🇸
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">Artesanal por Cirlei Max</p>
            <div className="mt-6 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-base font-semibold text-primary">
                🥐 DIFERENCIAL DA CASA
            </div>
            <div className="mt-4 text-muted-foreground max-w-lg mx-auto space-y-1">
                <p>
                    <strong>PÃO DE COCA:</strong> Tradicional pão espanhol crocante incluso.
                </p>
                <p>
                    <strong>UPGRADE GOURMET:</strong> No Croissant amanteigado adicione R$ 7,50.
                </p>
                <p>
                    <strong>EXTRA CROCANTE:</strong> Batata Chips com Páprica Defumada | R$ 5,00.
                </p>
            </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {menuCategories.map((category) => (
            <Card key={category.name} className="bg-background flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">{category.name}</CardTitle>
                {category.description && <CardDescription className="pt-2">{category.description}</CardDescription>}
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  {category.items.map((item) => (
                    <li key={item.name} className="border-b border-dashed border-border pb-3">
                      <div className="flex justify-between items-end">
                        <span className="text-foreground font-medium">{item.name}</span>
                        <span className="font-semibold text-foreground">{item.price}</span>
                      </div>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
