/* =========================================================
   Aline Freire Souza — Portfolio scripts
   Sem dependências. Módulos:
   1. Tema claro/escuro
   2. Menu mobile
   3. Header ao rolar + link ativo
   4. Animações de entrada (Intersection Observer)
   5. Barras de habilidades
   6. Foto de perfil (fallback)
   7. Copiar e-mail
   8. Ano do rodapé
   ========================================================= */

(function () {
  'use strict';

  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- 1. Tema ---------- */
  const themeToggle = $('#themeToggle');

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) { /* storage indisponível */ }
    themeToggle?.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  themeToggle?.addEventListener('click', () => {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  // Acompanha o sistema se o usuário nunca escolheu manualmente
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener?.('change', (e) => {
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (err) { /* ignore */ }
    if (!saved) root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  });

  /* ---------- 2. Menu mobile ---------- */
  const menuToggle = $('#menuToggle');
  const nav = $('#nav');

  function closeMenu() {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }

  menuToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  $$('.nav__link').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') && !nav.contains(e.target) && !menuToggle.contains(e.target)) closeMenu();
  });

  /* ---------- 3. Header + link ativo ---------- */
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const navLinks = $$('.nav__link');
  const sections = navLinks
    .map((link) => $(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => sectionObserver.observe(s));
  }

  /* ---------- 4. Animações de entrada ---------- */
  const revealEls = $$('.reveal');

  // Efeito cascata: elementos irmãos aparecem um após o outro
  revealEls.forEach((el) => {
    const siblings = Array.from(el.parentElement.children).filter((c) => c.classList.contains('reveal'));
    const index = siblings.indexOf(el);
    el.style.transitionDelay = Math.min(index * 70, 420) + 'ms';
  });

  /* ---------- 5. Barras de habilidades ---------- */
  function fillBars(container) {
    $$('.bar', container).forEach((bar) => {
      const level = Math.max(0, Math.min(100, parseInt(bar.dataset.level, 10) || 0));
      const fill = $('.bar__fill', bar);
      if (fill) fill.style.width = level + '%';
    });
  }

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        if (entry.target.querySelector('.bar')) fillBars(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    fillBars(document);
  }

  /* ---------- 6. Foto de perfil ---------- */
  const photo = $('#profilePhoto');
  const showFallback = () => photo.parentElement.classList.add('no-photo');
  if (photo) {
    photo.addEventListener('error', showFallback);
    if (photo.complete && photo.naturalWidth === 0) showFallback();
  }

  /* ---------- 7. Copiar e-mail ---------- */
  const toast = $('#toast');
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
  }

  $('#copyEmail')?.addEventListener('click', async (e) => {
    const email = e.currentTarget.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      showToast('Email copied to clipboard');
    } catch (err) {
      showToast(email);
    }
  });

  /* ---------- 8. Ano ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
