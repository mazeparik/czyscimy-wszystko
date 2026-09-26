export function initContactForm() {
  const leadForm = document.getElementById('lead-contact-form');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const honeypotInput = document.getElementById('form-website-hp');

  if (!leadForm || !successModal) return;

  let lastSubmitTime = 0;

  leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Anti-Bot Honeypot Protection
    if (honeypotInput && honeypotInput.value !== '') {
      console.warn('Bot submission blocked.');
      return;
    }

    // 2. Rate Limiting Protection (Max 1 submission per 10 seconds)
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      alert('Proszę odczekać kilka sekund przed kolejnym wysłaniem.');
      return;
    }
    lastSubmitTime = now;

    // 3. Input Data Collection & Sanitization
    const nameInput = document.getElementById('form-name');
    const phoneInput = document.getElementById('form-phone');
    const serviceInput = document.getElementById('form-service');
    const locationInput = document.getElementById('form-location');
    const messageInput = document.getElementById('form-message');
    const accessKeyInput = document.getElementById('web3forms-key');

    const sanitizedData = {
      name: sanitizeInput(nameInput ? nameInput.value : ''),
      phone: sanitizeInput(phoneInput ? phoneInput.value : ''),
      service: sanitizeInput(serviceInput ? serviceInput.value : ''),
      location: sanitizeInput(locationInput ? locationInput.value : ''),
      message: sanitizeInput(messageInput ? messageInput.value : '')
    };

    const submitBtn = leadForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerText : 'Wyślij zapytanie';
    if (submitBtn) {
      submitBtn.innerText = 'Wysyłanie...';
      submitBtn.disabled = true;
    }

    try {
      const apiKey = accessKeyInput ? accessKeyInput.value : '';

      // 1. Send Email via Web3Forms API
      if (apiKey && apiKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: apiKey,
            subject: `🚨 Nowe zgłoszenie z strony (${sanitizedData.service || 'Wywóz'})`,
            from_name: 'Czyścimy Wszystko Bydgoszcz',
            name: sanitizedData.name,
            phone: sanitizedData.phone,
            service: sanitizedData.service,
            location: sanitizedData.location,
            message: sanitizedData.message
          })
        }).catch(err => console.error('Web3Forms dispatch error:', err));
      }

      // 2. Send Instant Push Notification via Telegram Bot
      const tgBotToken = '8982284901:AAEliYxuVERL9tJY2iII12ZuA1XfPLUyXjA';
      const tgChatId = '6426530276';
      const tgMessage = `🚨 *NOWE ZGŁOSZENIE ZE STRONY!*\n\n` +
        `👤 *Imię i Nazwisko:* ${sanitizedData.name}\n` +
        `📞 *Telefon:* ${sanitizedData.phone}\n` +
        `📦 *Usługa:* ${sanitizedData.service || 'Nieokreślona'}\n` +
        `📍 *Lokalizacja:* ${sanitizedData.location || 'Niepodana'}\n` +
        `💬 *Opis zlecenia:* ${sanitizedData.message || 'Brak opisu'}\n\n` +
        `🌐 *Źródło:* czyscimywszystkoiwszedzie.pl`;

      await fetch(`https://api.telegram.org/bot${tgBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: tgMessage,
          parse_mode: 'Markdown'
        })
      }).catch(err => console.error('Telegram dispatch error:', err));

    } catch (err) {
      console.error('Dispatch error:', err);
    } finally {
      if (submitBtn) {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      }
      // Show Success Confirmation Modal
      successModal.classList.remove('hidden');
      leadForm.reset();
    }
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.add('hidden');
    });
  }
}

// Security Helper: Sanitize string input against XSS
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}
