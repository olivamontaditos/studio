
'use client';

import { useEffect, useRef } from 'react';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';

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
  const sessionId = useRef<string | null>(null);

  // Initialize heartbeat for real-time presence
  useEffect(() => {
    if (!firestore) return;
    
    const isAdmin = typeof window !== 'undefined' && localStorage.getItem(ADM_AUTH_KEY) === "active";
    if (isAdmin) return;

    if (!sessionId.current) {
      sessionId.current = Math.random().toString(36).substring(7);
    }

    const updatePresence = () => {
      const presenceRef = doc(firestore, 'presence', sessionId.current!);
      setDoc(presenceRef, {
        lastSeen: serverTimestamp()
      }, { merge: true }).catch(() => {});
    };

    updatePresence();
    const interval = setInterval(updatePresence, 30000); // 30s heartbeat

    return () => clearInterval(interval);
  }, [firestore]);

  const trackEvent = async (type: EventType) => {
    if (!firestore) return;
    
    try {
      const isAdmin = typeof window !== 'undefined' && localStorage.getItem(ADM_AUTH_KEY) === "active";
      if (isAdmin) return;

      addDoc(collection(firestore, 'analytics_events'), {
        type,
        timestamp: serverTimestamp(),
      }).catch(() => {});
    } catch (error) {
      // ignore
    }
  };

  return { trackEvent };
}
