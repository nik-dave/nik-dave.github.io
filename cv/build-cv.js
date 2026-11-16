// Builds files/cv.pdf from the same profile data used by the website.
//
// Sources:
//   _config.yml
//   _data/profile/summary.yml
//   _data/profile/experience.yml
//   _data/profile/education.yml
//   _data/profile/skills.yml
//   _data/profile/certifications.yml
//   _data/profile/awards.yml
//
// Run with: npm.cmd run cv
// Styling: cv/style.css

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const readYaml = (p) => yaml.load(fs.readFileSync(path.join(ROOT, p), 'utf8'));

// ---------------------------------------------------------------------------
// Load only data that is intentionally used in the recruiter-facing CV
// ---------------------------------------------------------------------------

const config = readYaml('_config.yml');
const summary = readYaml('_data/profile/summary.yml') || {};
const education = readYaml('_data/profile/education.yml') || [];
const experience = readYaml('_data/profile/experience.yml') || {};
const skills = readYaml('_data/profile/skills.yml') || [];
const awards = readYaml('_data/profile/awards.yml') || [];
const certifications = readYaml('_data/profile/certifications.yml') || [];

const SITE_URL = (config.url || '').replace(/\/$/, '');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function html(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/href=(['"])\/(?!\/)/g, `href=$1${SITE_URL}/`)
    .trim();
}

const section = (title, body, className = '') =>
  body && body.trim()
    ? `<section class="cv-section ${className}"><h2>${title}</h2>${body}</section>`
    : '';

const bullets = (items, cls = 'cv-bullets') => {
  const valid = (items || []).filter((item) => item !== undefined && item !== null && String(item).trim() !== '');
  return valid.length
    ? `<ul class="${cls}">${valid.map((item) => `<li>${html(item)}</li>`).join('')}</ul>`
    : '';
};

function entryHead(title, metaParts, dates) {
  const parts = (Array.isArray(metaParts) ? metaParts : [metaParts]).filter(Boolean);
  const metaHtml = parts
    .map((part, index) => {
      let cls = 'cv-meta-mid';
      if (parts.length === 1) cls = 'cv-loc';
      else if (index === 0) cls = 'cv-org';
      else if (index === parts.length - 1) cls = 'cv-loc';
      return `<span class="${cls}">${html(part)}</span>`;
    })
    .join('<span class="cv-sep"> &middot; </span>');

  return (
    `<div class="cv-entry-head">` +
    `<div class="cv-entry-title"><span class="cv-role">${html(title)}</span>${metaHtml}</div>` +
    (dates ? `<span class="cv-dates">${html(dates)}</span>` : '') +
    `</div>`
  );
}

const links = config.links || {};

function contactRow(items, cls) {
  return items.length
    ? `<nav class="cv-contact ${cls}">` +
        items
          .map(([icon, href, label]) => `<a class="cv-contact-link" data-icon="${icon}" href="${href}">${label}</a>`)
          .join('') +
      `</nav>`
    : '';
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

const reachContacts = [];
if (config.phone) reachContacts.push(['phone', `tel:${config.phone.replace(/[^\d+]/g, '')}`, config.phone]);
if (config.email) reachContacts.push(['email', `mailto:${config.email}`, config.email]);
if (config.url) reachContacts.push(['website', config.url, config.url.replace(/^https?:\/\//, '').replace(/\/$/, '')]);

const profileContacts = [];
if (links.linkedin) profileContacts.push(['linkedin', links.linkedin, 'LinkedIn']);
if (links.github) profileContacts.push(['github', links.github, 'GitHub']);

const affiliation = [config.title, config.institution].filter(Boolean).join(', ');
const officeLine = [config.office_city || config.institution_location].filter(Boolean).join('');

// ---------------------------------------------------------------------------
// Assemble document
// ---------------------------------------------------------------------------

const parts = [];

parts.push(
  `<header class="cv-header">` +
    `<h1>${html(config.name)}</h1>` +
    `<p class="cv-affiliation">${html(affiliation)}</p>` +
    (officeLine ? `<p class="cv-office">${html(officeLine)}</p>` : '') +
    contactRow(reachContacts, 'cv-contact-reach') +
    contactRow(profileContacts, 'cv-contact-profiles') +
  `</header>`
);

const cvSummary =
  'Mechanical engineer with a PhD and a career spanning automotive R&D, ' +
  'computational mechanics, industrial research and semiconductor technology. ' +
  'Experience ranges from automotive CFD and thermal engineering through an ' +
  'Erasmus Mundus MSc and joint industrial doctorate to advanced semiconductor ' +
  'engineering at ASML, combining engineering delivery, scientific research ' +
  'and technical leadership.';

parts.push(
  section(
    'Professional Summary',
    `<p class="cv-summary">${cvSummary}</p>`
  )
);

const professionalExperience = (experience.professional_experience || [])
  .map((job) =>
    `<article class="cv-entry">` +
      entryHead(job.position, [job.company, job.location], job.dates) +
      bullets(job.highlights) +
    `</article>`
  )
  .join('');
parts.push(section('Professional Experience', professionalExperience));

// Compact expertise groups. No subjective proficiency ratings are printed.
const cvExpertise = [
  {
    category: 'Semiconductor Systems & Experimental Diagnostics',
    items: [
      'Semiconductor Metrology',
      'Defectivity Engineering',
      'Particle Transport & Contamination',
      '3D Particle Tracking Velocimetry (PTV)',
      'Optical Diagnostics',
      'Model-Based Engineering',
      'Verification & Validation',
    ],
  },
  {
    category: 'Computational Engineering & Multiphysics',
    items: [
      'Finite Element Method (FEM)',
      'Computational Mechanics',
      'Multiphysics & Multiscale Modelling',
      'Numerical Methods',
      'Piezoelectric Modelling',
      'Hygro- & Thermo-Mechanical Modelling',
    ],
  },
  {
    category: 'Fluid Dynamics & Thermal Engineering',
    items: [
      'Computational Fluid Dynamics (CFD)',
      'Automotive Thermal Management',
      'Conjugate Heat Transfer',
      'HVAC & Cooling Systems',
      'Hydrodynamics',
    ],
  },
  {
    category: 'Scientific Computing & Data',
    items: [
      'Python',
      'MATLAB',
      'Data Analysis & Visualisation',
      'Automation & Scripting',
    ],
  },
  {
    category: 'Engineering Software & Digital Workflows',
    items: [
      'STAR-CCM+',
      'COMSOL Multiphysics',
      'MSC Marc/Mentat',
      'LaVision DaVis',
      'PowerFLOW / PowerTHERM',
      'Siemens NX / Teamcenter',
      'Git',
    ],
  },
];

const expertiseGroups = cvExpertise
  .map(
    (group) =>
      `<div class="cv-expertise-group">` +
      `<h3>${html(group.category)}</h3>` +
      `<p>${group.items.map(html).join(' · ')}</p>` +
      `</div>`
  )
  .join('');

parts.push(section('Technical Expertise', `<div class="cv-expertise-grid">${expertiseGroups}</div>`, 'cv-section-expertise'));

const educationEntries = education
  .map((edu) =>
    `<article class="cv-entry">` +
      entryHead(edu.degree, [edu.institution, edu.location], edu.dates) +
      bullets(edu.details) +
    `</article>`
  )
  .join('');
parts.push(section('Education', educationEntries));

const cvLeadership = [
  '<strong>ASML:</strong> Technical mentoring, onboarding, knowledge transfer and engineering workshops (2023–Present).',
  "<strong>TU/e:</strong> Supervised bachelor's and master's research projects and supported modelling and simulation teaching (2018–2022).",
  '<strong>Swansea University / UPC:</strong> Erasmus Mundus MSc Student Representative and liaison with lecturers and programme coordinators (2016–2018).',
];

parts.push(
  section(
    'Leadership, Coaching & Mentoring',
    bullets(cvLeadership, 'cv-compact-list')
  )
);

const certificationItems = certifications.map((cert) => {
  const details = [cert.issuer, cert.date || cert.year]
    .filter(Boolean)
    .map(html)
    .join(' · ');

  const name = cert.credential_url
    ? `<a href="${html(cert.credential_url)}"><strong>${html(cert.name)}</strong></a>`
    : `<strong>${html(cert.name)}</strong>`;

  return `${name}${details ? ` — ${details}` : ''}`;
});

const cvAwards = [
  'WCCM & ECCOMAS Congress Scholarship, 2021',
  'Marie Skłodowska-Curie European Joint Doctorate Scholarship — European Commission, 2018–2022',
  'Go Global Scholarship — Swansea University / CIMNE / UPC, 2017–2018',
  "Erasmus Mundus Fully Funded Master's Scholarship — European Commission, 2016–2018",
  'International Excellence Scholarship — Swansea University, 2016–2017',
];

parts.push(
  section(
    'Awards, Scholarships & Recognition',
    bullets(cvAwards, 'cv-compact-list')
  )
);

parts.push(section('Professional Certifications', bullets(certificationItems, 'cv-compact-list')));




// ---------------------------------------------------------------------------
// Render HTML and print PDF
// ---------------------------------------------------------------------------

const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');

const documentHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${html(config.name)} — Curriculum Vitae</title>
<style>${css}</style>
</head>
<body>
${parts.join('\n')}
</body>
</html>`;

const htmlPath = path.join(__dirname, 'cv.generated.html');
fs.writeFileSync(htmlPath, documentHtml, 'utf8');

const today = new Date().toLocaleDateString('en-GB', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

const footerTemplate = `
  <div style="width:100%; font-family:Georgia,serif; font-size:7.5pt; color:#888;
              padding:0 18mm; display:flex; justify-content:space-between;">
    <span>Last updated ${today}</span>
    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
  </div>`;

(async () => {
  const outDir = path.join(ROOT, 'files');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.goto(`file://${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: path.join(outDir, 'cv.pdf'),
      format: 'Letter',
      printBackground: true,
      margin: { top: '15mm', bottom: '16mm', left: '18mm', right: '18mm' },
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate,
    });
  } finally {
    await browser.close();
  }
  console.log('Wrote files/cv.pdf');
})();
