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
  
  // A imagem deve ser a que você forneceu. Como sou um assistente, 
  // usei um placeholder abaixo. Substitua pela URL final da sua imagem.
  const promoImageUrl = "https://images.unsplash.com/photo-1525286335722-c30c6b5df541?q=80&w=600&h=1000&fit=crop";

  useEffect(() => {
    const allowedPaths = ["/", "/menu/"];
    if (allowedPaths.includes(pathname)) {
      // Pequeno delay para garantir que o usuário veja o carregamento da página primeiro
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[90vw] sm:max-w-[400px] p-0 overflow-hidden border-none bg-transparent shadow-2xl">
        <DialogTitle className="sr-only">Promoção Dia das Mães</DialogTitle>
        <DialogDescription className="sr-only">
          Cestas personalizadas para o Dia das Mães a partir de R$ 99,90.
        </DialogDescription>
        <div className="relative group">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-2 top-2 z-50 rounded-full bg-black/50 p-1 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg">
            {/* 
              IMPORTANTE: Substitua o 'src' abaixo pela URL da imagem de Dia das Mães 
              que você enviou (após hospedá-la no seu servidor ou serviço de imagens).
            */}
            <Image
              src={promoImageUrl}
              alt="Promoção Cestas de Dia das Mães Oliva Montaditos"
              fill
              className="object-cover"
              priority
            />
            
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <Button 
                asChild 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-bold py-6 shadow-lg uppercase tracking-wider"
                onClick={() => setIsOpen(false)}
              >
                <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  ENCOMENDAR
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
