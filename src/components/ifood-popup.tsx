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

const IFOOD_POPUP_SESSION_KEY = "oliva_ifood_popup_seen_session";

export default function IfoodPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const ifoodUrl = "https://www.ifood.com.br/delivery/curitiba-pr/oliva-montaditos-bom-retiro/2b88f26f-a586-4600-ab74-19d3852d4ddd?UTM_Medium=share";

  useEffect(() => {
    try {
      const hasSeenPopup = sessionStorage.getItem(IFOOD_POPUP_SESSION_KEY);
      if (!hasSeenPopup) {
        const timer = setTimeout(() => {
          setIsOpen(true);
          sessionStorage.setItem(IFOOD_POPUP_SESSION_KEY, "true");
        }, 1500); // 1.5-second delay
        return () => clearTimeout(timer);
      }
    } catch (error) {
      // sessionStorage is not available, do not show popup
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <Link href={ifoodUrl} target="_blank" rel="noopener noreferrer" onClick={handleClose}>
              Ir para o iFood
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
