import '../css/main.css';
import { initMobileNav } from './mobile-nav.js';
import { initServiceFilters } from './filters.js';
import { initFaq } from './faq.js';
import { initContactForm } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initServiceFilters();
  initFaq();
  initContactForm();
});
