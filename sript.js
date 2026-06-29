const LINE_HEIGHT = 24; // doit correspondre à --line-h dans style.css


function buildGutter() {
  const gutter = document.getElementById('gutter');
  if (!gutter) return;

  const totalLines = Math.ceil(document.body.scrollHeight / LINE_HEIGHT) + 5;
  const currentLines = gutter.children.length;

  if (totalLines > currentLines) {
    const fragment = document.createDocumentFragment();
    for (let i = currentLines + 1; i <= totalLines; i++) {
      const span = document.createElement('span');
      span.textContent = i;
      fragment.appendChild(span);
    }
    gutter.appendChild(fragment);
  } else if (totalLines < currentLines) {
    while (gutter.children.length > totalLines) {
      gutter.removeChild(gutter.lastChild);
    }
  }
}

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(buildGutter, 150);
});
window.addEventListener('load', buildGutter);


const sections = document.querySelectorAll('main .section');
const tabs = document.querySelectorAll('.tab');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tabs.forEach((tab) => {
          tab.classList.toggle('active', tab.dataset.target === id);
        });
      }
    });
  },
  { rootMargin: '-45% 0px -45% 0px' }
);

sections.forEach((section) => sectionObserver.observe(section));


const skillItems = document.querySelectorAll('.skill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const level = entry.target.dataset.level || 0;
        const fill = entry.target.querySelector('.skill-fill');
        if (fill) fill.style.width = level + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

skillItems.forEach((item) => skillObserver.observe(item));


const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');

    button.disabled = true;
    status.textContent = '$ envoi en cours...';

    setTimeout(() => {
      status.textContent = '$ message envoyé ✓ (démo — connecte un service d\'email pour le rendre réel)';
      button.disabled = false;
      form.reset();
    }, 800);
  });
}