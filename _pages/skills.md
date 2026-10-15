---
title: "Skills"
layout: gridlay
sitemap: false
permalink: /skills/
---

## Skills & Expertise

A multidisciplinary engineering skill set built across semiconductor systems, experimental diagnostics, computational mechanics, CFD, FEM, numerical modelling and industrial product development.

<div class="skills-summary" markdown="0">
<span><i class="fa-solid fa-microchip"></i> Semiconductor Systems</span>
<span><i class="fa-solid fa-flask"></i> Experimental Diagnostics</span>
<span><i class="fa-solid fa-wind"></i> CFD &amp; Thermal Engineering</span>
<span><i class="fa-solid fa-cubes"></i> FEM &amp; Multiphysics</span>
<span><i class="fa-solid fa-code"></i> Scientific Computing</span>
</div>

{% for group in site.data.profile.skills %}
<div class="section-card skills-section" markdown="0">
<div class="skills-section-header">
<div class="skills-category-icon">
<i class="{{ group.icon }}"></i>
</div>
<div class="skills-category-content">
<h3>{{ group.category }}</h3>
{% if group.description %}
<p>{{ group.description }}</p>
{% endif %}
</div>
</div>

<div class="skills-grid">
{% for skill in group.skills %}
<div class="skill-item skill-{{ skill.level }}">
<span class="skill-name">{{ skill.name }}</span>
{% if skill.level == "core" %}
<span class="skill-level skill-level-core">Core expertise</span>
{% elsif skill.level == "experienced" %}
<span class="skill-level skill-level-experienced">Experienced</span>
{% elsif skill.level == "working" %}
<span class="skill-level skill-level-working">Working knowledge</span>
{% endif %}
</div>
{% endfor %}
</div>
</div>
{% endfor %}

<div class="section-card skills-closing" markdown="0">
<h3>Engineering Approach</h3>
<p>My work typically sits at the intersection of physical understanding, computational modelling and experimental evidence. I use analytical and numerical methods to understand complex engineering systems, design and interpret experiments to challenge the models, and translate the combined results into practical engineering decisions.</p>

<div class="skills-actions">
  <a href="{{ '/research/' | relative_url }}" class="home-btn home-btn-secondary">Explore Research</a>
  <a href="{{ '/projects/' | relative_url }}" class="home-btn home-btn-secondary">View Projects</a>
  <a href="{{ '/files/cv.pdf' | relative_url }}" class="home-btn home-btn-primary" target="_blank" rel="noopener noreferrer">Download CV</a>
</div>
</div>
