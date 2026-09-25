export function initCalculator() {
  const calcService = document.getElementById('calc-service');
  const calcVolBtns = document.querySelectorAll('.calc-vol-btn');
  const calcOptZnoszenie = document.getElementById('calc-opt-znoszenie');
  const calcOptEkspres = document.getElementById('calc-opt-ekspres');
  const calcResultPrice = document.getElementById('calc-result-price');
  const calcSubmitBtn = document.getElementById('calc-submit-btn');

  if (!calcService || !calcResultPrice) return;

  let selectedVolMultiplier = 1;

  calcVolBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      calcVolBtns.forEach(b => {
        b.classList.remove('border-brand-500', 'bg-brand-600/30', 'text-white');
        b.classList.add('border-slate-700', 'bg-slate-800', 'text-slate-300');
      });
      btn.classList.remove('border-slate-700', 'bg-slate-800', 'text-slate-300');
      btn.classList.add('border-brand-500', 'bg-brand-600/30', 'text-white');
      selectedVolMultiplier = parseInt(btn.getAttribute('data-val'));
      calculatePrice();
    });
  });

  function calculatePrice() {
    let basePriceMin = 250;
    let basePriceMax = 400;

    const service = calcService.value;
    if (service === 'oproznianie') { basePriceMin = 350; basePriceMax = 600; }
    else if (service === 'piwnica') { basePriceMin = 250; basePriceMax = 450; }
    else if (service === 'gabaryty') { basePriceMin = 200; basePriceMax = 400; }
    else if (service === 'gruz') { basePriceMin = 300; basePriceMax = 550; }
    else if (service === 'magazyn') { basePriceMin = 600; basePriceMax = 1200; }
    else if (service === 'tereny') { basePriceMin = 400; basePriceMax = 850; }

    let min = basePriceMin * (0.8 + selectedVolMultiplier * 0.4);
    let max = basePriceMax * (0.8 + selectedVolMultiplier * 0.4);

    if (calcOptZnoszenie && calcOptZnoszenie.checked) {
      min += 80;
      max += 150;
    }
    if (calcOptEkspres && calcOptEkspres.checked) {
      min *= 1.15;
      max *= 1.15;
    }

    calcResultPrice.innerHTML = `${Math.round(min)} - ${Math.round(max)} <span class="text-2xl font-bold text-white">PLN</span>`;
  }

  calcService.addEventListener('change', calculatePrice);
  if (calcOptZnoszenie) calcOptZnoszenie.addEventListener('change', calculatePrice);
  if (calcOptEkspres) calcOptEkspres.addEventListener('change', calculatePrice);

  if (calcSubmitBtn) {
    calcSubmitBtn.addEventListener('click', () => {
      const selectedServiceText = calcService.options[calcService.selectedIndex].text;
      const formService = document.getElementById('form-service');
      if (formService) {
        for (let i = 0; i < formService.options.length; i++) {
          if (formService.options[i].value.toLowerCase().includes(calcService.value)) {
            formService.selectedIndex = i;
            break;
          }
        }
      }
      const contactSection = document.getElementById('kontakt');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
