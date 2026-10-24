export function initServiceTabs() {
  const tabButtons = document.querySelectorAll('.service-tab-btn');
  const tabPanes = document.querySelectorAll('.service-tab-pane');
  const quoteTriggers = document.querySelectorAll('.service-quote-trigger');
  const serviceSelect = document.getElementById('form-service');

  if (!tabButtons.length || !tabPanes.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');

      // Update button styles
      tabButtons.forEach(b => {
        b.classList.remove('bg-brand-600', 'text-white', 'shadow-lg', 'shadow-brand-600/30', 'border-brand-600');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-200/90', 'hover:bg-slate-50', 'hover:text-brand-600');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200/90', 'hover:bg-slate-50', 'hover:text-brand-600');
      btn.classList.add('bg-brand-600', 'text-white', 'shadow-lg', 'shadow-brand-600/30', 'border-brand-600');
      btn.setAttribute('aria-selected', 'true');

      // Show/hide panes
      tabPanes.forEach(pane => {
        if (pane.id === targetTabId) {
          pane.classList.remove('hidden');
          pane.classList.add('block');
        } else {
          pane.classList.add('hidden');
          pane.classList.remove('block');
        }
      });

      // Refresh icons if needed
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    });
  });

  // Handle quote buttons inside each tab to preselect service in contact form
  quoteTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const serviceName = trigger.getAttribute('data-select-service');
      if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
      }
    });
  });
}
