// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveNav();
});

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Active nav link on scroll ──
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) {
      current = sec.id;
    }
  });

  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ── Typing animation ──
const typingTexts = [
  'Estudante de Eng. Computação',
  'Desenvolvedora Python & Django',
  'Desenvolvedora React & JavaScript',
  'Estagiária em busca de oportunidade',
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function typeWriter() {
  const current = typingTexts[textIndex];

  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 55 : 95;

  if (!isDeleting && charIndex === current.length) {
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
    delay = 400;
  }

  setTimeout(typeWriter, delay);
}

typeWriter();

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Project image carousels ──
const todosCarrosseis = document.querySelectorAll('.carrossel-imagens');
const deslocamentos = new Array(todosCarrosseis.length).fill(0);

function getCarouselIndex(inner) {
  return Array.from(todosCarrosseis).indexOf(inner);
}

function initCarousels() {
  todosCarrosseis.forEach((inner, i) => {
    const container = inner.closest('.carrossel-projeto');
    const imgs = inner.querySelectorAll('img');
    const w = container.clientWidth;
    imgs.forEach(img => (img.style.width = w + 'px'));
    deslocamentos[i] = 0;
    inner.style.transform = 'translateX(0)';
  });
}

document.querySelectorAll('.proximo').forEach(btn => {
  btn.addEventListener('click', () => {
    const container = btn.closest('.carrossel-projeto');
    const inner = container.querySelector('.carrossel-imagens');
    const i = getCarouselIndex(inner);
    const imgs = inner.querySelectorAll('img');
    const w = container.clientWidth;
    const max = (imgs.length - 1) * w;
    deslocamentos[i] = Math.min(deslocamentos[i] + w, max);
    inner.style.transform = `translateX(-${deslocamentos[i]}px)`;
  });
});

document.querySelectorAll('.anterior').forEach(btn => {
  btn.addEventListener('click', () => {
    const container = btn.closest('.carrossel-projeto');
    const inner = container.querySelector('.carrossel-imagens');
    const i = getCarouselIndex(inner);
    const w = container.clientWidth;
    deslocamentos[i] = Math.max(deslocamentos[i] - w, 0);
    inner.style.transform = `translateX(-${deslocamentos[i]}px)`;
  });
});

window.addEventListener('resize', initCarousels);
initCarousels();
