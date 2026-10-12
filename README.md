# BankDash

React + TypeScript + Vite + Tailwind CSS (v3) + React Router.

    npm install
    npm run dev

Routes: / , /transactions, /accounts, /investments, /credit-cards, /loans, /services, /privileges, /settings

## Prototype interactions

The dashboard uses local mock data. Quick transfers add transactions, added cards are shared across dashboard pages, and the transaction list supports type filters and search. Profile, preferences, and security settings include interactive forms. Changes are held in browser memory and reset on a full reload; no banking API is connected.

Use the sun/moon button in the header to switch between light and dark themes. The selected theme is saved in browser storage and restored on reload.

    npm run build
