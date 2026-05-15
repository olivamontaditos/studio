"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


type PopupState = 'initial' | 'floating' | 'closed';

export default function IfoodPopup() {
  const [popupState, setPopupState] = useState<PopupState>('closed');
  const pathname = usePathname();
  const ifoodUrl = "https://www.ifood.com.br/delivery/curitiba-pr/oliva-montaditos-bom-retiro/2b88f26f-a586-4600-ab74-19d3852d4ddd?UTM_Medium=share";
  
  const allowedPaths = ['/', '/menu/'];

  const popupRef = useRef<HTMLDivElement>(null);
  const initialPopupTriggered = useRef(false);
  const [position, setPosition] = useState({ x: -9999, y: -9999 }); // Start offscreen
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [wasDragged, setWasDragged] = useState(false);

  // Effect to handle scroll-based trigger on home and direct trigger on menu
  useEffect(() => {
    initialPopupTriggered.current = false;
    setPopupState('closed');

    if (pathname === '/menu/') {
      setPopupState('floating');
      return;
    }

    if (pathname === '/') {
      const handleScroll = () => {
        if (initialPopupTriggered.current) {
          return;
        }
        const menuSection = document.getElementById('cardapio');
        if (menuSection) {
          const rect = menuSection.getBoundingClientRect();
          // Show when the bottom of the menu section enters the viewport
          if (rect.bottom < window.innerHeight) {
            setPopupState('initial');
            initialPopupTriggered.current = true;
          }
        }
      };
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [pathname]);

  const handleCloseInitial = () => {
    setPopupState('floating');
  };

  const handleCloseFloating = () => {
    setPopupState('closed');
  };

  // Close with ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (popupState === 'initial') {
          handleCloseInitial();
        } else if (popupState === 'floating') {
          handleCloseFloating();
        }
      }
    };

    if (popupState !== 'closed') {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [popupState]);

  // Set initial position for floating icon when it appears
  useEffect(() => {
    if (popupState === 'floating' && popupRef.current) {
        const popupWidth = popupRef.current.offsetWidth || 72;
        const popupHeight = popupRef.current.offsetHeight || 72;
        setPosition({
            x: window.innerWidth - popupWidth - 16,
            y: window.innerHeight / 2 - popupHeight / 2,
        });
    }
  }, [popupState]);


  // --- Drag and drop logic for the floating icon ---
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!popupRef.current) return;
    setWasDragged(false);
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const rect = popupRef.current.getBoundingClientRect();
    setDragOffset({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  }, []);

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !popupRef.current) return;
    e.preventDefault();
    setWasDragged(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    let newX = clientX - dragOffset.x;
    let newY = clientY - dragOffset.y;
    const popupWidth = popupRef.current.offsetWidth;
    const popupHeight = popupRef.current.offsetHeight;
    newX = Math.max(0, Math.min(newX, window.innerWidth - popupWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight - popupHeight));
    setPosition({ x: newX, y: newY });
  }, [isDragging, dragOffset]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleDragMove);
      document.addEventListener("touchmove", handleDragMove, { passive: false });
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("touchend", handleDragEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);
  // --- End of drag and drop logic ---


  if (popupState === 'closed' || !allowedPaths.includes(pathname)) {
    return null;
  }

  // Render initial large popup
  if (popupState === 'initial') {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in-50">
            <Card className="w-full max-w-sm m-4 shadow-2xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="font-headline text-2xl text-primary flex items-center gap-3">
                           <Image 
                                src="https://logodownload.org/wp-content/uploads/2017/05/ifood-logo-7.png"
                                alt="iFood Logo"
                                width={28}
                                height={28}
                                className="object-contain"
                           />
                           Peça pelo iFood!
                        </CardTitle>
                        <Button variant="ghost" size="icon" onClick={handleCloseInitial} className="-mr-2 -mt-2 h-8 w-8">
                            <X className="h-5 w-5" />
                            <span className="sr-only">Fechar</span>
                        </Button>
                    </div>
                    <CardDescription>Receba nossas delícias no conforto da sua casa.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full bg-[#EA1D2C] text-white hover:bg-[#c51925]" size="lg" onClick={handleCloseInitial}>
                        <Link href={ifoodUrl} target="_blank" rel="noopener noreferrer">
                            Ir para o iFood
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  // Render floating draggable icon
  if (popupState === 'floating') {
    const style: React.CSSProperties = {
        position: 'fixed',
        top: `${position.y}px`,
        left: `${position.x}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
    };

    return (
      <div
        ref={popupRef}
        style={style}
        className={cn(
          "z-50",
          position.y < 0 ? 'opacity-0' : 'opacity-100', // Hide until positioned
          isDragging && "opacity-80 transition-opacity duration-150"
        )}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div className="relative group">
          <Link
            href={ifoodUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Peça no iFood"
            className="block p-2 bg-card rounded-full shadow-lg transition-transform hover:scale-110"
            onClick={(e) => {
              if (wasDragged) {
                e.preventDefault();
              }
            }}
            draggable="false"
          >
            <div className="relative h-14 w-14">
              <Image
                src="https://logodownload.org/wp-content/uploads/2017/05/ifood-logo-7.png"
                alt="iFood Logo"
                fill
                className="object-contain p-1 pointer-events-none"
                sizes="56px"
                draggable="false"
              />
            </div>
          </Link>
          <button
            onClick={handleCloseFloating}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-md transition-colors hover:bg-muted cursor-pointer"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
