# AlphaGPT

AlphaGPT is a browser-based AI chat interface powered by OpenRouter. Choose from available AI models, explore prompt ideas, save messages, and attach images to your chats.

## Getting Started

You will need [Node.js](https://nodejs.org/) and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite in your browser.

## OpenRouter API Key

To get live AI responses, create an API key on the [OpenRouter keys page](https://openrouter.ai/keys) and enter it in the app's top bar or Settings.

This app has no backend. Your browser sends requests directly to OpenRouter and stores the key in that browser's `localStorage`. Use your own key only in a browser you trust, and do not save it on public or shared computers. Never add API keys to source code or commit them to GitHub.

## Production Build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`. To deploy on a static hosting provider, use `npm run build` as the build command and `dist` as the output directory.

## Windows Desktop App

Run the desktop app in development mode with:

```bash
npm run desktop:dev
```

Create a Windows installer (`AlphaGPT-Setup-0.0.0.exe`) on a Windows machine with:

```bash
npm run desktop:build
```

The installer is generated in `release/`. The installed app still requires your own OpenRouter API key for live responses.

Every push to `main` also starts the **Build Windows Installer** workflow on GitHub Actions. To get its installer, open the repository's **Actions** tab, select the latest successful run, and download the `AlphaGPT-Windows-Installer` artifact.

## Built With

- React and TypeScript
- Vite
- Tailwind CSS
- OpenRouter Chat Completions API
