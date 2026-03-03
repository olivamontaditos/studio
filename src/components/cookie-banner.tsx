"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const COOKIE_CONSENT_KEY = "oliva_cookie_consent";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (consent === null) {
        setIsVisible(true);
      } else {
        setConsentGiven(consent === 'accepted');
      }
    } catch (error) {
      // localStorage is not available
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, accepted ? 'accepted' : 'declined');
    } catch (error) {
      // localStorage is not available
    }
    setIsVisible(false);
    setConsentGiven(accepted);
  };

  if (!isVisible) {
    return consentGiven === true ? (
      // Placeholder for remarketing scripts that should run after consent
      // In a real app, you would use a script loader or tag manager here.
      <script
        dangerouslySetInnerHTML={{
          __html: `console.log('Cookie consent given. Initializing marketing scripts.');`,
        }}
      />
    ) : null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-12 duration-500">
      <Card className="bg-background/80 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
          <p className="text-sm text-foreground/80">
            Nós usamos cookies para melhorar sua experiência e para fins de remarketing.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => handleConsent(false)}>
              Recusar
            </Button>
            <Button onClick={() => handleConsent(true)}>
              Aceitar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
