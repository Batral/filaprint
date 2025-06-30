// Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse.classList.contains('show')) {
            bootstrap.Collapse.getInstance(navbarCollapse).hide();
          }
        }
      });
    });

    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const successAlert = document.getElementById('successAlert');
      const errorAlert = document.getElementById('errorAlert');
      
      // Hide previous alerts
      successAlert.classList.add('d-none');
      errorAlert.classList.add('d-none');
      
      // Get form data
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const service = formData.get('service');
      const message = formData.get('message');
      
      // Create mailto link
      const subject = Consulta de ${name} - ${service || 'Servicio general'};
      const body = Nombre: ${name}
Email: ${email}
Teléfono: ${phone || 'No proporcionado'}
Servicio de interés: ${service || 'No especificado'}

Mensaje:
${message};
      
      const mailtoLink = mailto:info@filaprint3d.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)};
      
      try {
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        successAlert.classList.remove('d-none');
        
        // Reset form
        this.reset();
        
        // Scroll to success message
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
      } catch (error) {
        // Show error message
        errorAlert.classList.remove('d-none');
        errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
