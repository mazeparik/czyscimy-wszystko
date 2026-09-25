export function initServiceFilters() {
  const filterBtns = document.querySelectorAll('#service-filters button');
  const serviceCards = document.querySelectorAll('.service-card');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-brand-600', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700');
      });
      btn.classList.remove('bg-white', 'text-slate-700');
      btn.classList.add('bg-brand-600', 'text-white', 'shadow-md');

      const filter = btn.getAttribute('data-filter');
      serviceCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
