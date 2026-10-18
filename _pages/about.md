---
title: "About"
layout: gridlay
sitemap: false
permalink: /about/
---

## About

<div class="section-card">
<div class="pi-card">
<img src="{{ site.url }}{{ site.baseurl }}/images/{{ site.photo }}" class="pi-photo" alt="{{ site.name }}" loading="lazy">
<div>
<h3 class="pi-name">{{ site.name }}</h3>
<p class="pi-title">{{ site.title }}</p>
{% if site.department %}<p class="pi-dept">{{ site.department }}</p>{% endif %}
{% if site.college %}<p class="pi-dept">{{ site.college }}</p>{% endif %}
<p class="pi-address">{{ site.institution }}{% if site.institution_location %}, {{ site.institution_location }}{% endif %}</p>

<div class="pi-links">
{% if site.email %}<a href="mailto:{{ site.email }}" class="icon-link" title="Email"><i class="fa-solid fa-envelope"></i></a>{% endif %}
{% if site.links.cv and site.links.cv != "" %}<a href="{{ site.url }}{{ site.baseurl }}/{{ site.links.cv }}" class="icon-link" title="CV"><i class="ai ai-cv"></i></a>{% endif %}
{% if site.links.google_scholar and site.links.google_scholar != "" %}<a href="{{ site.links.google_scholar }}" class="icon-link" title="Google Scholar"><i class="ai ai-google-scholar"></i></a>{% endif %}
{% if site.links.github and site.links.github != "" %}<a href="{{ site.links.github }}" class="icon-link" title="GitHub"><i class="fa-brands fa-github"></i></a>{% endif %}
{% if site.links.researchgate and site.links.researchgate != "" %}<a href="{{ site.links.researchgate }}" class="icon-link" title="ResearchGate"><i class="ai ai-researchgate"></i></a>{% endif %}
{% if site.links.orcid and site.links.orcid != "" %}<a href="{{ site.links.orcid }}" class="icon-link" title="ORCID"><i class="ai ai-orcid"></i></a>{% endif %}
{% if site.links.twitter and site.links.twitter != "" %}<a href="{{ site.links.twitter }}" class="icon-link" title="Twitter"><i class="fa-brands fa-x-twitter"></i></a>{% endif %}
{% if site.links.linkedin and site.links.linkedin != "" %}<a href="{{ site.links.linkedin }}" class="icon-link" title="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>{% endif %}
{% if site.links.youtube and site.links.youtube != "" %}<a href="{{ site.links.youtube }}" class="icon-link" title="YouTube"><i class="fa-brands fa-youtube"></i></a>{% endif %}
</div>
</div>
</div>
</div>

{% if site.data.profile.summary.text %}
<div class="section-card">
<h3>Professional Profile</h3>
<p>{{ site.data.profile.summary.text }}</p>
</div>
{% endif %}


{% if site.data.profile.experience.professional_experience %}
<div class="section-card">
<h3>Professional Experience</h3>
{% for job in site.data.profile.experience.professional_experience %}
<div>
<div class="experience-header">
<div>
<h4 style="margin: 0; margin-bottom: var(--space-1);">{{ job.position }}</h4>
<p style="margin: 0; margin-bottom: var(--space-1); color: var(--text-secondary);">{{ job.company }}</p>
<p style="margin: 0; font-size: 0.9rem; color: var(--text-tertiary);">{{ job.location }}</p>
</div>
<p class="experience-dates">{{ job.dates }}</p>
</div>
<ul style="margin-top: var(--space-2); padding-left: 1.5rem;">
{% for highlight in job.highlights %}
<li style="margin-bottom: var(--space-1); font-size: 0.95rem;">{{ highlight }}</li>
{% endfor %}
</ul>
</div>
{% unless forloop.last %}<hr style="border: none; border-top: 1px solid var(--border-color); margin: var(--space-4) 0;">{% endunless %}
{% endfor %}
</div>
{% endif %}


{% if site.data.profile.education %}
<div class="section-card">
<h3>Education</h3>
{% for edu in site.data.profile.education %}
<div>
<div class="experience-header">
<div>
<h4 style="margin: 0; margin-bottom: var(--space-1);">{{ edu.degree }} ｜ {{ edu.institution }}</h4>
<p style="margin: 0; font-size: 0.9rem; color: var(--text-tertiary);">{{ edu.location }}</p>
</div>
<p class="experience-dates">{{ edu.dates }}</p>
</div>
<ul style="margin-top: var(--space-2); padding-left: 1.5rem;">
{% for detail in edu.details %}
<li style="margin-bottom: var(--space-1); font-size: 0.95rem;">{{ detail }}</li>
{% endfor %}
</ul>
</div>
{% unless forloop.last %}<hr style="border: none; border-top: 1px solid var(--border-color); margin: var(--space-4) 0;">{% endunless %}
{% endfor %}
</div>
{% endif %}



{% if site.data.profile.experience.teaching_experience and site.data.profile.experience.teaching_experience.size > 0 %}
<div class="section-card">
<h3>Leadership, Coaching & Mentoring</h3>

{% for item in site.data.profile.experience.teaching_experience %}
<div>

<div class="experience-header">
<div>
<h4 style="margin: 0; margin-bottom: var(--space-1);">{{ item.position }}</h4>

{% if item.institution %}
<p style="margin: 0; margin-bottom: var(--space-1); color: var(--text-secondary);">
{{ item.institution }}
</p>
{% endif %}

{% if item.location %}
<p style="margin: 0; font-size: 0.9rem; color: var(--text-tertiary);">
{{ item.location }}
</p>
{% endif %}
</div>

{% if item.dates %}
<p class="experience-dates">{{ item.dates }}</p>
{% endif %}
</div>

{% if item.description %}
<p style="margin-top: var(--space-2);">
{{ item.description }}
</p>
{% endif %}

{% if item.highlights and item.highlights.size > 0 %}
<ul style="margin-top: var(--space-2); padding-left: 1.5rem;">
{% for highlight in item.highlights %}
<li style="margin-bottom: var(--space-1); font-size: 0.95rem;">
{{ highlight }}
</li>
{% endfor %}
</ul>
{% endif %}

</div>

{% unless forloop.last %}
<hr style="border: none; border-top: 1px solid var(--border-color); margin: var(--space-4) 0;">
{% endunless %}

{% endfor %}
</div>
{% endif %}

{% if site.data.profile.certifications and site.data.profile.certifications.size > 0 %}
<div class="section-card">
<h3>Professional Certifications</h3>

<div class="certification-list" markdown="0">
{% for cert in site.data.profile.certifications %}
<div class="certification-item">
{% if cert.image and cert.image != "" %}
<div class="certification-logo">
<img src="{{ '/images/' | append: cert.image | relative_url }}" alt="{{ cert.issuer }} logo" loading="lazy">
</div>
{% endif %}

<div class="certification-content">
<h4>{{ cert.name }}</h4>
{% if cert.issuer and cert.issuer != "" %}<p class="certification-issuer">{{ cert.issuer }}</p>{% endif %}
{% if cert.location and cert.location != "" %}<p class="certification-location">{{ cert.location }}</p>{% endif %}
{% if cert.credential_url and cert.credential_url != "" %}
<a href="{{ cert.credential_url }}" class="certification-link" target="_blank" rel="noopener noreferrer">View credential &rarr;</a>
{% endif %}
</div>

{% if cert.date and cert.date != "" %}<div class="certification-date">{{ cert.date }}</div>{% endif %}
</div>
{% unless forloop.last %}<hr class="certification-divider">{% endunless %}
{% endfor %}
</div>
</div>
{% endif %}


{% if site.data.profile.awards and site.data.profile.awards.size > 0 %}
<div class="section-card">
<h3>Awards, Scholarships & Recognition</h3>

<div class="awards-list" markdown="0">
{% for award in site.data.profile.awards %}
<div class="award-item">

{% if award.image and award.image != "" %}
<div class="award-logo">
<img src="{{ '/images/' | append: award.image | relative_url }}" alt="{{ award.name }} logo" loading="lazy">
</div>
{% endif %}

<div class="award-content">
<h4>{{ award.name }}</h4>
{% if award.organisation and award.organisation != "" %}
<p class="award-organisation">{{ award.organisation }}</p>
{% endif %}
{% if award.programme and award.programme != "" %}
<p class="award-programme">{{ award.programme }}</p>
{% endif %}
</div>

{% if award.dates and award.dates != "" %}
<div class="award-dates">{{ award.dates }}</div>
{% endif %}

</div>
{% unless forloop.last %}<hr class="award-divider">{% endunless %}
{% endfor %}
</div>
</div>
{% endif %}




<div class="section-card">

<h3>Publications & Conference Presentations</h3>

<h4>Publications</h4>

<ul>
<li>
<strong>2025</strong> — Through-thickness liquid penetration inducing hydro-expansion of thin porous-fibrous sheets: pore transport, fibre mass exchange and moisture-induced deformations. <em>Manuscript submitted for publication.</em>
</li>

<li>
<strong>2025</strong> — On the prediction of the hygro-expansivity of paper based on fibre constitutive properties: an experimental-numerical multi-scale analysis. <em>Mechanics of Materials</em>, Elsevier.
</li>

<li>
<strong>2024</strong> — Accuracy of hygro-expansive curl predictions for paper sheets based on homogenised 2D and 3D network representations. <em>European Journal of Mechanics - A/Solids</em>, 106, 105339.
</li>

<li>
<strong>2022</strong> — Hygro-mechanics of fibrous networks: A comparison between micro-scale modelling approaches. In <em>Mechanics of Fibrous Networks</em>, Elsevier.
</li>
</ul>


<h4 style="margin-top: var(--space-5);">Conference Presentations</h4>

<ul>
<li><strong>2022</strong> — 15th World Congress on Computational Mechanics (WCCM).</li>

<li><strong>2022</strong> — 8th ECCOMAS Congress, Oslo, Norway.</li>

<li><strong>2021</strong> — 10th International Conference on Adaptive Modelling and Simulation (ADMOS).</li>

<li><strong>2021</strong> — 9th International Conference on Computational Methods for Coupled Problems (COUPLED).</li>

<li><strong>2021</strong> — 14th World Congress on Computational Mechanics & ECCOMAS Congress.</li>

<li><strong>2020</strong> — InterPore Benelux Day.</li>

<li><strong>2020</strong> — Progress in Paper Physics Seminar (PPPS2020), Jyväskylä, Finland.</li>

<li><strong>2019</strong> — 9th International Conference on Adaptive Modelling and Simulation (ADMOS).</li>
</ul>

</div>