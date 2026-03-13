import Copyright from "@/components/layout/copyright";
import InteractiveMenu from "@/components/sections/interactive-menu";

export const metadata = {
    title: "Cardápio | OLIVA MONTADITOS",
    description: "Explore nosso cardápio interativo. Montaditos, sobremesas, bebidas e mais.",
};

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-secondary flex flex-col items-center">
      <InteractiveMenu />
      <footer className="w-full py-6 text-center text-sm text-muted-foreground">
        <Copyright />
      </footer>
    </main>
  );
}
