'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, MapPin } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

export default function ReservationsSection() {
  const { trackEvent } = useAnalytics();
  const mapsUrl = "https://share.google/fnyW3LtaK1bazQDRv";
  return (
    <section id="encomendas" className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            Garanta sua experiência
          </p>
          <h2 className="mt-2 font-headline text-4xl font-bold text-foreground md:text-5xl" id="contato">
            Eventos & Encomendas
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Estamos ansiosos para atender você. Entre em contato para planejar seu evento ou fazer sua encomenda especial.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h4 className="font-headline text-2xl font-semibold text-foreground">
              Entre em Contato
            </h4>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <a 
                href={mapsUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center md:justify-start gap-3 hover:text-primary transition-colors"
                onClick={() => trackEvent('address_click')}
              >
                <MapPin className="h-5 w-5 text-primary" />
                <span>
                  Avenida Desembargador Hugo Simas 2010
                  <br />
                  Bom Retiro, Curitiba - PR
                </span>
              </a>
              <a 
                href="https://wa.me/5541988483621" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center md:justify-start gap-3 hover:text-primary transition-colors"
                onClick={() => trackEvent('whatsapp_click')}
              >
                <Phone className="h-5 w-5 text-primary" />
                <span>(41) 98848-3621</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center text-center md:items-start md:text-left p-8 bg-card rounded-lg shadow-lg">
             <h4 className="font-headline text-2xl font-semibold text-foreground">
              Horário de Funcionamento
            </h4>
            <div className="mt-4 text-muted-foreground space-y-2">
                <p><strong>Segunda a Sábado:</strong> 10:00 – 22:00</p>
                <p><strong>Domingo:</strong> Fechado</p>
            </div>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="https://wa.me/5541988483621" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click')}>
                Eventos & Encomendas
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Você será redirecionado para o WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
