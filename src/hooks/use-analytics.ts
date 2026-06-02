
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
  | 'youtube_click';

export function useAnalytics() {
  const firestore = useFirestore();

  const trackEvent = async (type: EventType) => {
    if (!firestore) return;
    try {
      addDoc(collection(firestore, 'analytics_events'), {
        type,
        timestamp: serverTimestamp(),
      }).catch(() => {}); // Silent catch as analytics shouldn't block UI
    } catch (error) {
      // ignore
    }
  };

  return { trackEvent };
}
