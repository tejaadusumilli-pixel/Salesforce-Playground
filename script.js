// ─── THEME TOGGLE ────────────────────────────────────────────
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const navbar = document.getElementById('navbar');
let dark = true;

function updateNavBg() {
  navbar.style.background = window.scrollY > 60
    ? (dark ? 'rgba(11,11,22,0.95)' : 'rgba(244,244,250,0.95)')
    : (dark ? 'rgba(11,11,22,0.8)'  : 'rgba(244,244,250,0.85)');
}

function applyTheme(isDark) {
  html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeBtn.textContent = isDark ? '🌙' : '☀️';
  dark = isDark;
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateNavBg();
}

// Restore saved theme, else respect system preference
const saved = localStorage.getItem('theme');
if (saved) {
  applyTheme(saved === 'dark');
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  applyTheme(false);
}

themeBtn.addEventListener('click', () => applyTheme(!dark));

// ─── SCROLL REVEAL ───────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObs.observe(el));

// ─── NAV SCROLL EFFECT ───────────────────────────────────────
window.addEventListener('scroll', updateNavBg, { passive: true });

// ─── SCREENSHOT TABS ─────────────────────────────────────────
const stabs = document.querySelectorAll('.stab');
stabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const panel = tab.dataset.panel;
    stabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.screenshot-panel').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('panel-' + panel);
    if (target) target.classList.add('active');
  });
});

// ─── MOBILE NAV ──────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '64px';
  navLinks.style.left = '0'; navLinks.style.right = '0';
  navLinks.style.flexDirection = 'column';
  navLinks.style.gap = '0';
  navLinks.style.background = dark ? '#0B0B16' : '#F4F4FA';
  navLinks.style.borderBottom = '1px solid var(--border)';
  navLinks.style.padding = '1rem 2rem';
});

// Close nav on link click (mobile only)
navLinks && navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (hamburger.offsetParent !== null) {
      navLinks.style.display = 'none';
    }
  });
});

// ─── SMOOTH ACTIVE SECTION HIGHLIGHT ─────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const secObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + id
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => secObs.observe(s));