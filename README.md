# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Folder Structure

```
english-learning
├─ components.json
├─ eslint.config.js
├─ index.html
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ public
├─ README.md
├─ src
│  ├─ App.jsx
│  ├─ assets
│  ├─ components
│  │  ├─ layout
│  │  │  ├─ AuthLayout.jsx
│  │  │  ├─ Footer.jsx
│  │  │  ├─ Header.jsx
│  │  │  └─ MainLayout.jsx
│  │  ├─ shared
│  │  │  └─ UserDropdown.jsx
│  │  └─ ui
│  │     ├─ avatar.jsx
│  │     ├─ button.jsx
│  │     ├─ card.jsx
│  │     ├─ dropdown-menu.jsx
│  │     ├─ form.jsx
│  │     ├─ input.jsx
│  │     ├─ label.jsx
│  │     ├─ sheet.jsx
│  │     ├─ skeleton.jsx
│  │     └─ sonner.jsx
│  ├─ config
│  ├─ features
│  │  ├─ api
│  │  │  └─ apiSlice.js
│  │  ├─ auth
│  │  │  ├─ authApiSlice.js
│  │  │  ├─ AuthProvider.jsx
│  │  │  ├─ authSlice.js
│  │  │  └─ components
│  │  │     ├─ LoginForm.jsx
│  │  │     └─ RegisterForm.jsx
│  │  ├─ learn
│  │  └─ user
│  ├─ hooks
│  ├─ index.css
│  ├─ lib
│  │  ├─ supabase.js
│  │  └─ utils.js
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ DashboardPage.jsx
│  │  ├─ HomePage.jsx
│  │  ├─ LoginPage.jsx
│  │  └─ RegisterPage.jsx
│  ├─ routes
│  │  └─ ProtectedRoute.jsx
│  └─ store
│     └─ index.js
└─ vite.config.js

```
