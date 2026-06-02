'use client';

import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export type EventType = 
  | 'page_view' 
  | 'whatsapp_click' 
  | 'ifood_click' 
  | 'newsletter_submit' 
  | 'address_click'
  | 'instagram_click'
  | 'tiktok_click'
  | 'youtube_click'
  | 'review_click'
  | 'events_click';

const ADM_AUTH_KEY = "oliva_adm_session";

export function useAnalytics() {
  const firestore = useFirestore();

  const trackEvent = async (type: EventType) => {
    if (!firestore) return;
    
    try {
      // Verifica se o usuário é um administrador logado
      // Se estiver ativo no localStorage, ignoramos o rastreamento para não sujar os dados
      const isAdmin = localStorage.getItem(ADM_AUTH_KEY) === "active";
      if (isAdmin) {
        return;
      }

      addDoc(collection(firestore, 'analytics_events'), {
        type,
        timestamp: serverTimestamp(),
      }).catch(() => {}); // Silent catch as analytics shouldn't block UI
    } catch (error) {
      // ignore errors (like localStorage being blocked or Firestore write failing)
    }
  };

  return { trackEvent };
}
