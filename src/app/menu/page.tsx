"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUp, ArrowLeft } from 'lucide-react';
import MenuSection from "@/components/sections/menu";
import { Button } from '@/components/ui/button';

export default function MenuPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostra o botão se o usuário rolou mais de 300px
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Limpa o listener ao desmontar
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-secondary flex flex-col items-center">
        {/* Navegação simples para a página de cardápio focada */}
        <div className="w-full max-w-6xl mx-auto px-4 pt-8">
            <Button asChild variant="ghost" className="mb-4">
                <Link href="/#inicio">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar ao Início
                </Link>
            </Button>
        </div>

      <MenuSection variant="full" />

      {/* Botão de voltar ao topo */}
      {showBackToTop && (
        <Button
          size="icon"
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg"
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
