"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

export default function IfoodPopup() {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const ifoodUrl = "https://www.ifood.com.br/delivery/curitiba-pr/oliva-montaditos-bom-retiro/2b88f26f-a586-4600-ab74-19d3852d4ddd?UTM_Medium=share";

  const allowedPaths = ['/', '/menu/'];

  useEffect(() => {
    // Reset visibility when path changes to show it again on navigation
    setIsVisible(true);
  }, [pathname]);

  if (!isVisible || !allowedPaths.includes(pathname)) {
    return null;
  }

  return (
    <div className="fixed top-1/2 right-4 -translate-y-1/2 z-50">
      <div className="relative group">
        <Link
          href={ifoodUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Peça no iFood"
          className="block p-2 bg-card rounded-full shadow-lg transition-transform hover:scale-110"
        >
          <div className="relative h-14 w-14">
            <Image
              src="https://logodownload.org/wp-content/uploads/2017/05/ifood-logo-7.png"
              alt="iFood Logo"
              fill
              className="object-contain p-1"
              sizes="56px"
            />
          </div>
        </Link>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-md transition-colors hover:bg-muted"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
