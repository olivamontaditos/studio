import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero";
import MenuSection from "@/components/sections/menu";
import GallerySection from "@/components/sections/gallery";
import NewsletterSection from "@/components/sections/newsletter";
import ReservationsSection from "@/components/sections/reservations";
import CookieBanner from "@/components/cookie-banner";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <MenuSection />
        <GallerySection />
        <ReservationsSection />
        <NewsletterSection />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
