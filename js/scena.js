// Scena 3D del sito di Mattia Malpeli: una struttura di blocchi (l'impresa) che cambia forma con lo scorrimento.
// Ogni sezione ha il suo «stato» (data-s nella pagina): sparsi → torre → torre storta che si raddrizza → pianta
// ordinata a terra (uscita) → blocco chiave in fuori (governance) → strato d'oro che entra (capitale proprio) → griglia
// con un solo blocco fuori asse (rischio commerciale) → catena (blockchain) → due torri con un ponte (Italia e Spagna) → monolite chiuso con una fessura di luce (contatto).
// Si disegna solo quando qualcosa si muove: niente animazioni continue.
import * as THREE from './three.module.min.js';

export function avvia(canvas, opz) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { document.documentElement.classList.add('no3d'); return; }
  const ridotto = !!opz.ridotto;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x070b14, 12, 30);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 90);

  // ---- luce: una stanza finta con tre pannelli luminosi, per i riflessi su pietra e oro ----
  const pm = new THREE.PMREMGenerator(renderer);
  const stanza = new THREE.Scene();
  stanza.add(new THREE.Mesh(new THREE.BoxGeometry(24, 24, 24), new THREE.MeshBasicMaterial({ color: 0x0a0f1a, side: THREE.BackSide })));
  const pannello = (w, h, col, forza, pos, rot) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(forza), side: THREE.DoubleSide }));
    m.position.set(...pos); m.rotation.set(...rot); stanza.add(m);
  };
  pannello(14, 5, 0xffe9cc, 1.7, [0, 11.5, 1], [Math.PI / 2, 0, 0]);
  pannello(3, 12, 0xffe3bd, 3.4, [11.5, 2, 4], [0, -Math.PI / 2, 0]);
  pannello(2.5, 12, 0x8fa9dc, 1.7, [-11.5, 2, -4], [0, Math.PI / 2, 0]);
  pannello(10, 1.2, 0xffffff, 1.4, [0, 3, -11.5], [0, 0, 0]);
  scene.environment = pm.fromScene(stanza, 0.035).texture;

  scene.add(new THREE.HemisphereLight(0x8ea2c8, 0x04060b, 0.45));
  const chiave = new THREE.DirectionalLight(0xffe6c4, 2.4); chiave.position.set(5, 9, 6); scene.add(chiave);
  const taglio = new THREE.DirectionalLight(0x7d98d6, 1.25); taglio.position.set(-7, 4, -6); scene.add(taglio);

  // ---- pavimento: una pozza di luce champagne e l'ombra morbida sotto la struttura ----
  const sfumatura = (stops, size = 256) => {
    const c = document.createElement('canvas'); c.width = c.height = size;
    const g = c.getContext('2d'), gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    stops.forEach(([o, col]) => gr.addColorStop(o, col));
    g.fillStyle = gr; g.fillRect(0, 0, size, size);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  };
  const pozza = new THREE.Mesh(new THREE.PlaneGeometry(18, 18), new THREE.MeshBasicMaterial({
    map: sfumatura([[0, 'rgba(205,185,140,0.17)'], [0.35, 'rgba(205,185,140,0.06)'], [1, 'rgba(205,185,140,0)']]),
    transparent: true, depthWrite: false, fog: false }));
  pozza.rotation.x = -Math.PI / 2; scene.add(pozza);
  const ombra = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), new THREE.MeshBasicMaterial({
    map: sfumatura([[0, 'rgba(0,0,0,0.6)'], [0.45, 'rgba(0,0,0,0.28)'], [1, 'rgba(0,0,0,0)']]),
    transparent: true, depthWrite: false }));
  ombra.rotation.x = -Math.PI / 2; ombra.position.y = 0.003; scene.add(ombra);
  // un cerchio sottile sul pavimento, come una pianta d'architetto
  const anello = new THREE.Mesh(new THREE.RingGeometry(3.45, 3.47, 160), new THREE.MeshBasicMaterial({ color: 0xcdb98c, transparent: true, opacity: 0.14, depthWrite: false }));
  anello.rotation.x = -Math.PI / 2; anello.position.y = 0.004; scene.add(anello);

  // ---- i blocchi: 48 di pietra scura e 4 d'oro (il capitale) ----
  const H = 0.28, PASSO = 0.31, LATO = 1.05;
  const GEO = new THREE.BoxGeometry(1, H, 1), BORDI = new THREE.EdgesGeometry(GEO);
  const PIETRA = new THREE.Color(0x283043), ORO = new THREE.Color(0xbf9c5f), LUCE_ORO = new THREE.Color(0x3a2a0e), NERO = new THREE.Color(0);
  const NP = 48, NO = 4, N = NP + NO;
  const blocchi = [];
  for (let i = 0; i < N; i++) {
    const mat = new THREE.MeshStandardMaterial({ color: PIETRA.clone(), roughness: 0.64, metalness: 0.12, envMapIntensity: 0.75, emissive: new THREE.Color(0) });
    const m = new THREE.Mesh(GEO, mat);
    const lm = new THREE.LineBasicMaterial({ color: 0xdcc796, transparent: true, opacity: 0.35 });
    m.add(new THREE.LineSegments(BORDI, lm));
    scene.add(m); blocchi.push({ m, mat, lm });
  }
  // la catena: una linea d'oro sottile che passa per i blocchi, accesa solo nello stato «catena»
  const catenaGeo = new THREE.BufferGeometry(); catenaGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
  const catenaMat = new THREE.LineBasicMaterial({ color: 0xd8c38f, transparent: true, opacity: 0 });
  const catena = new THREE.Line(catenaGeo, catenaMat); catena.frustumCulled = false; scene.add(catena);

  // ---- gli stati ----
  let seme = 7;
  const R = () => { seme |= 0; seme = seme + 0x6D2B79F5 | 0; let t = Math.imul(seme ^ seme >>> 15, 1 | seme); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const Q = (x, y, z) => new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z));
  const UNO = () => V(1, 1, 1);
  const cella = c => [(c % 2) - 0.5, Math.floor(c / 2) - 0.5];
  const strato = i => Math.floor(i / 4);
  const yStrato = L => H / 2 + L * PASSO;
  const torre = (i, L = strato(i)) => { const [cx, cz] = cella(i % 4); return { p: V(cx * LATO, yStrato(L), cz * LATO), q: Q(0, 0, 0), s: UNO(), oro: 0 }; };
  const oroFuori = j => { const [cx, cz] = cella(j); return { p: V(cx * LATO + 4.6, yStrato(6) + 0.35, cz * LATO), q: Q(0, 0, 0), s: V(0.001, 0.001, 0.001), oro: 1 }; };
  const rnd = Array.from({ length: N }, R);
  const ordineBasso = Array.from({ length: N }, (_, i) => i < NP ? 0.65 * strato(i) / 11 + 0.35 * rnd[i] : rnd[i]);
  const ordineAlto = ordineBasso.map((o, i) => i < NP ? 1 - o : o);

  const sparsi = [], lontani = [];
  for (let i = 0; i < N; i++) {
    if (i >= NP) { sparsi.push(oroFuori(i - NP)); lontani.push(oroFuori(i - NP)); continue; }
    const th = R() * Math.PI * 2, ph = Math.acos(2 * R() - 1), r = 0.9 + 2.2 * Math.cbrt(R());
    const p = V(r * Math.sin(ph) * Math.cos(th) * 1.1 + 0.3, Math.max(0.35, 1.95 + r * Math.cos(ph) * 0.72), r * Math.sin(ph) * Math.sin(th));
    sparsi.push({ p, q: Q(R() * 6.3, R() * 6.3, R() * 6.3), s: UNO(), oro: 0 });
    const lp = p.clone().sub(V(0, 1.9, 0)).multiplyScalar(3.4).add(V(0, 2.6, 0));
    lontani.push({ p: lp, q: Q(R() * 6.3, R() * 6.3, R() * 6.3), s: UNO(), oro: 0 });
  }

  const ognuno = f => Array.from({ length: N }, (_, i) => f(i));
  const TORRE = ognuno(i => i < NP ? torre(i) : oroFuori(i - NP));

  // torre storta: ogni strato ruotato e spostato
  const storti = Array.from({ length: 12 }, (_, L) => ({ a: (R() - 0.5) * 0.95 + Math.sin(L * 0.9) * 0.22, ox: (R() - 0.5) * 0.5, oz: (R() - 0.5) * 0.5 }));
  const STORTA = ognuno(i => {
    if (i >= NP) return oroFuori(i - NP);
    const L = strato(i), { a, ox, oz } = storti[L], [cx, cz] = cella(i % 4), x = cx * LATO, z = cz * LATO;
    return { p: V(x * Math.cos(a) + z * Math.sin(a) + ox, yStrato(L), -x * Math.sin(a) + z * Math.cos(a) + oz), q: Q(0, a, 0), s: UNO(), oro: 0 };
  });

  // pianta: tutto a terra, in file ordinate (l'uscita fatta con ordine)
  const PIANTA = ognuno(i => i < NP
    ? { p: V(((i % 8) - 3.5) * 1.3, H / 2, (Math.floor(i / 8) - 2.5) * 1.3), q: Q(0, 0, 0), s: UNO(), oro: 0 }
    : oroFuori(i - NP));

  // blocco chiave: uno solo esce in avanti e diventa d'oro (l'intervento diretto)
  const K = 6 * 4 + 3;
  const CHIAVE = ognuno(i => { if (i >= NP) return oroFuori(i - NP); const b = torre(i); if (i === K) { b.p.z += 0.95; b.oro = 1; } return b; });

  // capitale: la parte alta si alza, entra uno strato d'oro, la torre si richiude
  const CAP_A = ognuno(i => {
    if (i >= NP) { const [cx, cz] = cella(i - NP); return { p: V(cx * LATO + 2.5, yStrato(6) + 0.35, cz * LATO), q: Q(0, -0.35, 0), s: UNO(), oro: 1 }; }
    const b = torre(i); if (strato(i) >= 6) b.p.y += 1.0; return b;
  });
  const CAP_B = ognuno(i => {
    if (i >= NP) { const b = torre(i - NP, 6); b.oro = 1; return b; }
    return torre(i, strato(i) >= 6 ? strato(i) + 1 : strato(i));
  });

  // griglia in piedi: tutto allineato tranne un blocco, che esce storto e d'oro (l'anomalia da riconoscere)
  const K_RISCHIO = 3 * 8 + 5;
  const RISCHIO = ognuno(i => {
    if (i >= NP) return oroFuori(i - NP);
    const lato = 0.44, b = { p: V(((i % 8) - 3.5) * 0.62, 2.05 + (2.5 - Math.floor(i / 8)) * 0.62, 0), q: Q(0, 0, 0), s: V(lato, lato / H, lato), oro: 0 };
    if (i === K_RISCHIO) { b.p.z += 0.62; b.q = Q(0.5, -0.55, 0.16); b.oro = 1; }
    return b;
  });

  // catena: cubi più piccoli in fila, con un blocco d'oro ogni dodici
  const ordineCatena = [];
  for (let k = 0, p = 0, o = 0; k < N; k++) ordineCatena.push(k % 13 === 12 ? NP + o++ : p++);
  const CATENA = new Array(N);
  ordineCatena.forEach((b, k) => {
    const u = k / (N - 1), lato = 0.46;
    CATENA[b] = {
      p: V((u - 0.5) * 7.6, 1.05 + 0.5 * Math.sin(u * Math.PI * 2.2), (u - 0.5) * 5.2 + 0.85 * Math.sin(u * Math.PI * 3.1)),
      q: Q(0.25 * Math.sin(k * 1.7), u * Math.PI * 1.4 + rnd[b] * 0.5, 0.2 * Math.cos(k * 1.3)),
      s: V(lato, lato / H, lato), oro: b >= NP ? 1 : 0 };
  });

  // due torri (Italia più alta, Spagna più bassa) unite da un ponte d'oro
  const DUE = ognuno(i => {
    if (i >= NP) { const j = i - NP; return { p: V(-0.54 + j * 0.36, 1.25, 0), q: Q(0, 0, 0), s: V(0.32, 0.36, 0.2), oro: 1 }; }
    const sinistra = i < 28, k = sinistra ? i : i - 28, [cx, cz] = cella(k % 4);
    return { p: V(cx * LATO + (sinistra ? -1.75 : 1.75), yStrato(Math.floor(k / 4)), cz * LATO), q: Q(0, 0, 0), s: UNO(), oro: 0 };
  });

  // monolite: i blocchi si chiudono senza fessure; l'oro diventa una sottile fessura di luce sul davanti
  const MONOLITE = ognuno(i => {
    if (i >= NP) { const j = i - NP; return { p: V(0, 0.6 + j * 0.76, 1.012), q: Q(0, 0, 0), s: V(0.028, 0.74 / H, 0.02), oro: 1 }; }
    const [cx, cz] = cella(i % 4); return { p: V(cx, H / 2 + strato(i) * H, cz), q: Q(0, 0, 0), s: V(1.002, 1.002, 1.002), oro: 0 };
  });

  // [disposizione, ordine di partenza, opacità dei bordi, catena accesa, camera: azimut, elevazione, distanza, altezza]
  const STATI = [
    [lontani, rnd, 0.0, 0, [0.78, 0.3, 16.5, 2.0]],   // 0 arrivo da lontano
    [sparsi, rnd, 0.5, 0, [0.62, 0.22, 13.5, 1.95]],  // 1 copertina: la complessità
    [TORRE, ordineBasso, 0.46, 0, [0.82, 0.2, 12.7, 1.85]], // 2 la struttura
    [TORRE, rnd, 0.46, 0, [1.32, 0.07, 11.2, 2.15]],    // 3 esperienza, chi sono
    [STORTA, rnd, 0.5, 0, [0.95, 0.3, 13.0, 1.85]],    // 4 restructuring: storta
    [TORRE, rnd, 0.46, 0, [0.7, 0.26, 12.7, 1.85]],    // 5 ... raddrizzata
    [PIANTA, ordineAlto, 0.58, 0, [0.55, 0.98, 17.2, 0.0]], // 6 crisi e uscita
    [CHIAVE, ordineBasso, 0.46, 0, [0.42, 0.13, 10.7, 2.0]], // 7 governance
    [CAP_A, ordineBasso, 0.46, 0, [0.98, 0.2, 14.2, 2.25]], // 8 capitale che entra
    [CAP_B, rnd, 0.46, 0, [0.78, 0.22, 13.7, 2.1]],    // 9 ... dentro la struttura
    [CAP_B, rnd, 0.46, 0, [0.78, 0.32, 13.7, 2.1]],    // 10 metodo: la camera gira
    [CAP_B, rnd, 0.46, 0, [2.3, 0.16, 13.7, 2.1]],     // 11
    [RISCHIO, rnd, 0.5, 0, [0.6, 0.24, 13.4, 2.0]],  // 12 rischio commerciale
    [CATENA, rnd, 0.55, 1, [0.25, 0.42, 14.2, 1.0]],   // 13 blockchain
    [DUE, rnd, 0.46, 0, [0.42, 0.18, 14.7, 1.45]],     // 14 Italia e Spagna
    [MONOLITE, ordineBasso, 0.2, 0, [0.0, 0.06, 13.5, 1.75]], // 15 contatto
  ];
  const ULT = STATI.length - 1;

  // ---- interpolazione ----
  const ease = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const liscia = x => x * x * (3 - 2 * x);
  const lerp = (a, b, t) => a + (b - a) * t;
  const _q = new THREE.Quaternion(), _c = new THREE.Color();
  const SFASA = 0.38;
  function posa(t) {
    t = Math.max(0, Math.min(ULT, t));
    const i0 = Math.floor(t), i1 = Math.min(ULT, i0 + 1), f = t - i0;
    const A = STATI[i0], B = STATI[i1], ord = B[1];
    const bordi = lerp(A[2], B[2], liscia(f));
    for (let i = 0; i < N; i++) {
      const a = A[0][i], b = B[0][i], { m, mat, lm } = blocchi[i];
      const e = ease(Math.max(0, Math.min(1, (f - ord[i] * SFASA) / (1 - SFASA))));
      m.position.lerpVectors(a.p, b.p, e);
      _q.copy(a.q).slerp(b.q, e); m.quaternion.copy(_q);
      m.scale.lerpVectors(a.s, b.s, e);
      const oro = lerp(a.oro, b.oro, e);
      mat.color.copy(PIETRA).lerp(ORO, oro);
      mat.metalness = lerp(0.12, 1, oro); mat.roughness = lerp(0.64, 0.4, oro); mat.envMapIntensity = lerp(0.75, 0.32, oro);
      mat.emissive.copy(NERO).lerp(LUCE_ORO, oro);
      lm.opacity = Math.min(0.9, bordi * (1 + oro * 0.9));
    }
    const ca = lerp(A[3], B[3], liscia(f));
    catenaMat.opacity = ca * 0.55; catena.visible = ca > 0.01;
    if (catena.visible) {
      const arr = catenaGeo.attributes.position.array;
      ordineCatena.forEach((b, k) => { const p = blocchi[b].m.position; arr[k * 3] = p.x; arr[k * 3 + 1] = p.y; arr[k * 3 + 2] = p.z; });
      catenaGeo.attributes.position.needsUpdate = true;
    }
    const cA = A[4], cB = B[4], g = liscia(f);
    return [lerp(cA[0], cB[0], g), lerp(cA[1], cB[1], g), lerp(cA[2], cB[2], g), lerp(cA[3], cB[3], g)];
  }

  // ---- misure, camera, disegno solo quando serve ----
  let largo = 0, alto = 0, tel = false;
  function dimensioni() {
    const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
    if (w === largo && Math.abs(h - alto) < 2) return;
    largo = w; alto = h; tel = w < 820;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, tel ? 1.5 : 1.75));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = tel ? 34 : 30;
    // al computer la struttura sta a destra (il testo è a sinistra); al telefono sta in alto
    if (tel) camera.setViewOffset(w, h, 0, h * 0.2, w, h);
    else camera.setViewOffset(w, h, -w * 0.2, 0, w, h);
    camera.updateProjectionMatrix();
  }
  let tCur = Math.min(opz.t ?? 1, 0.0), tTgt = opz.t ?? 1, px = 0, py = 0, pxT = 0, pyT = 0, ultimo = 0, raf = 0, inizio = performance.now();
  if (ridotto) { tCur = tTgt = 2; }
  else if (tTgt > 1.5) tCur = tTgt; // ricarica a metà pagina: niente viaggio da lontano
  function disegna(now) {
    raf = 0;
    const dt = Math.min(64, now - (ultimo || now)) / 16.7; ultimo = now;
    const k = now - inizio < 2600 && tTgt <= 1.5 ? 0.028 : 0.085;
    const d = tTgt - tCur;
    if (Math.abs(d) > 2.5) tCur = tTgt - Math.sign(d) * 0.6; // salto lungo (menu, link): niente viaggio per tutti gli stati
    else tCur += d * (1 - Math.pow(1 - k, dt));
    if (Math.abs(tTgt - tCur) < 0.0004) tCur = tTgt;
    px += (pxT - px) * (1 - Math.pow(0.92, dt)); py += (pyT - py) * (1 - Math.pow(0.92, dt));
    dimensioni();
    const [az0, el0, di0, ty] = posa(tCur);
    const az = az0 + px * 0.06, el = Math.max(0.02, el0 - py * 0.035), di = di0 * (tel ? 1.38 : 1);
    scene.fog.near = di * 0.92; scene.fog.far = di * 2.3;
    camera.position.set(Math.sin(az) * Math.cos(el) * di, ty + Math.sin(el) * di, Math.cos(az) * Math.cos(el) * di);
    camera.lookAt(0, ty, 0);
    renderer.render(scene, camera);
    if (!canvas.classList.contains('pronta')) canvas.classList.add('pronta');
    if (!ridotto && (tCur !== tTgt || Math.abs(pxT - px) > 0.001 || Math.abs(pyT - py) > 0.001)) raf = requestAnimationFrame(disegna);
  }
  const spingi = () => { if (!raf) raf = requestAnimationFrame(disegna); };
  window.mmScena = { vai(t) { if (ridotto) return; tTgt = t; spingi(); } };
  addEventListener('resize', spingi);
  if (!ridotto && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    addEventListener('pointermove', e => { pxT = e.clientX / innerWidth * 2 - 1; pyT = e.clientY / innerHeight * 2 - 1; spingi(); }, { passive: true });
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { ultimo = 0; spingi(); } });
  spingi();
}
