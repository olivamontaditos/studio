"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function IfoodPopup() {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const ifoodUrl = "https://www.ifood.com.br/delivery/curitiba-pr/oliva-montaditos-bom-retiro/2b88f26f-a586-4600-ab74-19d3852d4ddd?UTM_Medium=share";
  
  const allowedPaths = ['/', '/menu/'];

  const popupRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -9999, y: -9999 }); // Start offscreen
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [wasDragged, setWasDragged] = useState(false);

  // Set initial position once mounted on the client
  useEffect(() => {
    if (popupRef.current) {
        const popupWidth = popupRef.current.offsetWidth;
        const popupHeight = popupRef.current.offsetHeight;
        setPosition({
            x: window.innerWidth - popupWidth - 16, // 1rem (right-4)
            y: window.innerHeight / 2 - popupHeight / 2,
        });
    }
  }, []);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!popupRef.current) return;
    
    setWasDragged(false); // Reset drag state on new drag start
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
    e.preventDefault(); // Prevent page scroll on touch devices

    setWasDragged(true); // Mark as dragged

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    let newX = clientX - dragOffset.x;
    let newY = clientY - dragOffset.y;
    
    // Constrain to viewport
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
    } else {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchend", handleDragEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  useEffect(() => {
    setIsVisible(true); // Reset on path change
  }, [pathname]);

  if (!isVisible || !allowedPaths.includes(pathname)) {
    return null;
  }
  
  const style: React.CSSProperties = {
    position: 'fixed',
    top: `${position.y}px`,
    left: `${position.x}px`,
    cursor: isDragging ? 'grabbing' : 'grab',
    touchAction: 'none', // Prevents scrolling on touch devices when dragging
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
            // Prevent navigating if the icon was just dragged
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
          onClick={() => setIsVisible(false)}
          // Prevent drag from starting on the close button
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
