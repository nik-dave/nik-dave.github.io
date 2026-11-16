---
title: "Home"
layout: homelay
sitemap: false
permalink: /
---

<h2 class="home-hero">{{ site.name }}</h2>
<p class="home-hero-sub">{{ site.title }}</p>

<div class="home-actions" markdown="0">
  <a href="{{ '/files/cv.pdf' | relative_url }}"
     class="home-btn home-btn-primary"
     target="_blank"
     rel="noopener noreferrer">
    Download CV
  </a>

  <a href="{{ '/research/' | relative_url }}"
     class="home-btn home-btn-secondary">
    View Research &amp; Engineering
  </a>

  <a href="mailto:{{ site.email }}"
     class="home-btn home-btn-secondary">
    Contact Me
  </a>
</div>

### Professional Overview

Senior Engineer and mechanical engineer by training, working at the intersection of physical systems, computational modelling and experimental diagnostics. My career spans automotive R&D, computational mechanics, industrial research and semiconductor technology, with a focus on turning complex physical problems into practical engineering solutions.

<div class="chip-container" markdown="0">
<a href="{{ '/expertise/' | relative_url }}#semiconductor-diagnostics" class="chip">Semiconductor systems</a>
<a href="{{ '/expertise/' | relative_url }}#semiconductor-diagnostics" class="chip">Particle transport &amp; diagnostics</a>
<a href="{{ '/expertise/' | relative_url }}#computational-multiphysics" class="chip">FEM &amp; multiphysics</a>
<a href="{{ '/expertise/' | relative_url }}#fluid-thermal" class="chip">CFD &amp; thermal engineering</a>
<a href="{{ '/expertise/' | relative_url }}#scientific-computing" class="chip">Scientific computing &amp; data</a>
</div>

### Selected Technical Work

{% assign sorted_work = site.data.web.technical_work | sort: "start_date" | reverse %}
<div class="home-projects-grid" markdown="0">
{% for item in sorted_work limit:4 %}
{% assign card_id = item.title | slugify %}
<a href="{{ '/research/' | relative_url }}#{{ card_id }}" class="home-project-card">
{% if item.image and item.image != "" %}
<img src="{{ '/images/' | append: item.image | relative_url }}" alt="{{ item.title }}" loading="lazy">
{% endif %}
<div class="home-project-card-body">
<h4>{{ item.title }}</h4>
{% if item.start_date %}
<p class="home-project-meta">{{ item.start_date }}{% if item.end_date %} &ndash; {{ item.end_date }}{% else %} &ndash; Present{% endif %}</p>
{% endif %}
<p>{{ item.summary | truncatewords: 26 }}</p>
</div>
</a>
{% endfor %}
</div>

<p style="margin-top: var(--space-4);"><a href="{{ '/research/' | relative_url }}">Explore all Research &amp; Engineering &rarr;</a></p>
