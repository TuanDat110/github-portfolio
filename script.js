/* ============================================================
   Dao Tuan Dat Vo — AI Research Portfolio
   Vanilla JS: theme, nav, reveal, counters, FAQ, form
   ============================================================ */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. THEME ---------- */
  const themeBtn  = $('#themeToggle');
  const themeIcon = $('#themeIcon');
  let   light     = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (light) document.body.classList.add('light');
  const paintIcon = () => { if (themeIcon) themeIcon.textContent = light ? '☀️' : '🌙'; };
  paintIcon();

  themeBtn?.addEventListener('click', () => {
    light = !light;
    document.body.classList.toggle('light', light);
    paintIcon();
  });

  /* ---------- 2. NAVBAR ---------- */
  const navbar   = $('#navbar');
  const burger   = $('#burger');
  const navLinks = $('#navLinks');
  const progress = $('#scrollProgress');

  burger?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });

  $$('#navLinks a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));

  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    navbar?.classList.toggle('scrolled', y > 30);
    $('#toTop')?.classList.toggle('show', y > 500);

    // hide navbar when scrolling down, show when scrolling up
    if (!navLinks.classList.contains('open')) {
      navbar?.classList.toggle('hide', y > lastY && y > 300);
    }
    lastY = y;

    if (progress) progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  $('#toTop')?.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  );

  /* ---------- 3. ACTIVE LINK ON SCROLL ---------- */
  const linkMap = {};
  $$('#navLinks a').forEach(a => { linkMap[a.getAttribute('href').slice(1)] = a; });

  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const link = linkMap[e.target.id];
      if (!link) return;
      Object.values(linkMap).forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => spy.observe(s));

  /* ---------- 4. REVEAL ON SCROLL ---------- */
  const revealer = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => revealer.observe(el));

  /* ---------- 5. TYPING LINE ---------- */
  const typingEl = $('#typingText');
  if (typingEl) {
    const phrases = [
      'skeleton-based SLR',
      'human action recognition',
      'knowledge distillation',
      'edge inference pipelines',
      'writing the next paper...'
    ];
    let pi = 0, ci = 0, deleting = false;

    if (reduceMotion) {
      typingEl.textContent = phrases[0];
    } else {
      const type = () => {
        const word = phrases[pi];
        typingEl.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);

        let delay = deleting ? 38 : 82;
        if (!deleting && ci === word.length) { delay = 1900; deleting = true; }
        else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
        setTimeout(type, delay);
      };
      type();
    }
  }

  /* ---------- 6. FAQ ACCORDION ---------- */
  $$('.faq').forEach(faq => {
    const btn = $('.faq-q', faq);
    const ans = $('.faq-a', faq);

    btn.addEventListener('click', () => {
      const isOpen = faq.classList.contains('open');

      $$('.faq').forEach(f => {
        f.classList.remove('open');
        $('.faq-a', f).style.maxHeight = null;
        $('.faq-q', f).setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        faq.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- 7. CONTACT FORM ----------
     Messages are delivered by Formspree. Create a free form at
     https://formspree.io, then paste your endpoint below.
     Until you do, the button falls back to opening an email client. */
  const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
  const EMAIL = 'tuandat1102004@gmail.com';

  const sendBtn = $('#sendBtn');

  sendBtn?.addEventListener('click', async () => {
    const name   = $('#cName').value.trim();
    const from   = $('#cEmail').value.trim();
    const topic  = $('#cTopic').value;
    const msg    = $('#cMsg').value.trim();
    const status = $('#formStatus');

    if (!name || !from || !msg) {
      status.textContent = 'Please fill in your name, email and message.';
      status.className = 'form-status err';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) {
      status.textContent = 'That email address looks incomplete.';
      status.className = 'form-status err';
      return;
    }

    const subject = `[Portfolio] ${topic} — ${name}`;

    // Fallback: no endpoint configured yet
    if (FORM_ENDPOINT.includes('YOUR_FORM_ID')) {
      const body = `Hi Dat,\n\n${msg}\n\n---\nName: ${name}\nEmail: ${from}\nTopic: ${topic}`;
      window.location.href =
        `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = 'Opening your email app...';
      status.className = 'form-status ok';
      return;
    }

    const original = sendBtn.textContent;
    sendBtn.textContent = 'Sending...';
    sendBtn.disabled = true;
    status.textContent = '';
    status.className = 'form-status';

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: from, topic, message: msg, _subject: subject })
      });

      if (res.ok) {
        status.textContent = 'Thanks — your message is on its way. I usually reply within a day or two.';
        status.className = 'form-status ok';
        $('#cName').value = '';
        $('#cEmail').value = '';
        $('#cMsg').value = '';
      } else {
        throw new Error('Request failed');
      }
    } catch {
      status.innerHTML =
        'That didn\'t go through. Please email me directly at ' +
        `<a href="mailto:${EMAIL}">${EMAIL}</a>.`;
      status.className = 'form-status err';
    } finally {
      sendBtn.textContent = original;
      sendBtn.disabled = false;
    }
  });

  /* ---------- 8. COPY TO CLIPBOARD ---------- */
  $$('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      const old = btn.textContent;
      btn.textContent = '✓';
      setTimeout(() => { btn.textContent = old; }, 1600);
    });
  });

  /* ---------- 9. RESIZE HANDLER ---------- */
  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      const open = $('.faq.open');
      if (open) {
        const a = $('.faq-a', open);
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    }, 150);
  });

})();
