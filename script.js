// Navbar scroll effect
const navbar = document.getElementById('navbar');
const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

// Contact form
// Contact form (EmailJS)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

// Init EmailJS
(function () {
  emailjs.init("Gx8OIY0nGTkxc3HwT");
})();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  // Validations (keep yours)
  if (!data.name || !data.email || !data.message) {
    status.textContent = 'Por favor completa los campos requeridos.';
    status.className = 'form-status error';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    status.textContent = 'Ingresa un correo electrónico válido.';
    status.className = 'form-status error';
    return;
  }

  // UX: loading state
  status.textContent = 'Enviando mensaje...';
  status.className = 'form-status';

  emailjs.send("service_rswkq7s", "template_m83obwl", {
    name: data.name,
    email: data.email,
    phone: data.phone || "No proporcionado",
    service: data.service || "No especificado",
    message: data.message
  })
  .then(() => {
    status.textContent = '¡Mensaje enviado! Te contactaremos pronto.';
    status.className = 'form-status success';
    form.reset();

    setTimeout(() => {
      status.textContent = '';
      status.className = 'form-status';
    }, 5000);
  })
  .catch((error) => {
    console.error('EmailJS error:', error);
    status.textContent = 'Error al enviar el mensaje. Intenta de nuevo.';
    status.className = 'form-status error';
  });
});
