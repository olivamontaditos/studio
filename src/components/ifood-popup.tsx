"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { X } from "lucide-react";

type PopupState = 'pristine' | 'visible' | 'minimized' | 'dismissed';

export default function IfoodPopup() {
  const [popupState, setPopupState] = useState<PopupState>('pristine');
  const ifoodUrl = "https://www.ifood.com.br/delivery/curitiba-pr/oliva-montaditos-bom-retiro/2b88f26f-a586-4600-ab74-19d3852d4ddd?UTM_Medium=share";

  // Show popup on initial load after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (popupState === 'pristine') {
        setPopupState('visible');
      }
    }, 1500); // 1.5-second delay
    return () => clearTimeout(timer);
  }, [popupState]);

  // Minimize popup on scroll or touch
  useEffect(() => {
    if (popupState !== 'visible') return;

    const handleInteraction = () => {
      setPopupState('minimized');
    };

    window.addEventListener('scroll', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [popupState]);

  const handleDismiss = () => {
    setPopupState('dismissed');
  };

  const handleMaximize = () => {
    setPopupState('visible');
  };
  
  const handleCloseMinimized = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent handleMaximize from firing
    handleDismiss();
  };

  if (popupState === 'minimized') {
    return (
      <div
        className="fixed top-4 right-4 z-50 cursor-pointer rounded-full bg-card p-2 shadow-lg animate-in fade-in-0 zoom-in-95 duration-300 hover:scale-105 transition-transform"
        onClick={handleMaximize}
        title="Peça no iFood"
      >
        <div className="relative h-12 w-12">
            <Image 
                src="https://logodownload.org/wp-content/uploads/2017/05/ifood-logo-7.png" 
                alt="iFood Logo"
                fill
                className="object-contain p-1"
                sizes="48px"
            />
            <button 
              onClick={handleCloseMinimized} 
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-md transition-colors hover:bg-muted"
              aria-label="Fechar popup do iFood"
            >
              <X className="h-3 w-3" />
            </button>
        </div>
      </div>
    );
  }

  return (
    <Dialog open={popupState === 'visible'} onOpenChange={(open) => !open && handleDismiss()}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader className="items-center text-center">
          <Image 
                src="https://logodownload.org/wp-content/uploads/2017/05/ifood-logo-7.png" 
                alt="iFood Logo"
                width={120}
                height={40}
                className="object-contain"
          />
          <DialogTitle className="font-headline text-2xl text-foreground">
            Peça também pelo iFood!
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Receba nossas delícias no conforto da sua casa.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button asChild className="w-full bg-[#EA1D2C] hover:bg-[#c81e28] text-white" size="lg">
            <Link href={ifoodUrl} target="_blank" rel="noopener noreferrer" onClick={handleDismiss}>
              Ir para o iFood
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
