document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.id;

  // Codice per index.html
  if (page === 'index') {
    const toggleBtn = document.getElementById('toggle-search');
    const searchForm = document.getElementById('search-form');

    if (toggleBtn && searchForm) {
      toggleBtn.addEventListener('click', () => {
        searchForm.classList.toggle('d-none');
      });
    }
  }

  // Codice per catalogo.html
  else if (page === 'catalogo') {
    // 1) toggle search (stesso codice dell'index)
    const toggleBtn = document.getElementById('toggle-search');
    const searchForm = document.getElementById('search-form');

    if (toggleBtn && searchForm) {
      toggleBtn.addEventListener('click', () => {
        searchForm.classList.toggle('d-none');
      });
    }

    // 2) filtro da URL con nascondi elementi
    const params = new URLSearchParams(window.location.search);
    const filtro = params.get('filtro');

    if (filtro) {
      const items = document.querySelectorAll('[data-categoria]');
      items.forEach(item => {
        if (item.getAttribute('data-categoria') !== filtro) {
          item.style.display = 'none';
        }
      });
    }

    // 3) gestione filtri con cards
    const cards = document.querySelectorAll(".card-container");

    if (filtro) {
      cards.forEach((card) => {
        const categorie = card.getAttribute("data-categoria")?.toLowerCase().split(" ") || [];
        const match = categorie.includes(filtro.toLowerCase());

        if (match) {
          card.classList.remove("d-none");
        } else {
          card.classList.add("d-none");
        }
      });
    } else {
      cards.forEach((card) => {
        card.classList.remove("d-none");
      });
    }

    // 4) funzione openDoctype per i tab
    window.openDoctype = function(evt, docType) {
      const tablinks = document.getElementsByClassName("tablinks");
      for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
      }
      evt.currentTarget.classList.add("active");

      const cards = document.getElementsByClassName("card-container");
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        if (docType === "All" || card.classList.contains(docType)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      }
    }
  }
});

let slideIndex = 0;
let zoomLevel = 1;
let slides;

document.addEventListener("DOMContentLoaded", () => {
  slides = document.querySelectorAll(".slide");

  if (slides.length > 0) {
    showSlide(slideIndex);
  }

  const nextBtn = document.getElementById("next-slide");
  const prevBtn = document.getElementById("prev-slide");
  const zoomInBtn = document.getElementById("zoom-in");
  const zoomOutBtn = document.getElementById("zoom-out");

  // Se ci sono i bottoni, aggiungi i listener
  if (nextBtn && prevBtn && zoomInBtn && zoomOutBtn) {
    nextBtn.addEventListener("click", () => plusSlides(1));
    prevBtn.addEventListener("click", () => plusSlides(-1));
    zoomInBtn.addEventListener("click", zoomIn);
    zoomOutBtn.addEventListener("click", zoomOut);
  }
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
    slide.style.transform = "scale(1)";
  });
  zoomLevel = 1;
}

function plusSlides(n) {
  slideIndex = (slideIndex + n + slides.length) % slides.length;
  showSlide(slideIndex);
}

function zoomIn() {
  if (slides && slides[slideIndex]) {
    zoomLevel += 0.1;
    slides[slideIndex].style.transform = `scale(${zoomLevel})`;
  }
}

function zoomOut() {
  if (slides && slides[slideIndex]) {
    zoomLevel = Math.max(0.5, zoomLevel - 0.1);
    slides[slideIndex].style.transform = `scale(${zoomLevel})`;
  }
}
