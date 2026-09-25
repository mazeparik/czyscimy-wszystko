export function initFaq() {
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector('i');
      if (content) content.classList.toggle('hidden');
      if (icon) icon.classList.toggle('rotate-180');
    });
  });
}
