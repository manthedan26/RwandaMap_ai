# Online AI for RwandaMap AI (answers any question)

The website works offline for books, past papers and official figures. To let the assistant answer **any** question, connect it to a language model through this small server. The AI key stays on the server, never in your website files.

## Cost and safety
- The AI provider charges per use. Set a **monthly spend limit** in your provider account first.
- Set `ALLOWED_ORIGIN` to your own site so other websites cannot use your key.
- Never put the key in `config.js`, GitHub or any website file.

## Steps (Cloudflare Workers, free plan is enough to start)
1. Create a free account at cloudflare.com and open **Workers & Pages**.
2. Create a new **Worker** (the "Hello World" template), then **Edit code**.
3. Delete the sample code, paste the whole of `worker.js`, and **Deploy**.
4. In the Worker's **Settings → Variables and Secrets** add:
   - `ANTHROPIC_API_KEY` as a **Secret** (your key from console.anthropic.com)
   - `ALLOWED_ORIGIN` as text, for example `https://YOUR-USERNAME.github.io`
   - `MODEL` (optional) to choose a different model name
5. Copy the Worker address (it ends with `.workers.dev`).
6. In the website, open `config.js` and set `window.RM_AI_ENDPOINT = "https://YOUR-WORKER.workers.dev";` then upload it to GitHub.
7. Open the AI Access Gap tab. The line above the chat should say **Online AI connected**.

If the server is down, the assistant falls back to its offline answers automatically.
