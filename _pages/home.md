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

  <a href="{{ '/projects/' | relative_url }}"
     class="home-btn home-btn-secondary">
    View Projects
  </a>

  <a href="mailto:{{ site.email }}"
     class="home-btn home-btn-secondary">
    Contact Me
  </a>
</div>

### Professional Overview

Senior Engineer and mechanical engineer by training, working at the intersection of physical systems, computational modelling and experimental diagnostics. My career spans automotive R&D, computational mechanics, industrial research and semiconductor technology, with a focus on turning complex physical problems into practical engineering solutions.

<div class="chip-container" markdown="0">
<a href="{{ site.url }}{{ site.baseurl }}/research" class="chip">Semiconductor metrology</a>
<a href="{{ site.url }}{{ site.baseurl }}/research" class="chip">Particle contamination</a>
<a href="{{ site.url }}{{ site.baseurl }}/research" class="chip">Defectivity control</a>
<a href="{{ site.url }}{{ site.baseurl }}/research" class="chip">Experimental validation</a>
<a href="{{ site.url }}{{ site.baseurl }}/research" class="chip">CFD simulation</a>
<a href="{{ site.url }}{{ site.baseurl }}/research" class="chip">FEM analysis</a>
<a href="{{ site.url }}{{ site.baseurl }}/research" class="chip">Numerical modelling</a>
</div>

### Selected Research & Engineering

{% assign sorted_research = site.data.web.research | sort: "start_date" | reverse %}
<div class="home-projects-grid" markdown="0">
{% for item in sorted_research limit:4 %}
{% assign card_id = item.title | slugify %}
<a href="{{ site.url }}{{ site.baseurl }}/research#{{ card_id }}" class="home-project-card">
{% if item.image and item.image != "" %}
<img src="{{ site.url }}{{ site.baseurl }}/images/{{ item.image }}" alt="{{ item.title }}" loading="lazy">
{% endif %}
<div class="home-project-card-body">
<h4>{{ item.title }}</h4>
<p>{{ item.abstract | truncatewords: 20 }}</p>
</div>
</a>
{% endfor %}
</div>

{% if site.data.web.projects and site.data.web.projects.size > 0 %}
### Selected Engineering Projects

{% assign sorted_projects = site.data.web.projects | sort: "start_date" | reverse %}
<div class="home-software-list" markdown="0">
{% for item in sorted_projects limit:2 %}
{% assign card_id = item.title | slugify %}
<a href="{{ site.url }}{{ site.baseurl }}/projects#{{ card_id }}" class="home-software-card">
{% if item.image and item.image != "" %}
<div class="home-software-card-media">
<img src="{{ site.url }}{{ site.baseurl }}/images/{{ item.image }}" alt="{{ item.title }}" loading="lazy">
</div>
{% endif %}
<div class="home-software-card-body">
<h4>{{ item.title }}</h4>
{% if item.status or item.role or item.start_date %}
<div class="home-software-meta">
{% if item.status and item.status != "" %}<span class="home-software-status">{{ item.status }}</span>{% endif %}
{% if item.role and item.role != "" %}<span>{{ item.role }}</span>{% endif %}
{% if item.start_date %}<span>{{ item.start_date }}{% if item.end_date %}&ndash;{{ item.end_date }}{% else %}&ndash;Present{% endif %}</span>{% endif %}
</div>
{% endif %}
<p>{{ item.abstract | truncatewords: 42 }}</p>
{% if item.stack %}
<div class="home-software-stack">
{% for tech in item.stack limit:6 %}<span>{{ tech }}</span>{% endfor %}{% if item.stack.size > 6 %}<span>+{{ item.stack.size | minus: 6 }} more</span>{% endif %}
</div>
{% endif %}
<div class="home-software-cta">View project <i class="fa-solid fa-arrow-right"></i></div>
</div>
</a>
{% endfor %}
</div>

<p style="margin-top: var(--space-4);"><a href="{{ site.url }}{{ site.baseurl }}/projects">See all projects &rarr;</a></p>
{% endif %}
