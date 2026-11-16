# CV pipeline

`files/cv.pdf` is generated from the same profile data used by the website. Do not edit the PDF directly.

```text
_config.yml                         ┐
_data/profile/summary.yml           │
_data/profile/experience.yml        │
_data/profile/education.yml         ├─> cv/build-cv.js -> cv.generated.html -> files/cv.pdf
_data/profile/skills.yml            │                       + cv/style.css
_data/profile/certifications.yml    │
_data/profile/awards.yml            ┘
```

The CV is intentionally recruiter-facing and compact. It does **not** generate legacy academic-template sections such as grants, editorial service, committee memberships, conference leadership, student-guidance databases or BibTeX publications.

## CV sections

1. Professional Summary
2. Professional Experience
3. Technical Expertise
4. Education
5. Leadership, Coaching & Mentoring
6. Professional Certifications
7. Awards, Scholarships & Recognition

## Source files

| CV content | Source |
|---|---|
| Name, title, location, email, website and profile links | `_config.yml` |
| Professional summary | `_data/profile/summary.yml` |
| Professional experience and leadership/mentoring | `_data/profile/experience.yml` |
| Technical expertise | `_data/profile/skills.yml` |
| Education | `_data/profile/education.yml` |
| Certifications | `_data/profile/certifications.yml` |
| Awards and scholarships | `_data/profile/awards.yml` |

## Generate locally

```bash
npm install
npm run cv
```

Generated files:

```text
cv/cv.generated.html
files/cv.pdf
```

Open `cv/cv.generated.html` in a browser when debugging layout. Visual styling is controlled by `cv/style.css`.

## Layout guidance

The target is a concise two-page senior-engineer CV. Keep the website as the detailed record of technical training, research, projects and publications.

Useful style controls:

| Change | CSS selector |
|---|---|
| Fonts and base sizes | `:root` |
| Section headings | `.cv-section h2` |
| Job and education rows | `.cv-entry-head`, `.cv-role`, `.cv-dates` |
| Bullets | `.cv-bullets` |
| Expertise grid | `.cv-expertise-grid`, `.cv-expertise-group` |
| Certifications and awards | `.cv-compact-list` |
| Contact links/icons | `.cv-contact-link` |

The footer date and page numbering are generated automatically at build time.
