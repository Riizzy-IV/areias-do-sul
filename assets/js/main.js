/* ============================================================
   AREIAS DO SUL — main.js
   ============================================================ */

/* --- Navbar: sticky ao rolar ------------------------------- */
const navbar   = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* --- Navbar: menu mobile ----------------------------------- */
navToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

/* Fecha menu ao clicar em link */
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* --- Galeria: carrossel vertical --------------------------- */
const galeriaTrack = document.getElementById('galeriaTrack');
const prevBtn    = document.getElementById('galeriaPrev');
const nextBtn    = document.getElementById('galeriaNext');
let currentSlide = 0;
let activeFilter = 'apartamentos';

function getVisibleSlides() {
  return [...document.querySelectorAll('.galeria__slide')].filter(s =>
    !s.dataset.filter || s.dataset.filter === activeFilter
  );
}

function applyFilter(filter) {
  activeFilter = filter;
  currentSlide = 0;
  document.querySelectorAll('.galeria__slide').forEach(s => {
    s.style.display = (!s.dataset.filter || s.dataset.filter === filter) ? '' : 'none';
  });
  galeriaTrack.style.transform = 'translateY(0)';
}

document.querySelectorAll('.galeria__filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.galeria__filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.filter);
  });
});

applyFilter(activeFilter);

function getSlideStep() {
  const visible = getVisibleSlides();
  if (!visible[0]) return 0;
  const slideH = visible[0].offsetHeight;
  const gap = parseInt(getComputedStyle(galeriaTrack).gap) || 24;
  return slideH + gap;
}

function moveGaleria(index) {
  if (!galeriaTrack) return;
  const visible = getVisibleSlides();
  currentSlide = Math.max(0, Math.min(index, visible.length - 1));
  const offset = getSlideStep() * currentSlide;
  galeriaTrack.style.transform = `translateY(-${offset}px)`;
}

if (prevBtn) prevBtn.addEventListener('click', () => moveGaleria(currentSlide - 1));
if (nextBtn) nextBtn.addEventListener('click', () => moveGaleria(currentSlide + 1));

/* --- Galeria: lightbox ------------------------------------- */
const lightbox      = document.getElementById('galeriaLightbox');
const lightboxImg   = document.getElementById('galeriaLightboxImg');
const lightboxClose = document.getElementById('galeriaLightboxClose');

document.querySelectorAll('.galeria__expand').forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.closest('.galeria__slide').querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  });
}

lightbox && lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }
});

/* --- Implantação: expandir imagem -------------------------- */
const implantacaoExpand = document.getElementById('implantacaoExpand');
const implantacaoWrap = implantacaoExpand?.closest('.implantacao__img-wrap');
[implantacaoExpand, implantacaoWrap].forEach(el => {
  if (!el) return;
  el.addEventListener('click', () => {
    lightboxImg.src = 'assets/images/IMPLANTACAO.png';
    lightboxImg.alt = 'Planta de implantação';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

/* --- Scroll suave para âncoras ----------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* --- Plantas: seletores de tipo e metragem ----------------- */
const plantasDB = {
  garden: {
    label: 'Térreo',
    hasFloors: true,
    sizes: [
      { id: '143',  area: '143,25m²', suites: '3 Suítes e 1 Vaga', floors: ['garden/143,25.png',  'garden/garden-01-06.jpg'] },
      { id: '142',  area: '142,39m²', suites: '3 Suítes e 1 Vaga', floors: ['garden/142,39.png',  'garden/garden-02-05.jpg'] },
      { id: '107a', area: '107,52m²', suites: '2 Suítes e 1 Vaga', floors: ['garden/107,52.png',  'garden/garden-03-04.jpg'] },
      { id: '107b', area: '107,32m²', suites: '2 Suítes e 1 Vaga', floors: ['garden/107,32.png',  'garden/garden-03-04.jpg'] },
    ],
  },
  tipo: {
    label: '1º Pavimento',
    sizes: [
      { id: '106', area: '106,48m²', suites: '3 Suítes e 1 Vaga', img: 'tipo/106,48.png' },
      { id: '97',  area: '97,99m²',  suites: '3 Suítes e 1 Vaga', img: 'tipo/97,99.png' },
      { id: '85',  area: '85,74m²',  suites: '2 Suítes e 1 Vaga', img: 'tipo/85,74.png' },
    ],
  },
  cobertura: {
    label: '1º Andar',
    hasFloors: true,
    floorLabels: ['1º Andar', '2º Andar'],
    sizes: [
      { id: '134', area: '134,80m²', suites: '3 Suítes e 1 Vaga', floors: ['cobertura/134,80.png',  'cobertura/134,80 2 andar.png'] },
      { id: '136', area: '136,71m²', suites: '3 Suítes e 1 Vaga', floors: ['cobertura/136,71.png',  'cobertura/136,71 2 andar.png'] },
      { id: '91',  area: '91,71m²',  suites: '2 Suítes e 1 Vaga', floors: ['cobertura/91,71.png',   'cobertura/91,71 2 andar.png'] },
      { id: '90',  area: '90,77m²',  suites: '2 Suítes e 1 Vaga', floors: ['cobertura/90,77.png',   'cobertura/90,77 2 andar.png'] },
    ],
  },
};

let activeTipo = 'garden';
let activeSizeId = '143';
let activeFloor = 0;

const plantaImg       = document.getElementById('plantaImg');
const plantaAreaNum   = document.getElementById('plantaAreaNum');
const plantaTipoLabel = document.getElementById('plantaTipoLabel');
const plantaSuites    = document.getElementById('plantaSuites');
const sizesContainer  = document.querySelector('.plantas__sizes');
const floorsContainer = document.getElementById('plantasFloors');

function renderSizes(tipo) {
  if (!sizesContainer) return;
  const { sizes } = plantasDB[tipo];
  sizesContainer.innerHTML = sizes.map((s, i) =>
    `<button class="plantas__size-btn${i === 0 ? ' active' : ''}" data-size="${s.id}">${s.area}</button>`
  ).join('');
  sizesContainer.querySelectorAll('.plantas__size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sizesContainer.querySelectorAll('.plantas__size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSizeId = btn.dataset.size;
      updatePlanta();
    });
  });
}

function updateFloorButtons(tipo) {
  if (!floorsContainer) return;
  const tipoData = plantasDB[tipo];
  const hasFloors = tipoData?.hasFloors;
  floorsContainer.style.display = hasFloors ? 'flex' : 'none';
  if (hasFloors) {
    activeFloor = 0;
    const labels = tipoData.floorLabels || ['1º Andar', '2º Andar'];
    const btns = floorsContainer.querySelectorAll('.plantas__floor-btn');
    btns.forEach((btn, i) => {
      btn.classList.toggle('active', i === 0);
      btn.textContent = labels[i];
    });
  }
}

function updatePlanta() {
  const tipoData = plantasDB[activeTipo];
  if (!tipoData) return;
  const sizeData = tipoData.sizes.find(s => s.id === activeSizeId);
  if (!sizeData) return;
  plantaAreaNum.textContent = sizeData.area;
  plantaSuites.textContent  = sizeData.suites;
  if (tipoData.hasFloors) {
    const label = tipoData.floorLabels ? tipoData.floorLabels[activeFloor] : tipoData.label;
    plantaTipoLabel.textContent = label;
    plantaImg.src = `assets/images/plantas/${sizeData.floors[activeFloor]}`;
  } else {
    plantaTipoLabel.textContent = tipoData.label;
    plantaImg.src = `assets/images/plantas/${sizeData.img}`;
  }
}

if (floorsContainer) {
  floorsContainer.querySelectorAll('.plantas__floor-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      floorsContainer.querySelectorAll('.plantas__floor-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFloor = parseInt(btn.dataset.floor);
      updatePlanta();
    });
  });
}

document.querySelectorAll('.plantas__tipo-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.plantas__tipo-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTipo = btn.dataset.tipo;
    activeSizeId = plantasDB[activeTipo].sizes[0].id;
    renderSizes(activeTipo);
    updateFloorButtons(activeTipo);
    updatePlanta();
  });
});

renderSizes(activeTipo);
updateFloorButtons(activeTipo);
updatePlanta();

/* --- Plantas: expandir imagem no lightbox ------------------ */
const plantaPlanWrap = document.querySelector('.plantas__plan-wrap');
if (plantaPlanWrap) {
  plantaPlanWrap.style.cursor = 'zoom-in';
  plantaPlanWrap.addEventListener('click', () => {
    lightboxImg.src = plantaImg.src;
    lightboxImg.alt = plantaImg.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
}
