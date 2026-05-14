/* ═══════════════════════════════════════════════════════════════
   PORTAFOLIO — Andrés Felipe Flórez Vargas
   main.js — Lógica interactiva modular
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── 1. LOADER ───────────────────────────────────────────────── */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('no-scroll');
      initHeroAnimations();
    }, 700);
  });

  document.body.classList.add('no-scroll');
}

/* ─── 2. TEMA OSCURO / CLARO ──────────────────────────────────── */
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const html   = document.documentElement;

  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  toggle?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });
}

/* ─── 3. CURSOR PERSONALIZADO ─────────────────────────────────── */
function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  const isTouchDevice = window.matchMedia('(hover: none)').matches;
  if (isTouchDevice) return;

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left   = mouseX + 'px';
    cursor.style.top    = mouseY + 'px';
    follower.style.left = mouseX + 'px';
    follower.style.top  = mouseY + 'px';
  });

  const hoverEls = document.querySelectorAll('a, button, [data-hover]');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor--hover');
      follower.classList.add('cursor--hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor--hover');
      follower.classList.remove('cursor--hover');
    });
  });
}

/* ─── 4. NAVBAR SCROLL + ACTIVE LINK ─────────────────────────── */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navLinks');

  if (!navbar) return;

  /* Glassmorphism al hacer scroll */
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
    toggleScrollTop();
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  /* Scroll-spy: resalta el link de la sección visible */
  function updateActiveLink() {
    let currentId = '';
    const offset  = navbar.offsetHeight + 20;

    sections.forEach(section => {
      const top = section.offsetTop - offset;
      if (window.scrollY >= top) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + currentId
      );
      link.setAttribute(
        'aria-current',
        link.getAttribute('href') === '#' + currentId ? 'page' : 'false'
      );
    });
  }

  /* Smooth scroll al hacer clic en links del navbar */
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          closeMenu();
        }
      }
    });
  });

  /* Menú hamburguesa */
  hamburger?.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('no-scroll', isOpen);
  });

  /* Cerrar menú al hacer clic fuera */
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  /* Cerrar al presionar Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }
}

/* ─── 5. SCROLL TO TOP ────────────────────────────────────────── */
function toggleScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  btn.classList.toggle('visible', window.scrollY > 400);
}

function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  btn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── 6. TYPEWRITER ───────────────────────────────────────────── */
function initHeroAnimations() {
  const el     = document.getElementById('typewriter');
  if (!el) return;

  const texts  = ['Hola, soy Andrés', 'Dev Junior', 'Python · n8n · Web'];
  let textIdx  = 0;
  let charIdx  = 0;
  let deleting = false;
  let paused   = false;

  function type() {
    const current = texts[textIdx];

    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        paused = true;
        setTimeout(() => { paused = false; deleting = true; }, 2200);
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        textIdx  = (textIdx + 1) % texts.length;
      }
    }

    if (!paused) {
      setTimeout(type, deleting ? 55 : 95);
    } else {
      setTimeout(type, 100);
    }
  }

  type();
}

/* ─── 7. CONTADORES ANIMADOS ──────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.counter-num');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.counted) return;
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    });
  }, { threshold: 0.6 });

  counters.forEach(c => observer.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOut(progress);
      const current  = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
}

/* ─── 8. STACK TABS ───────────────────────────────────────────── */
function initStackTabs() {
  const tabs   = document.querySelectorAll('.stack-tab');
  const panels = document.querySelectorAll('.stack__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => {
        p.classList.remove('active');
        p.hidden = true;
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const panel = document.getElementById('tab-' + target);
      if (panel) {
        panel.classList.add('active');
        panel.hidden = false;
        /* Re-disparar animaciones AOS en el panel */
        panel.querySelectorAll('[data-aos]').forEach(el => {
          el.classList.remove('aos-animate');
          requestAnimationFrame(() => el.classList.add('aos-animate'));
        });
      }
    });
  });
}

/* ─── 9. FILTROS DE PROYECTOS ─────────────────────────────────── */
function initProjectFilters() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        /* Animación suave */
        if (match) {
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = '';
            card.style.opacity   = '0';
            card.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.4s, transform 0.4s';
              card.style.opacity    = '1';
              card.style.transform  = '';
            });
          });
        }
      });
    });
  });
}

/* ─── 10. VANILLA TILT EN CARDS ──────────────────────────────── */
function initTilt() {
  if (typeof VanillaTilt === 'undefined') return;
  if (window.matchMedia('(hover: none)').matches) return;

  VanillaTilt.init(document.querySelectorAll('.project-card'), {
    max:          8,
    speed:        400,
    glare:        true,
    'max-glare': 0.08,
    perspective:  1000,
  });
}

/* ─── 11. AOS (Animate On Scroll) ────────────────────────────── */
function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({
    duration:   600,
    easing:     'ease-out-cubic',
    once:       true,
    offset:     80,
  });
}

/* ─── 12. VALIDACIÓN Y ENVÍO DE FORMULARIO ────────────────────── */
function initContactForm() {
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const success   = document.getElementById('formSuccess');
  if (!form) return;

  /* Regex básico de email */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const fields = {
    name:    { el: form.querySelector('#name'),    error: form.querySelector('#nameError'),    validate: v => v.trim().length >= 2 ? '' : 'Ingresa tu nombre (mín. 2 caracteres).' },
    email:   { el: form.querySelector('#email'),   error: form.querySelector('#emailError'),   validate: v => EMAIL_RE.test(v.trim()) ? '' : 'Ingresa un email válido.' },
    message: { el: form.querySelector('#message'), error: form.querySelector('#messageError'), validate: v => v.trim().length >= 10 ? '' : 'El mensaje debe tener al menos 10 caracteres.' },
  };

  /* Validación en tiempo real */
  Object.values(fields).forEach(({ el, error, validate }) => {
    if (!el) return;
    el.addEventListener('input', () => {
      const msg = validate(el.value);
      setFieldState(el, error, msg);
    });
    el.addEventListener('blur', () => {
      if (!el.value) return;
      const msg = validate(el.value);
      setFieldState(el, error, msg);
    });
  });

  function setFieldState(input, errorEl, message) {
    input.classList.toggle('error', !!message);
    input.classList.toggle('valid', !message && input.value.trim() !== '');
    if (errorEl) errorEl.textContent = message;
  }

  /* Envío */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;
    Object.values(fields).forEach(({ el, error, validate }) => {
      if (!el) return;
      const msg = validate(el.value);
      setFieldState(el, error, msg);
      if (msg) valid = false;
    });

    if (!valid) return;

    /* Simula carga y abre cliente de correo como fallback */
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const name    = form.querySelector('#name')?.value.trim()    || '';
    const email   = form.querySelector('#email')?.value.trim()   || '';
    const subject = form.querySelector('#subject')?.value.trim() || 'Contacto desde portafolio';
    const message = form.querySelector('#message')?.value.trim() || '';

    const mailto = `mailto:noxustrifarix11@gmail.com`
      + `?subject=${encodeURIComponent(subject)}`
      + `&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\n${message}`)}`;

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      /* Mostrar éxito */
      success.removeAttribute('aria-hidden');
      success.style.display = 'flex';

      /* Abrir cliente de correo */
      window.location.href = mailto;

      /* Limpiar formulario */
      form.reset();
      Object.values(fields).forEach(({ el }) => {
        el?.classList.remove('valid', 'error');
      });

      /* Ocultar mensaje éxito tras 5s */
      setTimeout(() => {
        success.setAttribute('aria-hidden', 'true');
        success.style.display = 'none';
      }, 5000);
    }, 1200);
  });
}

/* ─── 13. AÑO DINÁMICO ────────────────────────────────────────── */
function initYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ─── 14. LAZY LOADING DE IMÁGENES ───────────────────────────── */
function initLazyImages() {
  const imgs = document.querySelectorAll('img[data-src]');
  if (!imgs.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    });
  }, { rootMargin: '200px' });

  imgs.forEach(img => observer.observe(img));
}

/* ─── 15. INICIALIZACIÓN PRINCIPAL ───────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  /* Inicializar iconos Lucide */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initLoader();
  initTheme();
  initCursor();
  initNavbar();
  initScrollTop();
  initCounters();
  initStackTabs();
  initProjectFilters();
  initTilt();
  initAOS();
  initContactForm();
  initYear();
  initLazyImages();
});
