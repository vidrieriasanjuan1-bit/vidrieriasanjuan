/*=========================================
      VIDRIERÍA SAN JUAN
=========================================*/

// =========== MENÚ RESPONSIVE ===========

const menu = document.querySelector(".menu");
const nav = document.querySelector("#nav");

if (menu) {
  menu.addEventListener("click", () => {
    nav.classList.toggle("activo");
    menu.classList.toggle("activo");
  });
}

// Cerrar menú al seleccionar una opción
document.querySelectorAll("#nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("activo");
    if (menu) {
      menu.classList.remove("activo");
    }
  });
});

// Cerrar menú al hacer clic fuera
document.addEventListener("click", (e) => {
  if (!e.target.closest(".header")) {
    nav.classList.remove("activo");
    if (menu) {
      menu.classList.remove("activo");
    }
  }
});

// =========== CARRUSEL ===========

window.addEventListener("load", () => {
  if (window.Flickity) {
    document.querySelectorAll(".js-flickity").forEach((slider) => {
      new Flickity(slider, {
        wrapAround: true,
        autoPlay: 3500,
        pageDots: true,
        prevNextButtons: false,
        pauseAutoPlayOnHover: false,
        selectedAttraction: 0.02,
        friction: 0.28,
      });
    });
  }
});

// =========== ANIMACIÓN AL HACER SCROLL ===========

const elementos = document.querySelectorAll(
  ".card, .servicio, .cliente, .info"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("mostrar");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

elementos.forEach((el) => observer.observe(el));

// =========== GALERÍA LIGHTBOX ===========

const imagenes = document.querySelectorAll(".imagenes img");

imagenes.forEach((img) => {
  img.addEventListener("click", () => {
    const fondo = document.createElement("div");
    fondo.className = "lightbox";

    const imagen = document.createElement("img");
    imagen.src = img.src;
    imagen.alt = img.alt;

    fondo.appendChild(imagen);
    document.body.appendChild(fondo);

    // Cerrar al hacer clic en el fondo
    fondo.addEventListener("click", (e) => {
      if (e.target === fondo) {
        fondo.remove();
      }
    });

    // Cerrar al presionar ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        fondo.remove();
      }
    });
  });
});

// =========== FORMULARIO ===========

const formulario = document.querySelector("#presupuesto-form");

if (formulario) {
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = formulario.querySelector('input[name="nombre"]')?.value || "";
    const telefono = formulario.querySelector('input[name="telefono"]')?.value || "";
    const correo = formulario.querySelector('input[name="correo"]')?.value || "";
    const proyecto = formulario.querySelector('textarea[name="proyecto"]')?.value || "";

    // Validar campos
    if (!nombre || !telefono || !correo || !proyecto) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Crear mensaje para WhatsApp
    const mensaje = `¡Hola! Me llamo ${nombre}.\n\nMi teléfono es: ${telefono}\nMi correo es: ${correo}\n\nMi proyecto es:\n${proyecto}`;

    // Enviar por WhatsApp
    const enlace = `https://wa.me/51943780191?text=${encodeURIComponent(mensaje)}`;
    window.open(enlace, "_blank");

    // Mostrar mensaje de confirmación
    alert("¡Gracias! Tu presupuesto será enviado por WhatsApp.");

    formulario.reset();
  });
}

// =========== BOTÓN VOLVER ARRIBA ===========

const arriba = document.createElement("button");
arriba.innerHTML = '<i class="fas fa-arrow-up"></i>';
arriba.className = "btn-arriba";
arriba.title = "Volver al inicio";
document.body.appendChild(arriba);

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    arriba.classList.add("visible");
  } else {
    arriba.classList.remove("visible");
  }
});

arriba.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// =========== EFECTO HEADER ===========

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.style.padding = "5px 0";
    header.style.background = "rgba(15, 94, 168, 0.98)";
    header.style.boxShadow = "0 6px 25px rgba(0, 0, 0, 0.2)";
  } else {
    header.style.padding = "15px 0";
    header.style.background = "rgba(15, 94, 168, 0.95)";
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
  }
});

// =========== WHATSAPP ===========

const whatsapp = document.querySelector(".float");

if (whatsapp) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 250) {
      whatsapp.style.opacity = "1";
      whatsapp.style.transform = "scale(1)";
      whatsapp.style.pointerEvents = "auto";
    } else {
      whatsapp.style.opacity = "0.85";
    }
  });
}

// =========== SUAVIZAR ENLACES INTERNOS ===========

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// =========== CARGAR ANIMACIONES AL INICIAR ===========

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Sitio Vidriería San Juan cargado correctamente");

  // Animar elementos visibles
  elementos.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("mostrar");
    }
  });
});

// =========== THROTTLE PARA MEJOR RENDIMIENTO ===========

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Aplicar throttle al scroll
window.addEventListener(
  "scroll",
  throttle(() => {
    // El resto del código de scroll ya está aquí
  }, 100)
);