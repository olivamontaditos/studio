import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail } from "lucide-react";

export default function ReservationsSection() {
  return (
    <section id="reservas" className="bg-secondary py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
            Garanta seu lugar
          </h2>
          <h3 className="mt-2 font-headline text-4xl font-bold text-foreground md:text-5xl" id="contato">
            Reservas & Contato
          </h3>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Estamos ansiosos para receber você. Entre em contato ou faça sua
            reserva online.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h4 className="font-headline text-2xl font-semibold text-foreground">
              Entre em Contato
            </h4>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p className="flex items-center justify-center md:justify-start gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Avenida Desembargador Hugo Simas 2010, Bom Retiro, Curitiba - PR</span>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+5541999999999" className="hover:text-primary transition-colors">(41) 99999-9999</a>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:contato@olivamonataditos.com" className="hover:text-primary transition-colors">contato@olivamonataditos.com</a>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center md:items-start md:text-left p-8 bg-background rounded-lg shadow-lg">
             <h4 className="font-headline text-2xl font-semibold text-foreground">
              Horário de Funcionamento
            </h4>
            <div className="mt-4 text-muted-foreground space-y-2">
                <p><strong>Terça a Sexta:</strong> 18:00 - 23:00</p>
                <p><strong>Sábado:</strong> 12:00 - 23:30</p>
                <p><strong>Domingo:</strong> 12:00 - 16:00</p>
                <p><strong>Segunda:</strong> Fechado</p>
            </div>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                Reservar Mesa Online
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Você será redirecionado para nosso parceiro de reservas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
