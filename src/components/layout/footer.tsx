import Link from "next/link";
import { ShieldCheck, Star, Instagram } from "lucide-react";

const TikTokIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);


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
            <div className="mt-4 flex items-center space-x-4">
              <a
                href="https://www.instagram.com/olivamontaditos/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.tiktok.com/@olivamontaditos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-6 w-6" />
              </a>
            </div>
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
