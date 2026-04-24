import HeroSection from "@/components/sections/hero";
import MenuSection from "@/components/sections/menu";
import GallerySection from "@/components/sections/gallery";
import NewsletterSection from "@/components/sections/newsletter";
import ReservationsSection from "@/components/sections/reservations";
import CookieBanner from "@/components/cookie-banner";
import ReviewPopup from "@/components/review-popup";
import IfoodPopup from "@/components/ifood-popup";

export default function Home() {
  return (
    <>
      <IfoodPopup />
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
