import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const menuCategories = [
  {
    name: "Montaditos Salgados",
    description: "Base: Emulsão de tomate, alho e azeite.",
    items: [
      { name: "M01. El Clásico", description: "Muçarela e orégano.", price: "R$ 14,00" },
      { name: "M02. Salame & Cherry", description: "Salame, cereja e muçarela.", price: "R$ 21,00" },
      { name: "M03. Jamón Serrano", description: "Presunto cru e búfala.", price: "R$ 32,00" },
      { name: "M04. Germânico-Ibérico", description: "Salsicha e Vinagrete.", price: "R$ 24,00" },
      { name: "M05. Peito de Peru", description: "Búfala e salada.", price: "R$ 22,00" },
      { name: "M06. Frango Cremoso", description: "Cream cheese e batata.", price: "R$ 19,00" },
      { name: "M07. Frango Iscas", description: "Iscas de frango e alho.", price: "R$ 22,00" },
      { name: "M08. Mignon Gruyère", description: "Mignon e cebola caramelizada.", price: "R$ 31,00" },
      { name: "M09. Pastrami Oliva", description: "Pastrami, e creme de queijo, tomate cereja confitado.", price: "R$ 34,00" },
    ],
  },
    {
    name: "Sangria & Coquetelaria",
    items: [
      { name: "Sangria Oliva", description: "Receita clássica da Chef.", price: "R$ 26,00" },
      { name: "Pear Sparkling", description: "Espumante e Monin de Pera.", price: "R$ 28,00" },
      { name: "Carajillo Crème Brûlée", description: "Espresso e Licor 43.", price: "R$ 32,00" },
      { name: "Drink Sensação", description: "Gin e frutas vermelhas.", price: "R$ 28,00" },
      { name: "Strawberry Daiquiri", description: "Rum e morangos.", price: "R$ 26,00" },
      { name: "Sodas Espanholas", description: "Maçã, Framboesa ou Pera.", price: "R$ 16,00" },
    ],
  },
    {
    name: "Torrones Artesanais 🇪🇸",
    description: "Receita Original Espanhola com Amêndoas. Frutas Vermelhas | Pistache | Nozes/Limão | Chocolate 70%/Cranberry.",
    items: [
      { name: "P (25g)", price: "R$ 9,90" },
      { name: "M (70g)", price: "R$ 29,90" },
      { name: "G (90g)", price: "R$ 35,90" },
    ],
  },
  {
    name: "Sobremesas & Croissants Doces",
    items: [
        { name: "Torta Basca Simples", price: "R$ 28,00" },
        { name: "Torta Basca com Calda", description: "Caldas: Frutas Vermelhas, Pistache, Caramelo, Chocolate ou Doce de Leite", price: "R$ 35,00" },
        { name: "Pistache Real", price: "R$ 34,00" },
        { name: "Nutella com Morangos", price: "R$ 32,00" },
        { name: "Amêndoas Tostadas", price: "R$ 28,00" },
        { name: "Chocolate Blend", price: "R$ 26,00" },
        { name: "Doce de Leite com Nozes", price: "R$ 26,00" },
    ],
  },
  {
    name: "Sucos Naturais",
    items: [
      { name: "Laranja ou Abacaxi/Hortelã", price: "R$ 12,00" },
      { name: "Frutas Vermelhas", price: "R$ 16,00" },
      { name: "Morango com Leite Ninho", price: "R$ 18,00" },
    ],
  },
  {
    name: "Cafeteria",
    description: "Grãos Especiais",
    items: [
      { name: "Espresso / Carioca", price: "R$ 8,00" },
      { name: "Latte", price: "R$ 10,90" },
      { name: "Cappuccino Oliva", price: "R$ 16,00" },
      { name: "Chocolate Quente Tradicional", price: "R$ 15,00" },
      { name: "Chocolate Suíço Cremoso", price: "R$ 18,00" },
    ],
  },
];

const promotions = [
    { title: "🔥 PROMO TRIO", description: "3 Montaditos = Ganhe Batata Chips!" },
    { title: "🎓 Combo Estudante", description: "M01 + Chips + Soda = R$ 32,00" },
    { title: "🥨 Combo Oliva Refresh", description: "M06 + Soda = R$ 30,00" },
    { title: "☕ Café Oliva", description: "Espresso + Torrone P = R$ 15,00" },
];

export default function MenuSection() {
  return (
    <section id="cardapio" className="bg-secondary py-20 md:py-32">
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
                    <strong>UPGRADE GOURMET:</strong> No Croissant amanteigado adicione R$ 6,00.
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

        <div className="mt-20 text-center">
          <h3 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
            Promoções & Combos
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {promotions.map((promo) => (
                <Card key={promo.title} className="bg-background text-left">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl text-accent">{promo.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{promo.description}</p>
                    </CardContent>
                </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
