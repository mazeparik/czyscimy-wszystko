export function initAnalyticsTracking() {
  const GOOGLE_ADS_ID = 'AW-18535410845';

  // 1. Track Phone Call Clicks (tel: links)
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: GOOGLE_ADS_ID,
          event_category: 'contact',
          event_label: 'phone_call_click',
          value: 1.0,
          currency: 'PLN'
        });
      }
    });
  });

  // 2. Track WhatsApp Chat Clicks
  document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
    link.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: GOOGLE_ADS_ID,
          event_category: 'contact',
          event_label: 'whatsapp_click',
          value: 1.0,
          currency: 'PLN'
        });
      }
    });
  });
}
