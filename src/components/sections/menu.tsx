import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const menuCategories = [
  {
    name: "Montaditos Clássicos",
    items: [
      { name: "Jamón Serrano e Tomate", price: "R$ 18" },
      { name: "Queijo Brie com Geleia de Pimenta", price: "R$ 20" },
      { name: "Salmão Defumado com Cream Cheese", price: "R$ 22" },
    ],
  },
  {
    name: "Montaditos Gourmet",
    items: [
      { name: "Polvo à Galega com Páprica", price: "R$ 28" },
      { name: "Figo, Presunto Parma e Mel Trufado", price: "R$ 26" },
      { name: "Cogumelos Salteados com Alho", price: "R$ 24" },
    ],
  },
  {
    name: "Bebidas",
    items: [
      { name: "Taça de Vinho Tinto", price: "R$ 25" },
      { name: "Cerveja Artesanal", price: "R$ 18" },
      { name: "Água com Gás", price: "R$ 8" },
    ],
  },
];

export default function MenuSection() {
  return (
    <section id="cardapio" className="bg-secondary py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
            Nosso Menu
          </h2>
          <h3 className="mt-2 font-headline text-4xl font-bold text-foreground md:text-5xl">
            Cardápio
          </h3>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Uma seleção de sabores autênticos para uma experiência inesquecível.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {menuCategories.map((category) => (
            <Card key={category.name} className="bg-background">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {category.items.map((item) => (
                    <li key={item.name} className="flex justify-between items-end border-b border-dashed border-border pb-2">
                      <span className="text-foreground">{item.name}</span>
                      <span className="font-semibold text-foreground">{item.price}</span>
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
