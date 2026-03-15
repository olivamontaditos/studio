import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const menuCategories = [
  {
    name: "Montaditos Salgados",
    description: "Base: Emulsão de tomate, alho e azeite.",
    items: [
      { name: "M01. El Clásico", description: "Muçarela e orégano.", price: "R$ 14,00", imageUrl: "https://64.media.tumblr.com/7460cce4649b86caaa289048d5f0008b/6d7fbaf174ce9a65-b6/s1280x1920/9fc4dc698e71a7057ebf21ff26f4acb2c7bf410d.jpg" },
      { name: "M02. Salame & Cherry", description: "Salame, cereja e muçarela.", price: "R$ 21,00", imageUrl: "https://64.media.tumblr.com/66cfa45aaa5f3048f8cbfe7002b356be/6d7fbaf174ce9a65-21/s1280x1920/efa04660fa6bd2df453913a4378d480cd533c3f0.jpg" },
      { name: "M03. Jamón Serrano", description: "Presunto cru e búfala.", price: "R$ 32,00" },
      { name: "M04. Germânico-Ibérico", description: "Salsicha e Vinagrete.", price: "R$ 24,00", imageUrl: "https://64.media.tumblr.com/008873bbacb74b6f4b669e5630585409/6d7fbaf174ce9a65-db/s1280x1920/3eb742a3c02265fcda940b4bdf69051a4b3139f9.jpg" },
      { name: "M05. Peito de Peru", description: "Búfala e salada.", price: "R$ 22,00", imageUrl: "https://64.media.tumblr.com/a23afc762c6824cdaad060135077e090/6d7fbaf174ce9a65-3f/s1280x1920/ffb457ddbff54bf83d1a794b0d39f58ab60a17d5.jpg" },
      { name: "M06. Frango Cremoso", description: "Cream cheese e batata.", price: "R$ 19,00", imageUrl: "https://64.media.tumblr.com/ff69f53f53c26e2059492d678f9c6c6a/6d7fbaf174ce9a65-f9/s1280x1920/76fb357636f0906887fb6c137d15edb7715a5036.jpg" },
      { name: "M07. Frango Iscas", description: "Iscas de frango e alho.", price: "R$ 22,00" },
      { name: "M08. Mignon Gruyère", description: "Mignon e cebola caramelizada.", price: "R$ 31,00", imageUrl: "https://64.media.tumblr.com/99de5b3fdc8a2f667bb59742ed92109c/6d7fbaf174ce9a65-fc/s1280x1920/75ef7a5196b08f80f9d9510d72c904a16e28e60b.jpg" },
      { name: "M09. Pastrami Oliva", description: "Pastrami, e creme de queijo, tomate cereja confitado.", price: "R$ 34,00", imageUrl: "https://64.media.tumblr.com/87c96ac26af1bfc0085b8e8cd64f7830/6d7fbaf174ce9a65-bf/s1280x1920/1e063b8a8f552b3142acea7f5a046c9d7cbf49ee.jpg" },
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

export const promotions = [
    { title: "🔥 PROMO TRIO", description: "3 Montaditos = Ganhe Batata Chips!" },
    { title: "🎓 Combo Estudante", description: "M01 + Chips + Soda = R$ 32,00" },
    { title: "🥨 Combo Oliva Refresh", description: "M06 + Soda = R$ 30,00" },
    { title: "☕ Café Oliva", description: "Espresso + Torrone P = R$ 15,00" },
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
