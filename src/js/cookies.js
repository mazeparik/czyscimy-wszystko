export function initCookieBanner() {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept-btn');
  const privacyOpenBtns = document.querySelectorAll('.open-privacy-modal-btn');
  const privacyModal = document.getElementById('privacy-modal');
  const privacyCloseBtn = document.getElementById('close-privacy-modal-btn');

  if (!cookieBanner) return;

  // Check if user already consented
  const hasConsented = localStorage.getItem('cookieConsent');
  if (!hasConsented) {
    // Show banner after brief delay for smooth appearance
    setTimeout(() => {
      cookieBanner.classList.remove('hidden');
    }, 500);
  }

  // Accept cookies
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.classList.add('hidden');
    });
  }

  // Privacy & Cookies Modal triggers
  privacyOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (privacyModal) {
        privacyModal.classList.remove('hidden');
      }
    });
  });

  if (privacyCloseBtn && privacyModal) {
    privacyCloseBtn.addEventListener('click', () => {
      privacyModal.classList.add('hidden');
    });

    privacyModal.addEventListener('click', (e) => {
      if (e.target === privacyModal) {
        privacyModal.classList.add('hidden');
      }
    });
  }
}
