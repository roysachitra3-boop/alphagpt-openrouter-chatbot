# AlphaGPT

OpenRouter-চালিত একটি browser-based AI chat interface। এখান থেকে বিভিন্ন AI model বেছে নিয়ে chat করা, prompt explore করা, উত্তর save করা এবং image attach করা যায়।

## চালানোর নিয়ম

প্রয়োজন: Node.js এবং npm।

```bash
npm ci
npm run dev
```

Terminal-এ Vite যে local URL দেখাবে, সেটি browser-এ খুলুন।

## OpenRouter API key

Chat-এ live উত্তর পেতে OpenRouter API key প্রয়োজন। [OpenRouter-এর key পেজ](https://openrouter.ai/keys) থেকে নিজের key তৈরি করে অ্যাপের উপরের key control বা Settings-এ দিন।

এই অ্যাপের backend নেই। Browser সরাসরি OpenRouter-এ request পাঠায় এবং key-টি ওই browser-এর `localStorage`-এ রাখা হয়। তাই নিজের key শুধু নিজের trusted browser-এ ব্যবহার করুন; public বা shared computer-এ key সংরক্ষণ করবেন না। কোনো API key source code-এ বা GitHub-এ commit করবেন না।

## Build

```bash
npm run build
npm run preview
```

Production build `dist/` directory-তে তৈরি হবে। Static hosting-এ publish করতে `npm run build` চালিয়ে `dist/` deploy করুন।

## প্রযুক্তি

- React ও TypeScript
- Vite
- Tailwind CSS
- OpenRouter Chat Completions API
