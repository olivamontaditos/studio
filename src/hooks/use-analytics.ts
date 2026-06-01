
'use client';

import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export type EventType = 'page_view' | 'whatsapp_click' | 'ifood_click' | 'newsletter_submit';

export function useAnalytics() {
  const firestore = useFirestore();

  const trackEvent = async (type: EventType) => {
    if (!firestore) return;
    try {
      await addDoc(collection(firestore, 'analytics_events'), {
        type,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  return { trackEvent };
}
