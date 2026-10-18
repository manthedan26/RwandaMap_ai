/* RwandaMap AI – online AI proxy (Cloudflare Worker).
   Keeps your AI API key on the server, never in the website.
   Settings (Cloudflare dashboard > your Worker > Settings > Variables and Secrets):
     ANTHROPIC_API_KEY  (Secret)  your Anthropic API key
     ALLOWED_ORIGIN     (Text)    your site address, e.g. https://YOUR-USERNAME.github.io   (use * only for testing)
     MODEL              (Text, optional) defaults to claude-sonnet-5-5                                  */

const SYSTEM = `You are the assistant of an education platform in Rwanda built by Manthedan (developer: Manzi Brian Bonheur, assistant: Igihozo Narada).
Answer helpfully and accurately on any topic the user asks about: school subjects, study help, exam preparation, careers, technology, health information, general knowledge, and more.
Language: reply in the language the user writes in (Kinyarwanda, English or French). Keep answers clear and not too long; use simple words for students.
Platform facts you can rely on:
- Library tab: official REB textbooks by class (P1-P6, S1-S3, S4-S6) on https://elearning.reb.rw, and national exam past papers (P6, S3, S6, TVET, TTC) in official NESA folders on https://www.nesa.gov.rw.
- Official figures (MINEDUC Education Statistical Yearbook 2024/2025): 4,996 schools; 4,822,507 learners; 83.7% of schools have internet; pupil/classroom ratio 51:1; owners: Government 1,576, Catholic 1,402, Protestant 1,026, Individuals/NGOs 846, Adventist 84, Islamic 33, Parents' associations 29.
Rules:
- Never invent book titles, page numbers, links, statistics or exam questions. If you are not sure, say so and point to the Library tab, REB eLearning or NESA.
- Do not claim to know the content of a specific past paper unless the user pastes it.
- For health, legal or money questions, give general information and suggest asking a qualified professional for personal decisions.
- For homework, explain step by step so the student learns.
- Be kind and respectful. Decline harmful requests briefly.`;

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const allowed = env.ALLOWED_ORIGIN || '*';
    const cors = {
      'Access-Control-Allow-Origin': allowed === '*' ? '*' : allowed,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    };
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'POST') return json({ error: 'Use POST' }, 405, cors);
    if (allowed !== '*' && origin !== allowed) return json({ error: 'Origin not allowed' }, 403, cors);
    if (!env.ANTHROPIC_API_KEY) return json({ error: 'Server is not configured' }, 500, cors);

    let body;
    try { body = await req.json(); } catch (e) { return json({ error: 'Bad JSON' }, 400, cors); }
    let msgs = (Array.isArray(body.messages) ? body.messages : []).slice(-10)
      .map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content || '').slice(0, 2000) }))
      .filter(m => m.content.trim());
    while (msgs.length && msgs[0].role !== 'user') msgs.shift();
    if (!msgs.length || msgs[msgs.length - 1].role !== 'user') return json({ error: 'No question' }, 400, cors);
    const lang = ['rw', 'fr', 'en'].includes(body.language) ? body.language : 'en';

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: env.MODEL || 'claude-sonnet-5-5',
        max_tokens: 900,
        system: SYSTEM + `\nThe site interface language is "${lang}", but follow the language of the user's message.`,
        messages: msgs
      })
    });
    if (!r.ok) return json({ error: 'AI service error' }, 502, cors);
    const data = await r.json();
    const reply = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
    return json({ reply: reply || '' }, 200, cors);
  }
};
