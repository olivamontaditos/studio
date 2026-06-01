
"use client";

import { useEffect } from 'react';
import { useAnalytics } from '@/hooks/use-analytics';
import HeroSection from "@/components/sections/hero";
import MenuSection from "@/components/sections/menu";
import GallerySection from "@/components/sections/gallery";
import NewsletterSection from "@/components/sections/newsletter";
import ReservationsSection from "@/components/sections/reservations";
import CookieBanner from "@/components/cookie-banner";
import ReviewPopup from "@/components/review-popup";

export default function Home() {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('page_view');
  }, []);

  return (
    <>
      <HeroSection />
      <MenuSection variant="summary" />
      <GallerySection />
      <ReservationsSection />
      <NewsletterSection />
      <CookieBanner />
      <ReviewPopup />
    </>
  );
}
