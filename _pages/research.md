---
title: "Research & Engineering"
layout: gridlay
sitemap: false
permalink: /research/
---

## Research & Engineering

<p class="research-intro">
Selected technical investigations and engineering work spanning semiconductor systems, experimental diagnostics, computational mechanics, multiphysics, fluid dynamics and thermal engineering.
</p>

<input type="text" class="pub-search" id="researchSearch" placeholder="Search by title, method, deliverable or keyword..." aria-label="Search research and engineering work">

{% assign tag_string = "" %}
{% for item in site.data.web.technical_work %}
  {% if item.methods %}
    {% for tag in item.methods %}
      {% if tag and tag != "" %}{% assign tag_string = tag_string | append: tag | append: "|||" %}{% endif %}
    {% endfor %}
  {% endif %}
  {% if item.keywords %}
    {% for tag in item.keywords %}
      {% if tag and tag != "" %}{% assign tag_string = tag_string | append: tag | append: "|||" %}{% endif %}
    {% endfor %}
  {% endif %}
{% endfor %}
{% assign tag_array = tag_string | split: "|||" | uniq | sort %}

{% assign yr_string = "" %}
{% for item in site.data.web.technical_work %}
  {% if item.start_date %}
    {% assign start_yr = item.start_date | split: "-" | first | plus: 0 %}
    {% if item.end_date %}
      {% assign end_yr = item.end_date | split: "-" | first | plus: 0 %}
    {% else %}
      {% assign end_yr = 'now' | date: "%Y" | plus: 0 %}
    {% endif %}
    {% for y in (start_yr..end_yr) %}
      {% assign yr_string = yr_string | append: y | append: "|||" %}
    {% endfor %}
  {% endif %}
{% endfor %}
{% assign year_array = yr_string | split: "|||" | uniq | sort | reverse %}

<div class="research-filter-bar" markdown="0">
<div class="research-dropdown">
<button type="button" class="research-dropdown-btn" id="focusDropdownBtn" aria-expanded="false"><i class="fa-solid fa-layer-group" aria-hidden="true"></i> <span id="focusLabel">Focus</span> <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>
<div class="research-dropdown-menu" id="focusDropdownMenu">
<div class="research-dropdown-item selected" data-focus="__all__">All areas</div>
{% for area in site.data.web.research_areas %}<div class="research-dropdown-item" data-focus="{{ area.id }}">{{ area.name }}</div>{% endfor %}
</div>
</div>

<div class="research-dropdown">
<button type="button" class="research-dropdown-btn" id="kwDropdownBtn" aria-expanded="false"><i class="fa-solid fa-gears" aria-hidden="true"></i> <span id="kwLabel">Method / keyword</span> <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>
<div class="research-dropdown-menu" id="kwDropdownMenu">
<div class="research-dropdown-item selected" data-kw="__all__">All methods and keywords</div>
{% for tag in tag_array %}{% if tag != "" %}<div class="research-dropdown-item" data-kw="{{ tag | downcase | escape }}">{{ tag }}</div>{% endif %}{% endfor %}
</div>
</div>

<div class="research-dropdown">
<button type="button" class="research-dropdown-btn" id="yearDropdownBtn" aria-expanded="false"><i class="fa-regular fa-calendar" aria-hidden="true"></i> <span id="yearLabel">Year</span> <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>
<div class="research-dropdown-menu" id="yearDropdownMenu">
<div class="research-dropdown-item selected" data-year="__all__">All years</div>
{% for yr in year_array %}{% if yr != "" %}<div class="research-dropdown-item" data-year="{{ yr }}">{{ yr }}</div>{% endif %}{% endfor %}
</div>
</div>

<button type="button" class="research-dropdown-btn" id="clearResearchFilters"><i class="fa-solid fa-rotate-left" aria-hidden="true"></i> Clear filters</button>
</div>

<p class="research-results-summary" id="researchResultsSummary" aria-live="polite"></p>

{% assign sorted_work = site.data.web.technical_work | sort: "start_date" | reverse %}
<div class="research-list" id="researchList">
{% for item in sorted_work %}
{% assign method_joined = item.methods | join: "|" %}
{% assign keyword_joined = item.keywords | join: "|" %}
{% assign searchable_tags = method_joined | append: "|" | append: keyword_joined %}
{% assign card_start_yr = item.start_date | split: "-" | first %}
{% if item.end_date %}{% assign card_end_yr = item.end_date | split: "-" | first %}{% else %}{% assign card_end_yr = 'now' | date: "%Y" %}{% endif %}
{% assign card_id = item.title | slugify %}
{% assign focus_joined = item.focus | join: "|" %}

<article class="research-card-h technical-work-card" id="{{ card_id }}" data-research-searchable data-keywords="{{ searchable_tags | downcase | escape }}" data-focus="{{ focus_joined }}" data-start-year="{{ card_start_yr }}" data-end-year="{{ card_end_yr }}">
<div class="research-card-h-img">
{% if item.image and item.image != "" %}
  {% if item.image contains ".pdf" %}
  <canvas class="research-card-pdf" data-pdf="{{ '/images/' | append: item.image | relative_url }}" aria-label="Preview of {{ item.title }}"></canvas>
  {% else %}
  <img src="{{ '/images/' | append: item.image | relative_url }}" alt="Representative visual for {{ item.title }}" loading="lazy">
  {% endif %}
{% else %}
<div class="research-card-h-img-placeholder"><i class="fa-solid fa-flask" aria-hidden="true"></i></div>
{% endif %}
</div>

<div class="research-card-h-body">
<div class="technical-work-heading-row">
<h3 class="research-card-h-title">{{ item.title }}</h3>
{% if item.status and item.status != "" %}<span class="technical-work-status technical-work-status-{{ item.status | downcase | slugify }}">{{ item.status }}</span>{% endif %}
</div>

<div class="research-meta">
{% if item.start_date %}<span><i class="fa-regular fa-calendar" aria-hidden="true"></i> {{ item.start_date }}{% if item.end_date %} &ndash; {{ item.end_date }}{% else %} &ndash; Present{% endif %}</span>{% endif %}
{% if item.context and item.context != "" %}<span><i class="fa-solid fa-location-dot" aria-hidden="true"></i> {{ item.context }}</span>{% endif %}
</div>

{% if item.role and item.role != "" %}<p class="technical-work-role"><strong>Role:</strong> {{ item.role }}</p>{% endif %}

{% if item.methods %}
<div class="research-card-h-keywords">
{% for method in item.methods %}<span class="research-kw">{{ method }}</span>{% endfor %}
</div>
{% endif %}

<div class="research-card-h-desc" data-clamp>
<div class="js-clamp-text" id="{{ card_id }}-details">
<p class="research-card-h-abstract">{{ item.summary }}</p>

{% if item.contributions and item.contributions.size > 0 %}
<div class="technical-work-section">
<h4>My contribution</h4>
<ul>{% for contribution in item.contributions %}<li>{{ contribution }}</li>{% endfor %}</ul>
</div>
{% endif %}

{% if item.deliverables and item.deliverables.size > 0 %}
<div class="technical-work-section technical-work-deliverables">
<h4>Key deliverables</h4>
<ul>{% for deliverable in item.deliverables %}<li>{{ deliverable }}</li>{% endfor %}</ul>
</div>
{% endif %}
</div>
<button type="button" class="js-clamp-toggle" aria-expanded="false" aria-controls="{{ card_id }}-details" hidden><span class="js-clamp-label">Show more</span> <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>
</div>

{% assign has_link = false %}
{% if item.links.webpage and item.links.webpage != "" %}{% assign has_link = true %}{% endif %}
{% if item.links.paper and item.links.paper != "" %}{% assign has_link = true %}{% endif %}
{% if item.links.github and item.links.github != "" %}{% assign has_link = true %}{% endif %}
{% if item.links.demo and item.links.demo != "" %}{% assign has_link = true %}{% endif %}
{% if item.links.docs and item.links.docs != "" %}{% assign has_link = true %}{% endif %}
{% if has_link %}
<div class="research-card-h-links">
{% if item.links.webpage and item.links.webpage != "" %}<a class="research-link" href="{{ item.links.webpage }}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-globe" aria-hidden="true"></i> Webpage</a>{% endif %}
{% if item.links.paper and item.links.paper != "" %}<a class="research-link" href="{{ item.links.paper }}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-file-lines" aria-hidden="true"></i> Paper</a>{% endif %}
{% if item.links.github and item.links.github != "" %}<a class="research-link" href="{{ item.links.github }}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github" aria-hidden="true"></i> Repository</a>{% endif %}
{% if item.links.demo and item.links.demo != "" %}<a class="research-link" href="{{ item.links.demo }}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-play" aria-hidden="true"></i> Demo</a>{% endif %}
{% if item.links.docs and item.links.docs != "" %}<a class="research-link" href="{{ item.links.docs }}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-book" aria-hidden="true"></i> Documentation</a>{% endif %}
</div>
{% endif %}
</div>
</article>
{% endfor %}
</div>

<div class="section-card research-empty-state" id="researchEmptyState" hidden>
<h3>No matching work found</h3>
<p>Try a different search term or clear one or more filters.</p>
</div>

<script>
(function () {
  var searchInput = document.getElementById('researchSearch');
  var cards = Array.prototype.slice.call(document.querySelectorAll('[data-research-searchable]'));
  var activeFocus = '__all__';
  var activeKw = '__all__';
  var activeYear = '__all__';
  var summary = document.getElementById('researchResultsSummary');
  var emptyState = document.getElementById('researchEmptyState');
  var clearButton = document.getElementById('clearResearchFilters');

  function normalise(value) {
    return (value || '').toLowerCase().trim();
  }

  function updateSummary(visibleCount) {
    if (!summary) return;
    summary.textContent = visibleCount + (visibleCount === 1 ? ' item shown' : ' items shown');
    if (emptyState) emptyState.hidden = visibleCount !== 0;
  }

  function applyFilters() {
    var query = searchInput ? normalise(searchInput.value) : '';
    var visibleCount = 0;

    cards.forEach(function (card) {
      var text = normalise(card.textContent);
      var kwAttr = normalise(card.getAttribute('data-keywords'));
      var kwArr = kwAttr.split('|').map(function (value) { return value.trim(); }).filter(Boolean);
      var focusAttr = card.getAttribute('data-focus') || '';
      var focusArr = focusAttr.split('|').map(function (value) { return value.trim(); }).filter(Boolean);
      var startYr = parseInt(card.getAttribute('data-start-year') || '0', 10);
      var endYr = parseInt(card.getAttribute('data-end-year') || '9999', 10);
      var selectedYr = parseInt(activeYear, 10);

      var matchesText = !query || text.indexOf(query) >= 0;
      var matchesFocus = activeFocus === '__all__' || focusArr.indexOf(activeFocus) >= 0;
      var matchesKw = activeKw === '__all__' || kwArr.indexOf(activeKw) >= 0;
      var matchesYear = activeYear === '__all__' || (selectedYr >= startYr && selectedYr <= endYr);
      var show = matchesText && matchesFocus && matchesKw && matchesYear;

      card.style.display = show ? '' : 'none';
      if (show) visibleCount += 1;
    });

    updateSummary(visibleCount);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);

  function closeDropdowns() {
    document.querySelectorAll('.research-dropdown-menu').forEach(function (menu) { menu.classList.remove('open'); });
    document.querySelectorAll('.research-dropdown-btn').forEach(function (button) { button.setAttribute('aria-expanded', 'false'); });
  }

  function setupDropdown(btnId, menuId, onSelect) {
    var btn = document.getElementById(btnId);
    var menu = document.getElementById(menuId);
    if (!btn || !menu) return;

    btn.addEventListener('click', function (event) {
      event.stopPropagation();
      var isOpen = menu.classList.contains('open');
      closeDropdowns();
      if (!isOpen) {
        menu.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    menu.querySelectorAll('.research-dropdown-item').forEach(function (item) {
      item.addEventListener('click', function () {
        menu.querySelectorAll('.research-dropdown-item').forEach(function (option) { option.classList.remove('selected'); });
        item.classList.add('selected');
        closeDropdowns();
        onSelect(item, btn);
        applyFilters();
      });
    });
  }

  setupDropdown('focusDropdownBtn', 'focusDropdownMenu', function (item, btn) {
    activeFocus = item.getAttribute('data-focus');
    document.getElementById('focusLabel').textContent = activeFocus === '__all__' ? 'Focus' : item.textContent.trim();
    btn.classList.toggle('active', activeFocus !== '__all__');
  });

  setupDropdown('kwDropdownBtn', 'kwDropdownMenu', function (item, btn) {
    activeKw = item.getAttribute('data-kw');
    document.getElementById('kwLabel').textContent = activeKw === '__all__' ? 'Method / keyword' : item.textContent.trim();
    btn.classList.toggle('active', activeKw !== '__all__');
  });

  setupDropdown('yearDropdownBtn', 'yearDropdownMenu', function (item, btn) {
    activeYear = item.getAttribute('data-year');
    document.getElementById('yearLabel').textContent = activeYear === '__all__' ? 'Year' : item.textContent.trim();
    btn.classList.toggle('active', activeYear !== '__all__');
  });

  if (clearButton) {
    clearButton.addEventListener('click', function () {
      activeFocus = '__all__';
      activeKw = '__all__';
      activeYear = '__all__';
      if (searchInput) searchInput.value = '';

      document.querySelectorAll('.research-dropdown-item').forEach(function (item) { item.classList.remove('selected'); });
      document.querySelectorAll('[data-focus="__all__"], [data-kw="__all__"], [data-year="__all__"]').forEach(function (item) { item.classList.add('selected'); });
      document.querySelectorAll('.research-dropdown-btn').forEach(function (button) { button.classList.remove('active'); });

      document.getElementById('focusLabel').textContent = 'Focus';
      document.getElementById('kwLabel').textContent = 'Method / keyword';
      document.getElementById('yearLabel').textContent = 'Year';
      applyFilters();
    });
  }

  document.addEventListener('click', closeDropdowns);
  applyFilters();
})();
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script>
(function () {
  var PDFJS = window['pdfjs-dist/build/pdf'];
  if (!PDFJS) return;
  PDFJS.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  document.querySelectorAll('canvas.research-card-pdf[data-pdf]').forEach(function (canvas) {
    var url = canvas.getAttribute('data-pdf');
    var dpr = window.devicePixelRatio || 1;

    PDFJS.getDocument(url).promise.then(function (pdf) {
      return pdf.getPage(1);
    }).then(function (page) {
      var container = canvas.parentElement;
      var width = container.offsetWidth || 360;
      var height = container.offsetHeight || 220;
      var viewport = page.getViewport({ scale: 1 });
      var scale = Math.max(width / viewport.width, height / viewport.height) * dpr;
      var scaled = page.getViewport({ scale: scale });
      canvas.width = scaled.width;
      canvas.height = scaled.height;
      canvas.style.width = (scaled.width / dpr) + 'px';
      canvas.style.height = (scaled.height / dpr) + 'px';
      page.render({ canvasContext: canvas.getContext('2d'), viewport: scaled });
    }).catch(function () {});
  });
})();
</script>
