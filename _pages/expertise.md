---
title: "Expertise"
layout: gridlay
sitemap: false
permalink: /expertise/
---

## Technical Expertise

<p class="expertise-intro">
Multidisciplinary engineering expertise spanning semiconductor systems, experimental diagnostics and computational engineering, built through more than a decade of industrial R&amp;D and scientific research. My work combines physical understanding, modelling, simulation and experimental evidence to solve complex engineering problems and translate technical insight into practical solutions.
</p>

<p class="expertise-nav-label">Explore my expertise</p>

<div class="skills-summary expertise-anchor-nav" markdown="0">
<a href="#semiconductor-diagnostics"><i class="fa-solid fa-microchip" aria-hidden="true"></i> Semiconductor Systems &amp; Experimental Diagnostics</a>
<a href="#computational-multiphysics"><i class="fa-solid fa-cubes" aria-hidden="true"></i> Computational Engineering &amp; Multiphysics</a>
<a href="#fluid-thermal"><i class="fa-solid fa-wind" aria-hidden="true"></i> Fluid Dynamics &amp; Thermal Engineering</a>
<a href="#scientific-computing"><i class="fa-solid fa-code" aria-hidden="true"></i> Scientific Computing &amp; Data</a>
<a href="#engineering-tools"><i class="fa-solid fa-gears" aria-hidden="true"></i> Engineering &amp; Development Tools</a>
<a href="#leadership-working"><i class="fa-solid fa-people-group" aria-hidden="true"></i> Leadership &amp; Ways of Working</a>
<a href="#technical-training"><i class="fa-solid fa-graduation-cap" aria-hidden="true"></i> Advanced Technical Training</a>
</div>

<div class="expertise-group-heading">
<h3>Core Engineering Expertise</h3>
<p>The principal technical domains developed across industrial engineering, research and advanced technology development.</p>
</div>

{% assign core_groups = site.data.profile.skills | where: "group", "core" %}
{% for group in core_groups %}
<div id="{{ group.anchor }}" class="section-card skills-section expertise-anchor-section" markdown="0">
<div class="skills-section-header">
<div class="skills-category-icon"><i class="{{ group.icon }}" aria-hidden="true"></i></div>
<div class="skills-category-content">
<h3>{{ group.category }}</h3>
{% if group.description %}<p>{{ group.description }}</p>{% endif %}
</div>
</div>

<div class="skills-grid">
{% for skill in group.skills %}
<div class="skill-item"><span class="skill-name">{{ skill.name }}</span></div>
{% endfor %}
</div>

<div class="expertise-evidence-links">
<a href="{{ '/research/' | relative_url }}">View related research <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
<a href="{{ '/projects/' | relative_url }}">View related projects <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
</div>
</div>
{% endfor %}

<div class="expertise-group-heading expertise-enabling-heading">
<h3>Supporting Engineering Capabilities</h3>
<p>Scientific computing, engineering tools and collaborative practices used to turn physical understanding and analysis into robust technical solutions.</p>
</div>

{% assign enabling_groups = site.data.profile.skills | where: "group", "enabling" %}
{% for group in enabling_groups %}
<div id="{{ group.anchor }}" class="section-card skills-section expertise-anchor-section" markdown="0">
<div class="skills-section-header">
<div class="skills-category-icon"><i class="{{ group.icon }}" aria-hidden="true"></i></div>
<div class="skills-category-content">
<h3>{{ group.category }}</h3>
{% if group.description %}<p>{{ group.description }}</p>{% endif %}
</div>
</div>

<div class="skills-grid">
{% for skill in group.skills %}
<div class="skill-item"><span class="skill-name">{{ skill.name }}</span></div>
{% endfor %}
</div>
</div>
{% endfor %}

{% if site.data.profile.training and site.data.profile.training.size > 0 %}
<div id="technical-training"
     class="section-card skills-training expertise-anchor-section"
     markdown="0">

<div class="skills-section-header">

<div class="skills-category-icon">
<i class="fa-solid fa-graduation-cap" aria-hidden="true"></i>
</div>

<div class="skills-category-content">
<h3>Advanced Technical Training</h3>

<p>
Specialist courses and advanced training undertaken alongside industrial and academic work, providing additional depth in porous-media transport, multiphase flow, computational mechanics, scientific computing, CAE and experimental methods.
</p>
</div>

</div>

<div class="training-list">
{% assign training_groups = site.data.profile.training | group_by: "category" %}
{% for group in training_groups %}
<div class="training-category">
<h4>{{ group.name }}</h4>
{% for course in group.items %}
<div class="training-item">
{% if course.image and course.image != "" %}
<div class="training-logo"><img src="{{ '/images/' | append: course.image | relative_url }}" alt="{{ course.provider }} logo" loading="lazy"></div>
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
