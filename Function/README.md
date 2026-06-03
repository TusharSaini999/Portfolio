# Function

This folder contains small server-side functions used by the portfolio project.

Overview
--------

- `ChatBot/` — a function that powers the chat widget in the portfolio (see `src/main.js`).
- `contact-email/` — a function for sending contact emails (see `src/main.js`).

Project structure
-----------------

```
Function/
├─ ChatBot/
│  ├─ package.json
│  └─ src/
│     └─ main.js
└─ contact-email/
   ├─ package.json
   └─ src/
      └─ main.js
```

Quick start
-----------

Run each function locally by installing dependencies and using the start script defined in the subpackage. Example:

```powershell
cd Function/ChatBot
npm install
npm start

cd ..\contact-email
npm install
npm start
```

Notes
-----

- Check each subfolder's `package.json` for exact scripts and any required environment variables.
- For deployment, adapt to your hosting provider's function format (Netlify, Vercel, AWS Lambda, etc.).

If you want, I can add more detail (environment variables, example requests, or platform-specific deployment notes).
