const productCatalogue = window.GREEN_CHEMICALS_PRODUCTS || [];
const productSlug = new URLSearchParams(location.search).get('slug') || 'isopropyl-alcohol';
const product = productCatalogue.find(item => item.slug === productSlug);
const productPageMain = document.querySelector('.product-main');

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || 'Available on request';
}
function addRows(target, entries) {
  target.innerHTML = entries.map(([label, value]) => `<div class="spec-row"><span>${label}</span><strong>${value}</strong></div>`).join('');
}

if (!product) {
  productPageMain.innerHTML = '<div class="product-missing glass"><p class="eyebrow">PRODUCT NOT FOUND</p><h1>Let’s find the right chemical.</h1><p>That product is not in the current catalogue.</p><a class="button button-dark" href="index.html#catalogue">Return to the catalogue </a></div>';
} else {
  document.title = `Green Chemicals — ${product.name}`;
  const pageDescription = `${product.name} from Green Chemicals. Review grade, CAS, formula, supply options and request a quotation.`;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.content = pageDescription;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogTitle) ogTitle.content = document.title;
  if (ogDescription) ogDescription.content = pageDescription;
  setText('crumb-category', product.category);
  setText('crumb-name', product.name);
  setText('product-category', product.category.toUpperCase());
  setText('product-name', product.name);
  setText('product-grade', product.grade);
  setText('product-cas', product.cas);
  setText('product-formula', product.formula);
  setText('product-status-text', product.status);
  setText('product-warehouse', product.warehouse);
  setText('product-description', product.description);
  setText('product-moq', product.moq);
  setText('product-purity', product.purity);
  setText('product-dispatch', product.dispatch);
  setText('product-integrity', product.integrity);
  setText('visual-category', product.category.toUpperCase());
  setText('visual-caption-name', product.cardName);
  document.querySelectorAll('[data-quote-product]').forEach(button => { button.dataset.productName = product.name; });

  const image = document.getElementById('product-image');
  function renderChemicalArtwork() {
    image.hidden = true;
    const visual = document.getElementById('product-visual');
    visual.classList.add('product-visual-illustrated');
    if (visual.querySelector('.chemical-art')) return;
    const artwork = document.createElement('div');
    artwork.className = `chemical-art ${product.physical === 'Powder' ? 'powder-art' : 'liquid-art'}`;
    artwork.style.setProperty('--hue', product.hue);
    artwork.innerHTML = `<span class="art-formula">${product.formula}</span><span class="art-molecule"><i></i><i></i><i></i><b></b></span><span class="art-form-label">${product.physical.toUpperCase()} / ${product.category.toUpperCase()}</span>`;
    visual.prepend(artwork);
  }
  if (product.image) {
    image.hidden = false;
    image.alt = product.alt || `${product.name} product image`;
    image.addEventListener('error', renderChemicalArtwork, { once: true });
    image.src = product.image;
    if (image.complete && image.naturalWidth > 0) {
      image.hidden = false;
    }
  } else {
    renderChemicalArtwork();
  }

  const badges = document.querySelector('.product-badges');
  if (product.verification) {
    const verification = document.createElement('span');
    verification.className = `product-verification ${product.verification.startsWith('Verified') ? 'verified' : 'pending'}`;
    verification.textContent = product.verification;
    badges.append(verification);
  }

  const highlights = [];
  if (product.purity && product.purity !== 'Available on request') highlights.push([product.purity.split(' · ')[0], 'Purity assay']);
  if (product.integrity.includes('Certificate of Analysis (COA)')) highlights.push(['COA', 'Technical values verified']);
  if (product.dispatch) highlights.push(['Same-day', 'Dispatch available']);
  if (product.warehouse) highlights.push(['Bhosari', 'Warehouse']);
  document.getElementById('product-highlights').innerHTML = highlights.slice(0, 4).map(([title, label]) => `<div class="highlight"><span class="highlight-icon">✓</span><span><b>${title}</b><small>${label}</small></span></div>`).join('');
  document.getElementById('product-highlights-mobile').innerHTML = document.getElementById('product-highlights').innerHTML;

  document.getElementById('product-packaging-summary').textContent = product.packaging.slice(0, 2).join(' / ') || 'Available on request';
  addRows(document.getElementById('spec-table'), [
    ['Product trade name', product.name], ['Grade', product.grade], ['CAS registry number', product.cas], ['Molecular formula', product.formula],
    ['Purity assay', product.purity], ['Minimum order quantity', product.moq], ['Status', product.status],
    ...(product.verification ? [['Verification', product.verification]] : [])
  ]);

  document.getElementById('product-applications').innerHTML = product.applications.map((application, index) => `<span class="application-tag"><i>${String(index + 1).padStart(2, '0')}</i>${application}</span>`).join('');
  setText('product-safety', product.safety);
  if (product.ppe.length) {
    document.getElementById('product-ppe').innerHTML = `<b>Personal protective equipment</b>${product.ppe.map(item => `<span>✓ ${item}</span>`).join('')}`;
  } else {
    document.getElementById('product-ppe').remove();
  }

  const related = product.related.map(slug => productCatalogue.find(item => item.slug === slug)).filter(Boolean).slice(0, 3);
  const relatedProducts = document.getElementById('related-products');
  relatedProducts.innerHTML = related.map(item => `<a class="related-card" href="product.html?slug=${encodeURIComponent(item.slug)}" style="--hue:${item.hue}"><span class="related-art ${item.image ? '' : 'related-art-placeholder'}">${item.image ? `<img src="${item.image}" alt="${item.name} product image" loading="lazy" decoding="async">` : '<span class="art-molecule" aria-hidden="true"><i></i><i></i><i></i><b></b></span>'}<small>${item.category.toUpperCase()}</small></span><strong>${item.cardName}</strong><span>${item.alias}</span><b>View product <i>↗</i></b></a>`).join('');
  relatedProducts.querySelectorAll('.related-art img').forEach(relatedImage => relatedImage.addEventListener('error', () => {
    const art = relatedImage.closest('.related-art');
    art?.classList.add('related-art-placeholder');
    relatedImage.remove();
    art?.insertAdjacentHTML('afterbegin', '<span class="art-molecule" aria-hidden="true"><i></i><i></i><i></i><b></b></span>');
  }, { once: true }));

  const message = `Hello Green Chemicals, I would like to request technical specs and quotation for: ${product.name}${product.cas && product.cas !== 'Proprietary Formulation' ? ` (CAS: ${product.cas})` : ''}.`;
  const whatsappNumber = window.GREEN_CHEMICALS_WHATSAPP || '919881729731';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  document.getElementById('product-whatsapp').href = whatsappUrl;
  const stickyWhatsapp = document.querySelector('[data-whatsapp]');
  stickyWhatsapp.href = whatsappUrl;
  stickyWhatsapp.dataset.message = message;
  stickyWhatsapp.target = '_blank';
  stickyWhatsapp.rel = 'noopener noreferrer';
  const technicalNavLinks = document.querySelectorAll('.technical-nav a');
  technicalNavLinks.forEach(link => link.addEventListener('click', () => {
    document.querySelector('.technical-nav a.active')?.classList.remove('active');
    link.classList.add('active');
  }));
}
