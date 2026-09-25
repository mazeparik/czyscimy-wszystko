# Czyścimy wszystko i wszędzie — High-Converting Landing Page App

Profesjonalny, modułowy landing page stworzony w oparciu o Vite, HTML5, Tailwind CSS i JavaScript ES Modules dla firmy zajmującej się opróżnianiem mieszkań i wywozem gabarytów.

## 📁 Struktura Projektu

```
czyscimy-wszystko-app/
├── index.html                   # Główny szablon HTML5 z SEO & OpenGraph
├── package.json                 # Skrypty build oraz zależności npm
├── vite.config.js               # Konfiguracja serwera deweloperskiego Vite
├── tailwind.config.js           # Motyw i paleta kolorów Tailwind CSS
├── postcss.config.js            # Konfiguracja PostCSS i Autoprefixer
├── src/
│   ├── css/
│   │   └── main.css             # Główne style CSS, glassmorphism i animacje
│   ├── data/
│   │   └── servicesData.js      # Dane 9 usług z frazami kluczowymi SEO
│   └── js/
│       ├── main.js              # Główny punkt wejścia JS
│       ├── mobile-nav.js        # Nawigacja i menu mobilne
│       ├── filters.js           # Kategoryzacja i filtrowanie usług
│       ├── calculator.js        # Interaktywny kalkulator wyceny online
│       ├── faq.js               # Akordeon pytań i odpowiedzi FAQ
│       └── contact.js           # Obsługa formularza i integracja WhatsApp
└── public/
    └── assets/
        └── images/              # Zoptymalizowane zdjęcia (hero, przykłady prac)
```

## 🚀 Uruchomienie lokalne

1. Otwórz terminal w katalogu projektu:
   ```bash
   cd C:\Users\oleks\.gemini\antigravity\scratch\czyscimy-wszystko-app
   ```

2. Zainstaluj zależności npm:
   ```bash
   npm install
   ```

3. Uruchom serwer deweloperski:
   ```bash
   npm run dev
   ```
   Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

4. Budowanie wersji produkcyjnej:
   ```bash
   npm run build
   ```
   Gotowe pliki trafią do katalogu `dist/`.
