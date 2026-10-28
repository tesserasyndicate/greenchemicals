/* Central product catalogue. Add product records here; product.html renders each record. */
window.GREEN_CHEMICALS_WHATSAPP = '919881729731';
window.GREEN_CHEMICALS_PRODUCTS = [
  {
    id: 'ipa', slug: 'isopropyl-alcohol', name: 'Isopropyl Alcohol (IPA)', cardName: 'Isopropyl Alcohol', alias: 'IPA', category: 'Solvents', hue: 125,
    grade: 'Industrial & Technical Grade', cas: '67-63-0', formula: 'C₃H₈O / (CH₃)₂CHOH', status: 'In Stock', warehouse: 'Bhosari Warehouse', verification: 'Verified by Green Chemicals',
    description: 'Green Chemicals supplies top-tier Isopropyl Alcohol (IPA) with minimum 99.8% purity and ultra-low moisture residue. Essential for industrial parts degreasing, circuit board washing, ink compounding, and solvent extraction with fast evaporation and zero residual staining.',
    moq: '160 KG Drum (or 1,000 L IBC)', packaging: ['160 KG HDPE Drums', '800 KG IBC', 'Tanker Bulk Load'], purity: '99.8% Min', dispatch: 'Same-Day / 24–48 Hours (Bhosari Hub)', integrity: 'All technical values verified against laboratory Certificate of Analysis (COA).',
    safety: 'Class 3 Flammable Liquid · UN 1219. Flammable liquid and vapor. Keep away from heat, sparks and open flames. Store in a cool, well-ventilated dry area.', ppe: ['Safety goggles', 'Chemical resistant nitrile gloves', 'Anti-static footwear'],
    applications: ['Industrial parts degreasing', 'Circuit board washing', 'Ink compounding', 'Solvent extraction'], related: ['propylene-glycol', 'white-boron-nitride', 'acetone'],
    alt: 'Green Chemicals Isopropyl Alcohol IPA product packaging', image: 'assets/ipa-product.webp', physical: 'Liquid'
  },
  {
    id: 'pg', slug: 'propylene-glycol', name: 'Propylene Glycol (PG)', cardName: 'Propylene Glycol', alias: 'PG', category: 'Glycols', hue: 91,
    grade: 'Industrial & Technical Grade', cas: '57-55-6', formula: 'C₃H₈O₂ / CH₃CH(OH)CH₂OH', status: 'In Stock', warehouse: 'Bhosari Warehouse', verification: 'Verified by Green Chemicals',
    description: 'Propylene Glycol (PG) from Green Chemicals provides outstanding low volatility, hygroscopic capability, and solubility for heavy-duty industrial detergents, heat exchangers, cooling towers, and polymer manufacturing across Maharashtra industrial belts.',
    moq: '215 KG Drum', packaging: ['215 KG Brand-new Epoxy Lined Drums', 'Bulk Tanker'], purity: '99.5% Min', dispatch: 'Same-Day / 24–48 Hours (Bhosari Hub)', integrity: 'All technical values verified against laboratory Certificate of Analysis (COA).',
    safety: 'Non-Hazardous / Safe Transport. Non-toxic, low eye irritation. Keep the hygroscopic container sealed against atmospheric moisture.', ppe: ['Safety goggles', 'Chemical resistant nitrile gloves', 'Anti-static footwear'], applications: ['Industrial detergents', 'Heat exchangers', 'Cooling towers', 'Polymer manufacturing'], related: ['isopropyl-alcohol', 'white-boron-nitride', 'acetone'], image: 'assets/pg-product.webp', physical: 'Liquid'
  },
  {
    id: 'hbn', slug: 'white-boron-nitride', name: 'White Boron Nitride Powder (h-BN)', cardName: 'White Boron Nitride Powder', alias: 'h-BN · BN', category: 'Specialty Chemicals', hue: 148,
    grade: 'High Purity Thermal & Lubricant Grade', cas: '10043-11-5', formula: 'BN', status: 'In Stock', warehouse: 'Bhosari Warehouse', verification: '',
    description: 'Known as “White Graphite”, Hexagonal White Boron Nitride powder boasts outstanding thermal conductivity (~300 W/m·K theoretical) combined with superior electrical insulation (>10¹⁴ Ω·cm). Ideal for severe thermal management and non-staining dry lubrication.',
    moq: '1 KG Sample / 25 KG Industrial Pack', packaging: ['1 KG Foil Vacuum Pouch', '25 KG Fibre Drums with inner PE liner'], purity: '99.0%–99.5% Min · Low B₂O₃ content <0.2%', dispatch: 'Same-Day / 24–48 Hours (Bhosari Hub)', integrity: 'All technical values verified against laboratory Certificate of Analysis (COA).',
    safety: 'Non-hazardous / Inert Powder. Dust mask recommended during high-speed compounding. Avoid inhalation of microparticles.', ppe: ['Safety goggles', 'Chemical resistant nitrile gloves', 'Anti-static footwear'], applications: ['Thermal management', 'Dry lubrication'], related: ['isopropyl-alcohol', 'propylene-glycol', 'acetone'], image: 'assets/hbn-product.webp', physical: 'Powder'
  },
  {
    id: 'acetone', slug: 'acetone', name: 'Acetone (Pure Technical Grade)', cardName: 'Acetone', alias: 'Technical grade', category: 'Solvents', hue: 173,
    grade: 'Industrial Virgin & Redistilled Grade', cas: '67-64-1', formula: 'C₃H₆O / CH₃COCH₃', status: 'In Stock', warehouse: 'Bhosari Warehouse', verification: '',
    description: 'Green Chemicals supplies high-grade Acetone with minimum 99.5% purity and strictly monitored moisture content. Widely used for dissolving fiberglass polyester resins, degreasing metals before plating, and formulating high-grade industrial thinners.',
    moq: '160 KG Drum', packaging: ['160 KG Brand-new Steel Drums', 'Tanker Loads'], purity: '99.5% Min', dispatch: 'Same-Day / 24–48 Hours', integrity: 'All technical values verified against laboratory Certificate of Analysis (COA).',
    safety: 'Class 3 Flammable Liquid · UN 1090. Highly flammable liquid and vapor. Keep grounded to avoid electrostatic discharge.', ppe: ['Safety goggles', 'Chemical resistant nitrile gloves', 'Anti-static footwear'], applications: ['Fiberglass polyester resins', 'Metal degreasing before plating', 'Industrial thinners'], related: ['isopropyl-alcohol', 'propylene-glycol', 'white-boron-nitride'], image: 'assets/acetone-product.webp', physical: 'Liquid'
  },
  {
    id: 'xylene', slug: 'distilled-mix-xylene', name: 'Distilled Mix Xylene', cardName: 'Distilled Mix Xylene', alias: 'Industrial grade', category: 'Solvents', hue: 41,
    grade: 'Distilled Industrial Grade', cas: '1330-20-7', formula: 'C₈H₁₀ / C₆H₄(CH₃)₂', status: 'In Stock', warehouse: 'Bhosari Warehouse', verification: '',
    description: 'Green Chemicals provides Distilled Mix Xylene with controlled boiling ranges and distillation profiles. Excellent solvency for epoxy resins, alkyds, chlorinated rubbers, and polyurethane coatings.',
    moq: '175 KG Drum', packaging: ['175 KG Epoxy Coated Steel Drums', 'Bulk Road Tanker'], purity: '99.0% Aromatic Content Min', dispatch: 'Same-Day / 24–48 Hours', integrity: 'All technical values verified against laboratory Certificate of Analysis (COA).',
    safety: 'Class 3 Flammable Liquid · UN 1307. Flammable liquid. Harmful by inhalation and skin contact. Use organic vapor respirators.', ppe: [], applications: ['Epoxy resins', 'Alkyds', 'Chlorinated rubbers', 'Polyurethane coatings'], related: ['isopropyl-alcohol', 'propylene-glycol', 'acetone'], image: 'assets/xylene-product.webp', physical: 'Liquid'
  },
  {
    id: 'meg', slug: 'mono-ethylene-glycol', name: 'Mono Ethylene Glycol (MEG)', cardName: 'Mono Ethylene Glycol', alias: 'MEG', category: 'Glycols', hue: 135,
    grade: 'Polyester & Industrial Antifreeze Grade', cas: '107-21-1', formula: 'C₂H₆O₂ / (CH₂OH)₂', status: 'In Stock', warehouse: 'Bhosari Warehouse', verification: '',
    description: 'High purity Mono Ethylene Glycol (MEG) supplied in Bhosari, Chakan, Talegaon, and across Pune industrial belts. High boiling point and exceptional heat transfer properties make it the standard for industrial cooling circuits and polyester manufacturing.',
    moq: '225 KG Drum', packaging: ['225 KG Brand New Steel/HDPE Drums', 'ISO Tanker'], purity: '99.8% Min', dispatch: 'Same-Day / 24–48 Hours', integrity: 'All technical values verified against laboratory Certificate of Analysis (COA).',
    safety: 'Harmful if swallowed · Oral Category 4. Store away from food, animal feeds and potable water reservoirs.', ppe: [], applications: ['Industrial cooling circuits', 'Polyester manufacturing'], related: ['isopropyl-alcohol', 'propylene-glycol', 'white-boron-nitride'], image: 'assets/meg-product.webp', physical: 'Liquid'
  },
  {
    id: 'sulphamic', slug: 'sulphamic-acid', name: 'Sulphamic Acid Powder', cardName: 'Sulphamic Acid Powder', alias: 'Descaling grade', category: 'Acids', hue: 81,
    grade: 'Commercial / Descaling Grade 99.5%', cas: '5329-14-6', formula: 'H₃NSO₃ / NH₂SO₃H', status: 'In Stock', warehouse: 'Bhosari Warehouse', verification: '',
    description: 'Sulphamic Acid is a preferred industrial descaling acid because it is shipped as a dry, non-volatile solid powder, eliminating hazardous hydrochloric acid fumes. It cleans calcium carbonate, rust, and scale efficiently with minimal base metal corrosion when properly inhibited.',
    moq: '50 KG Bag (2 × 25 KG HDPE Bags)', packaging: ['25 KG / 50 KG Woven HDPE bags with internal LDPE liner'], purity: '99.5% Min', dispatch: 'Same-Day / 24–48 Hours', integrity: 'All technical values verified against laboratory Certificate of Analysis (COA).',
    safety: 'Class 8 Corrosive Solid · UN 2967. Causes skin irritation and serious eye damage. Wear rubber gloves and goggles while dissolving.', ppe: [], applications: ['Industrial descaling', 'Calcium carbonate, rust and scale removal'], related: ['isopropyl-alcohol', 'propylene-glycol', 'white-boron-nitride'], image: 'assets/sulphamic-product.webp', physical: 'Powder'
  },
  {
    id: 'acetic', slug: 'glacial-acetic-acid', name: 'Liquid Acetic Acid (Glacial 99.8%)', cardName: 'Liquid Acetic Acid', alias: 'Glacial grade', category: 'Acids', hue: 61,
    grade: 'Glacial Industrial Grade', cas: '64-19-7', formula: 'C₂H₄O₂ / CH₃COOH', status: 'In Stock', warehouse: 'Bhosari Warehouse', verification: '',
    description: 'Green Chemicals supplies Glacial Acetic Acid with high assay and low heavy metal impurities. Widely supplied to textile dyehouses in Ichalkaranji, Solapur, and Pune for precise pH control and acetate manufacturing.',
    moq: '35 KG Canister / 210 KG Drum', packaging: ['35 KG HM-HDPE Carboys', '210 KG HM-HDPE Drums'], purity: '99.85% Min', dispatch: 'Same-Day / 24–48 Hours', integrity: 'All technical values verified against laboratory Certificate of Analysis (COA).',
    safety: 'Class 8 Corrosive Liquid · Class 3 Sub-hazard · UN 2789. Corrosive. Causes severe skin burns and eye damage. Freezes at 16.6°C; store above 18°C.', ppe: [], applications: ['Textile dyehouses', 'pH control', 'Acetate manufacturing'], related: ['isopropyl-alcohol', 'propylene-glycol', 'white-boron-nitride'], image: 'assets/acetic-product.webp', physical: 'Liquid'
  },
  {
    id: 'sodium-carbonate', slug: 'sodium-carbonate', name: 'Sodium Carbonate Powder (Soda Ash Dense)', cardName: 'Sodium Carbonate Powder', alias: 'Soda ash dense', category: 'Industrial Chemicals', hue: 53,
    grade: 'Industrial Dense Grade', cas: '497-19-8', formula: 'Na₂CO₃', status: 'In Stock', warehouse: 'Bhosari Warehouse', verification: '',
    description: 'Essential alkali builder supplied in bulk bags across Pune industrial zones. Exhibits consistent particle size distribution, rapid water dissolution without caking, and strong buffering capacity for alkaline cleansers.',
    moq: '50 KG Bag · Minimum 1 MT Order', packaging: ['50 KG Laminated Woven Polypropylene Bags with Inner Liner'], purity: '99.2% Min Na₂CO₃', dispatch: 'Same-Day / 24–48 Hours', integrity: 'All technical values verified against laboratory Certificate of Analysis (COA).',
    safety: 'Irritant · Category 2 Eye Irritation. Causes eye irritation. Avoid breathing powder dust. Store in a dry, moisture-free warehouse.', ppe: [], applications: ['Alkaline cleansers', 'Industrial processes'], related: ['isopropyl-alcohol', 'propylene-glycol', 'white-boron-nitride'], image: 'assets/sodium-carbonate-product.webp', physical: 'Powder'
  },
  {
    id: 'sodium-sulphate', slug: 'sodium-sulphate', name: 'Sodium Sulphate Anhydrous Powder', cardName: 'Sodium Sulphate Powder', alias: 'Anhydrous grade', category: 'Industrial Chemicals', hue: 194,
    grade: 'Industrial Anhydrous Grade', cas: '7757-82-6', formula: 'Na₂SO₄', status: 'In Stock', warehouse: 'Bhosari Warehouse', verification: '',
    description: 'Green Chemicals supplies high-purity neutral Sodium Sulphate Anhydrous with iron content <20 ppm. Ensures uniform flowability in detergent manufacturing and clean color yield in textile processing without shade dulling.',
    moq: '50 KG Bag · Minimum 1 MT Order', packaging: ['50 KG Multi-wall HDPE/Paper Bags with Moisture Barrier'], purity: '99.0% Min', dispatch: 'Same-Day / 24–48 Hours', integrity: 'All technical values verified against laboratory Certificate of Analysis (COA).',
    safety: 'Non-Hazardous. Store in a dry area to prevent atmospheric moisture agglomeration.', ppe: [], applications: ['Detergent manufacturing', 'Textile processing'], related: ['isopropyl-alcohol', 'propylene-glycol', 'white-boron-nitride'], image: 'assets/sodium-sulphate-product.webp', physical: 'Powder'
  },



  {
    id: 'industrial-solvent', slug: 'industrial-solvent', name: 'Industrial Solvent (Composite Degreaser Blend)', cardName: 'Industrial Solvent', alias: 'Composite degreaser', category: 'Solvents', hue: 102,
    grade: 'Commercial Industrial Grade', cas: '64742-88-7 / Multi-constituent', formula: 'Available on request', status: 'In Stock', warehouse: 'Bhosari Warehouse', verification: 'TradeIndia Listing · Verification on Order',
    description: 'Custom blended solvent engineered for fast cutting through heavy grease, carbon deposits, and industrial lubricants. Balanced flash point ensures high solvency power while maintaining factory floor operating safety.',
    moq: '200 L Drum', packaging: ['200 Litre Reconditioned & Brand New Steel Barrels'], purity: '98.5% Solvent Hydrocarbons', dispatch: 'Same-Day / 24–48 Hours', integrity: 'TradeIndia listed specifications are verified with Green Chemicals QA team prior to issuing formal commercial invoices.',
    safety: 'Class 3 Flammable Liquid · UN 1268. Flammable liquid and vapor. Can cause skin dryness or cracking with prolonged exposure.', ppe: [], applications: ['Industrial degreasing', 'Grease and carbon deposit removal'], related: ['isopropyl-alcohol', 'propylene-glycol', 'white-boron-nitride'], image: 'assets/industrial-solvent-product.webp', physical: 'Liquid'
  },
  {
    id: 'hand-soap', slug: 'liquid-hand-soap', name: 'Liquid Hand Soap (Industrial Concentrate)', cardName: 'Liquid Hand Soap', alias: 'Industrial concentrate', category: 'Cleaning Chemicals', hue: 104,
    grade: 'Commercial Washroom & Factory Grade', cas: 'Proprietary Formulation', formula: 'Available on request', status: 'In Stock', warehouse: 'Bhosari Warehouse', verification: 'TradeIndia Listing · Verification on Order',
    description: 'Formulated specifically for factory personnel and technical workshops. Efficiently lifts carbon grime, coolant oils, and general workshop stains with skin conditioning emollients to prevent dermatitis.',
    moq: '50 Litre Carboy or 200 L Drum', packaging: ['50 Litre HDPE Carboys', '200 Litre Poly Drums'], purity: 'High Active Matter (~18–20%)', dispatch: 'Same-Day / 24–48 Hours', integrity: 'TradeIndia listed specifications are verified with Green Chemicals QA team prior to issuing formal commercial invoices.',
    safety: 'Non-Hazardous Skin Wash. For external skin washing only. In case of accidental eye contact, rinse thoroughly with fresh water.', ppe: [], applications: ['Factory personnel hand washing', 'Technical workshop hand washing'], related: ['isopropyl-alcohol', 'propylene-glycol', 'white-boron-nitride'], image: 'assets/hand-soap-product.webp', physical: 'Liquid'
  },
  {
    id: 'paraffin-wax',
    slug: 'solid-paraffin-wax',
    name: 'Solid Paraffin Wax',
    cardName: 'Solid Paraffin Wax',
    alias: 'Paraffin Wax',
    category: 'Industrial Chemicals',
    hue: 48,

    grade: 'Commercial / Industrial Grade',
    cas: '8002-74-2',
    formula: 'Typically C20–C40 hydrocarbons',
    status: 'In Stock',
    warehouse: 'Bhosari Warehouse',
    verification: 'Supplier-listed · Technical specifications to be confirmed',

    description: 'Solid Paraffin Wax is a white waxy hydrocarbon material used in candle making, cosmetics, packaging, rubber and textile applications. Supplier-listed features include clean burning, low oil content, smooth texture, uniform melting and moisture resistance. Confirm the required grade and technical specifications before ordering.',

    moq: '100 KG',
    packaging: ['Industrial-standard packaging; pack size to be confirmed'],
    purity: 'Grade and oil content to be confirmed',
    dispatch: 'Approximately 1 week (supplier-listed)',
    integrity: 'Confirm the current technical data sheet (TDS), Certificate of Analysis (COA), melting point and oil content with the supplier.',

    safety: 'Combustible solid. Keep away from excessive heat and ignition sources. Store in a cool, dry place and follow the supplier-provided safety data sheet (SDS).',
    ppe: ['Safety goggles', 'Suitable protective gloves'],

    applications: [
      'Candle making',
      'Cosmetics manufacturing',
      'Packaging',
      'Rubber industry',
      'Textile industry',
      'Pharmaceutical applications subject to the required grade'
    ],

    related: [
      'sodium-carbonate',
      'sodium-sulphate',
      'propylene-glycol'
    ],

    image: 'assets/paraffin-wax-product.webp?v=photos-20261021',
    alt: 'Solid Paraffin Wax supplied by Green Chemicals',
    physical: 'Solid Wax',

    price: '₹150 / KG',
    priceAmount: 150,
    priceUnit: 'KG',

    supplyAbility: '2500 per week (unit to be confirmed)',
    deliveryTime: '1 week',
    sampleAvailable: 'Yes',
    paymentTerms: [
      'Cash Against Delivery (CAD)',
      'Cheque',
      'Cash Advance (CA)'
    ],

    features: [
      'Clean burning',
      'Low oil content',
      'Smooth texture',
      'Uniform melting',
      'Long lasting',
      'Odorless composition',
      'White appearance',
      'Moisture resistant'
    ],

    specifications: {
      'Molecular Formula': 'Typically C20–C40 hydrocarbons',
      'Viscosity': '4–6 cSt at 100°C (supplier-listed; confirm by grade)',
      'Crystalline Structure': 'Microcrystalline structure stated in listing; confirm exact wax type',
      'Deoiling': 'High deoiling'
    }
  },

  {
    id: 'phosphoric-acid',
    slug: 'phosphoric-acid',
    name: 'Phosphoric Acid',
    cardName: 'Phosphoric Acid',
    alias: 'CAS 7664-38-2',
    category: 'Acids',
    hue: 186,

    grade: 'Industrial Grade; other grades subject to confirmation',
    cas: '7664-38-2',
    formula: 'H₃PO₄',
    status: 'In Stock',
    warehouse: 'Bhosari Warehouse',
    verification: 'Supplier-listed · Concentration and grade to be confirmed',

    description: 'Phosphoric Acid is an inorganic acid supplied for fertilizer production, food processing, metal treatment, water treatment and chemical manufacturing. It may also be used for pH control and suitable rust-removal processes. Confirm concentration, grade, impurities and application suitability before purchase.',

    moq: '100 KG',
    packaging: ['Industrial-standard packaging; container type and capacity to be confirmed'],
    purity: 'Concentration to be confirmed',
    dispatch: 'Approximately 1 week (supplier-listed)',
    integrity: 'Confirm the concentration, grade, impurities, packaging compatibility and latest COA before purchase.',

    safety: 'Acidic and potentially corrosive depending on concentration. Avoid skin and eye contact. Use suitable chemical-resistant PPE and follow the supplier-provided SDS and handling instructions.',

    ppe: [
      'Chemical splash goggles',
      'Suitable acid-resistant gloves',
      'Protective clothing',
      'Suitable protective footwear'
    ],

    applications: [
      'Fertilizer manufacturing',
      'Food processing subject to food-grade compliance',
      'Metal treatment',
      'Water treatment',
      'Chemical manufacturing',
      'pH control',
      'Rust removal where suitable for the process'
    ],

    related: [
      'glacial-acetic-acid',
      'sulphamic-acid',
      'sodium-carbonate'
    ],

    image: 'assets/phosphoric-acid-product.webp?v=photos-20261021',
    alt: 'Phosphoric Acid supplied by Green Chemicals',
    physical: 'Liquid',

    price: '₹250 / KG',
    priceAmount: 250,
    priceUnit: 'KG',

    supplyAbility: '3500 per week (unit to be confirmed)',
    deliveryTime: '1 week',
    sampleAvailable: 'Yes',
    paymentTerms: [
      'Cash Against Delivery (CAD)',
      'Cheque',
      'Cash Advance (CA)'
    ],

    features: [
      'Clear liquid as supplier-listed',
      'Low impurities as supplier-claimed',
      'Consistent quality as supplier-claimed',
      'Industrial chemical supply',
      'Concentration to be confirmed'
    ],

    specifications: {
      'Classification': 'Inorganic acid',
      'CAS No.': '7664-38-2',
      'EINECS No.': '231-633-2',
      'Raw Material': 'Phosphate rock (supplier-listed)',
      'Usage': 'pH control, rust removal and industrial chemical processing'
    }
  },

  {
    id: 'spent-sulphuric-acid',
    slug: 'spent-sulphuric-acid',
    name: 'Spent Sulphuric Acid',
    cardName: 'Spent Sulphuric Acid',
    alias: 'Recovered / Used Sulfuric Acid',
    category: 'Acids',
    hue: 24,

    grade: 'Industrial Grade · Recovered Material',
    cas: '7664-93-9',
    formula: 'H₂SO₄',
    status: 'In Stock',
    warehouse: 'Bhosari Warehouse',
    verification: 'Supplier-listed · Composition and impurities to be confirmed',

    description: 'Spent Sulphuric Acid is a recovered industrial acidic material intended for suitable chemical processing, fertilizer, metal-processing and industrial-recycling applications. Concentration and impurities can vary according to the recovery source and process. Obtain the current COA and SDS and confirm process compatibility before use.',

    moq: '250 Litres',
    packaging: ['Industrial-standard packaging; container type, capacity and compatibility to be confirmed'],
    purity: 'Concentration and impurity profile to be confirmed',
    dispatch: 'Approximately 1 week (supplier-listed)',
    integrity: 'Verify concentration, contaminants, source, COA and SDS for each supply lot before purchase.',

    safety: 'Corrosive acid that can cause severe skin burns and eye damage. Composition and contaminants may vary. Use suitable acid-resistant equipment and PPE. Follow the supplier SDS and applicable transport and environmental requirements.',

    ppe: [
      'Chemical splash goggles and face shield',
      'Suitable acid-resistant gloves',
      'Acid-resistant protective clothing',
      'Chemical-resistant footwear'
    ],

    applications: [
      'Chemical processing',
      'Fertilizer industry',
      'Metal processing',
      'Industrial acid recovery',
      'Chemical manufacturing',
      'Industrial recycling where material specifications are met'
    ],

    related: [
      'phosphoric-acid',
      'glacial-acetic-acid',
      'sulphamic-acid'
    ],

    image: 'assets/spent-sulphuric-acid-product.webp?v=photos-20261021',
    alt: 'Spent Sulphuric Acid supplied by Green Chemicals',
    physical: 'Liquid',

    price: '₹250 / Litre',
    priceAmount: 250,
    priceUnit: 'Litre',

    supplyAbility: '3500 per week (unit to be confirmed)',
    deliveryTime: '1 week',
    sampleAvailable: 'Yes',
    paymentTerms: [
      'Cheque',
      'Cash Against Delivery (CAD)',
      'Cash Advance (CA)'
    ],

    features: [
      'Recovered industrial material',
      'High acidity as supplier-claimed',
      'Controlled impurities as supplier-claimed',
      'Composition to be confirmed for each lot',
      'Bulk availability subject to confirmation'
    ],

    specifications: {
      'Boiling Point': '290–337°C (supplier-listed; verify for the supplied concentration)',
      'Classification': 'Inorganic acid',
      'CAS No.': '7664-93-9',
      'EINECS No.': '231-639-5',
      'Other Names': 'Used Sulfuric Acid; Recovered Sulfuric Acid',
      'Density': 'Confirm the correct value and unit from the supplier COA'
    }
  }
];
