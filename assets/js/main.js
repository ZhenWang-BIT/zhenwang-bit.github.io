(function () {
	"use strict";

	var data = window.SITE_DATA;

	if (!data) {
		throw new Error("SITE_DATA is unavailable. Check assets/js/site-data.js.");
	}

	/* ------------------------------------------------------------------
	   Language state
	   ------------------------------------------------------------------ */

	var lang = "en";

	function detectLanguage() {
		var saved = null;
		try { saved = localStorage.getItem("lang"); } catch (error) { /* private mode */ }
		if (saved === "zh" || saved === "en") {
			return saved;
		}
		return /^zh/i.test(navigator.language || "") ? "zh" : "en";
	}

	// Static UI string by key.
	function t(key) {
		var dict = data.ui[lang] || {};
		if (key in dict) {
			return dict[key];
		}
		return data.ui.en[key] || key;
	}

	// Localised field of a data record: field + "Zh" when available in Chinese mode.
	function L(record, field) {
		if (lang === "zh" && record[field + "Zh"] != null) {
			return record[field + "Zh"];
		}
		return record[field];
	}

	function escapeHTML(value) {
		return String(value)
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	}

	function formatAuthors(value) {
		return escapeHTML(value).replace(/Zhen Wang\*?/g, function (match) {
			return "<strong>" + match + "</strong>";
		});
	}

	function byOrder(a, b) {
		return a.order - b.order;
	}

	function getMetric(publication) {
		return data.journalMetrics[publication.venue] || null;
	}

	function metricReleaseLabel(metric) {
		return metric.releaseYear
			? metric.jifYear + " " + t("jif.badge") + " · " + t("strip.released") + " " + metric.releaseYear
			: metric.jifYear + " " + t("jif.badge");
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
		var label = publication.type === "preprint" ? t("pub.viewPreprint") : t("pub.viewPaper");
		var className = compact ? "paper-link" : "button button-primary";
		return (
			'<a class="' + className + '" href="' + escapeHTML(publication.url) + '" target="_blank" rel="noopener">' +
				'<span class="fas fa-external-link-alt" aria-hidden="true"></span>' +
				escapeHTML(label) +
			"</a>"
		);
	}

	/* ------------------------------------------------------------------
	   Static text
	   ------------------------------------------------------------------ */

	function renderStaticText() {
		document.querySelectorAll("[data-i18n]").forEach(function (element) {
			element.innerHTML = t(element.getAttribute("data-i18n"));
		});

		document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
		document.documentElement.setAttribute("data-lang", lang);
		document.title = lang === "zh" ? "王震 | 电池智能研究者" : "Zhen Wang | Battery Intelligence Researcher";

		var toggle = document.getElementById("lang-toggle");
		if (toggle) {
			toggle.setAttribute("aria-label", t("lang.switchAria"));
		}

		var newsToggle = document.getElementById("news-toggle");
		if (newsToggle) {
			var expanded = newsToggle.getAttribute("aria-expanded") === "true";
			newsToggle.textContent = expanded ? t("news.showFewer") : t("news.showAll");
		}
	}

	/* ------------------------------------------------------------------
	   Sections
	   ------------------------------------------------------------------ */

	function renderResearchAreas() {
		var container = document.getElementById("research-areas");
		container.innerHTML = data.researchAreas.map(function (area) {
			return (
				'<article class="research-area">' +
					'<span class="research-number">' + escapeHTML(area.number) + "</span>" +
					"<h2>" + escapeHTML(L(area, "name")) + "</h2>" +
					"<p>" + escapeHTML(L(area, "description")) + "</p>" +
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
		var latest = data.news.find(function (item) {
			return item.publicationId === publication.id;
		}) || data.news[0];

		container.innerHTML =
			'<span class="hud-corner" aria-hidden="true"></span>' +
			'<div class="featured-label-row">' +
				'<p class="eyebrow">' + escapeHTML(t("featured.eyebrow")) + "</p>" +
				(metric
					? '<span class="metric-badge" aria-label="' + escapeHTML(metricReleaseLabel(metric)) + " " + escapeHTML(metric.impactFactor) + '"><span>' + escapeHTML(metric.jifYear) + " " + escapeHTML(t("jif.badge")) + "</span><strong>" + escapeHTML(metric.impactFactor) + "</strong></span>"
					: "") +
			"</div>" +
			"<h2><a href=\"" + escapeHTML(publication.url) + "\" target=\"_blank\" rel=\"noopener\">" + escapeHTML(publication.title) + "</a></h2>" +
			'<p class="paper-venue-line"><span>' + escapeHTML(publication.venue) + "</span><span>·</span><span>" + escapeHTML(publication.year) + "</span></p>" +
			'<a class="featured-image-link" href="' + escapeHTML(publication.url) + '" target="_blank" rel="noopener" aria-label="Open ' + escapeHTML(publication.title) + '">' +
				'<img src="' + escapeHTML(publication.image) + '" alt="' + escapeHTML(publication.imageAlt) + '" width="' + publication.width + '" height="' + publication.height + '" fetchpriority="high">' +
			"</a>" +
			'<div class="featured-footer">' +
				"<div>" +
					'<p class="featured-description">' + escapeHTML(L(publication, "description")) + "</p>" +
					'<p class="latest-marker">' + escapeHTML(t("featured.online")) + " · " + escapeHTML(L(latest, "label")) + "</p>" +
				"</div>" +
				paperLink(publication, false) +
			"</div>";
	}

	function renderJournalSummary() {
		var container = document.getElementById("journal-summary");
		var summary = journalSummary();

		container.innerHTML =
			'<span class="journal-summary-label">' + escapeHTML(t("strip.total")) + "</span>" +
			'<strong class="journal-summary-value">' + escapeHTML(summary.total) + "</strong>" +
			'<span class="journal-summary-detail">' + escapeHTML(summary.count) + " " + escapeHTML(t("strip.detail")) + "</span>";
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
		var volume = publication.volume
			? '<span class="publication-volume">' + escapeHTML(publication.volume) + "</span>"
			: "";

		if (metric) {
			var releaseLine = metric.releaseYear
				? '<span class="jif-release">' + escapeHTML(t("pub.released")) + " " + escapeHTML(metric.releaseYear) + "</span>"
				: "";
			return (
				'<aside class="publication-venue" aria-label="Journal and impact factor">' +
					'<span class="publication-venue-name">' + escapeHTML(publication.venue) + "</span>" +
					'<span class="publication-year">' + escapeHTML(publication.year) + "</span>" +
					volume +
					'<strong class="publication-jif">' + escapeHTML(metric.impactFactor) + "</strong>" +
					'<span class="publication-jif-label">' + escapeHTML(metric.jifYear) + " " + escapeHTML(t("jif.badge")) + releaseLine + "</span>" +
				"</aside>"
			);
		}

		return (
			'<aside class="publication-venue" aria-label="Publication type">' +
				'<span class="publication-venue-name">' + escapeHTML(publication.venue) + "</span>" +
				'<span class="publication-year">' + escapeHTML(publication.year) + "</span>" +
				'<span class="publication-type-label">' + escapeHTML(t("type." + publication.type)) + "</span>" +
			"</aside>"
		);
	}

	function publicationCard(publication, index) {
		var codeLink = publication.codeUrl
			? '<a class="paper-link" href="' + escapeHTML(publication.codeUrl) + '" target="_blank" rel="noopener"><span class="fas fa-code" aria-hidden="true"></span>' + escapeHTML(t("pub.code")) + "</a>"
			: "";
		var doiLink = publication.doi
			? '<a class="paper-link" href="https://doi.org/' + escapeHTML(publication.doi) + '" target="_blank" rel="noopener"><span class="fas fa-link" aria-hidden="true"></span>DOI</a>'
			: "";

		return (
			'<article class="publication-item reveal" data-type="' + escapeHTML(publication.type) + '" style="--i:' + index + '">' +
				'<span class="publication-index">' + String(index + 1).padStart(2, "0") + "</span>" +
				'<a class="publication-figure" href="' + escapeHTML(publication.url) + '" target="_blank" rel="noopener" aria-label="Open ' + escapeHTML(publication.title) + '">' +
					'<img src="' + escapeHTML(publication.image) + '" alt="' + escapeHTML(publication.imageAlt) + '" width="' + publication.width + '" height="' + publication.height + '" loading="lazy">' +
				"</a>" +
				'<div class="publication-copy">' +
					"<h3><a href=\"" + escapeHTML(publication.url) + "\" target=\"_blank\" rel=\"noopener\">" + escapeHTML(publication.title) + "</a></h3>" +
					'<p class="publication-description">' + escapeHTML(L(publication, "description")) + "</p>" +
					'<p class="publication-authors">' + formatAuthors(publication.authors) + "</p>" +
					'<div class="publication-links">' + paperLink(publication, true) + doiLink + codeLink + "</div>" +
				"</div>" +
				publicationVenue(publication) +
			"</article>"
		);
	}

	var currentFilter = "all";

	function renderPublications(filter) {
		currentFilter = filter || currentFilter;
		var container = document.getElementById("publication-list");
		var publications = data.publications.slice().sort(byOrder).filter(function (publication) {
			return currentFilter === "all" || publication.type === currentFilter;
		});

		if (!publications.length) {
			container.innerHTML = '<p class="empty-state">' + escapeHTML(t("pub.empty")) + "</p>";
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
				? '<a href="' + escapeHTML(publication.url) + '" target="_blank" rel="noopener">' + escapeHTML(t("news.read")) + "</a>"
				: "<span></span>";
			var extraClass = index >= 4 ? " is-extra" : "";

			return (
				'<article class="news-item' + extraClass + '">' +
					'<time datetime="' + escapeHTML(news.date) + '">' + escapeHTML(L(news, "label")) + "</time>" +
					"<p>" + escapeHTML(L(news, "text")) + "</p>" +
					link +
				"</article>"
			);
		}).join("");
	}

	function renderExperience() {
		var container = document.getElementById("experience-list");
		if (!container || !data.experience) {
			return;
		}
		container.innerHTML = data.experience.map(function (item) {
			return (
				'<article class="experience-item">' +
					'<time datetime="' + escapeHTML(item.start) + '">' + escapeHTML(L(item, "period")) + "</time>" +
					"<div>" +
						"<strong>" + escapeHTML(L(item, "role")) + "</strong>" +
						"<span>" + escapeHTML(L(item, "organization")) + "</span>" +
						'<span class="experience-location">' + escapeHTML(L(item, "location")) + "</span>" +
					"</div>" +
				"</article>"
			);
		}).join("");
	}

	function renderAddresses() {
		var container = document.getElementById("address-list");
		if (!container || !data.addresses) {
			return;
		}
		container.innerHTML = data.addresses.map(function (item) {
			var lines = L(item, "lines");
			return "<address>" + lines.map(escapeHTML).join("<br>") + "</address>";
		}).join("");
	}

	/* ------------------------------------------------------------------
	   Interaction
	   ------------------------------------------------------------------ */

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
			button.textContent = expanded ? t("news.showAll") : t("news.showFewer");
			list.classList.toggle("is-expanded", !expanded);
		});
	}

	function setupLanguageToggle() {
		var button = document.getElementById("lang-toggle");
		if (!button) {
			return;
		}
		button.addEventListener("click", function () {
			lang = lang === "zh" ? "en" : "zh";
			try { localStorage.setItem("lang", lang); } catch (error) { /* ignore */ }
			renderAll();
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
		var formatted = updated.toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
			year: "numeric",
			month: lang === "zh" ? "long" : "short",
			day: "numeric"
		});
		document.getElementById("content-updated").textContent = t("footer.updated") + " " + formatted;
	}

	function renderAll() {
		renderStaticText();
		renderResearchAreas();
		renderFeaturedPaper();
		renderJournalSummary();
		renderJournalMetrics();
		renderPublications();
		renderNews();
		renderExperience();
		renderAddresses();
		setFooterMetadata();
	}

	lang = detectLanguage();
	renderAll();
	setupFilters();
	setupNewsToggle();
	setupLanguageToggle();
	setupNavigation();
	revealElements(document.querySelectorAll(".reveal:not(.publication-item)"));
})();
