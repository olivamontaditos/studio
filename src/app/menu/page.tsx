import MenuSection from "@/components/sections/menu";

export const metadata = {
    title: "Cardápio | OLIVA MONTADITOS",
    description: "Explore nosso cardápio interativo. Montaditos, sobremesas, bebidas e mais.",
};

export default function MenuPage() {
  return (
    <div className="bg-secondary flex flex-col items-center">
      <MenuSection variant="full" />
    </div>
  );
}
