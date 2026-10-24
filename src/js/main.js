import '../css/main.css';
import { initMobileNav } from './mobile-nav.js';
import { initServiceTabs } from './tabs.js';
import { initFaq } from './faq.js';
import { initContactForm } from './contact.js';
import { initCookieBanner } from './cookies.js';

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initServiceTabs();
  initFaq();
  initContactForm();
  initCookieBanner();
});
