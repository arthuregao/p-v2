// Index — progressive enhancement. Without JS every row is already expanded and
// everything is visible; nothing here hides content that JS doesn't later show.
//
// Rows: each lineup row collapses behind a +/− toggle. On a desktop with a real
// mouse (hover: hover, pointer: fine, wider than 720px) html gets .hover-rows: the
// toggles hide, hovering a row shows a field slip with its description that trails
// the cursor, and project rows open their page on click. Touch / narrow keeps +/−.
//
// Motion (html.motion, only when prefers-reduced-motion is not "reduce"): name
// stamp-in, cursor-card inertia + tilt, scroll reveals. Photos are never animated.
// The CSS for all of it lives in the "MOTION" section at the end of styles.css.
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var desktop = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 721px)');
  var still = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!still.matches) root.classList.add('motion');

  function clean(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }

  // ---------------------------------------------------------------- rows
  var rows = Array.prototype.filter.call(document.querySelectorAll('.row'), function (row) {
    return row.querySelector('.row__head') && row.querySelector('.row__detail') && row.querySelector('.row__title');
  });
  var total = rows.length;

  function setOpen(row, open) {
    var btn = row.querySelector('.row__toggle');
    row.classList.toggle('is-open', open);
    if (!btn) return;
    btn.setAttribute('aria-expanded', String(open));
    btn.lastChild.textContent = open ? '−' : '+';
  }

  rows.forEach(function (row, i) {
    var head = row.querySelector('.row__head');
    var detail = row.querySelector('.row__detail');
    var title = row.querySelector('.row__title');
    if (!detail.id) detail.id = 'row-detail-' + i;

    var link = title.querySelector('a[href]');
    if (link) row.classList.add('row--link');

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'row__toggle';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', detail.id);
    btn.innerHTML = '<span class="vh">Show details: ' + clean(title) + '</span><span aria-hidden="true">+</span>';
    btn.addEventListener('click', function () {
      setOpen(row, !row.classList.contains('is-open'));
    });
    head.appendChild(btn);

    // Desktop: a click anywhere on a project row opens its page.
    if (link) {
      head.addEventListener('click', function (e) {
        if (!desktop.matches || e.target.closest('a, button')) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey) window.open(link.href, '_blank', 'noopener');
        else window.location.href = link.href;
      });
    }
  });

  // ---------------------------------------------------------------- hover card (desktop only)
  var card = null, active = null, raf = 0;
  var mx = 0, my = 0;              // cursor
  var tx = 0, ty = 0;              // where the card wants to be
  var cx = 0, cy = 0, rot = 0;     // where it is (inertia + tilt)
  var LERP = 0.18, MAX_TILT = 4;

  function buildCard() {
    card = document.createElement('div');
    card.className = 'hovercard';
    card.setAttribute('aria-hidden', 'true');
    card.innerHTML =
      '<div class="hovercard__meta label"><span class="hc-no"></span><span class="hc-when"></span></div>' +
      '<p class="hovercard__title"></p><p class="hovercard__text"></p>' +
      '<p class="hovercard__go label"></p>';
    document.body.appendChild(card);
  }

  function fill(row) {
    var title = row.querySelector('.row__title').cloneNode(true);
    var aff = title.querySelector('.row__aff');
    if (aff) aff.remove();
    card.querySelector('.hc-no').textContent = clean(row.querySelector('.row__no')) + ' / ' + String(total).padStart(2, '0');
    card.querySelector('.hc-when').textContent = clean(row.querySelector('.row__when'));
    card.querySelector('.hovercard__title').textContent = clean(title);
    card.querySelector('.hovercard__text').textContent = clean(row.querySelector('.row__text p'));
    card.querySelector('.hovercard__go').textContent = row.classList.contains('row--link') ? 'Click to open →' : 'Click for more +';
  }

  // Where the card should sit: beside the cursor, flipped away from the edges.
  // Reduced motion: fixed under the row, right-aligned, never trailing.
  function target() {
    var w = card.offsetWidth, h = card.offsetHeight, pad = 16, off = 20;
    var vw = root.clientWidth, vh = window.innerHeight;
    var px, py;
    if (still.matches) {
      var r = active.querySelector('.row__head').getBoundingClientRect();
      px = vw - w - pad; py = r.bottom + 8;
      if (py + h > vh - pad) py = r.top - h - 8;
    } else {
      px = mx + off; py = my + off;
      if (px + w > vw - pad) px = mx - w - off;
      if (py + h > vh - pad) py = my - h - off;
    }
    tx = Math.max(pad, px); ty = Math.max(pad, py);
  }

  function paint() {
    card.style.translate = cx.toFixed(1) + 'px ' + cy.toFixed(1) + 'px';
    card.style.rotate = rot.toFixed(2) + 'deg';
  }

  // The one rAF loop. Runs only while a card is up and still moving.
  function tick() {
    raf = 0;
    if (!active) return;
    target();
    if (still.matches) { cx = tx; cy = ty; rot = 0; paint(); return; }
    var dx = tx - cx;
    cx += dx * LERP;
    cy += (ty - cy) * LERP;
    var want = Math.max(-MAX_TILT, Math.min(MAX_TILT, dx * 0.08));
    rot += (want - rot) * 0.25;
    paint();
    if (Math.abs(dx) > 0.3 || Math.abs(ty - cy) > 0.3 || Math.abs(rot) > 0.05) raf = requestAnimationFrame(tick);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(tick); }

  function show(row) {
    if (row.classList.contains('is-open')) { hide(); return; }
    if (!card) buildCard();
    var fresh = !active;
    if (active !== row) { active = row; fill(row); }
    if (fresh) { target(); cx = tx; cy = ty; rot = 0; paint(); }   // snap in at the cursor, no fly-in
    card.classList.add('is-on');
    kick();
  }
  function hide() {
    active = null;
    if (card) card.classList.remove('is-on');
  }

  rows.forEach(function (row) {
    var head = row.querySelector('.row__head');
    head.addEventListener('pointerenter', function (e) {
      if (!desktop.matches || e.pointerType !== 'mouse') return;
      mx = e.clientX; my = e.clientY;
      show(row);
    });
    head.addEventListener('pointermove', function (e) {
      if (!desktop.matches || e.pointerType !== 'mouse') return;
      mx = e.clientX; my = e.clientY;
      if (active !== row) show(row); else kick();
    });
    head.addEventListener('pointerleave', hide);
    head.addEventListener('click', function () {
      if (row.classList.contains('is-open')) hide();   // the row's own detail takes over
    });
  });
  window.addEventListener('scroll', function () { if (active && still.matches) kick(); else if (active) hide(); }, { passive: true });

  function mode() {
    root.classList.toggle('hover-rows', desktop.matches);
    if (desktop.matches) rows.forEach(function (row) { if (row.classList.contains('row--link')) setOpen(row, false); });
    else hide();
  }
  mode();
  if (desktop.addEventListener) desktop.addEventListener('change', mode);
  else if (desktop.addListener) desktop.addListener(mode);

  // ---------------------------------------------------------------- TOC active state (project pages)
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.p-aside a[href^="#"]'));
  var heads = tocLinks.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
  if (tocLinks.length && heads.every(Boolean)) {
    var spy = 0;
    var mark = function () {
      spy = 0;
      var line = window.innerHeight * 0.3, current = -1;
      heads.forEach(function (h, i) { if (h.getBoundingClientRect().top <= line) current = i; });
      tocLinks.forEach(function (a, i) {
        a.classList.toggle('is-active', i === current);
        if (i === current) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
      });
    };
    window.addEventListener('scroll', function () { if (!spy) spy = requestAnimationFrame(mark); }, { passive: true });
    mark();
  }

  // ---------------------------------------------------------------- glyph split for big titles
  // Each letter becomes its own span so the light outline separates overlapping
  // letters (Cappellini-poster style). Purely visual: the heading keeps an aria-label.
  Array.prototype.forEach.call(document.querySelectorAll('.hero__name .l, .p-title, .sect__title, .foot__big, .p-band__big'), function (el) {
    var host = el.closest('h1, h2, h3, p') || el;
    if (!host.hasAttribute('aria-label')) { var c = host.cloneNode(true); Array.prototype.forEach.call(c.querySelectorAll('sup'), function (x) { x.remove(); }); host.setAttribute('aria-label', clean(c)); }
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), nodes = [], t;
    while ((t = walker.nextNode())) { if (!t.parentNode.closest('sup')) nodes.push(t); }
    nodes.forEach(function (node) {
      var frag = document.createDocumentFragment(), txt = node.nodeValue;
      for (var k = 0; k < txt.length; k++) {
        if (txt[k] === ' ') { frag.appendChild(document.createTextNode(' ')); continue; }
        var s = document.createElement('span'); s.className = 'gl'; s.setAttribute('aria-hidden', 'true'); s.textContent = txt[k]; frag.appendChild(s);
      }
      node.parentNode.replaceChild(frag, node);
    });
  });

  if (still.matches) return;   // ---- everything below is motion only

  // ---------------------------------------------------------------- name stamp-in (once per session)
  var name = document.querySelector('.hero__name');
  if (name && root.classList.contains('stamp-pending')) {
    var n = 0;
    name.setAttribute('aria-label', clean(name));
    Array.prototype.forEach.call(name.querySelectorAll('.l'), function (word) {
      var letters = word.textContent;
      word.textContent = '';
      word.setAttribute('aria-hidden', 'true');
      for (var k = 0; k < letters.length; k++) {
        var s = document.createElement('span');
        s.className = 'stamp__l';
        s.style.setProperty('--i', n++);
        s.textContent = letters[k];
        word.appendChild(s);
      }
      n++;   // a beat for the space
    });
    root.classList.add('stamp');
    root.classList.remove('stamp-pending');
    setTimeout(function () { root.classList.remove('stamp'); }, n * 40 + 260);
    try { sessionStorage.setItem('stamped', '1'); } catch (e) {}
  }
  root.classList.remove('stamp-pending');

  // ---------------------------------------------------------------- scroll reveals
  if (!('IntersectionObserver' in window)) return;
  var vh = window.innerHeight;
  var waiting = [];
  function below(el) { return el.getBoundingClientRect().top > vh; }   // only hide what the reader hasn't seen

  Array.prototype.forEach.call(document.querySelectorAll('.sect__title, .p-title'), function (el) {
    if (below(el)) waiting.push(el);
  });
  Array.prototype.forEach.call(document.querySelectorAll('ol.rows'), function (list) {
    Array.prototype.forEach.call(list.children, function (li, i) { li.style.setProperty('--i', i); });
    if (below(list)) waiting.push(list);
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      io.unobserve(el);
      el.classList.remove('rv-wait');
      el.classList.add('rv-in');
      var last = el.matches('ol.rows') ? el.lastElementChild : el;
      if (!last) return;
      last.addEventListener('animationend', function done(ev) {
        if (ev.target !== last) return;
        last.removeEventListener('animationend', done);
        el.classList.remove('rv-in');   // leave no transforms or clips behind
      });
    });
  }, { rootMargin: '0px 0px -6% 0px' });

  waiting.forEach(function (el) { el.classList.add('rv-wait'); io.observe(el); });
})();
