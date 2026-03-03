import Link from "next/link";
import { ShieldCheck, Star } from "lucide-react";

export default function Footer() {
  const legalLinks = [
    { href: "/termos-de-uso", text: "Termos de Uso" },
    { href: "/politica-de-privacidade", text: "Política de Privacidade" },
    { href: "/politica-de-cookies", text: "Política de Cookies" },
  ];

  return (
    <footer className="bg-background border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <h3 className="font-headline text-2xl font-bold text-primary">
              OLIVA MONTADITOS
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Experiência gastronômica artesanal.
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h4 className="font-semibold text-foreground">Selos de Confiança</h4>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent" /> Excelente Avaliação
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-accent" /> Qualidade Reconhecida
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Legal</h4>
                <ul className="mt-4 space-y-2">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                 <h4 className="font-semibold text-foreground">Endereço</h4>
                 <p className="mt-4 text-sm text-muted-foreground">
                    Avenida Desembargador Hugo Simas 2010
                    <br />
                    Bom Retiro, Curitiba - PR
                 </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OLIVA MONTADITOS. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
