/* RwandaMap AI – script.js
   Application logic and interactivity. © 2026 Manthedan.
   Real data only: school names come from data/schools.js or the Import button.
   National figures come from the MINEDUC 2024/2025 Education Statistical Yearbook. */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------------- Icons ---------------- */
  const ICONS = {
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    'plus-circle': '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>',
    map: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    phone: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    crosshair: '<circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>'
  };
  const icon = n => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`;
  $$('[data-icon]').forEach(el => el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon)));

  /* ---------------- Reference data ---------------- */
  const PROV = ['Kigali City', 'Northern Province', 'Southern Province', 'Eastern Province', 'Western Province'];
  // Approximate district centres [name, province index, lng, lat] – used only to place the district filter
  // and to guess the district of imported records that have none (shown as "approx.").
  const DISTRICTS = [
    ['Gasabo', 0, 30.12, -1.89], ['Kicukiro', 0, 30.11, -2.01], ['Nyarugenge', 0, 30.05, -1.96],
    ['Musanze', 1, 29.63, -1.50], ['Burera', 1, 29.83, -1.46], ['Gicumbi', 1, 30.10, -1.58], ['Rulindo', 1, 29.99, -1.73], ['Gakenke', 1, 29.78, -1.69],
    ['Nyanza', 2, 29.75, -2.35], ['Huye', 2, 29.74, -2.60], ['Muhanga', 2, 29.75, -2.08], ['Kamonyi', 2, 29.90, -2.00], ['Ruhango', 2, 29.78, -2.22], ['Nyamagabe', 2, 29.40, -2.45], ['Nyaruguru', 2, 29.55, -2.72], ['Gisagara', 2, 29.85, -2.62],
    ['Rwamagana', 3, 30.43, -1.95], ['Kayonza', 3, 30.55, -1.90], ['Kirehe', 3, 30.65, -2.25], ['Ngoma', 3, 30.50, -2.20], ['Bugesera', 3, 30.19, -2.19], ['Nyagatare', 3, 30.40, -1.35], ['Gatsibo', 3, 30.40, -1.65],
    ['Rubavu', 4, 29.35, -1.70], ['Nyabihu', 4, 29.50, -1.65], ['Ngororero', 4, 29.60, -1.90], ['Rutsiro', 4, 29.35, -1.95], ['Karongi', 4, 29.38, -2.12], ['Nyamasheke', 4, 29.15, -2.35], ['Rusizi', 4, 29.02, -2.52]
  ];
  // Official national figures: MINEDUC Education Statistical Yearbook 2024/2025 (school year ended July 2025)
  const OFFICIAL = {
    schools: 4996,
    owner: [['Government', 1576], ['Catholic', 1402], ['Protestant', 1026], ['Individuals/NGOs', 846], ['Adventist', 84], ['Islamic', 33], ['Parents assoc.', 29]],
    status: [['Government-subsidized', 2083], ['Public', 1576], ['Private', 1337]]
  };
  const TYPES = {
    Primary: { cls: 'pri', col: 'var(--c-pri)' }, Secondary: { cls: 'sec', col: 'var(--c-sec)' },
    TVET: { cls: 'tvet', col: 'var(--c-tvet)' }, 'Special Needs': { cls: 'sne', col: 'var(--c-sne)' },
    Unclassified: { cls: 'unc', col: '#7b8794' }
  };

  /* ---------------- Records: load, parse, import ---------------- */
  let SCHOOLS = [];
  let uid = 0;
  const STORE = 'rm-import-v1';
  function nearestDistrict(lng, lat) {
    let best = null, bd = 1e9;
    DISTRICTS.forEach(d => { const k = Math.hypot(d[2] - lng, d[3] - lat); if (k < bd) { bd = k; best = d; } });
    return best;
  }
  function classify(name, raw) {
    if (raw) { const hit = Object.keys(TYPES).find(t => t.toLowerCase() === String(raw).trim().toLowerCase()); if (hit) return hit; }
    const s = ((raw || '') + ' ' + name).toLowerCase();
    if (/special needs|inclusive|deaf|blind/.test(s)) return 'Special Needs';
    if (/tvet|technical|vocational|polytechnic|\biprc\b|\beto\b|\bvtc\b|\brtb\b/.test(s)) return 'TVET';
    if (/primary|ecole primaire|école primaire|\bep\b/.test(s)) return 'Primary';
    if (/secondary|secondaire|lyc[ée]e|coll[eè]ge|high school|\bes\b/.test(s)) return 'Secondary';
    return 'Unclassified';
  }
  function normalize(r) {
    const lat = parseFloat(r.lat), lng = parseFloat(r.lng), name = String(r.name || '').trim();
    if (!name || !isFinite(lat) || !isFinite(lng) || lat > -0.9 || lat < -3 || lng < 28.7 || lng > 31) return null;
    let dist = String(r.district || '').replace(/ district$/i, '').trim(), prov = String(r.province || '').trim(), approx = false;
    const known = DISTRICTS.find(d => d[0].toLowerCase() === dist.toLowerCase());
    if (known) { dist = known[0]; prov = PROV[known[1]]; }
    else if (!dist && r.guess !== false && r.guessDistrict) { const d = nearestDistrict(lng, lat); dist = d[0]; prov = PROV[d[1]]; approx = true; }
    else if (prov) { const pm = PROV.find(p => p.toLowerCase().startsWith(prov.toLowerCase().replace(/ province$/, ''))); prov = pm || prov; }
    return { id: ++uid, name, type: classify(name, r.type), prov: prov || '', dist, approx, sector: String(r.sector || '').trim(), lat, lng, source: r.source || '', notes: r.notes || '' };
  }
  function csvRows(text) {
    const rows = []; let row = [], cur = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
      else if (c === '"') q = true;
      else if (c === ',') { row.push(cur); cur = ''; }
      else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
      else if (c !== '\r') cur += c;
    }
    if (cur || row.length) { row.push(cur); rows.push(row); }
    return rows;
  }
  function parseCSV(text) {
    const rows = csvRows(text.replace(/^\uFEFF/, '')); if (rows.length < 2) return [];
    const h = rows[0].map(x => x.trim().toLowerCase());
    const col = (...names) => h.findIndex(x => names.includes(x));
    const iN = col('name', 'school', 'school_name', 'schoolname'), iT = col('type', 'level', 'category', 'school_type'),
      iP = col('province', 'intara'), iD = col('district', 'akarere'), iS = col('sector', 'umurenge'),
      iLa = col('lat', 'latitude', 'y'), iLo = col('lng', 'lon', 'long', 'longitude', 'x');
    return rows.slice(1).map(r => ({ name: r[iN], type: iT >= 0 ? r[iT] : '', province: iP >= 0 ? r[iP] : '', district: iD >= 0 ? r[iD] : '', sector: iS >= 0 ? r[iS] : '', lat: r[iLa], lng: r[iLo], guessDistrict: iD < 0, source: 'Imported CSV' }));
  }
  function parseGeo(obj) {
    const feats = obj.type === 'FeatureCollection' ? obj.features : Array.isArray(obj) ? obj : [];
    const out = []; let skipped = 0;
    feats.forEach(f => {
      const p = f.properties || {}, g = f.geometry; if (!g) return;
      const am = p.amenity || ''; if (am === 'university' || am === 'kindergarten') { skipped++; return; }
      const name = p.name || p['name:en'] || p['name:rw'] || p['name:fr'];
      if (!name) { skipped++; return; }
      let c = null;
      if (g.type === 'Point') c = g.coordinates;
      else { const ring = g.type === 'Polygon' ? g.coordinates[0] : g.type === 'MultiPolygon' ? g.coordinates[0][0] : null; if (ring && ring.length) c = [ring.reduce((a, q) => a + q[0], 0) / ring.length, ring.reduce((a, q) => a + q[1], 0) / ring.length]; }
      if (!c) return;
      out.push({ name, type: '', province: '', district: p.district || '', sector: '', lat: c[1], lng: c[0], guessDistrict: !p.district, source: 'OpenStreetMap contributors (HOT export)' });
    });
    out.skipped = skipped; return out;
  }
  function setRecords(list) { uid = 0; SCHOOLS = list.map(normalize).filter(Boolean); }
  function loadInitial() {
    let saved = null; try { saved = JSON.parse(localStorage.getItem(STORE) || 'null'); } catch (e) {}
    setRecords(saved && saved.length ? saved : (window.RM_SCHOOLS || []));
  }
  loadInitial();

  /* ---------------- Insights bars ---------------- */
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fmtN = n => n.toLocaleString('en-US');
  function bars(el, rows, max, colFn) {
    el.innerHTML = rows.map(([k, v], i) => `<div class="bar"><span>${esc(k)}</span><div class="track"><div class="fill" style="width:${max ? Math.round(v / max * 100) : 0}%;background:${colFn(k, i)}"></div></div><b>${fmtN(v)}</b></div>`).join('');
  }
  bars($('#barsOwner'), OFFICIAL.owner, OFFICIAL.owner[0][1], () => 'var(--blue)');
  bars($('#barsStatus'), OFFICIAL.status, OFFICIAL.status[0][1], () => 'var(--green)');
  function renderBars() {
    const list = SCHOOLS;
    if (!SCHOOLS.length) { $('#barsType').innerHTML = $('#barsProv').innerHTML = '<p class="note">No records loaded yet. Use Import data.</p>'; return; }
    const byT = Object.keys(TYPES).map(t => [t, list.filter(s => s.type === t).length]);
    bars($('#barsType'), byT, Math.max(1, ...byT.map(r => r[1])), k => TYPES[k].col);
    const byP = PROV.map(p => [p.replace(' Province', ''), list.filter(s => s.prov === p).length]);
    bars($('#barsProv'), byP, Math.max(1, ...byP.map(r => r[1])), () => 'var(--blue)');
  }

  /* ---------------- AI access gap ---------------- */
  const median = a => { const s = a.slice().sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
  let dc = [], med = 0, covered = 0;
  const FLAGCOL = { r: '#e5484d', y: '#f5a524', g: 'var(--green)' };
  function renderGap() {
    dc = DISTRICTS.map(d => ({ name: d[0], prov: PROV[d[1]], n: SCHOOLS.filter(s => s.dist === d[0]).length }));
    covered = dc.filter(d => d.n > 0).length; med = median(dc.map(d => d.n));
    dc.forEach(d => { d.flag = covered < 10 ? 'g' : d.n < med * 0.7 ? 'r' : d.n < med ? 'y' : 'g'; });
    if (!SCHOOLS.length) { $('#gapList').innerHTML = '<p class="note">No records loaded yet. Import school data to compare districts.</p>'; return; }
    const max = Math.max(1, ...dc.map(d => d.n));
    const warn = covered < 10 ? `<div class="warn">Only ${covered} of 30 districts have records, so district comparison is not meaningful yet.</div>` : '';
    $('#gapList').innerHTML = warn + dc.slice().sort((a, b) => a.n - b.n).map(d =>
      `<div class="gapRow"><span>${d.name}</span><div class="track"><div class="fill" style="width:${Math.round(d.n / max * 100)}%;background:${FLAGCOL[d.flag]}"></div></div><b>${d.n}</b></div>`).join('');
  }
  const names = list => list.map(d => `${d.name} (${d.n})`).join(', ');

  /* ---------------- AI assistant: Kinyarwanda / English / French ---------------- */
  let chatLang = 'en', lastDistrict = null;
  const plain = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/['’`´]/g, ' ').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const LEX = {
    rw: 'muraho mwaramutse mwiriwe uraho amakuru amashuri ishuri ikarita uturere akarere intara murakoze urakoze angahe ingahe abanyeshuri abarimu uri nde ukora iki ushobora mfasha nyamuneka ahari menshi make macye gusuzumwa gusuzuma ubumuga imyuga murandasi ibyumba leta yego oya mbwira sobanurira mumfashe ese bite ngo muri kandi cyangwa byiza neza dufite ufite afite ni mwese bose abanza ayisumbuye gihugu igitabo ibitabo ibizamini bya cya ubushize isomero ndashaka nshaka'.split(' '),
    fr: 'bonjour bonsoir salut ecoles ecole combien quelles quels quel quelle les des est sont je vous merci revoir districts moins plus nombre eleves enseignants carte aide peux pouvez avec pour dans sur une un le la ou parle moi livre livres examens anciens matiere classe mathematiques cherche'.split(' '),
    en: 'the what which where how many are is schools school there fewer most districts district have of in and hello hi thanks thank help you your can do should about tell me who why with book books past papers paper find give show need want please exam exams level subject class'.split(' ')
  };
  function detectLang(n) {
    const tk = n.split(' '), sc = { rw: 0, fr: 0, en: 0 };
    tk.forEach(t => { for (const k in LEX) if (LEX[k].includes(t)) sc[k]++; });
    const best = Object.keys(sc).sort((a, b) => sc[b] - sc[a])[0];
    return sc[best] > 0 ? best : chatLang;
  }
  const T3 = (L, en, rw, fr) => ({ en, rw, fr }[L] || en);
  const TYPE_LBL = { en: { Primary: 'Primary', Secondary: 'Secondary', TVET: 'TVET', 'Special Needs': 'Special needs', Unclassified: 'Type not stated' }, fr: { Primary: 'Primaire', Secondary: 'Secondaire', TVET: 'ETFP', 'Special Needs': 'Besoins spécifiques', Unclassified: 'Type non précisé' }, rw: { Primary: 'Abanza', Secondary: 'Ayisumbuye', TVET: 'Imyuga (TVET)', 'Special Needs': 'Abafite ubumuga', Unclassified: 'Ubwoko ntibuzwi' } };

  const GREET = /^(muraho|mwaramutse|mwiriwe|uraho|hello|hi|hey|hallo|bonjour|bonsoir|salut|good morning|good afternoon|good evening|bite|yo)\b/;
  const RX = {
    thanks: /\b(murakoze|urakoze|thank|thanks|merci|shimira)/,
    bye: /\b(murabeho|urabeho|tuzongera|bye|goodbye|au revoir|a bientot|ijoro ryiza)\b/,
    how: /\b(amakuru|how are you|how r u|ca va|comment vas|comment allez|urumeze|umeze|mumeze|meze)\b/,
    who: /\b(uri nde|ukora iki|wakora iki|ushobora|mfasha|mumfashe|ubufasha|ufasha|who are you|what can you|what do you|what are you|help|aide|qui es|que peux|que fais|izina ryawe|your name|ton nom|ni nde wagukoze|wakozwe)\b/,
    count: /\b(angahe|ingahe|umubare|how many|total|number of|combien|nombre)\b/,
    learners: /\b(abanyeshuri|abiga|abana biga|learners|students|pupils|eleves|apprenants|enrol)/,
    teachers: /\b(abarimu|umwarimu|teacher|teachers|enseignant|enseignants)\b/,
    fewer: /\b(make|macye|hake|few|fewer|fewest|least|lowest|moins|peu|ntaho|adahagije|insufficient|icyuho|ibura|ahabura|gap|limited)\b/,
    most: /\b(menshi|henshi|yiganje|arenga|most|highest|many|concentrat\w*|plus|dense)\b/,
    invest: /(gusuzum|suzuma|investigat|priorit|challeng|should|examiner|prioritaire|ibibazo|ikibazo|akwiye|dukwiye)/,
    owner: /(nyiri|ba nyiri|ownership|owner|church|catholic|protestant|government|leta|kiliziya|gatolika|protestanti|proprietaire|eglise|private|privee|ayigenga|status)/,
    internet: /(murandasi|interineti|internet|wifi|computer|mudasobwa|\bict\b|ikoranabuhanga|numerique|ordinateur)/,
    classroom: /(ibyumba|icyumba|ubucucike|classroom|\bratio\b|crowd|salle|\bclasses?\b|surpeuple)/,
    infra: /(amashanyarazi|umuriro|electric|\bamazi\b|\bwater\b|\beau\b|toilet|ubwiherero|sanitation)/,
    special: /(ubumuga|disab|special needs|handicap|besoins specifiques|inclusi)/,
    tvet: /(tvet|imyuga|ubumenyi ngiro|vocational|technique|etfp)/,
    province: /(intara|province)/,
    source: /(inkomoko|aho amakuru|source|sources|ou viennent|d ou|where.*data|data from)/,
    library: /(\bbook\b|\bbooks\b|ibitabo|igitabo|livre|livres|library|isomero|bibliotheque|textbook|textbooks|syllabus|syllabi|curriculum)/,
    papers: /(past paper|past papers|national exam|examen|ibizamini|ibibazo by ibizamini|\bnesa\b|\bple\b|question paper)/
  };

  const greetBack = (w, L) => {
    if (/^(mwaramutse)/.test(w)) return 'Mwaramutse neza!';
    if (/^(mwiriwe)/.test(w)) return 'Mwiriwe neza!';
    if (/^(muraho|uraho|bite)/.test(w)) return 'Muraho!';
    if (/^good morning/.test(w)) return 'Good morning!';
    if (/^good afternoon/.test(w)) return 'Good afternoon!';
    if (/^good evening/.test(w)) return 'Good evening!';
    if (/^(bonjour|salut|bonsoir)/.test(w)) return w === 'bonsoir' ? 'Bonsoir !' : 'Bonjour !';
    return 'Hello!';
  };
  const intro = L => T3(L,
    'I\'m the assistant of this platform, built by Manthedan. Here is what I do:\n• help you find official REB books by class and subject\n• point you to national exam past papers (P6, S3, S6)\n• explain Rwanda\'s official education figures (MINEDUC 2024/25)\n• compare districts using the loaded school records\n• answer in Kinyarwanda, English or French\nWhat would you like to know?',
    'Ndi umufasha w\'uru rubuga, rwakozwe na Manthedan. Dore icyo nkora:\n• kubafasha kubona ibitabo bya REB ukurikije ishuri n\'isomo\n• kubereka ibizamini by\'ubushize bya Leta (P6, S3, S6)\n• gusobanura imibare y\'uburezi yemewe (MINEDUC 2024/25)\n• kugereranya uturere hakoreshejwe amashuri yashyizweho\n• gusubiza mu Kinyarwanda, Icyongereza cyangwa Igifaransa\nMwifuza kumenya iki?',
    'Je suis l\'assistant de cette plateforme, créée par Manthedan. Voici ce que je fais :\n• vous aider à trouver les livres officiels du REB par classe et matière\n• vous orienter vers les anciens examens nationaux (P6, S3, S6)\n• expliquer les chiffres officiels de l\'éducation (MINEDUC 2024/25)\n• comparer les districts avec les écoles chargées\n• répondre en kinyarwanda, anglais ou français\nQue voulez-vous savoir ?');
  const howRep = L => T3(L, 'I\'m doing well, thank you!', 'Ni byiza cyane, murakoze!', 'Je vais bien, merci !');
  const loadedLine = L => SCHOOLS.length ? T3(L, `In this platform, ${fmtN(SCHOOLS.length)} school records are loaded.`, `Mu rubuga hashyizwemo amashuri ${fmtN(SCHOOLS.length)}.`, `Dans cette plateforme, ${fmtN(SCHOOLS.length)} écoles sont chargées.`) : T3(L, 'No school records are loaded in the platform yet.', 'Nta mashuri arashyirwamo.', 'Aucune école n\'est encore chargée.');
  const needData = L => T3(L, 'No school records are loaded yet, so I cannot compare areas. Tap "Load all schools from OpenStreetMap" or "Import data" first. I can still answer national questions (number of schools, owners, internet, classrooms).', 'Nta makuru y\'amashuri arashyirwamo, ntabwo nshobora kugereranya uturere. Banza mukande "Load all schools from OpenStreetMap" cyangwa "Import data". Nshobora gusubiza ibibazo by\'igihugu cyose (umubare w\'amashuri, ba nyiri yo, murandasi, ibyumba).', 'Aucune école n\'est chargée, je ne peux donc pas comparer les zones. Appuyez d\'abord sur "Load all schools from OpenStreetMap" ou "Import data". Je peux répondre aux questions nationales (nombre d\'écoles, propriétaires, internet, salles).');
  const fewData = L => T3(L, `Only ${covered} of 30 districts have records loaded, so a district comparison would be misleading. Load a fuller dataset first.`, `Uturere ${covered} kuri 30 ni two dufite amakuru mu rubuga, bityo kugereranya byayobya. Banza mushyireho amakuru yuzuye.`, `Seulement ${covered} districts sur 30 ont des données, la comparaison serait trompeuse. Chargez d'abord plus de données.`);
  const caveat = L => '\n\n' + T3(L, 'Note: fewer schools does not automatically mean a problem, and loaded records may be incomplete. Compare with MINEDUC and population data before concluding.', 'Icyitonderwa: kugira amashuri make ntibivuze ko hari ikibazo, kandi amakuru ashyizwe mu rubuga ashobora kuba atuzuye. Mbere yo gufata umwanzuro, mugereranye n\'imibare ya MINEDUC n\'iy\'abaturage.', 'Remarque : moins d\'écoles ne signifie pas forcément un problème, et les données chargées peuvent être incomplètes. Comparez avec les données du MINEDUC et de la population avant de conclure.');

  function districtSummary(d, L) {
    lastDistrict = d[0];
    const rows = SCHOOLS.filter(s => s.dist === d[0]);
    if (!SCHOOLS.length) return needData(L);
    const by = {}; rows.forEach(s => by[s.type] = (by[s.type] || 0) + 1);
    const types = Object.keys(by).map(t => `${TYPE_LBL[L][t]} ${by[t]}`).join(', ');
    const rank = covered >= 10 ? [...dc].sort((a, b) => b.n - a.n).findIndex(x => x.name === d[0]) + 1 : 0;
    const tail = T3(L, 'For official district totals, see MINEDUC yearbook annexes 2 to 4.', 'Ku mibare yemewe y\'akarere, reba inyongera ya 2 kugeza 4 mu gitabo cya MINEDUC.', 'Pour les totaux officiels du district, voir les annexes 2 à 4 de l\'annuaire du MINEDUC.');
    if (!rows.length) return T3(L, `${d[0]} (${PROV[d[1]]}): no school records are loaded for this district yet. ${tail}`, `${d[0]} (${PROV[d[1]]}): nta mashuri arashyirwa mu rubuga kuri aka karere. ${tail}`, `${d[0]} (${PROV[d[1]]}) : aucune école chargée pour ce district. ${tail}`);
    const rk = rank ? T3(L, ` It ranks ${rank} of 30 districts by loaded records.`, ` Iri ku mwanya wa ${rank} kuri 30 mu ikarita.`, ` Il est au rang ${rank} sur 30.`) : '';
    return T3(L, `${d[0]} (${PROV[d[1]]}): ${rows.length} school record${rows.length === 1 ? '' : 's'} loaded (${types}).${rk} ${tail}`, `${d[0]} (${PROV[d[1]]}): amashuri ${rows.length} ashyizwe mu rubuga (${types}).${rk} ${tail}`, `${d[0]} (${PROV[d[1]]}) : ${rows.length} école(s) chargée(s) (${types}).${rk} ${tail}`);
  }

  function route(n, raw, L) {
    const has = k => RX[k].test(n);
    if (has('thanks')) return T3(L, 'You\'re welcome! Ask me anything else about schools in Rwanda.', 'Ntacyo, murakoze namwe! Mushobora kumbaza ikindi kibazo ku mashuri yo mu Rwanda.', 'Avec plaisir ! N\'hésitez pas à poser d\'autres questions.');
    if (has('bye')) return T3(L, 'Goodbye! Come back any time.', 'Murabeho! Mwongere mugaruke igihe cyose.', 'Au revoir ! Revenez quand vous voulez.');
    if (has('who')) return intro(L);
    if (has('papers')) return papersAnswer(n, L);
    if (has('library')) return libraryAnswer(n, L);
    const data = ['count', 'learners', 'teachers', 'fewer', 'most', 'invest', 'owner', 'internet', 'classroom', 'infra', 'special', 'tvet', 'province', 'source', 'library', 'papers'].some(has);
    const dist = DISTRICTS.find(d => new RegExp('\\b' + plain(d[0]) + '\\b').test(n));
    if (has('how') && !data && !dist && n.split(' ').length <= 5) return { how: true };
    if (has('learners') && !has('special') && !has('classroom') && !has('teachers') && !has('tvet')) return T3(L, 'Rwanda had 4,822,507 learners in 2024/25 (up 1.2% from 4,766,125), about 34.2% of the population. Primary: 2,952,236; pre-primary: 683,234; lower secondary: 573,321; upper secondary: 338,947. (MINEDUC yearbook; population projections from NISR.)', 'Mu Rwanda hari abanyeshuri 4,822,507 mu 2024/25 (bavuye kuri 4,766,125, hiyongereyeho 1.2%), ni 34.2% by\'abaturage. Abanza: 2,952,236; incuke: 683,234; ayisumbuye yo hasi: 573,321; ayisumbuye yo hejuru: 338,947. (Igitabo cya MINEDUC; imibare y\'abaturage ya NISR.)', 'Le Rwanda comptait 4 822 507 apprenants en 2024/25 (+1,2 % par rapport à 4 766 125), soit environ 34,2 % de la population. Primaire : 2 952 236 ; préprimaire : 683 234 ; secondaire inférieur : 573 321 ; secondaire supérieur : 338 947.');
    if (has('teachers')) return T3(L, 'Pupil-to-trained-teacher ratios in 2024/25: pre-primary 95:1, primary 59:1, secondary 34:1, TVET 45:1. Primary teachers are 99.8% qualified, but only 69.8% are trained for their level.', 'Abanyeshuri kuri buri mwarimu wahuguwe mu 2024/25: incuke 95:1, abanza 59:1, ayisumbuye 34:1, TVET 45:1. Abarimu b\'abanza 99.8% bujuje ibisabwa, ariko 69.8% gusa ni bo bahuguwe ku rwego bigishaho.', 'Élèves par enseignant formé en 2024/25 : préprimaire 95:1, primaire 59:1, secondaire 34:1, ETFP 45:1. Les enseignants du primaire sont qualifiés à 99,8 %, mais seulement 69,8 % sont formés pour leur niveau.');
    if (has('owner')) return T3(L, 'School owners nationwide (MINEDUC 2024/25, 4,996 schools): Government 1,576 (31.5%), Catholic 1,402 (28.1%), Protestant 1,026 (20.5%), Individuals/NGOs 846 (16.9%), Adventist 84, Islamic 33, Parents\' associations 29.\nBy status: government-subsidized 2,083, public 1,576, private 1,337.', 'Ba nyiri amashuri mu gihugu (MINEDUC 2024/25, amashuri 4,996): Leta 1,576 (31.5%), Kiliziya Gatolika 1,402 (28.1%), Abaprotestanti 1,026 (20.5%), Abantu ku giti cyabo n\'imiryango itari iya Leta 846 (16.9%), Abadivantisiti 84, Abayisilamu 33, Amashyirahamwe y\'ababyeyi 29.\nKu bwoko: afashwa na Leta 2,083, aya Leta 1,576, ayigenga 1,337.', 'Propriétaires des écoles (MINEDUC 2024/25, 4 996 écoles) : État 1 576 (31,5 %), catholique 1 402 (28,1 %), protestant 1 026 (20,5 %), particuliers/ONG 846 (16,9 %), adventiste 84, islamique 33, associations de parents 29.\nPar statut : subventionnées 2 083, publiques 1 576, privées 1 337.');
    if (has('internet')) return T3(L, '83.7% of schools have internet, 97.6% have at least one computer, 40.8% use ICT in teaching, 26.6% have smart classrooms and 25.9% have a computer lab (MINEDUC 2024/25).', 'Amashuri 83.7% afite murandasi, 97.6% afite nibura mudasobwa imwe, 40.8% akoresha ikoranabuhanga mu myigishirize, 26.6% afite ibyumba bya "smart" naho 25.9% afite ibyumba bya mudasobwa (MINEDUC 2024/25).', '83,7 % des écoles ont internet, 97,6 % ont au moins un ordinateur, 40,8 % utilisent les TIC, 26,6 % ont des classes intelligentes et 25,9 % un laboratoire informatique (MINEDUC 2024/25).');
    if (has('classroom')) return T3(L, 'The national pupil/classroom ratio is 51:1 (down from 52:1). Primary averages 57:1, with 71 pupils per classroom in P1, 62 in P2 and 58 in P3. Only 45.3% of primary schools meet the 46:1 standard, and 19.3% of pre-primary schools meet 30:1.', 'Ikigereranyo cy\'abanyeshuri mu cyumba mu gihugu ni 51:1 (cyari 52:1). Mu mashuri abanza ni 57:1; mu wa 1 ni abana 71 mu cyumba, mu wa 2 ni 62, mu wa 3 ni 58. Amashuri abanza 45.3% gusa ni yo yujuje igipimo cya 46:1, naho amashuri y\'incuke 19.3% yujuje 30:1.', 'Le ratio national élèves/salle est de 51:1 (contre 52:1). Primaire : 57:1, avec 71 élèves par salle en P1, 62 en P2 et 58 en P3. Seulement 45,3 % des écoles primaires respectent la norme de 46:1 et 19,3 % des préprimaires celle de 30:1.');
    if (has('infra')) return T3(L, 'Schools with grid electricity: 87.9%; tap water: 84.9%; safe drinking water: 62.9%; handwashing: 95.0%; single-sex toilets: 96.3%. The student-to-toilet ratio is 31:1 against a 25:1 target (MINEDUC 2024/25).', 'Amashuri afite amashanyarazi y\'umuyoboro: 87.9%; amazi y\'imiyoboro: 84.9%; amazi meza yo kunywa: 62.9%; aho gukarabira intoki: 95.0%; ubwiherero bwa buri gitsina: 96.3%. Abanyeshuri ku bwiherero ni 31:1 mu gihe intego ari 25:1 (MINEDUC 2024/25).', 'Écoles avec électricité du réseau : 87,9 % ; eau courante : 84,9 % ; eau potable sûre : 62,9 % ; lavage des mains : 95,0 % ; toilettes séparées : 96,3 %. Ratio élèves/toilette : 31:1 pour un objectif de 25:1.');
    if (has('special')) return T3(L, `In 2024/25, 43,663 learners with disabilities were enrolled (0.9% of all learners) and 68.8% of schools had adapted infrastructure. Only 16,170 teachers (1.2%) are trained in special needs education. ${loadedLine(L)}`, `Mu 2024/25 hari abanyeshuri 43,663 bafite ubumuga (0.9% by'abanyeshuri bose), kandi 68.8% by'amashuri afite ibikorwa byorohereza abafite ubumuga. Abarimu 16,170 gusa (1.2%) ni bo bahuguwe ku burezi budaheza. ${loadedLine(L)}`, `En 2024/25, 43 663 apprenants en situation de handicap étaient scolarisés (0,9 %) et 68,8 % des écoles avaient des aménagements. Seuls 16 170 enseignants (1,2 %) sont formés à l'éducation spécialisée. ${loadedLine(L)}`);
    if (has('tvet')) return T3(L, `581 schools offer TVET (levels 1-5): 251 stand-alone and 330 integrated with other levels. TVET enrolment is 135,025 learners (up 15.6%). ${loadedLine(L)}`, `Amashuri 581 afite imyuga n'ubumenyi ngiro (TVET): 251 yigenga naho 330 ahujwe n'ibindi byiciro. Abanyeshuri ba TVET ni 135,025 (hiyongereyeho 15.6%). ${loadedLine(L)}`, `581 écoles proposent l'ETFP (niveaux 1-5) : 251 autonomes et 330 intégrées. Effectif ETFP : 135 025 (+15,6 %). ${loadedLine(L)}`);
    if (has('source')) return T3(L, 'Official figures: MINEDUC Education Statistical Yearbook 2024/2025 (population projections by NISR). School locations: OpenStreetMap contributors, or a MINEDUC list you import. See the Sources section for links.', 'Imibare yemewe: igitabo cya MINEDUC cy\'ibarurishamibare y\'uburezi 2024/2025 (imibare y\'abaturage ya NISR). Aho amashuri aherereye: OpenStreetMap, cyangwa urutonde rwa MINEDUC mushyizeho. Reba igice cya "Sources" ku miyoboro.', 'Chiffres officiels : annuaire statistique du MINEDUC 2024/2025 (projections de population du NISR). Localisation : OpenStreetMap ou une liste du MINEDUC importée. Voir la section Sources.');
    if (dist && !has('count') && !has('province')) return districtSummary(dist, L);
    if (dist && has('count')) return districtSummary(dist, L);
    if (has('count')) return T3(L, `MINEDUC counted 4,996 schools in 2024/25: 2,083 government-subsidized, 1,576 public and 1,337 private. By level: 4,221 with pre-primary, 4,086 with primary, 1,991 with secondary and 581 with TVET (many schools offer several levels). ${loadedLine(L)}`, `MINEDUC yabaruye amashuri 4,996 mu 2024/25: afashwa na Leta 2,083, aya Leta 1,576, ayigenga 1,337. Ku byiciro: 4,221 afite incuke, 4,086 afite abanza, 1,991 afite ayisumbuye, 581 afite imyuga (TVET); ishuri rimwe rishobora kugira ibyiciro byinshi. ${loadedLine(L)}`, `Le MINEDUC a compté 4 996 écoles en 2024/25 : 2 083 subventionnées, 1 576 publiques, 1 337 privées. Par niveau : 4 221 préprimaires, 4 086 primaires, 1 991 secondaires, 581 ETFP. ${loadedLine(L)}`);
    if (has('invest') || has('fewer') || has('most')) {
      if (!SCHOOLS.length) return needData(L);
      if (covered < 10) return fewData(L) + caveat(L);
      const asc = dc.slice().sort((a, b) => a.n - b.n), desc = asc.slice().reverse();
      if (has('invest')) {
        const r = asc.filter(d => d.flag === 'r');
        return (r.length ? T3(L, `${r.length} districts have well below the typical number of loaded records:\n${names(r.slice(0, 8))}.\nThey deserve a closer look using official counts, population and travel distance.`, `Uturere ${r.length} dufite amashuri make cyane ugereranyije n'uko bisanzwe:\n${names(r.slice(0, 8))}.\nBikwiye gusuzumwa hifashishijwe imibare yemewe, abaturage n'intera.`, `${r.length} districts sont bien en dessous de la moyenne :\n${names(r.slice(0, 8))}.\nIls méritent un examen avec les chiffres officiels, la population et les distances.`) : T3(L, 'No district stands out as far below the typical number of loaded records.', 'Nta karere kagaragara ko gafite amashuri make cyane.', 'Aucun district ne se démarque nettement.')) + caveat(L);
      }
      if (has('fewer') && !has('most')) return T3(L, `Districts with the fewest school records loaded:\n${names(asc.slice(0, 5))}.`, `Uturere dufite amashuri make cyane mu yashyizwe mu rubuga:\n${names(asc.slice(0, 5))}.`, `Districts avec le moins d'écoles chargées :\n${names(asc.slice(0, 5))}.`) + caveat(L);
      return T3(L, `Most loaded school records are in:\n${names(desc.slice(0, 5))}.`, `Amashuri menshi yashyizwe mu rubuga aboneka muri:\n${names(desc.slice(0, 5))}.`, `Le plus d'écoles chargées se trouvent à :\n${names(desc.slice(0, 5))}.`) + caveat(L);
    }
    if (has('province')) return SCHOOLS.length ? T3(L, 'Loaded records per province:\n', 'Amashuri ashyizwe mu rubuga mu ntara:\n', 'Écoles chargées par province :\n') + PROV.map(p => `${p}: ${SCHOOLS.filter(s => s.prov === p).length}`).join('\n') : needData(L);
    { const t = n.split(' ').map(x => SUBJ_ALIAS[x] || x).filter(x => (x.length >= 4 || x === 'ict') && !STOP.includes(x));
      if (t.length && t.length <= 3 && LIB.classes.some(c => c.subjects.some(s => t.some(w => plain(s[0]).includes(w))))) return libraryAnswer(n, L); }
    // school name search
    if (n.length >= 4 && SCHOOLS.length) {
      const toks = n.split(' ').filter(t => t.length >= 3);
      const hits = SCHOOLS.filter(s => { const pn = plain(s.name); return pn.includes(n) || (toks.length >= 2 && toks.every(t => pn.includes(t))); }).slice(0, 3);
      if (hits.length) { return T3(L, `I found ${hits.map(h => `${h.name}${h.dist ? ' (' + h.dist + ')' : ''}`).join('; ')}. `, `Nabonye ${hits.map(h => `${h.name}${h.dist ? ' (' + h.dist + ')' : ''}`).join('; ')}. `, `J'ai trouvé ${hits.map(h => `${h.name}${h.dist ? ' (' + h.dist + ')' : ''}`).join(' ; ')}. `); }
    }
    return null;
  }
  const fallback = L => T3(L, 'I\'m not sure I understood. Try, for example: "Mathematics S3 book", "S6 past papers 2024", "How many schools are there?", "Tell me about Huye", or in Kinyarwanda: "Amashuri angahe ari mu Rwanda?"', 'Mbabarire, simbashije kumva neza. Mugerageze nka: "Igitabo cya Mathematics S3", "Ibizamini by\'ubushize bya S6", "Amashuri angahe ari mu Rwanda?", "Mbwira iby\'akarere ka Huye".', 'Je ne suis pas sûr d\'avoir compris. Essayez : "Livre de mathématiques S3", "Examens S6 2024", "Combien d\'écoles y a-t-il ?", "Parle-moi de Huye".') + (window.RM_AI_ENDPOINT ? '' : T3(L, '\n\n(General questions need the online AI. See the README to connect it.)', '\n\n(Ibibazo rusange bikenera AI ikoreshwa kuri interineti. Reba README ku kuyihuza.)', '\n\n(Les questions générales nécessitent l\'IA en ligne. Voir le README.)'));

  function reply(raw) {
    const n = plain(raw); if (!n) return '';
    const L = detectLang(n); chatLang = L;
    const g = n.match(GREET);
    let rest = g ? n.slice(g[0].length).trim().replace(/^(neza|mwese|bose|there|everyone|ai|rwandamap|rwandamap ai)\b\s*/, '').trim() : n;
    const hi = g ? greetBack(g[1], L) : '';
    if (g && !rest) return hi + '\n\n' + intro(L);
    const out = route(rest, raw, L);
    if (out && out.how) return (hi ? hi + ' ' : '') + howRep(L) + '\n\n' + intro(L);
    const body = out || fallback(L);
    return hi ? hi + '\n\n' + body : body;
  }
  const history = [];
  async function remoteAI(q) {
    const ep = window.RM_AI_ENDPOINT; if (!ep) return null;
    try {
      const r = await fetch(ep, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history.concat([{ role: 'user', content: q }]).slice(-10), language: chatLang, context: { loadedSchools: SCHOOLS.length } }) });
      if (!r.ok) return null; const j = await r.json(); return j.reply || null;
    } catch (e) { return null; }
  }
  const log = $('#chatLog');
  function fillMsg(d, txt) {
    d.textContent = '';
    txt.split(/(https?:\/\/[^\s)]+)/g).forEach(part => {
      if (/^https?:\/\//.test(part)) { const a = document.createElement('a'); a.href = part; a.target = '_blank'; a.rel = 'noopener'; a.textContent = part.length > 48 ? part.slice(0, 45) + '…' : part; d.appendChild(a); }
      else d.appendChild(document.createTextNode(part));
    });
  }
  function say(txt, who) { const d = document.createElement('div'); d.className = 'msg ' + who; fillMsg(d, txt); log.appendChild(d); log.scrollTop = log.scrollHeight; return d; }
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let busy = false;
  async function ask(q) {
    q = q.trim(); if (!q || busy) return; busy = true;
    say(q, 'me'); const t = say('…', 'bot'); t.classList.add('typing');
    let txt = await remoteAI(q); if (!txt) txt = reply(q);
    await sleep(Math.min(1100, 350 + txt.length * 3));
    t.classList.remove('typing'); fillMsg(t, txt); log.scrollTop = log.scrollHeight; busy = false;
    history.push({ role: 'user', content: q }, { role: 'assistant', content: txt }); if (history.length > 20) history.splice(0, 2);
  }
  const CHIPS = {
    en: ['Mathematics S3 book', 'S6 past papers 2024', 'Which areas have fewer schools?'],
    rw: ['Igitabo cya Mathematics S3', 'Ibizamini by\'ubushize bya S6', 'Ni utuhe turere dufite amashuri make?'],
    fr: ['Livre de mathématiques S3', 'Examens S6 2024', 'Quelles zones ont moins d\'écoles ?']
  };
  function setChips(L) { $$('#chips button').forEach((b, i) => b.textContent = CHIPS[L][i]); }
  $('#askBtn').onclick = () => { const v = $('#askIn').value; $('#askIn').value = ''; ask(v); };
  $('#askIn').addEventListener('keydown', e => { if (e.key === 'Enter') { const v = e.target.value; e.target.value = ''; ask(v); } });
  $('#chips').addEventListener('click', e => { if (e.target.tagName === 'BUTTON') ask(e.target.textContent); });
  log.innerHTML = ''; say('Muraho! Hello! Bonjour! Ask me about REB books, past papers and Rwanda\'s schools in Kinyarwanda, English or French. Try saying hello.', 'bot');
  $('#aiMode').textContent = window.RM_AI_ENDPOINT ? 'Online AI connected: ask me anything.' : 'Offline mode: books, past papers, official figures and school data. Connect the online AI to answer any question (see README).';

  /* ---------------- Modal / toast ---------------- */
  const modal = $('#modal');
  function openModal(title, html) { $('#mTitle').textContent = title; $('#mBody').innerHTML = html; modal.hidden = false; $('#mClose').focus(); }
  const closeModal = () => { modal.hidden = true; };
  $('#mClose').onclick = closeModal;
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
  let tt; function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 3200); }

  function showSchool(s) {
    openModal(s.name, `<dl class="kv"><dt>School type</dt><dd>${s.type}</dd><dt>Province</dt><dd>${esc(s.prov || 'Not stated')}</dd><dt>District</dt><dd>${esc(s.dist || 'Not stated')}${s.approx ? ' (approximate: nearest district centre)' : ''}</dd><dt>Sector</dt><dd>${esc(s.sector || 'Not stated')}</dd><dt>GPS coordinates</dt><dd>${s.lat.toFixed(5)}, ${s.lng.toFixed(5)}</dd><dt>Source</dt><dd>${esc(s.source || 'Not stated')}</dd>${s.notes ? `<dt>Notes</dt><dd>${esc(s.notes)}</dd>` : ''}</dl>`);
  }
  $('#allSchools').onclick = () => {
    if (!SCHOOLS.length) { openImport(); return; }
    openModal(`Schools (${fmtN(SCHOOLS.length)})`, `<input class="find" id="mFind" type="search" placeholder="Filter this list..." aria-label="Filter list"><div id="mTbl"></div>`);
    const draw = (t = '') => {
      const rows = SCHOOLS.filter(s => (s.name + s.dist + s.type).toLowerCase().includes(t.toLowerCase())).slice(0, 200);
      $('#mTbl').innerHTML = `<table><thead><tr><th>School</th><th>Type</th><th>District</th></tr></thead><tbody>${rows.map(s => `<tr class="row" data-id="${s.id}" tabindex="0"><td>${esc(s.name)}</td><td>${s.type}</td><td>${esc(s.dist || '–')}</td></tr>`).join('')}</tbody></table>`;
    };
    draw();
    $('#mFind').oninput = e => draw(e.target.value);
    $('#mTbl').onclick = e => { const tr = e.target.closest('tr.row'); if (tr) showSchool(SCHOOLS.find(s => s.id == tr.dataset.id)); };
  };
  $('#exportBtn').onclick = () => {
    if (!SCHOOLS.length) { toast('No school records to export yet'); return; }
    const csv = ['Name,Type,Province,District,Sector,Latitude,Longitude,Source'].concat(SCHOOLS.map(s => [s.name, s.type, s.prov, s.dist, s.sector, s.lat.toFixed(5), s.lng.toFixed(5), s.source].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'schools.csv';
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast(`Exported ${fmtN(SCHOOLS.length)} schools (CSV)`);
  };
  $('#reportBtn').onclick = () => {
    const by = t => SCHOOLS.filter(s => s.type === t).length;
    const gapTxt = SCHOOLS.length && covered >= 10
      ? `<p><b>Most loaded records:</b> ${names(dc.slice().sort((a, b) => b.n - a.n).slice(0, 3))}</p><p><b>Fewest loaded records:</b> ${names(dc.slice().sort((a, b) => a.n - b.n).slice(0, 5))}</p>`
      : '<p>District comparison needs records in at least 10 districts. Load a fuller dataset.</p>';
    openModal('School Access Report', `<p><b>Date:</b> ${new Date().toLocaleDateString()}</p>
      <h3 style="margin-top:10px">Official national figures (MINEDUC 2024/2025)</h3>
      <div class="kpis"><div><b>4,996</b><small>Schools</small></div><div><b>4,822,507</b><small>Learners</small></div><div><b>83.7%</b><small>Schools with internet</small></div><div><b>51:1</b><small>Pupil/classroom</small></div><div><b>1,576</b><small>Government schools</small></div><div><b>1,337</b><small>Private schools</small></div></div>
      <h3>Records loaded</h3>
      <div class="kpis"><div><b>${fmtN(SCHOOLS.length)}</b><small>Schools loaded</small></div><div><b>${by('Primary')}</b><small>Primary</small></div><div><b>${by('Secondary')}</b><small>Secondary</small></div><div><b>${by('TVET')}</b><small>TVET</small></div><div><b>${by('Special Needs')}</b><small>Special needs</small></div><div><b>${by('Unclassified')}</b><small>Unclassified</small></div></div>
      ${gapTxt}
      <p style="margin-top:10px">This report supports analysis and decision-making. It does not replace official statistics or expert judgment. Loaded records may be incomplete and do not equal the official school count.</p>
      <button class="btn blue" style="margin-top:14px" onclick="window.print()">Print / Save as PDF</button>`);
  };
  function updateDataStatus() {
    const n = SCHOOLS.length;
    $('#dataBadge').textContent = n ? `${fmtN(n)} real record${n === 1 ? '' : 's'}` : 'No records loaded';
    $('#dataStatus').textContent = n ? `${fmtN(n)} schools loaded of ${fmtN(OFFICIAL.schools)} official (MINEDUC 2024/25). Records from OpenStreetMap are incomplete.` : `No school records loaded yet. The official total is ${fmtN(OFFICIAL.schools)} schools (MINEDUC 2024/25). Load real schools to compare districts.`;
  }

  /* ---------------- Import ---------------- */
  function refreshAll() { renderGap(); renderBars(); updateDataStatus(); }
  /* ---------------- Live load from OpenStreetMap (runs in your browser) ---------------- */
  const OVERPASS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter'];
  const OQ = '[out:json][timeout:180];area["ISO3166-1"="RW"]->.a;nwr["amenity"="school"](area.a);out center tags;';
  async function loadOSM() {
    closeModal(); toast('Loading schools from OpenStreetMap… this can take up to a minute');
    let data = null;
    for (const u of OVERPASS) {
      try {
        const r = await fetch(u, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'data=' + encodeURIComponent(OQ) });
        if (r.ok) { data = await r.json(); break; }
      } catch (e) { /* try next server */ }
    }
    if (!data || !data.elements) { toast('Could not reach OpenStreetMap. Check your internet connection and try again.'); return; }
    const list = []; let unnamed = 0;
    data.elements.forEach(el => {
      const t = el.tags || {}, c = el.type === 'node' ? { lat: el.lat, lon: el.lon } : el.center; if (!c) return;
      const nm = t.name || t['name:en'] || t['name:rw'] || t['name:fr']; if (!nm) unnamed++;
      list.push({ name: nm || 'School (name not recorded in OpenStreetMap)', type: '', province: '', district: t['addr:district'] || '', sector: '', lat: c.lat, lng: c.lon, guessDistrict: !t['addr:district'], source: 'OpenStreetMap contributors (ODbL)' });
    });
    setRecords(list);
    if (!SCHOOLS.length) { toast('OpenStreetMap returned no schools.'); return; }
    try { localStorage.setItem(STORE, JSON.stringify(list)); } catch (e) {}
    refreshAll();
    toast(`Loaded ${fmtN(SCHOOLS.length)} schools from OpenStreetMap (${fmtN(unnamed)} have no name recorded)`);
  }
  function openImport() {
    openModal('Import school data', `<button class="btn green" id="osmBtn">Load all schools from OpenStreetMap (needs internet)</button><p style="margin-top:10px">Or load your own file so real school names are available. The file stays on your device.</p>
      <ol><li><b>MINEDUC list (CSV)</b> with columns <code>name,type,province,district,sector,lat,lng</code>. A template is in <code>data/schools_template.csv</code>.</li>
      <li><b>OpenStreetMap export (GeoJSON):</b> download “Rwanda Education Facilities” from the <a href="https://data.humdata.org/organization/hot" target="_blank" rel="noopener">HOT exports on HDX</a>, unzip it and choose the .geojson file.</li></ol>
      <input type="file" id="fileIn" accept=".csv,.json,.geojson,text/csv,application/json,application/geo+json">
      <div class="warn">OpenStreetMap data is crowd-sourced and not exhaustive, so it will not match the official 4,996 schools. School types are guessed from names unless the file has a type column. Districts are guessed from the nearest district centre when the file has none.</div>
      <button class="btn ghost" id="clearImp">Remove imported data</button>`);
    $('#osmBtn').onclick = loadOSM;
    $('#fileIn').onchange = async e => {
      const f = e.target.files[0]; if (!f) return;
      try {
        const text = await f.text();
        let list;
        if (/\.csv$/i.test(f.name)) list = parseCSV(text);
        else { const j = JSON.parse(text); list = (j.type === 'FeatureCollection') ? parseGeo(j) : (Array.isArray(j) ? j : []); }
        const skipped = list.skipped || 0;
        setRecords(list);
        if (!SCHOOLS.length) { toast('No valid records found. Each row needs a name and GPS coordinates inside Rwanda.'); return; }
        try { localStorage.setItem(STORE, JSON.stringify(list)); } catch (err) { /* too large to keep: fine */ }
        closeModal(); refreshAll();
        toast(`Loaded ${fmtN(SCHOOLS.length)} real schools${skipped ? ` (${fmtN(skipped)} skipped: unnamed or not schools)` : ''}`);
      } catch (err) { toast('Could not read that file. Use a CSV or GeoJSON file.'); }
    };
    $('#clearImp').onclick = () => { try { localStorage.removeItem(STORE); } catch (err) {} setRecords(window.RM_SCHOOLS || []); closeModal(); refreshAll(); toast('Imported data removed'); };
  }
  $('#importBtn').onclick = openImport; $('#loadOsm').onclick = loadOSM;

  /* ---------------- Share, theme, language ---------------- */
  $('#shareBtn').onclick = async () => {
    const data = { title: 'RwandaMap AI', text: 'Rwanda Education Intelligence by Manthedan', url: location.href };
    try { if (navigator.share) { await navigator.share(data); return; } await navigator.clipboard.writeText(location.href); toast('Link copied'); } catch (e) { toast('Copy the page address from your browser'); }
  };
  const themeBtn = $('#themeBtn');
  function setTheme(t) { document.documentElement.dataset.theme = t; themeBtn.innerHTML = icon(t === 'dark' ? 'moon' : 'sun'); try { localStorage.setItem('rm-theme', t); } catch (e) {} }
  let saved = 'light'; try { saved = localStorage.getItem('rm-theme') || 'light'; } catch (e) {}
  themeBtn.onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  setTheme(saved);

  const I18N = {
    en: { nav_home: 'Home', nav_overview: 'Overview', nav_library: 'Library', nav_gap: 'AI Access Gap', nav_insights: 'Insights', nav_sources: 'Sources', nav_about: 'About', act_all: 'View All Schools', act_export: 'Export Data', act_report: 'Generate Report', cta: 'Start', search_ph: 'Search (Province, District, Sector...)', ask_ph: 'Type a question...' },
    fr: { nav_home: 'Accueil', nav_overview: 'Aperçu', nav_library: 'Bibliothèque', nav_gap: 'Écart d’accès IA', nav_insights: 'Analyses', nav_sources: 'Sources', nav_about: 'À propos', act_all: 'Voir toutes les écoles', act_export: 'Exporter les données', act_report: 'Générer un rapport', cta: 'Démarrer', search_ph: 'Rechercher (province, district, secteur...)', ask_ph: 'Posez une question...' },
    rw: { nav_home: 'Ahabanza', nav_overview: 'Incamake', nav_library: 'Isomero', nav_gap: 'Icyuho cy’amashuri (AI)', nav_insights: 'Isesengura', nav_sources: 'Aho amakuru aturuka', nav_about: 'Ibyerekeye', act_all: 'Reba amashuri yose', act_export: 'Sohora amakuru', act_report: 'Kora raporo', cta: 'Tangira', search_ph: 'Shakisha (Intara, Akarere, Umurenge...)', ask_ph: 'Andika ikibazo cyawe...' }
  };
  $('#lang').onchange = e => {
    const d = I18N[e.target.value]; document.documentElement.lang = e.target.value;
    $$('[data-i18n]').forEach(el => { if (d[el.dataset.i18n]) el.textContent = d[el.dataset.i18n]; });
    $$('[data-i18n-ph]').forEach(el => { if (d[el.dataset.i18nPh]) el.placeholder = d[el.dataset.i18nPh]; });
    chatLang = e.target.value; setChips(chatLang);
  };

  /* ---------------- Count-up, tabs, resize ---------------- */
  const fmt = { int: v => Math.round(v).toLocaleString('en-US'), pct: v => v.toFixed(1) + '%', ratio: v => Math.round(v) + ':1' };
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  let counted = false;
  function runCounts() {
    if (counted || reduce) return; counted = true;
    $$('[data-count]').forEach(el => {
      const end = parseFloat(el.dataset.count), f = fmt[el.dataset.fmt], t0 = performance.now();
      const step = t => { const k = Math.min(1, (t - t0) / 1000); el.textContent = f(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }
  /* ---------------- Library: REB books + NESA past papers ---------------- */
  const LIB = window.RM_LIBRARY || { levels: [], classes: [], more: [], papers: [], folders: {} };
  const rebUrl = id => `https://elearning.reb.rw/?category=${id}&redirect=0`;
  const NESA_BASE = 'https://www.nesa.gov.rw/1/resources?tx_filelist_filelist%5Baction%5D=list&tx_filelist_filelist%5Bcontroller%5D=File&tx_filelist_filelist%5Bpath%5D=%2Fuser_upload%2FNESA%2FRessources%2FPast_Papers%2F';
  const paperRows = p => p.rows.split(',').map(r => {
    const a = r.split(':'), h = a[a.length - 1], folder = a.length === 3 ? (LIB.folders[a[1]] || a[1]) : p.folder;
    return { year: +a[0], tag: /^S6_(ANP|ACC)$/.test(folder) ? folder.slice(3) : '', url: `${NESA_BASE}Year_${a[0]}%2F${folder}%2F&cHash=${h}` };
  });
  const lnk = (href, text, cls) => `<a ${cls ? `class="${cls}" ` : ''}href="${esc(href)}" target="_blank" rel="noopener">${esc(text)}</a>`;
  let libTab = 'primary';
  function classCard(c, subs) {
    return `<article class="card classCard"><div class="classHead"><h3>${esc(c.name)} <small>(${c.code})</small></h3>${lnk(rebUrl(c.cat), 'Open all ' + c.code + ' books', 'openAll')}</div><div class="subj">${subs.map(s => lnk(rebUrl(s[1]), s[0])).join('')}</div></article>`;
  }
  function renderLibrary() {
    const q = plain($('#libQ').value), body = $('#libBody');
    $$('#libTabs button').forEach(b => { const on = b.dataset.t === libTab && !q; b.classList.toggle('on', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
    if (q) {
      const cards = LIB.classes.map(c => {
        const clsHit = plain(c.name + ' ' + c.code).includes(q) || plain(LIB.levels.find(l => l.id === c.level).name).includes(q);
        const subs = clsHit ? c.subjects : c.subjects.filter(s => plain(s[0]).includes(q));
        return subs.length ? classCard(c, subs) : '';
      }).join('');
      body.innerHTML = cards ? `<div class="classGrid">${cards}</div>` : `<div class="card"><p>No book found for “${esc($('#libQ').value)}”. Try a subject such as Mathematics, Physics or Kinyarwanda, or a class such as P4 or S3. You can also browse everything on ${lnk('https://elearning.reb.rw/', 'REB eLearning')}.</p></div>`;
      return;
    }
    if (libTab === 'papers') {
      body.innerHTML = `<div class="card"><p>National examination past papers published by <b>NESA</b> (National Examination and School Inspection Authority). Each link opens the official folder for that exam and year, where the papers are PDF files by subject. There are no 2020 papers in the archive.</p><p style="margin-top:8px">${lnk('https://www.nesa.gov.rw', 'Open the NESA website', 'openAll')}</p></div>` +
        LIB.papers.map(p => { const rows = paperRows(p); return `<article class="card paperCard"><div class="classHead"><h3>${esc(p.name)}</h3><span class="badge pri">${rows.length} folders</span></div><div class="years">${rows.map(r => lnk(r.url, r.year + (r.tag ? ' ' + r.tag : ''))).join('')}</div></article>`; }).join('');
      return;
    }
    if (libTab === 'more') {
      body.innerHTML = `<div class="card"><h3>More official resources</h3><ul class="moreList">${LIB.more.map(m => `<li>${lnk(m[1], m[0])}</li>`).join('')}</ul></div>`;
      return;
    }
    const lv = LIB.levels.find(l => l.id === libTab); if (!lv) { body.innerHTML = ''; return; }
    const classes = LIB.classes.filter(c => c.level === lv.id);
    body.innerHTML = `<div class="card levelHead"><div><h3>${esc(lv.name)} books <small>${lv.range}</small></h3><p>Official REB textbooks by class and subject. Tap a subject to open it on the REB eLearning site.</p></div><div class="levelLinks">${lnk(rebUrl(lv.cat), 'Open all ' + lv.name + ' on REB', 'openAll')}${lv.extra.map(e => lnk(rebUrl(e[1]), e[0], 'openAll alt')).join('')}</div></div><div class="classGrid">${classes.map(c => classCard(c, c.subjects)).join('')}</div>`;
  }
  function initLibrary() {
    $('#libTabs').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; libTab = b.dataset.t; $('#libQ').value = ''; renderLibrary(); });
    let lt; $('#libQ').addEventListener('input', () => { clearTimeout(lt); lt = setTimeout(renderLibrary, 120); });
    renderLibrary();
  }
  const SUBJ_ALIAS = { maths: 'mathematics', math: 'mathematics', mathematic: 'mathematics', imibare: 'mathematics', mathematiques: 'mathematics', physic: 'physics', physique: 'physics', chimie: 'chemistry', biologie: 'biology', icyongereza: 'english', anglais: 'english', igifaransa: 'french', francais: 'french', ikinyarwanda: 'kinyarwanda', ikoranabuhanga: 'ict', informatique: 'computer', ubukungu: 'economics', amateka: 'history', ibidukikije: 'geography', iyobokamana: 'religion' };
  const STOP = 'book books past paper papers download where find need want give have level senior primary class what which with from this that please about tell show ibitabo igitabo nshaka ndashaka mpa mbwira livre livres cherche pour dans avec cest year examen exams exam ibizamini ushobora'.split(' ');
  function parseClass(n) { const m = n.match(/\b(p|primary|primaire|s|senior|secondaire)\s*([1-6])\b/); return m ? (/^p/.test(m[1]) ? 'P' : 'S') + m[2] : null; }
  function libraryAnswer(n, L) {
    const code = parseClass(n), cls = code && LIB.classes.find(c => c.code === code);
    const toks = n.split(' ').map(t => SUBJ_ALIAS[t] || t).filter(t => (t.length >= 4 || t === 'ict') && !STOP.includes(t) && !/^[ps]\d$/.test(t));
    const pick = c => c.subjects.find(s => toks.some(t => plain(s[0]).includes(t)));
    if (cls) {
      const s = toks.length ? pick(cls) : null;
      if (s) return T3(L, `${s[0]} for ${cls.name} (official REB eLearning):\n${rebUrl(s[1])}\nAll ${cls.code} books: ${rebUrl(cls.cat)}`, `${s[0]} ya ${cls.code} (REB eLearning):\n${rebUrl(s[1])}\nIbitabo byose bya ${cls.code}: ${rebUrl(cls.cat)}`, `${s[0]} pour ${cls.code} (REB eLearning officiel) :\n${rebUrl(s[1])}\nTous les livres de ${cls.code} : ${rebUrl(cls.cat)}`);
      return T3(L, `All ${cls.name} books on REB eLearning:\n${rebUrl(cls.cat)}\nSubjects: ${cls.subjects.map(x => x[0]).join(', ')}.`, `Ibitabo byose bya ${cls.code} kuri REB eLearning:\n${rebUrl(cls.cat)}\nAmasomo: ${cls.subjects.map(x => x[0]).join(', ')}.`, `Tous les livres de ${cls.code} sur REB eLearning :\n${rebUrl(cls.cat)}\nMatières : ${cls.subjects.map(x => x[0]).join(', ')}.`);
    }
    const hit = toks.length ? LIB.classes.filter(c => pick(c)) : [];
    if (hit.length) return T3(L, `That subject has REB books for ${hit.map(c => c.code).join(', ')}. Tell me your class (for example "${toks[0]} S3") and I will give you the link, or open the Library tab.`, `Iryo somo rifite ibitabo bya REB bya ${hit.map(c => c.code).join(', ')}. Mumbwire ishuri murimo (urugero "${toks[0]} S3") mbahe umurongo, cyangwa mufungure Isomero.`, `Cette matière a des livres REB pour ${hit.map(c => c.code).join(', ')}. Dites-moi votre classe (par exemple "${toks[0]} S3") ou ouvrez la bibliothèque.`);
    return T3(L, 'Open the Library tab for official REB books by level: Primary (P1-P6), Ordinary Level (S1-S3) and Advanced Level (S4-S6). Ask for a class and subject, for example "Mathematics S3 book". Everything is on https://elearning.reb.rw/', 'Mufungure Isomero kugira ngo mubone ibitabo bya REB: Abanza (P1-P6), Ayisumbuye yo hasi (S1-S3) n\'ayisumbuye yo hejuru (S4-S6). Mushobora kubaza ishuri n\'isomo, urugero "Igitabo cya Mathematics S3". Byose biri kuri https://elearning.reb.rw/', 'Ouvrez l\'onglet Bibliothèque pour les livres officiels du REB : Primaire (P1-P6), Ordinaire (S1-S3) et Avancé (S4-S6). Demandez une classe et une matière, par exemple "Livre de mathématiques S3". Tout est sur https://elearning.reb.rw/');
  }
  function papersAnswer(n, L) {
    const y = (n.match(/\b(20[0-2]\d)\b/) || [])[1];
    const code = parseClass(n);
    const id = /\b(tvet|etfp)\b/.test(n) ? 'TVET' : /\bttc\b/.test(n) ? 'TTC' : /\b(p6|ple|primary leaving)\b/.test(n) || code === 'P6' ? 'P6' : /\bs3\b|ordinary|o level|olevel/.test(n) || code === 'S3' ? 'S3' : /\bs6\b|advanced|a level|alevel/.test(n) || code === 'S6' ? 'S6' : null;
    const p = id && LIB.papers.find(x => x.id === id);
    const portal = 'https://www.nesa.gov.rw';
    if (p) {
      const rows = paperRows(p), one = y && rows.find(r => r.year === +y);
      if (one) return T3(L, `${p.name}, ${y} (official NESA folder):\n${one.url}`, `${p.name}, ${y} (ububiko bwemewe bwa NESA):\n${one.url}`, `${p.name}, ${y} (dossier officiel NESA) :\n${one.url}`);
      const last = rows.slice(0, 3).map(r => `${r.year}: ${r.url}`).join('\n');
      return (y ? T3(L, `I do not have a ${y} folder for ${p.id}. `, `Nta bubiko bwa ${y} mfite bwa ${p.id}. `, `Je n'ai pas de dossier ${y} pour ${p.id}. `) : '') + T3(L, `Latest ${p.id} past papers (NESA):\n${last}\nAll years are in the Library tab, Past papers.`, `Ibizamini bya vuba bya ${p.id} (NESA):\n${last}\nImyaka yose iri muri Isomero, Past papers.`, `Derniers examens ${p.id} (NESA) :\n${last}\nToutes les années sont dans la bibliothèque, Past papers.`);
    }
    return T3(L, `National exam past papers (P6, S3, S6, TVET, TTC) are published by NESA. Open the Library tab, Past papers, then pick the exam and year. Or ask, for example, "S6 past papers 2024". Portal: ${portal}`, `Ibizamini by'ubushize bya Leta (P6, S3, S6, TVET, TTC) bishyirwa ahagaragara na NESA. Mufungure Isomero, Past papers, muhitemo ikizamini n'umwaka. Cyangwa mubaze, urugero "Ibizamini bya S6 2024". Urubuga: ${portal}`, `Les anciens examens nationaux (P6, S3, S6, ETFP, TTC) sont publiés par le NESA. Ouvrez la bibliothèque, Past papers, puis choisissez l'examen et l'année. Portail : ${portal}`);
  }

  const TABS = ['home', 'overview', 'library', 'gap', 'insights', 'sources', 'about'];
  const tabLinks = $$('#tabs [role=tab]');
  function showTab(id, push = true) {
    if (!TABS.includes(id)) id = 'home';
    TABS.forEach(t => { document.getElementById(t).hidden = t !== id; });
    tabLinks.forEach(a => {
      const on = a.dataset.tab === id;
      a.classList.toggle('active', on); a.setAttribute('aria-selected', on ? 'true' : 'false'); a.tabIndex = on ? 0 : -1;
      if (on) a.scrollIntoView({ inline: 'center', block: 'nearest' });
    });
    if (push) { try { history.replaceState(null, '', '#' + id); } catch (e) {} }
    const bh = $('.banner').offsetHeight; if (scrollY > bh) scrollTo(0, bh);
    if (id === 'overview') runCounts();
  }
  tabLinks.forEach(a => a.addEventListener('click', e => { e.preventDefault(); showTab(a.dataset.tab); }));
  document.addEventListener('click', e => { const g = e.target.closest('[data-go]'); if (g) { e.preventDefault(); showTab(g.dataset.go); } });
  $('#tabs').addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = TABS.indexOf(document.activeElement.dataset.tab); if (i < 0) return;
    const nx = TABS[(i + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length];
    showTab(nx); $(`#tabs [data-tab=${nx}]`).focus();
  });
  addEventListener('hashchange', () => showTab(location.hash.slice(1), false));

  renderGap(); renderBars(); updateDataStatus(); initLibrary();
  showTab(location.hash.slice(1) || 'home', false);
})();
