/* ============================================================
   scripts.js — QNetSys (OPTIMIZADO)
   ============================================================ */

/* ── 1. NAVBAR ────────────────────────────────────────────── */
(function () {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('nav-scrolled', window.scrollY > 20);
  }, { passive: true });
})();

/* ── 2. MENÚ MÓVIL ────────────────────────────────────────── */
function toggleMobileMenu() {
  var menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('hidden');
}

/* ── 2b. SUBMENÚ MÓVIL (acordeón, ej: "Cómo trabajamos") ──── */
function toggleMobileSubmenu(id) {
  var panel = document.getElementById(id);
  var icon = document.getElementById(id + '-icon');
  if (!panel) return;
  panel.classList.toggle('hidden');
  if (icon) icon.classList.toggle('rotate-180');
}
(function () {
  var menu = document.getElementById('mobileMenu');
  if (!menu) return;
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.add('hidden');
    });
  });
})();

/* ── 3. SCROLL REVEAL ─────────────────────────────────────── */
(function () {
  var els = document.querySelectorAll('.scroll-reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('revealed'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
})();

/* ── 4. CONTADORES ANIMADOS ───────────────────────────────── */
(function () {
  var counters = document.querySelectorAll('.counter-value');
  if (!counters.length) return;
  function animate(el) {
    var target = parseInt(el.dataset.target, 10);
    var suffix = el.dataset.suffix || '';
    var duration = 1800;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(e * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  if (!('IntersectionObserver' in window)) {
    counters.forEach(function (el) {
      el.textContent = el.dataset.target + (el.dataset.suffix || '');
    });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  counters.forEach(function (el) { io.observe(el); });
})();

/* ── 5. MODAL DE SERVICIOS ────────────────────────────────── */
var serviceData = {
  cctv: {
    title: 'CCTV & Video Vigilancia',
    color: 'bg-cyan-500/10 text-cyan-400',
    icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>',
    description: 'Sistemas de videovigilancia profesional con cámaras IP 4K/8K, análisis por IA, almacenamiento cloud o local y alertas en tiempo real.',
    features: ['Cámaras IP 4K/8K con visión nocturna','Detección de personas y vehículos por IA','Grabación en nube y NVR local redundante','Alertas por app o email en tiempo real','Integración con control de acceso','Hasta 256 cámaras por servidor']
  },
  access: {
    title: 'Control de Acceso',
    color: 'bg-indigo-500/10 text-indigo-400',
    icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>',
    description: 'Biometría facial, huella dactilar, tarjetas RFID y lectores QR. Gestión centralizada con registro de eventos en tiempo real.',
    features: ['Reconocimiento facial y huella dactilar','Tarjetas inteligentes RFID / NFC','Torniquetes, barreras y puertas automáticas','Integración con RRHH y ERP','Reportes de asistencia y auditoría','Gestión remota vía app móvil']
  },
  iot: {
    title: 'Integración IoT',
    color: 'bg-emerald-500/10 text-emerald-400',
    icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>',
    description: 'Conectamos sensores, actuadores y dispositivos en una red unificada. Desde temperatura y humo hasta iluminación y HVAC automatizados.',
    features: ['Protocolos MQTT, Modbus, BACnet, Zigbee','Edge computing para procesamiento local','Dashboards personalizados en tiempo real','Automatización de procesos y alertas','Integración con AWS / Azure','De 10 a 10.000+ dispositivos']
  },
  cyber: {
    title: 'Ciberseguridad',
    color: 'bg-purple-500/10 text-purple-400',
    icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.131A8 8 0 008 8"/></svg>',
    description: 'Protección integral de redes y sistemas críticos con firewall NGFW, cifrado end-to-end y monitoreo continuo de amenazas.',
    features: ['Firewall NGFW e IDS/IPS','Cifrado end-to-end en tránsito y en reposo','SIEM y monitoreo de amenazas 24/7','Análisis de vulnerabilidades y pentesting','Segmentación de red y Zero Trust','Cumplimiento ISO 27001 y GDPR']
  },
  cloud: {
    title: 'Plataforma Cloud',
    color: 'bg-blue-500/10 text-blue-400',
    icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>',
    description: 'Gestión centralizada desde cualquier dispositivo. Dashboards en tiempo real, reportes automáticos y almacenamiento con redundancia geográfica.',
    features: ['Dashboard web y app móvil (iOS/Android)','Almacenamiento cifrado AES-256','Reportes automáticos programados','APIs REST para integración de terceros','Uptime 99.9% garantizado','Backup y recuperación ante desastres']
  },
  support: {
    title: 'Soporte 24/7',
    color: 'bg-orange-500/10 text-orange-400',
    icon: '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
    description: 'Centro de monitoreo permanente con técnicos especializados disponibles las 24 horas. Respuesta inmediata a incidentes y mantenimiento preventivo.',
    features: ['Mesa de ayuda 24/7/365','Respuesta garantizada en menos de 2 horas','Mantenimiento preventivo trimestral','Actualizaciones de firmware y software','Monitoreo remoto proactivo','SLA documentado con penalidades']
  }
};

function showServiceDetail(key) {
  var d = serviceData[key];
  if (!d) return;
  var modal = document.getElementById('serviceModal');
  if (!modal) return;
  var iconEl = document.getElementById('modalIcon');
  iconEl.className = 'w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ' + d.color;
  iconEl.innerHTML = d.icon;
  document.getElementById('modalTitle').textContent = d.title;
  document.getElementById('modalDescription').textContent = d.description;
  document.getElementById('modalFeatures').innerHTML = d.features.map(function (f) {
    return '<li class="flex items-center gap-2 text-sm text-gray-300">'
      + '<svg class="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">'
      + '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>'
      + f + '</li>';
  }).join('');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
  var modal = document.getElementById('serviceModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeServiceModal();
});

/* ── 5b. MODAL FLOTANTE: TÉRMINOS / PRIVACIDAD (lee los archivos reales) ── */
var legalDocsCache = {};

function openLegalModal(event, url, title) {
  if (event) event.preventDefault();

  var modal = document.getElementById('legalModal');
  var content = document.getElementById('legalModalContent');
  if (!modal || !content) return false;

  modal.classList.remove('hidden');
  modal.classList.add('flex', 'active');
  document.body.style.overflow = 'hidden';

  if (legalDocsCache[url]) {
    content.innerHTML = legalDocsCache[url];
    return false;
  }

  content.innerHTML = '<div class="flex items-center justify-center py-16 text-gray-400 text-sm">Cargando ' + title + '…</div>';

  fetch(url)
    .then(function (res) {
      if (!res.ok) throw new Error('No se pudo cargar ' + url);
      return res.text();
    })
    .then(function (html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      var source = doc.querySelector('.max-w-4xl') || doc.body;
      legalDocsCache[url] = source.innerHTML;
      // Si el modal sigue abierto en este mismo documento, lo pintamos
      if (!modal.classList.contains('hidden')) {
        content.innerHTML = legalDocsCache[url];
      }
    })
    .catch(function () {
      content.innerHTML =
        '<p class="text-red-400 text-sm">No se pudo cargar el documento. ' +
        '<a href="' + url + '" target="_blank" rel="noopener" class="text-cyan-400 hover:underline">Abrirlo en una pestaña nueva</a>.</p>';
    });

  return false;
}

function closeLegalModal() {
  var modal = document.getElementById('legalModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex', 'active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLegalModal();
});

/* ── 6. FORMULARIO WEB3FORMS ──────────────────────────────── */
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;
  var btn = document.getElementById('submitBtn');
  var btnText = document.getElementById('submitBtnText');
  var icon = document.getElementById('submitIcon');
  var spinner = document.getElementById('submitSpinner');
  var success = document.getElementById('formSuccess');
  var error = document.getElementById('formError');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    btn.disabled = true;
    btnText.textContent = 'Enviando…';
    if (icon) icon.classList.add('hidden');
    if (spinner) spinner.classList.remove('hidden');
    if (success) success.classList.add('hidden');
    if (error) error.classList.add('hidden');

    try {
      var obj = {};
      new FormData(form).forEach(function (v, k) { obj[k] = v; });
      var res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(obj)
      });
      var json = await res.json();
      if (res.ok && json.success) {
        if (success) { success.classList.remove('hidden'); success.style.display = 'flex'; }
        form.reset();
      } else {
        throw new Error(json.message || 'Error');
      }
    } catch (err) {
      console.error('Web3Forms:', err);
      if (error) { error.classList.remove('hidden'); error.style.display = 'flex'; }
    } finally {
      btn.disabled = false;
      btnText.textContent = 'Enviar Consulta';
      if (icon) icon.classList.remove('hidden');
      if (spinner) spinner.classList.add('hidden');
    }
  });
})();

/* ── 7. AÑO EN EL FOOTER ──────────────────────────────────── */
(function () {
  var el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ============================================================
   MÓDULO: CARRUSEL CLIENTES — Centrado con vista previa (peek carousel)
   ============================================================ */

(function () {
  var track = document.getElementById('clientes-track');
  if (!track) return;

  var originalSlides = Array.from(track.querySelectorAll('.cliente-slide'));
  var totalOriginal = originalSlides.length;
  if (totalOriginal === 0) return;

  // Clonamos el primer y el último slide para lograr un loop infinito suave
  var firstClone = originalSlides[0].cloneNode(true);
  var lastClone = originalSlides[totalOriginal - 1].cloneNode(true);
  track.insertBefore(lastClone, originalSlides[0]);
  track.appendChild(firstClone);

  var viewport = document.querySelector('.clientes-viewport');
  var prevBtn = document.getElementById('clientes-prev');
  var nextBtn = document.getElementById('clientes-next');
  var dotsContainer = document.getElementById('clientes-dots');

  var position = 1;       // índice dentro del track (incluye clones); arranca en el primer slide real
  var currentIndex = 0;   // índice del slide "original" activo (para los dots)
  var autoplayInterval = null;
  var isHovered = false;
  var isAnimating = false;
  var transitionDuration = 500; // ms

  function allSlides() {
    return Array.from(track.querySelectorAll('.cliente-slide'));
  }

  function moveTo(pos, animate) {
    var s = allSlides();
    var slide = s[pos];
    if (!slide || !viewport) return;
    track.style.transition = animate === false ? 'none' : 'transform ' + (transitionDuration / 1000) + 's ease-in-out';
    var offset = (slide.offsetLeft + slide.offsetWidth / 2) - (viewport.offsetWidth / 2);
    track.style.transform = 'translateX(-' + offset + 'px)';
    s.forEach(function (el, i) {
      el.classList.toggle('is-active', i === pos);
    });
  }

  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (var i = 0; i < totalOriginal; i++) {
      var dot = document.createElement('button');
      dot.className = 'cliente-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Ver proyecto ' + (i + 1));
      dot.addEventListener('click', (function (idx) {
        return function () {
          goTo(idx);
          resetAutoplay();
        };
      })(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    var dots = dotsContainer.querySelectorAll('.cliente-dot');
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  function goTo(index) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = index;
    position = index + 1;
    moveTo(position, true);
    updateDots();
    setTimeout(function () { isAnimating = false; }, transitionDuration);
  }

  function next() {
    if (isAnimating) return;
    isAnimating = true;
    position++;
    currentIndex = (currentIndex + 1) % totalOriginal;
    moveTo(position, true);
    updateDots();
    setTimeout(function () {
      isAnimating = false;
      if (position >= totalOriginal + 1) {
        position = 1;
        moveTo(position, false);
      }
    }, transitionDuration);
  }

  function prev() {
    if (isAnimating) return;
    isAnimating = true;
    position--;
    currentIndex = (currentIndex - 1 + totalOriginal) % totalOriginal;
    moveTo(position, true);
    updateDots();
    setTimeout(function () {
      isAnimating = false;
      if (position <= 0) {
        position = totalOriginal;
        moveTo(position, false);
      }
    }, transitionDuration);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(function () {
      if (!isHovered) next();
    }, 3500);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Eventos
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      prev();
      resetAutoplay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      next();
      resetAutoplay();
    });
  }

  if (viewport) {
    viewport.addEventListener('mouseenter', function () {
      isHovered = true;
    });
    viewport.addEventListener('mouseleave', function () {
      isHovered = false;
    });
  }

  window.addEventListener('resize', function () {
    moveTo(position, false);
  });

  // Inicialización
  createDots();
  moveTo(position, false);
  startAutoplay();
})();

