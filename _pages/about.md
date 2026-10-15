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
{% if site.office or site.phone %}<p class="pi-office">{% if site.office %}Office: {{ site.office }}{% endif %}{% if site.office and site.phone %} · {% endif %}{% if site.phone %}Tel: <a href="tel:{{ site.phone | remove: '-' }}">{{ site.phone | remove_first: '+1-' }}</a>{% endif %}</p>{% endif %}
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
<h3>Certifications</h3>

<div class="certification-list">

{% for cert in site.data.profile.certifications %}
<div class="certification-item">

<div>
<h4 style="margin: 0; margin-bottom: var(--space-1);">
{{ cert.name }}
</h4>

{% if cert.issuer %}
<p style="margin: 0; color: var(--text-secondary);">
{{ cert.issuer }}
</p>
{% endif %}
</div>

{% if cert.year %}
<span class="year-badge">{{ cert.year }}</span>
{% endif %}

{% if cert.credential_url and cert.credential_url != "" %}
<p style="margin-top: var(--space-2);">
{{ cert.credential_url }}
View credential &rarr;
</a>
</p>
{% endif %}

</div>

{% unless forloop.last %}
<hr style="border: none; border-top: 1px solid var(--border-color); margin: var(--space-4) 0;">
{% endunless %}

{% endfor %}

</div>
</div>
{% endif %}


{% if site.data.profile.awards %}
<div class="section-card">
<h3>Awards & Recognition</h3>
<ul>
{% for award in site.data.profile.awards %}
<li>{{ award.name | replace: "-","&#8211;" }}</li>
{% endfor %}
</ul>
</div>
{% endif %}

<div class="section-card about-publications" markdown="0">
<h3>Selected Publications</h3>
<p class="section-intro">Selected publications from my work in computational mechanics, multiphysics modelling, transport phenomena and engineering research.</p>

{% bibliography --max 6 %}

<p class="about-publications-more">
<a href="{{ '/publications/' | relative_url }}">View all publications &rarr;</a>
</p>
</div>
