
"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function WhatsappButton() {
  const whatsappUrl = "https://wa.me/5541988483621";

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center justify-center">
      {/* Efeito de pulso externo */}
      <span className="absolute inline-flex h-16 w-16 animate-ping rounded-full bg-[#25D366] opacity-20"></span>
      
      <Button
        asChild
        size="icon"
        className={cn(
          "relative h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba5a] hover:scale-110 transition-all duration-300 border-2 border-white/20"
        )}
      >
        <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" title="Falar no WhatsApp">
          <MessageCircle className="h-8 w-8 fill-current" />
          <span className="sr-only">Contato WhatsApp</span>
        </Link>
      </Button>
    </div>
  );
}
