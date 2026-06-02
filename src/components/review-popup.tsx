
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star, X } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

const REVIEW_POPUP_KEY = "oliva_review_popup_seen";

export default function ReviewPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenSeen, setHasBeenSeen] = useState(true); // Default to true to avoid flash of content on server
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    try {
      const seen = localStorage.getItem(REVIEW_POPUP_KEY);
      if (seen !== 'true') {
        setHasBeenSeen(false);
      }
    } catch (error) {
      // localStorage is not available, assume we shouldn't show it.
      setHasBeenSeen(true); 
    }
  }, []);

  useEffect(() => {
    if (hasBeenSeen) return;

    const handleScroll = () => {
      // Show popup when user is near the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (isAtBottom && !isVisible) {
        setIsVisible(true);
        try {
          localStorage.setItem(REVIEW_POPUP_KEY, "true");
        } catch (error) {
          // localStorage is not available
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible, hasBeenSeen]);

  const handleClose = () => {
    setIsVisible(false);
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-12 duration-500">
      <Card className="w-80 bg-background/90 backdrop-blur-sm shadow-2xl">
        <CardHeader className="relative p-4">
          <CardTitle className="flex items-center gap-2 font-headline text-lg">
            <Star className="h-5 w-5 text-accent" />
            Gostou da experiência?
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground pt-1">Sua opinião é muito importante para nós!</CardDescription>
          <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={handleClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </Button>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => trackEvent('review_click')}>
            <Link href="https://g.page/r/CeVf7luA8NjOEBM/review" target="_blank" rel="noopener noreferrer">
              Deixar uma Avaliação
            </Link>
          </Button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Leva apenas um minuto.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
