(function () {
	"use strict";

	var data = window.SITE_DATA;

	if (!data) {
		throw new Error("SITE_DATA is unavailable. Check assets/js/site-data.js.");
	}

	var typeLabels = {
		journal: "Journal article",
		conference: "Conference paper",
		preprint: "Preprint"
	};

	function escapeHTML(value) {
		return String(value)
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	}

	function formatAuthors(value) {
		return escapeHTML(value).replace(/Zhen Wang/g, "<strong>Zhen Wang</strong>");
	}

	function byOrder(a, b) {
		return a.order - b.order;
	}

	function getMetric(publication) {
		return data.journalMetrics[publication.venue] || null;
	}

	function metricReleaseLabel(metric) {
		return metric.releaseYear
			? metric.jifYear + " JIF · released " + metric.releaseYear
			: metric.jifYear + " JIF";
	}

	function journalSummary() {
		var journalPublications = data.publications.filter(function (publication) {
			return publication.type === "journal" && getMetric(publication);
		});
		var total = journalPublications.reduce(function (sum, publication) {
			return sum + Number(getMetric(publication).impactFactor);
		}, 0);

		return {
			count: journalPublications.length,
			total: total.toFixed(1)
		};
	}

	function publicationById(id) {
		return data.publications.find(function (publication) {
			return publication.id === id;
		});
	}

	function paperLink(publication, compact) {
		var label = publication.type === "preprint" ? "View preprint" : "View paper";
		var className = compact ? "paper-link" : "button button-primary";
		return (
			'<a class="' + className + '" href="' + escapeHTML(publication.url) + '" target="_blank" rel="noopener">' +
				'<span class="fas fa-external-link-alt" aria-hidden="true"></span>' +
				escapeHTML(label) +
			"</a>"
		);
	}

	function renderResearchAreas() {
		var container = document.getElementById("research-areas");
		container.innerHTML = data.researchAreas.map(function (area) {
			return (
				'<article class="research-area">' +
					'<span class="research-number">' + escapeHTML(area.number) + "</span>" +
					"<h2>" + escapeHTML(area.name) + "</h2>" +
					"<p>" + escapeHTML(area.description) + "</p>" +
				"</article>"
			);
		}).join("");
	}

	function renderFeaturedPaper() {
		var container = document.getElementById("featured-paper");
		var publication = data.publications.filter(function (item) {
			return item.featured;
		}).sort(byOrder)[0];
		var metric = getMetric(publication);
		var latest = data.news[0];

		container.innerHTML =
			'<div class="featured-label-row">' +
				'<p class="eyebrow">Featured work</p>' +
				(metric
					? '<span class="metric-badge" aria-label="' + escapeHTML(metricReleaseLabel(metric)) + " " + escapeHTML(metric.impactFactor) + '"><span>' + escapeHTML(metric.jifYear) + ' JIF</span><strong>' + escapeHTML(metric.impactFactor) + "</strong></span>"
					: "") +
			"</div>" +
			"<h2><a href=\"" + escapeHTML(publication.url) + "\" target=\"_blank\" rel=\"noopener\">" + escapeHTML(publication.title) + "</a></h2>" +
			'<p class="paper-venue-line"><span>' + escapeHTML(publication.venue) + "</span><span>·</span><span>" + escapeHTML(publication.year) + "</span></p>" +
			'<a class="featured-image-link" href="' + escapeHTML(publication.url) + '" target="_blank" rel="noopener" aria-label="Open ' + escapeHTML(publication.title) + '">' +
				'<img src="' + escapeHTML(publication.image) + '" alt="' + escapeHTML(publication.imageAlt) + '" width="' + publication.width + '" height="' + publication.height + '" fetchpriority="high">' +
			"</a>" +
			'<div class="featured-footer">' +
				"<div>" +
					'<p class="featured-description">' + escapeHTML(publication.description) + "</p>" +
					'<p class="latest-marker">Online now · ' + escapeHTML(latest.label) + "</p>" +
				"</div>" +
				paperLink(publication, false) +
			"</div>";
	}

	function renderJournalSummary() {
		var container = document.getElementById("journal-summary");
		var summary = journalSummary();

		container.innerHTML =
			'<span class="journal-summary-label">Total JIF</span>' +
			'<strong class="journal-summary-value">' + escapeHTML(summary.total) + "</strong>" +
			'<span class="journal-summary-detail">' + escapeHTML(summary.count) + " journal papers · each paper counted once</span>";
		container.setAttribute(
			"aria-label",
			"Total Journal Impact Factor " + summary.total + " across " + summary.count + " journal papers, counting each paper once"
		);
	}

	function renderJournalMetrics() {
		var container = document.getElementById("journal-metrics");
		container.innerHTML = Object.keys(data.journalMetrics).map(function (journalName) {
			var metric = data.journalMetrics[journalName];
			return (
				'<a class="journal-metric" href="' + escapeHTML(metric.url) + '" target="_blank" rel="noopener" aria-label="' + escapeHTML(journalName) + ", " + escapeHTML(metricReleaseLabel(metric)) + " " + escapeHTML(metric.impactFactor) + '">' +
					"<span>" +
						'<span class="journal-name">' + escapeHTML(metric.abbreviation) + "</span>" +
						'<span class="journal-publisher">' + escapeHTML(metric.publisher) + "</span>" +
					"</span>" +
					"<span>" +
						'<strong class="journal-jif">' + escapeHTML(metric.impactFactor) + "</strong>" +
						'<span class="journal-year">' + escapeHTML(metricReleaseLabel(metric)) + "</span>" +
					"</span>" +
				"</a>"
			);
		}).join("");
	}

	function publicationVenue(publication) {
		var metric = getMetric(publication);

		if (metric) {
			var releaseLine = metric.releaseYear
				? "<br>Released " + escapeHTML(metric.releaseYear)
				: "";
			return (
				'<aside class="publication-venue" aria-label="Journal and impact factor">' +
					'<span class="publication-venue-name">' + escapeHTML(publication.venue) + "</span>" +
					'<span class="publication-year">' + escapeHTML(publication.year) + "</span>" +
					'<strong class="publication-jif">' + escapeHTML(metric.impactFactor) + "</strong>" +
					'<span class="publication-jif-label">' + escapeHTML(metric.jifYear) + " JIF" + releaseLine + "</span>" +
				"</aside>"
			);
		}

		return (
			'<aside class="publication-venue" aria-label="Publication type">' +
				'<span class="publication-venue-name">' + escapeHTML(publication.venue) + "</span>" +
				'<span class="publication-year">' + escapeHTML(publication.year) + "</span>" +
				'<span class="publication-type-label">' + escapeHTML(typeLabels[publication.type]) + "</span>" +
			"</aside>"
		);
	}

	function publicationCard(publication, index) {
		var codeLink = publication.codeUrl
			? '<a class="paper-link" href="' + escapeHTML(publication.codeUrl) + '" target="_blank" rel="noopener"><span class="fas fa-code" aria-hidden="true"></span>Code</a>'
			: "";

		return (
			'<article class="publication-item reveal" data-type="' + escapeHTML(publication.type) + '">' +
				'<span class="publication-index">' + String(index + 1).padStart(2, "0") + "</span>" +
				'<a class="publication-figure" href="' + escapeHTML(publication.url) + '" target="_blank" rel="noopener" aria-label="Open ' + escapeHTML(publication.title) + '">' +
					'<img src="' + escapeHTML(publication.image) + '" alt="' + escapeHTML(publication.imageAlt) + '" width="' + publication.width + '" height="' + publication.height + '" loading="lazy">' +
				"</a>" +
				'<div class="publication-copy">' +
					"<h3><a href=\"" + escapeHTML(publication.url) + "\" target=\"_blank\" rel=\"noopener\">" + escapeHTML(publication.title) + "</a></h3>" +
					'<p class="publication-description">' + escapeHTML(publication.description) + "</p>" +
					'<p class="publication-authors">' + formatAuthors(publication.authors) + "</p>" +
					'<div class="publication-links">' + paperLink(publication, true) + codeLink + "</div>" +
				"</div>" +
				publicationVenue(publication) +
			"</article>"
		);
	}

	function renderPublications(filter) {
		var container = document.getElementById("publication-list");
		var publications = data.publications.slice().sort(byOrder).filter(function (publication) {
			return filter === "all" || publication.type === filter;
		});

		if (!publications.length) {
			container.innerHTML = '<p class="empty-state">No publications in this category yet.</p>';
			return;
		}

		container.innerHTML = publications.map(publicationCard).join("");
		revealElements(container.querySelectorAll(".reveal"));
	}

	function renderNews() {
		var container = document.getElementById("news-list");
		container.innerHTML = data.news.map(function (news, index) {
			var publication = news.publicationId ? publicationById(news.publicationId) : null;
			var link = publication
				? '<a href="' + escapeHTML(publication.url) + '" target="_blank" rel="noopener">Read paper</a>'
				: "<span></span>";
			var extraClass = index >= 4 ? " is-extra" : "";

			return (
				'<article class="news-item' + extraClass + '">' +
					'<time datetime="' + escapeHTML(news.date) + '">' + escapeHTML(news.label) + "</time>" +
					"<p>" + escapeHTML(news.text) + "</p>" +
					link +
				"</article>"
			);
		}).join("");
	}

	function setupFilters() {
		var buttons = document.querySelectorAll(".filter-button");

		buttons.forEach(function (button) {
			button.addEventListener("click", function () {
				buttons.forEach(function (item) {
					var active = item === button;
					item.classList.toggle("is-active", active);
					item.setAttribute("aria-pressed", String(active));
				});
				renderPublications(button.dataset.filter);
			});
		});
	}

	function setupNewsToggle() {
		var button = document.getElementById("news-toggle");
		var list = document.getElementById("news-list");

		if (data.news.length <= 4) {
			button.hidden = true;
			return;
		}

		button.addEventListener("click", function () {
			var expanded = button.getAttribute("aria-expanded") === "true";
			button.setAttribute("aria-expanded", String(!expanded));
			button.textContent = expanded ? "Show all updates" : "Show fewer updates";
			list.classList.toggle("is-expanded", !expanded);
		});
	}

	function setupNavigation() {
		var header = document.querySelector(".site-header");
		var toggle = document.querySelector(".nav-toggle");
		var nav = document.getElementById("primary-nav");
		var toggleIcon = toggle.querySelector(".fas");
		var toggleLabel = toggle.querySelector(".sr-only");
		var links = nav.querySelectorAll("a");

		function closeNavigation() {
			toggle.setAttribute("aria-expanded", "false");
			nav.classList.remove("is-open");
			document.body.classList.remove("nav-open");
			toggleIcon.className = "fas fa-bars";
			toggleLabel.textContent = "Open navigation";
		}

		toggle.addEventListener("click", function () {
			var open = toggle.getAttribute("aria-expanded") === "true";
			toggle.setAttribute("aria-expanded", String(!open));
			nav.classList.toggle("is-open", !open);
			document.body.classList.toggle("nav-open", !open);
			toggleIcon.className = open ? "fas fa-bars" : "fas fa-times";
			toggleLabel.textContent = open ? "Open navigation" : "Close navigation";
		});

		links.forEach(function (link) {
			link.addEventListener("click", closeNavigation);
		});

		window.addEventListener("scroll", function () {
			header.classList.toggle("is-scrolled", window.scrollY > 24);
		}, { passive: true });

		var sections = Array.from(links).map(function (link) {
			return document.querySelector(link.getAttribute("href"));
		}).filter(Boolean);

		if ("IntersectionObserver" in window) {
			var navigationObserver = new IntersectionObserver(function (entries) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) {
						return;
					}

					links.forEach(function (link) {
						link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
					});
				});
			}, {
				rootMargin: "-25% 0px -65% 0px",
				threshold: 0
			});

			sections.forEach(function (section) {
				navigationObserver.observe(section);
			});
		}
	}

	function revealElements(elements) {
		if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			elements.forEach(function (element) {
				element.classList.add("is-visible");
			});
			return;
		}

		var revealObserver = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		}, {
			rootMargin: "0px 0px -8% 0px",
			threshold: 0.08
		});

		elements.forEach(function (element) {
			revealObserver.observe(element);
		});
	}

	function setFooterMetadata() {
		document.getElementById("current-year").textContent = new Date().getFullYear();
		var updated = new Date(data.lastUpdated + "T00:00:00");
		var formatted = updated.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric"
		});
		document.getElementById("content-updated").textContent = "Content updated " + formatted;
	}

	renderResearchAreas();
	renderFeaturedPaper();
	renderJournalSummary();
	renderJournalMetrics();
	renderPublications("all");
	renderNews();
	setupFilters();
	setupNewsToggle();
	setupNavigation();
	setFooterMetadata();
	revealElements(document.querySelectorAll(".reveal:not(.publication-item)"));
})();
