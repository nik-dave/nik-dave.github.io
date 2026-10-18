---
title: "Expertise"
layout: gridlay
sitemap: false
permalink: /expertise/
---

## Technical Expertise

Engineering expertise developed across semiconductor systems, experimental diagnostics, computational mechanics, CFD, FEM and multiphysics modelling, supported by more than a decade of industrial and research experience.

<div class="skills-summary" markdown="0">
<span><i class="fa-solid fa-microchip"></i> Semiconductor Systems & Experimental Diagnostics</span>
<span><i class="fa-solid fa-cubes"></i> Computational Engineering & Multiphysics</span>
<span><i class="fa-solid fa-wind"></i> Fluid Dynamics & Thermal Engineering</span>
</div>

<div class="expertise-group-heading">
<h3>Core Engineering Expertise</h3>
<p>The principal technical domains developed across industrial engineering, research and advanced technology development.</p>
</div>

{% assign core_groups = site.data.profile.skills | where: "group", "core" %}

{% for group in core_groups %}

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





<div class="expertise-group-heading expertise-enabling-heading">
<h3>Tools, Computing & Ways of Working</h3>
<p>Supporting capabilities used to turn physical understanding and engineering analysis into robust technical solutions.</p>
</div>

{% assign enabling_groups = site.data.profile.skills | where: "group", "enabling" %}

{% for group in enabling_groups %}

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






{% if site.data.profile.training and site.data.profile.training.size > 0 %}

<div class="section-card skills-training" markdown="0">

<h3>Advanced Technical Training</h3>

<p class="training-intro">
Specialist courses and advanced training undertaken alongside industrial and academic work, providing additional depth in porous-media transport, multiphase flow, computational mechanics, scientific computing, CAE and experimental methods.
</p>

<div class="training-list">

{% assign training_groups = site.data.profile.training | group_by: "category" %}

{% for group in training_groups %}
<div class="training-category">
<h4>{{ group.name }}</h4>

{% for course in group.items %}
<div class="training-item">
{% if course.image and course.image != "" %}
<div class="training-logo">
<img src="{{ '/images/' | append: course.image | relative_url }}" alt="{{ course.provider }} logo" loading="lazy">
</div>
{% endif %}

<div class="training-content">
<h5>{{ course.title }}</h5>
{% if course.instructor and course.instructor != "" %}<p class="training-instructor">{{ course.instructor }}</p>{% endif %}
{% if course.provider and course.provider != "" %}<p class="training-provider">{{ course.provider }}</p>{% endif %}
{% if course.location and course.location != "" %}<p class="training-location">{{ course.location }}</p>{% endif %}
</div>

{% if course.date and course.date != "" %}<div class="training-date">{{ course.date }}</div>{% endif %}
</div>
{% endfor %}
</div>
{% endfor %}
</div>
</div>
{% endif %}


<div class="section-card skills-closing" markdown="0">
<h3>Engineering Approach</h3>
<p>My work sits at the intersection of physical understanding, computational modelling and experimental evidence. I combine analytical and numerical methods with experimental diagnostics to understand complex engineering systems, challenge modelling assumptions and translate technical findings into practical engineering decisions.</p>

<div class="skills-actions">
  <a href="{{ '/research/' | relative_url }}" class="home-btn home-btn-secondary">Explore Research</a>
  <a href="{{ '/projects/' | relative_url }}" class="home-btn home-btn-secondary">View Projects</a>
  <a href="{{ '/files/cv.pdf' | relative_url }}" class="home-btn home-btn-primary" target="_blank" rel="noopener noreferrer">Download CV</a>
</div>
</div>
