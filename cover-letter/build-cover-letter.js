// Generates a one-page, position-specific cover letter PDF.
// Usage:
//   node cover-letter/build-cover-letter.js cover-letter/applications/<file>.yml

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const applicationArg = process.argv[2];

if (!applicationArg) {
  console.error('Usage: node cover-letter/build-cover-letter.js cover-letter/applications/<file>.yml');
  process.exit(1);
}

const applicationPath = path.isAbsolute(applicationArg)
  ? applicationArg
  : path.join(ROOT, applicationArg);

const readYaml = (filePath) => yaml.load(fs.readFileSync(filePath, 'utf8'));
const config = readYaml(path.join(ROOT, '_config.yml'));
const application = readYaml(applicationPath);

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function paragraphs(items) {
  return (items || [])
    .filter(Boolean)
    .map((item) => `<p>${escapeHtml(item)}</p>`)
    .join('\n');
}

const links = config.links || {};
const portfolioUrl = config.url || 'https://nik-dave.github.io';
const portfolioSentence =
  `Selected examples of my engineering work, computational models and experimental research ` +
  `are available in my <a href="${escapeHtml(portfolioUrl)}">Engineering Portfolio ↗</a>.`;

const linkedInUrl = links.linkedin || '';
const githubUrl = links.github || '';
const contactItems = [
  config.email ? `<a href="mailto:${escapeHtml(config.email)}">${escapeHtml(config.email)}</a>` : '',
  portfolioUrl
  ? `<a href="${escapeHtml(portfolioUrl)}">Engineering Portfolio ↗</a>`
  : '',
  linkedInUrl ? `<a href="${escapeHtml(linkedInUrl)}">LinkedIn</a>` : '',
  githubUrl ? `<a href="${escapeHtml(githubUrl)}">GitHub</a>` : '',
].filter(Boolean);

const recipientLines = [
  application.recipient,
  application.company,
  application.location,
].filter(Boolean).map(escapeHtml).join('<br>');

const subject = `Re: ${escapeHtml(application.position)}${application.requisition ? ` (${escapeHtml(application.requisition)})` : ''}`;
const salutation = application.salutation || 'Dear Hiring Manager,';
const signoff = application.signoff || 'Yours sincerely,';
const cvTitle = application.header_title || 'Senior Engineer | Semiconductor Systems & Computational Engineering';

const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(config.name)} - ${escapeHtml(application.position)}</title>
<style>${css}</style>
</head>
<body>
  <header class="letter-header">
    <h1>${escapeHtml(config.name)}</h1>
    <p class="letter-title">${escapeHtml(cvTitle)}</p>
    <p class="letter-location">${escapeHtml(config.office_city || config.institution_location || 'Veldhoven, The Netherlands')}</p>
    <nav class="letter-contact">${contactItems.join('<span class="sep">|</span>')}</nav>
  </header>

  <main>
    <div class="letter-topline">
      <div class="recipient">${recipientLines}</div>
      <div class="date">${escapeHtml(application.date)}</div>
    </div>

    <p class="subject"><strong>${subject}</strong></p>
    <p>${escapeHtml(salutation)}</p>
${paragraphs(application.paragraphs)}

<p class="portfolio-invitation">
  ${portfolioSentence}
</p>

<p>${escapeHtml(signoff)}</p>
<p class="signature">${escapeHtml(config.name)}</p>
  </main>

</body>
</html>`;

const slug = application.output_slug || path.basename(applicationPath, path.extname(applicationPath));
const htmlPath = path.join(__dirname, `${slug}.generated.html`);
const outputPath = path.join(ROOT, 'files', `cover-letter-${slug}.pdf`);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(htmlPath, html, 'utf8');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.goto(`file://${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '15mm', bottom: '15mm', left: '20mm', right: '20mm' },
      displayHeaderFooter: false,
    });
  } finally {
    await browser.close();
  }
  console.log(`Wrote ${outputPath}`);
})();
