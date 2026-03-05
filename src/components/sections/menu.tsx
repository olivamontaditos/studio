import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const menuCategories = [
  {
    name: "Montaditos Salgados",
    description: "Base: Emulsão de tomate, alho e azeite.",
    items: [
      { name: "M03. Jamón Serrano Supremo", description: "Presunto cru espanhol, muçarela de búfala, rúcula fresca e pimentão tostado no azeite.", price: "R$ 32,00" },
      { name: "M08. Mignon Gruyère", description: "Mignon, queijo gruyère, cebola caramelizada e maionese de leite com alho.", price: "R$ 31,00" },
      { name: "M04. Germânico-Ibérico", description: "Salsicha artesanal, Vinagrete do William e maionese de leite com alho.", price: "R$ 24,00" },
      { name: "M05. Peito de Peru Light", description: "Peito de peru, muçarela de búfala, tomate em rodelas, alface fresca e maionese de leite com alho.", price: "R$ 22,00" },
      { name: "M07. Frango Iscas Gourmet", description: "Iscas de frango, muçarela, maionese de leite com alho e tomate cereja.", price: "R$ 22,00" },
      { name: "M02. Salame & Cherry", description: "Salame italiano, tomates cereja, muçarela e maionese de leite com alho.", price: "R$ 21,00" },
      { name: "M06. Frango Cremoso Melt", description: "Frango ao cream cheese, muçarela e batata crocante.", price: "R$ 19,00" },
      { name: "M01. El Clásico (Combate)", description: "Muçarela derretida e orégano.", price: "R$ 14,00" },
    ],
  },
  {
    name: "Torta Basca (Assinatura)",
    description: "A autêntica cheesecake da região de San Sebastián. Tostada por fora e extremamente cremosa por dentro.",
    items: [
      { name: "Com Calda Artesanal", price: "R$ 35,00" },
      { name: "Fatia Simples", price: "R$ 28,00" },
    ],
  },
  {
    name: "Croissants Doces",
    description: "Massa Folhada Premium",
    items: [
      { name: "Pistache Real", description: "Brigadeiro de pistache, ganache e farofa de pistache.", price: "R$ 34,00" },
      { name: "Nutella com Morangos", description: "Nutella original com fatias de morangos frescos.", price: "R$ 32,00" },
      { name: "Amêndoas Tostadas", description: "Creme frangipane e lâminas de amêndoas.", price: "R$ 28,00" },
      { name: "Chocolate Blend ou Doce de Leite com Nozes", price: "R$ 26,00" },
    ],
  },
  {
    name: "Sucos Naturais & Sodas",
    items: [
      { name: "Morango com Leite Ninho", description: "O favorito, batido e cremoso.", price: "R$ 18,00" },
      { name: "Soda Italiana Monin", description: "Maçã Verde, Morango ou Limão Siciliano.", price: "R$ 16,00" },
      { name: "Suco de Frutas Vermelhas", description: "Blend de morango, amora e framboesa.", price: "R$ 16,00" },
      { name: "Suco de Laranja", description: "Fresco, espremido na hora.", price: "R$ 12,00" },
      { name: "Suco de Abacaxi com Hortelã", description: "Refrescante e natural.", price: "R$ 12,00" },
    ],
  },
  {
    name: "Bebidas Alcoólicas & Drinks",
    items: [
      { name: "Carajillo", description: "Espresso batido com Licor 43 e gelo.", price: "R$ 28,00" },
      { name: "Drink Sensação na Espanha", description: "Gin, morangos, tônica e espuma de frutas vermelhas.", price: "R$ 28,00" },
      { name: "Strawberry Daiquiri", description: "Rum, morangos frescos e limão.", price: "R$ 26,00" },
      { name: "Sangria Oliva", description: "Vinho tinto, frutas da estação e toque da chef.", price: "R$ 26,00" },
      { name: "Chopp", price: "300ml R$ 12 / 500ml R$ 18" },
      { name: "Estrella Galicia", price: "R$ 14,00" },
    ],
  },
  {
    name: "Cafeteria & Chocolates",
    items: [
      { name: "Chocolate Quente Suíço Cremoso", price: "R$ 18,00" },
      { name: "Cappuccino Oliva", price: "R$ 16,00" },
      { name: "Chocolate Quente Tradicional", price: "R$ 15,00" },
      { name: "Latte / Cappuccino Italiano", price: "R$ 14,00" },
      { name: "Macchiato", price: "R$ 9,00" },
      { name: "Espresso / Carioca", price: "R$ 8,00" },
    ],
  },
];

const promotions = [
    { title: "🔥 PROMO TRIO", description: "Peça 3 Montaditos e ganhe uma porção de Batata Chips!" },
    { title: "Combo Estudante", description: "1 Montadito El Clásico + Batata Chips + Soda Italiana = R$ 32,00" },
    { title: "Café Oliva", description: "1 Espresso + 1 Torrone P (25g) = R$ 15,00" },
];

export default function MenuSection() {
  return (
    <section id="cardapio" className="bg-secondary py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center">
            <h2 className="font-headline text-4xl font-bold text-primary">
                🥖 OLIVA MONTADITOS
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">Artesanal por Cirlei Max</p>
            <div className="mt-6 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-base font-semibold text-primary">
                🥐 DIFERENCIAL DA CASA
            </div>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
                <strong>PÃO DE COCA:</strong> Todos os montaditos são servidos no tradicional pão espanhol (crocante).
            </p>
            <p className="mt-1 text-muted-foreground max-w-lg mx-auto">
                <strong>UPGRADE GOURMET:</strong> Deseja no Croissant amanteigado? Adicione apenas R$ 6,00.
            </p>
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
                        <span className="text-foreground">{item.name}</span>
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
            Promoções
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
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
