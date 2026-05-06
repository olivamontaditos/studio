"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const whatsappUrl = "https://wa.me/5541988483621?text=Olá! Gostaria de encomendar uma cesta de Dia das Mães.";
  
  // Imagem oficial fornecida para o Dia das Mães
  const promoImageUrl = "https://64.media.tumblr.com/fad519b744233667a898e31653a0ef6f/6ac289b10acbc18b-99/s1280x1920/d23b1f1701999e9738bfe7cb1c4e1f89ccd6be11.pnj";

  useEffect(() => {
    const allowedPaths = ["/", "/menu/"];
    if (allowedPaths.includes(pathname)) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[85vw] sm:max-w-[360px] max-h-[90vh] p-0 overflow-hidden border-none bg-card shadow-2xl outline-none rounded-xl flex flex-col">
        <DialogTitle className="sr-only">Promoção Dia das Mães</DialogTitle>
        <DialogDescription className="sr-only">
          Cestas personalizadas para o Dia das Mães. Encomende agora pelo WhatsApp.
        </DialogDescription>
        
        <div className="relative flex flex-col h-full">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-3 top-3 z-50 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-md transition-colors hover:bg-black/60"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="relative flex-1 min-h-[300px] w-full overflow-hidden">
            <Image
              src={promoImageUrl}
              alt="Promoção Cestas de Dia das Mães Oliva Montaditos"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 85vw, 360px"
            />
          </div>
          
          <div className="p-4 bg-card shrink-0">
            <Button 
              asChild 
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-base font-bold py-6 shadow-lg uppercase tracking-wider transition-transform hover:scale-[1.02]"
              onClick={() => setIsOpen(false)}
            >
              <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                ENCOMENDAR AGORA
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
