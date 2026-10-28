const products = window.GREEN_CHEMICALS_PRODUCTS || [];

const grid = document.querySelector('#product-grid');
const search = document.querySelector('#product-search');
const resultCount = document.querySelector('#result-count');
let activeFilter = 'all';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let revealObserver = null;
// WhatsApp contact number supplied in the product specification, international format.
const WHATSAPP_NUMBER = window.GREEN_CHEMICALS_WHATSAPP || '919881729731';
const quoteProduct = document.querySelector('#quote-product');
const quoteProductOther = document.querySelector('#quote-product-other');

if (quoteProduct && quoteProduct.tagName === 'SELECT') {
  products.forEach(product => {
    if (!quoteProduct.querySelector(`option[value="${CSS.escape(product.name)}"]`)) {
      const option = document.createElement('option');
      option.value = product.name;
      option.textContent = product.name;
      quoteProduct.querySelector('option[value="__other__"]')?.before(option);
    }
  });
}

function syncOtherProductField() {
  if (!quoteProduct || !quoteProductOther) return;
  const isCustom = quoteProduct.value === '__other__';
  quoteProductOther.hidden = !isCustom;
  quoteProductOther.disabled = !isCustom;
  quoteProductOther.required = false;
  if (!isCustom) quoteProductOther.value = '';
}
quoteProduct?.addEventListener('change', syncOtherProductField);
syncOtherProductField();

function renderProducts() {
  if (!grid || !search || !resultCount) return;
  const query = search.value.trim().toLowerCase();
  const shown = products.filter(p => (activeFilter === 'all' || p.category.toLowerCase().includes(activeFilter.toLowerCase())) && `${p.name} ${p.alias} ${p.category}`.toLowerCase().includes(query));
  resultCount.textContent = `${shown.length} product${shown.length === 1 ? '' : 's'}`;
  if (!shown.length) {
    grid.innerHTML = '<div class="empty-state">No matches yet. Tell us what you are looking for and we will help you find it.</div>';
    return;
  }
  grid.innerHTML = shown.map((p, i) => {
    const href = `product.html?slug=${encodeURIComponent(p.slug)}`;
    const image = p.image ? `<img class="card-product-image" src="${p.image}" alt="${p.name} product image" loading="lazy" decoding="async">` : '<span class="art-orb" aria-hidden="true"></span>';
    return `<article class="product-card" style="--hue:${p.hue};transition-delay:${Math.min(i, 7) * 45}ms">
    <a class="product-card-hitarea" href="${href}" tabindex="-1" aria-hidden="true"></a>
    <a class="card-art ${p.image ? '' : 'card-art-placeholder'}" href="${href}" aria-label="View ${p.cardName} product details">${image}<span class="card-number">GC / ${(products.indexOf(p) + 1).toString().padStart(2, '0')}</span><span class="card-category">${p.category}</span></a>
    <h3><a class="product-title-link" href="${href}">${p.cardName}</a></h3><span class="product-alias">${p.alias}</span>
    <div class="card-bottom"><span class="card-supply">${p.moq ? `MOQ ${p.moq}` : 'Availability on enquiry'}</span><button class="card-quote" data-quote data-product-name="${p.name}">Get a quote </button></div>
  </article>`;
  }).join('');
  if (activeFilter === 'all' && !query) {
    grid.insertAdjacentHTML('beforeend', `<article class="product-card product-contact-card" aria-label="Contact Green Chemicals for product sourcing">
      <div class="contact-card-mark" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="product-contact-copy">
        <p class="product-contact-kicker">CUSTOM SOURCING</p>
        <h3>Looking for Something Specific?</h3>
        <p>Can't find the chemical you need? Contact our team for product availability, specifications, and customized sourcing support.</p>
      </div>
      <button type="button" class="product-contact-cta" data-quote-custom aria-label="Contact our team for customized chemical sourcing">Contact Our Team <span>↗</span></button>
    </article>`);
  }
  grid.querySelectorAll('.card-product-image').forEach(image => image.addEventListener('error', () => {
    const art = image.closest('.card-art');
    art?.classList.add('card-art-placeholder');
    image.remove();
    art?.insertAdjacentHTML('afterbegin', '<span class="art-orb" aria-hidden="true"></span>');
  }, { once: true }));
  observeReveals();
}
renderProducts();

document.querySelectorAll('.chip').forEach(chip => {
  chip.setAttribute('aria-pressed', String(chip.classList.contains('active')));
  chip.addEventListener('click', () => {
    document.querySelector('.chip.active')?.classList.remove('active');
    document.querySelector('.chip[aria-pressed="true"]')?.setAttribute('aria-pressed', 'false');
    chip.classList.add('active');
    chip.setAttribute('aria-pressed', 'true');
    activeFilter = chip.dataset.filter;
    renderProducts();
  });
});
search?.addEventListener('input', renderProducts);
document.addEventListener('keydown', e => {
  if (search && e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) { e.preventDefault(); search.focus(); }
});

const dialog = document.querySelector('#quote-dialog');
const backdrop = document.querySelector('.dialog-backdrop');

function openQuote(productName = '') {
  const quoteDialog = document.querySelector('#quote-dialog');
  const quoteForm = document.querySelector('#quote-form');
  const quoteReady = document.querySelector('#quote-ready');
  const formBackdrop = document.querySelector('.dialog-backdrop');
  const productSelect = document.querySelector('#quote-product');
  const productOther = document.querySelector('#quote-product-other');
  const phoneError = document.querySelector('#phone-error');
  const submitButton = quoteForm?.querySelector('[type="submit"]');
  if (!quoteDialog) return;

  // Repeated CTA clicks while the dialog is open must preserve what the customer entered.
  if (quoteDialog.open || quoteDialog.hasAttribute('open')) {
    if (productName && productSelect && !productSelect.value) {
      productSelect.value = products.some(item => item.name === productName) ? productName : '__other__';
      if (productSelect.value === '__other__' && productOther) productOther.value = productName;
      syncOtherProductField();
    }
    return;
  }

  quoteForm.hidden = false;
  quoteForm.reset();
  quoteReady.hidden = true;
  if (phoneError) phoneError.textContent = '';
  if (submitButton) { submitButton.disabled = false; submitButton.innerHTML = 'Show send options <span>→</span>'; }
  if (productSelect && productName) {
    productSelect.value = products.some(item => item.name === productName) ? productName : '__other__';
    if (productSelect.value === '__other__' && productOther) productOther.value = productName;
    syncOtherProductField();
  }

  try {
    if (typeof quoteDialog.showModal === 'function') quoteDialog.showModal();
    else quoteDialog.setAttribute('open', '');
  } catch (err) { quoteDialog.setAttribute('open', ''); }
  if (formBackdrop) formBackdrop.hidden = false;
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.querySelector('#quote-phone')?.focus(), 50);
}

function closeQuote() {
  const quoteDialog = document.querySelector('#quote-dialog');
  const formBackdrop = document.querySelector('.dialog-backdrop');
  if (quoteDialog) {
    try {
      if (typeof quoteDialog.close === 'function' && quoteDialog.open) {
        quoteDialog.close();
      } else {
        quoteDialog.removeAttribute('open');
      }
    } catch (err) {
      quoteDialog.removeAttribute('open');
    }
  }
  if (formBackdrop) formBackdrop.hidden = true;
  document.body.style.overflow = '';
}

// Global delegated click listener for ALL quote buttons across the site
document.addEventListener('click', e => {
  const quoteBtn = e.target.closest('[data-quote]');
  if (quoteBtn) {
    e.preventDefault();
    const productName = quoteBtn.dataset.productName
      || (typeof product !== 'undefined' && product?.name)
      || quoteBtn.getAttribute('data-product')
      || '';
    openQuote(productName);
  }
});

// Floating WhatsApp button & WhatsApp links
document.addEventListener('click', e => {
  const wBtn = e.target.closest('[data-whatsapp]');
  if (wBtn) {
    const message = wBtn.dataset.message || 'Hello Green Chemicals, I would like to enquire about your industrial chemicals supply.';
    wBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    wBtn.target = '_blank';
    wBtn.rel = 'noopener noreferrer';
  }
});

// Modal close listeners
document.querySelectorAll('#quote-dialog .dialog-close').forEach(btn => btn.addEventListener('click', closeQuote));
document.querySelectorAll('.quote-dialog-backdrop').forEach(b => b.addEventListener('click', closeQuote));
dialog?.addEventListener('click', e => { if (e.target === dialog) closeQuote(); });
dialog?.addEventListener('close', () => { if (backdrop) backdrop.hidden = true; document.body.style.overflow = ''; });

// ISO Certificate modal handling
const certDialog = document.querySelector('#iso-dialog');
const certBackdrop = document.querySelector('.cert-backdrop');

function openCert() {
  if (!certDialog) return;
  try {
    if (typeof certDialog.showModal === 'function') {
      if (!certDialog.open) certDialog.showModal();
    } else {
      certDialog.setAttribute('open', '');
    }
  } catch (err) {
    certDialog.setAttribute('open', '');
  }
  if (certBackdrop) certBackdrop.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeCert() {
  if (!certDialog) return;
  try {
    if (typeof certDialog.close === 'function' && certDialog.open) {
      certDialog.close();
    } else {
      certDialog.removeAttribute('open');
    }
  } catch (err) {
    certDialog.removeAttribute('open');
  }
  if (certBackdrop) certBackdrop.hidden = true;
  document.body.style.overflow = '';
}

// Global click listener for view certificate and close certificate
document.addEventListener('click', e => {
  if (e.target.closest('[data-view-cert]')) {
    e.preventDefault();
    openCert();
    return;
  }

  // Close certificate modal when clicking × or any close button
  if (e.target.closest('#iso-dialog .cert-close, #iso-dialog .dialog-close, [data-close-cert]')) {
    e.preventDefault();
    e.stopPropagation();
    closeCert();
    return;
  }

  // Custom Sourcing "Contact Our Team" opens inquiry modal
  const customContact = e.target.closest('.product-contact-card, [data-quote-custom]');
  if (customContact) {
    e.preventDefault();
    e.stopPropagation();
    openQuote('Custom Chemical Sourcing');
    return;
  }
});

// Explicit click listeners on all certificate close buttons
document.querySelectorAll('#iso-dialog .cert-close, #iso-dialog .dialog-close, [data-close-cert]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    closeCert();
  });
});

// Click outside modal content (native dialog backdrop) closes modal
certDialog?.addEventListener('click', e => {
  const rect = certDialog.getBoundingClientRect();
  const clickedInDialog = (
    rect.top <= e.clientY && e.clientY <= rect.bottom &&
    rect.left <= e.clientX && e.clientX <= rect.right
  );
  if (!clickedInDialog) {
    closeCert();
  }
});

certBackdrop?.addEventListener('click', closeCert);

certDialog?.addEventListener('close', () => {
  if (certBackdrop) certBackdrop.hidden = true;
  document.body.style.overflow = '';
});

// Global Escape listener for all modals and menus
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (certDialog && certDialog.open) closeCert();
    if (dialog && dialog.open) closeQuote();
    closeMobileMenu();
  }
});
// Guided chemical finder: collect the process first, then use answers to tailor recommendations.
const finderIntro = document.querySelector('.finder-grid');
const finderFlow = document.querySelector('#finder-flow');
const finderState = { operation: '', sector: '', quantity: '500', unit: 'Litres', location: 'Pune, Maharashtra', step: 1 };
const operations = [
  ['Clean Equipment / Industrial Degreasing', 'Removing oils, flux, grease, boiler scale, or parts cleaning'],
  ['Formulate Detergents & Cleaning Agents', 'Humectants, builders, alkalis, and surfactant stabilizers'],
  ['High Temperature Lubrication & Ceramics', 'Thermal pads, die casting release, ceramic heat sinks'],
  ['Paints, Resins & Protective Coatings', 'Solvent diluents, fast-drying ketones, and polyester precursors'],
  ['Industrial Coolants & Chillers', 'Heat transfer fluids, freeze-thaw agents, and engine coolants'],
  ['Textile Processing & Dye Buffering', 'Dye fixing acids, Glauber salt leveling, and fiber scourers']
];
const sectors = ['Industrial Cleaning', 'Detergents & Soaps', 'Paints & Coatings', 'Automotive & Lubricants', 'Textiles & Dyeing', 'Manufacturing & Formulations'];
const recommendationMap = [
  ['isopropyl-alcohol', 'acetone', 'sulphamic-acid', 'industrial-solvent'],
  ['propylene-glycol', 'sodium-carbonate', 'sodium-sulphate', 'liquid-hand-soap'],
  ['white-boron-nitride', 'propylene-glycol', 'mono-ethylene-glycol', 'industrial-solvent'],
  ['distilled-mix-xylene', 'acetone', 'isopropyl-alcohol', 'industrial-solvent'],
  ['mono-ethylene-glycol', 'propylene-glycol', 'glacial-acetic-acid', 'sodium-sulphate'],
  ['glacial-acetic-acid', 'sodium-sulphate', 'propylene-glycol', 'sodium-carbonate']
];
const finderEsc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function showFinder() { finderIntro.hidden = true; finderFlow.hidden = false; renderFinder(); finderFlow.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' }); }
function renderFinder() {
  if (!finderFlow) return;
  if (finderState.step === 1) {
    finderFlow.innerHTML = `<div class="finder-step-head"><p class="mono-label">STEP 1 OF 3 · YOUR APPLICATION</p><h3>What is the primary operation or application?</h3><p>Select the objective you want to achieve with the chemical.</p></div><div class="finder-option-grid">${operations.map(([name, desc], i) => `<button class="finder-option ${finderState.operation === name ? 'selected' : ''}" data-operation="${finderEsc(name)}"><span class="option-number">0${i + 1}</span><b>${name}</b><small>${desc}</small></button>`).join('')}</div><div class="finder-controls"><span>Choose an application to continue</span><button class="button button-lime" data-finder-next ${finderState.operation ? '' : 'disabled'}>Next: Industry <span>→</span></button></div>`;
  } else if (finderState.step === 2) {
    finderFlow.innerHTML = `<div class="finder-step-head"><p class="mono-label">STEP 2 OF 3 · INDUSTRY</p><h3>Which industrial manufacturing sector?</h3><p>Helps us match specific assay purity, dilution tolerances, and packaging requirements.</p></div><div class="finder-sector-grid">${sectors.map((s, i) => `<button class="finder-sector ${finderState.sector === s ? 'selected' : ''}" data-sector="${finderEsc(s)}"><span>0${i + 1}</span>${s}<b>↗</b></button>`).join('')}</div><div class="finder-controls"><button class="finder-back" data-finder-back>← Back</button><button class="button button-lime" data-finder-next ${finderState.sector ? '' : 'disabled'}>Next: Volume &amp; Location <span>→</span></button></div>`;
  } else if (finderState.step === 3) {
    finderFlow.innerHTML = `<div class="finder-step-head"><p class="mono-label">STEP 3 OF 3 · DELIVERY DETAILS</p><h3>Approximate quantity &amp; destination</h3><p>Allows us to quote accurate freight logistics from Bhosari, Pune.</p></div><div class="finder-fields"><label>ESTIMATED QUANTITY<div class="quantity-control"><input type="number" min="1" value="${finderEsc(finderState.quantity)}" data-finder-quantity><select data-finder-unit>${['Litres', 'KG', 'Drums', 'Metric Tonnes'].map(u => `<option ${finderState.unit === u ? 'selected' : ''}>${u}</option>`).join('')}</select></div></label><label>DELIVERY DESTINATION / INDUSTRIAL AREA<input class="finder-location" value="${finderEsc(finderState.location)}" placeholder="City, state or industrial area" data-finder-location></label></div><div class="finder-controls"><button class="finder-back" data-finder-back>← Back</button><button class="button button-lime" data-finder-results>Find Recommended Chemicals (4) <span>→</span></button></div>`;
  } else renderFinderResults();
}
function renderFinderResults() {
  const operationIndex = Math.max(0, operations.findIndex(([name]) => name === finderState.operation));
  const sectorIndex = sectors.indexOf(finderState.sector);
  const ids = recommendationMap[operationIndex] || recommendationMap[sectorIndex] || recommendationMap[0];
  const selected = ids.map(id => products.find(p => p.slug === id)).filter(Boolean);
  const descriptions = {
    'isopropyl-alcohol': 'High-purity industrial-grade solvent for precision cleaning, coatings, and solvent carrier applications.',
    'acetone': 'Ultra-fast evaporating ketone solvent for resins, cleaning, thinners, and chemical syntheses.',
    'sulphamic-acid': 'Safe, solid, non-volatile dry acid descaler for industrial heat exchangers, boilers, and dairy lines.',
    'industrial-solvent': 'Economical high-strength solvent formulation designed for industrial machine shop degreasing.'
  };
  const cards = selected.map(p => `<article class="recommendation-card"><span class="recommendation-meta">${p.category.toUpperCase()} <i>${finderEsc(p.moq || 'Packaging on enquiry')}</i></span><h4>${p.name}</h4><p class="recommendation-cas">CAS: ${p.cas} · Grade: ${p.purity}</p><p>${descriptions[p.slug] || p.description}</p><div><button data-finder-quote="${finderEsc(p.name)}">Get Quote</button><a href="product.html?slug=${encodeURIComponent(p.slug)}">Specs →</a></div></article>`).join('');
  const message = `Hello Green Chemicals, I used your Chemical Finder for ${finderState.sector} (${finderState.quantity} ${finderState.unit} to ${finderState.location}). Please guide on suitable chemicals.`;
  finderFlow.innerHTML = `<div class="finder-results-head"><div><p class="mono-label">RESULTS · TAILORED FOR ${finderEsc(finderState.sector.toUpperCase())} · ${finderEsc(finderState.location.toUpperCase())}</p><h3>We Found ${selected.length} Matching Chemicals</h3><p>For ${finderEsc(finderState.operation)} · ${finderEsc(finderState.quantity)} ${finderEsc(finderState.unit)} to ${finderEsc(finderState.location)}</p></div><button class="finder-back" data-finder-restart>Restart Finder ↺</button></div><div class="recommendation-grid">${cards}</div><div class="finder-custom"><span><b>Need an unlisted custom blend or specific isomer?</b><small>Discuss directly with Sunil Gaikwad and the Green Chemicals technical sourcing desk.</small></span><a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}" target="_blank" rel="noopener noreferrer">Discuss on WhatsApp →</a></div><div class="finder-controls"><button class="finder-back" data-finder-back>← Adjust Parameters</button></div>`;
}
document.querySelectorAll('[data-application]').forEach(el => el.addEventListener('click', () => {
  const selection = el.dataset.application.toLowerCase();
  const index = selection.includes('paint') ? 3 : selection.includes('clean') ? 0 : -1;
  finderState.operation = index >= 0 ? operations[index][0] : '';
  finderState.sector = '';
  finderState.step = 1;
  showFinder();
}));
document.querySelector('[data-finder-start]')?.addEventListener('click', () => { finderState.step = 1; finderState.operation = ''; finderState.sector = ''; showFinder(); });
finderFlow?.addEventListener('click', e => {
  const operation = e.target.closest('[data-operation]'); if (operation) { finderState.operation = operation.dataset.operation; renderFinder(); return; }
  const sector = e.target.closest('[data-sector]'); if (sector) { finderState.sector = sector.dataset.sector; renderFinder(); return; }
  if (e.target.closest('[data-finder-next]')) { finderState.step++; renderFinder(); return; }
  if (e.target.closest('[data-finder-back]')) { finderState.step = Math.max(1, finderState.step - 1); renderFinder(); return; }
  if (e.target.closest('[data-finder-results]')) { finderState.quantity = finderFlow.querySelector('[data-finder-quantity]').value || '500'; finderState.unit = finderFlow.querySelector('[data-finder-unit]').value; finderState.location = finderFlow.querySelector('[data-finder-location]').value || 'Pune, Maharashtra'; finderState.step = 4; renderFinder(); return; }
  if (e.target.closest('[data-finder-restart]')) { finderState.step = 1; finderState.operation = ''; finderState.sector = ''; renderFinder(); return; }
  const quote = e.target.closest('[data-finder-quote]'); if (quote) openQuote(quote.dataset.finderQuote);
});

const quoteForm = document.querySelector('#quote-form');
const quotePhone = document.querySelector('#quote-phone');
const quoteEmail = document.querySelector('#quote-email');
const phoneError = document.querySelector('#phone-error');
const quoteReady = document.querySelector('#quote-ready');
const quoteOutput = document.querySelector('#enquiry-output');
const quoteSubmit = quoteForm?.querySelector('[type="submit"]');

quotePhone?.addEventListener('input', () => {
  quotePhone.setCustomValidity('');
  quotePhone.removeAttribute('aria-invalid');
  if (phoneError) phoneError.textContent = '';
});

document.querySelector('[data-quote-edit]')?.addEventListener('click', () => {
  quoteReady.hidden = true;
  quoteForm.hidden = false;
  quoteSubmit.disabled = false;
  quoteSubmit.innerHTML = 'Show send options <span>→</span>';
  document.querySelector('#quote-dialog')?.scrollTo({ top: 0, behavior: 'smooth' });
  quoteSubmit.focus();
});

quoteForm?.addEventListener('submit', e => {
  e.preventDefault();
  if (quoteSubmit.disabled) return;
  const rawPhone = quotePhone.value.trim();
  const compactPhone = rawPhone.replace(/[\s().-]/g, '');
  const localPhone = compactPhone.startsWith('+91') ? compactPhone.slice(3) : compactPhone;
  const phoneMessage = !rawPhone
    ? 'Enter your phone number so our team can contact you.'
    : !/^[6-9]\d{9}$/.test(localPhone)
      ? 'Enter a valid 10-digit Indian mobile number, with or without +91.'
      : '';
  quotePhone.value = rawPhone;
  quotePhone.setCustomValidity(phoneMessage);
  if (phoneError) phoneError.textContent = phoneMessage;
  if (phoneMessage) {
    quotePhone.setAttribute('aria-invalid', 'true');
    quotePhone.reportValidity();
    quotePhone.focus();
    return;
  }
  quotePhone.removeAttribute('aria-invalid');

  quoteEmail.value = quoteEmail.value.trim();
  quoteEmail.setCustomValidity('');
  if (quoteEmail.value && !quoteEmail.checkValidity()) {
    quoteEmail.reportValidity();
    quoteEmail.focus();
    return;
  }

  const data = new FormData(e.currentTarget);
  const selectedProduct = data.get('product') === '__other__'
    ? String(data.get('product_other') || '').trim()
    : String(data.get('product') || '').trim();
  const details = [
    selectedProduct && `Product / Chemical: ${selectedProduct}`,
    data.get('quantity') && `Required Quantity: ${String(data.get('quantity')).trim()}`,
    data.get('packaging') && `Packaging: ${String(data.get('packaging')).trim()}`,
    data.get('name') && `Full Name: ${String(data.get('name')).trim()}`,
    data.get('company') && `Company: ${String(data.get('company')).trim()}`,
    `Phone Number: ${rawPhone}`,
    data.get('email') && `Email Address: ${String(data.get('email')).trim()}`,
    data.get('location') && `Delivery Location: ${String(data.get('location')).trim()}`,
    data.get('message') && `Message: ${String(data.get('message')).trim()}`,
  ].filter(Boolean);
  const lines = ['GREEN CHEMICALS — CUSTOMER ENQUIRY', '', ...details].join('\n');
  quoteOutput.value = lines;

  const whatsapp = document.querySelector('#send-whatsapp');
  const email = document.querySelector('#send-email');
  const emailSubject = selectedProduct
    ? `New Product Enquiry – ${selectedProduct} – Green Chemicals`
    : 'New Enquiry – Green Chemicals';
  whatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
  whatsapp.hidden = !/^\d{10,15}$/.test(WHATSAPP_NUMBER);
  email.href = `mailto:greenchemicals077@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(lines)}`;
  quoteReady.hidden = false;
  quoteForm.hidden = true;
  quoteSubmit.disabled = true;
  quoteSubmit.textContent = 'Enquiry prepared';
  document.querySelector('#quote-dialog')?.scrollTo({ top: 0, behavior: 'smooth' });
  quoteReady.querySelector('h3')?.focus();
});
document.querySelector('#copy-enquiry').addEventListener('click', async () => {
  const output = document.querySelector('#enquiry-output');
  try { await navigator.clipboard.writeText(output.value); }
  catch { output.select(); document.execCommand('copy'); }
  document.querySelector('.copy-confirm').textContent = 'Message copied. You can paste it into WhatsApp or email.';
});

// Mobile Navigation Controller
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
let navBackdrop = document.querySelector('.nav-backdrop');

if (!navBackdrop && mainNav) {
  navBackdrop = document.createElement('div');
  navBackdrop.className = 'nav-backdrop';
  navBackdrop.hidden = true;
  document.body.appendChild(navBackdrop);
}

function closeMobileMenu() {
  if (!mainNav || !mainNav.classList.contains('open')) return;
  mainNav.classList.remove('open');
  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }
  document.body.classList.remove('nav-open');
  if (navBackdrop) navBackdrop.hidden = true;
}

function openMobileMenu() {
  if (!mainNav) return;
  mainNav.classList.add('open');
  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
  }
  document.body.classList.add('nav-open');
  if (navBackdrop) navBackdrop.hidden = false;
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', e => {
    e.stopPropagation();
    if (mainNav.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Tapping any nav link or CTA closes menu and navigates
  document.querySelectorAll('.main-nav a, .site-header .nav-cta').forEach(el => {
    el.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  navBackdrop?.addEventListener('click', closeMobileMenu);

  // Outside click closes menu
  document.addEventListener('click', e => {
    if (mainNav.classList.contains('open') && !mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Escape key closes open menu or dialogs
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeQuote();
      closeCert();
    }
  });
}

// Reliable Active Navigation Link Highlighting (catalogue, finder, about, contact)
const mainNavLinks = document.querySelectorAll('.main-nav a');
const trackedNavIds = ['catalogue', 'finder', 'about', 'contact'];
let isNavClickScrolling = false;
let navClickTimeout = null;

function setActiveNavLink(targetId) {
  mainNavLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkId = href.startsWith('#') ? href.slice(1) : href.split('#')[1];
    const isTarget = !!targetId && linkId === targetId;
    link.classList.toggle('active', isTarget);
    if (isTarget) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function updateActiveNavLink() {
  if (isNavClickScrolling) return;

  // Only run if we are on a page that actually has these sections (e.g. index.html)
  const firstSec = document.getElementById(trackedNavIds[0]);
  if (!firstSec) return;

  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.offsetHeight : 64;
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  const viewportHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  // 1. Bottom of page edge-case: If scrolled to within 60px of page bottom,
  // Contact is definitely active (avoids short footer section not reaching upper viewport)
  if (scrollY + viewportHeight >= docHeight - 60) {
    setActiveNavLink('contact');
    return;
  }

  // 2. Reference focal line:
  // A section is active if it encompasses the reading focus area below the header.
  const triggerY = headerHeight + Math.min(Math.max(viewportHeight * 0.22, 90), 160);

  let activeId = null;

  for (const id of trackedNavIds) {
    const sec = document.getElementById(id);
    if (!sec) continue;
    const rect = sec.getBoundingClientRect();
    if (rect.top <= triggerY && rect.bottom > triggerY) {
      activeId = id;
      break;
    }
  }

  // 3. Fallback: if user is scrolled past the first tracked section top
  // but trigger line falls slightly in a gap between sections
  if (!activeId && scrollY > 200) {
    for (let i = trackedNavIds.length - 1; i >= 0; i--) {
      const sec = document.getElementById(trackedNavIds[i]);
      if (!sec) continue;
      const rect = sec.getBoundingClientRect();
      if (rect.top <= triggerY) {
        activeId = trackedNavIds[i];
        break;
      }
    }
  }

  // 4. Above first section (Hero / Promise area): no link should be highlighted
  const catSec = document.getElementById('catalogue');
  if (catSec && catSec.getBoundingClientRect().top > triggerY) {
    activeId = null;
  }

  setActiveNavLink(activeId);
}

// Nav link click handling: smooth scroll and immediate active state synchronization
mainNavLinks.forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href') || '';
    const hashIndex = href.indexOf('#');
    if (hashIndex !== -1) {
      const targetId = href.slice(hashIndex + 1);
      if (trackedNavIds.includes(targetId)) {
        setActiveNavLink(targetId);
        isNavClickScrolling = true;
        clearTimeout(navClickTimeout);
        navClickTimeout = setTimeout(() => {
          isNavClickScrolling = false;
          updateActiveNavLink();
        }, 850);
      }
    }
  });
});

window.addEventListener('scrollend', () => {
  if (isNavClickScrolling) {
    isNavClickScrolling = false;
    updateActiveNavLink();
  }
});

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (trackedNavIds.includes(hash)) {
    setActiveNavLink(hash);
  }
});

// Initial active check on load
if (window.location.hash) {
  const initHash = window.location.hash.replace('#', '');
  if (trackedNavIds.includes(initHash)) {
    setActiveNavLink(initHash);
  } else {
    updateActiveNavLink();
  }
} else {
  updateActiveNavLink();
}

function observeReveals() {
  const targets = document.querySelectorAll('.reveal:not(.visible),.about-reveal:not(.visible),.product-card:not(.visible)');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('visible'));
    return;
  }
  document.documentElement.classList.add('js-reveal-ready');
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    }), { threshold: .12, rootMargin: '0px 0px -35px 0px' });
  }
  targets.forEach(el => revealObserver.observe(el));
}
observeReveals();

let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    document.querySelector('.scroll-progress span').style.width = `${scrollable > 0 ? scrollY / scrollable * 100 : 0}%`;
    document.querySelector('.site-header').classList.toggle('scrolled', scrollY > 25);
    if (!reducedMotion && innerWidth > 700) {
      const art = document.querySelector('.hero-art');
      const drift = Math.min(scrollY, 600) * .11;
      if (art) art.style.transform = `translate3d(0,${drift}px,0) rotate(${Math.min(scrollY, 700) * .008}deg)`;
      const heroCopy = document.querySelector('.hero-copy');
      if (heroCopy) heroCopy.style.transform = `translate3d(0,${Math.min(scrollY, 350) * -.09}px,0)`;
    }
    updateActiveNavLink();
    ticking = false;
  });
}, { passive: true });

// Floating site notification toast
function showToast(message) {
  let toast = document.querySelector('.site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'site-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span aria-hidden="true">✓</span><span>${message}</span>`;
  toast.classList.add('visible');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2300);
}

// Global copy-to-clipboard handler
document.addEventListener('click', async e => {
  const copyBtn = e.target.closest('[data-copy]');
  if (copyBtn) {
    e.preventDefault();
    const textToCopy = copyBtn.dataset.copy;
    const label = copyBtn.dataset.copyLabel || 'Text';
    copyBtn.classList.add('copied');
    setTimeout(() => copyBtn.classList.remove('copied'), 2200);
    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast(`Copied ${label} (${textToCopy}) to clipboard!`);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      showToast(`Copied ${label} to clipboard!`);
    }
  }
});

// Interactive subtle mouse parallax for ambient glass bubbles on desktop
if (!reducedMotion && matchMedia('(pointer: fine)').matches) {
  const aboutSection = document.querySelector('#about');
  const bubbleLarge = document.querySelector('.bubble-large');
  const bubbleMedium = document.querySelector('.bubble-medium');
  const bubbleSmall = document.querySelector('.bubble-small');

  if (aboutSection && bubbleLarge) {
    aboutSection.addEventListener('mousemove', e => {
      const rect = aboutSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      if (bubbleLarge) bubbleLarge.style.transform = `translate3d(${x * 14}px, ${y * 14}px, 0)`;
      if (bubbleMedium) bubbleMedium.style.transform = `translate3d(${x * -18}px, ${y * -18}px, 0)`;
      if (bubbleSmall) bubbleSmall.style.transform = `translate3d(${x * 22}px, ${y * 22}px, 0)`;
    }, { passive: true });

    aboutSection.addEventListener('mouseleave', () => {
      if (bubbleLarge) bubbleLarge.style.transform = '';
      if (bubbleMedium) bubbleMedium.style.transform = '';
      if (bubbleSmall) bubbleSmall.style.transform = '';
    });
  }
}

