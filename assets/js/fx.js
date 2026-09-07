/*
 * Ambient motion layer.
 *  - hero canvas: a slow "telemetry field" — fine grid, drifting nodes joined
 *    by faint edges, and two low-opacity waveforms (voltage / current traces)
 *    sweeping across. Reacts gently to the pointer.
 *  - reading progress hairline at the top of the page.
 *  - count-up on impact-factor figures when they enter the viewport.
 * Everything is disabled when the visitor prefers reduced motion.
 */
(function () {
	"use strict";

	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---------------- reading progress ---------------- */
	var bar = document.createElement("div");
	bar.className = "read-progress";
	document.body.appendChild(bar);
	function updateProgress() {
		var max = document.documentElement.scrollHeight - window.innerHeight;
		var ratio = max > 0 ? window.scrollY / max : 0;
		bar.style.transform = "scaleX(" + Math.min(1, Math.max(0, ratio)) + ")";
	}
	window.addEventListener("scroll", updateProgress, { passive: true });
	window.addEventListener("resize", updateProgress);
	updateProgress();

	/* ---------------- count-up numbers ---------------- */
	function countUp(el) {
		var target = parseFloat(el.textContent);
		if (isNaN(target) || reduce) { return; }
		var decimals = (el.textContent.split(".")[1] || "").length;
		var start = null, duration = 900;
		function step(ts) {
			if (!start) { start = ts; }
			var p = Math.min(1, (ts - start) / duration);
			var eased = 1 - Math.pow(1 - p, 3);
			el.textContent = (target * eased).toFixed(decimals);
			if (p < 1) { requestAnimationFrame(step); }
		}
		requestAnimationFrame(step);
	}
	if ("IntersectionObserver" in window) {
		var seen = new WeakSet();
		var numObserver = new IntersectionObserver(function (entries) {
			entries.forEach(function (e) {
				if (e.isIntersecting && !seen.has(e.target)) {
					seen.add(e.target);
					countUp(e.target);
				}
			});
		}, { threshold: 0.4 });
		function observeNumbers() {
			document.querySelectorAll(".journal-jif, .journal-summary-value, .publication-jif, .metric-badge strong").forEach(function (el) {
				numObserver.observe(el);
			});
		}
		observeNumbers();
		// Re-scan when the publication list or language re-renders.
		var mo = new MutationObserver(observeNumbers);
		["publication-list", "journal-metrics", "journal-summary", "featured-paper"].forEach(function (id) {
			var node = document.getElementById(id);
			if (node) { mo.observe(node, { childList: true }); }
		});
	}

	/* ---------------- decoding labels ---------------- */
	var GLYPHS = "01<>[]{}/\\|=+-*#%&$@";
	function decode(el, delay) {
		if (reduce || !el || el.dataset.decoded) { return; }
		el.dataset.decoded = "1";
		var text = el.textContent;
		var spans = [];
		el.textContent = "";
		el.classList.add("decode");
		for (var i = 0; i < text.length; i++) {
			var g = document.createElement("span");
			g.className = "glyph";
			g.textContent = text[i] === " " ? "\u00a0" : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
			spans.push(g); el.appendChild(g);
		}
		var start = null, per = 26;
		function tick(ts) {
			if (!start) { start = ts; }
			var elapsed = ts - start - (delay || 0);
			var done = true;
			for (var k = 0; k < spans.length; k++) {
				if (text[k] === " ") { spans[k].textContent = "\u00a0"; spans[k].classList.add("is-set"); continue; }
				if (elapsed > k * per + 180) { spans[k].textContent = text[k]; spans[k].classList.add("is-set"); }
				else { done = false; if (Math.random() < 0.3) { spans[k].textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]; } }
			}
			if (!done) { requestAnimationFrame(tick); }
		}
		requestAnimationFrame(tick);
	}
	function decodeHero() {
		var eyebrow = document.querySelector(".hero-intro > .eyebrow");
		var meta = document.querySelectorAll(".hero-meta li");
		decode(eyebrow, 0);
		meta.forEach(function (li, i) { decode(li, 300 + i * 120); });
	}
	decodeHero();
	document.getElementById("lang-toggle") && document.getElementById("lang-toggle").addEventListener("click", function () {
		// main.js rewrites the text on toggle; decode again on the next frame
		requestAnimationFrame(function () {
			document.querySelectorAll("[data-decoded]").forEach(function (n) { delete n.dataset.decoded; });
			decodeHero();
		});
	});

	/* ---------------- hero canvas ---------------- */
	var hero = document.querySelector(".hero");
	if (!hero || reduce) { return; }

	var canvas = document.createElement("canvas");
	canvas.className = "hero-field";
	canvas.setAttribute("aria-hidden", "true");
	hero.prepend(canvas);
	var ctx = canvas.getContext("2d");

	var W = 0, H = 0, DPR = Math.min(2, window.devicePixelRatio || 1);
	var nodes = [], N = 46;
	var pointer = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 };
	var running = true, t0 = performance.now();

	function accent(alpha) { return "rgba(255, 107, 115, " + alpha + ")"; }
	function ink(alpha) { return "rgba(236, 235, 230, " + alpha + ")"; }
	function cool(alpha) { return "rgba(120, 170, 255, " + alpha + ")"; }

	function resize() {
		var r = canvas.getBoundingClientRect();
		W = Math.max(1, r.width); H = Math.max(1, r.height);
		canvas.width = W * DPR; canvas.height = H * DPR;
		canvas.style.width = W + "px"; canvas.style.height = H + "px";
		ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
		if (!nodes.length) {
			for (var i = 0; i < N; i++) {
				nodes.push({
					x: Math.random() * W, y: Math.random() * H,
					vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12,
					r: 1 + Math.random() * 1.4,
					phase: Math.random() * Math.PI * 2
				});
			}
		}
	}

	function drawGrid() {
		var step = 48;
		ctx.lineWidth = 1;
		ctx.strokeStyle = ink(0.045);
		ctx.beginPath();
		for (var x = 0.5; x < W; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
		for (var y = 0.5; y < H; y += step) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
		ctx.stroke();
	}

	function drawWave(time, yBase, amp, freq, speed, alpha, dashed) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = accent(alpha);
		if (dashed) { ctx.setLineDash([3, 6]); } else { ctx.setLineDash([]); }
		for (var x = 0; x <= W; x += 3) {
			var k = x / W;
			// a charging-curve envelope: rises, plateaus, tapers — modulated by a slow ripple
			var envelope = Math.min(1, k * 2.6) * (1 - Math.pow(Math.max(0, k - 0.7) / 0.3, 2));
			var y = yBase - envelope * amp + Math.sin(k * freq + time * speed) * 6 + Math.sin(k * freq * 3.1 - time * speed * 1.7) * 2;
			if (x === 0) { ctx.moveTo(x, y); } else { ctx.lineTo(x, y); }
		}
		ctx.stroke();
		ctx.setLineDash([]);
	}

	function frame(now) {
		if (!running) { return; }
		var time = (now - t0) / 1000;
		ctx.clearRect(0, 0, W, H);
		drawGrid();
		ctx.shadowBlur = 12; ctx.shadowColor = accent(0.6);
		drawWave(time, H * 0.78, H * 0.42, 5.5, 0.35, 0.42, false);
		ctx.shadowBlur = 0;
		drawWave(time + 4, H * 0.86, H * 0.36, 7.2, 0.28, 0.18, true);

		pointer.x += (pointer.tx - pointer.x) * 0.06;
		pointer.y += (pointer.ty - pointer.y) * 0.06;

		var i, j, a, b, dx, dy, d;
		for (i = 0; i < nodes.length; i++) {
			a = nodes[i];
			a.x += a.vx; a.y += a.vy;
			// gentle attraction toward the pointer
			dx = pointer.x - a.x; dy = pointer.y - a.y; d = Math.sqrt(dx * dx + dy * dy);
			if (d < 220) { a.x += dx / d * 0.25 * (1 - d / 220); a.y += dy / d * 0.25 * (1 - d / 220); }
			if (a.x < -20) { a.x = W + 20; } if (a.x > W + 20) { a.x = -20; }
			if (a.y < -20) { a.y = H + 20; } if (a.y > H + 20) { a.y = -20; }
		}

		ctx.lineWidth = 1;
		for (i = 0; i < nodes.length; i++) {
			for (j = i + 1; j < nodes.length; j++) {
				a = nodes[i]; b = nodes[j];
				dx = a.x - b.x; dy = a.y - b.y; d = dx * dx + dy * dy;
				if (d < 150 * 150) {
					var s = 1 - Math.sqrt(d) / 150;
					ctx.strokeStyle = ink(0.16 * s);
					ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
					// travelling pulse along a few edges
					if ((i + j) % 9 === 0) {
						var p = (time * 0.35 + a.phase) % 1;
						ctx.fillStyle = accent(0.9 * s); ctx.shadowBlur = 8; ctx.shadowColor = accent(0.9);
						ctx.beginPath(); ctx.arc(a.x + (b.x - a.x) * p, a.y + (b.y - a.y) * p, 1.6, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
					}
				}
			}
		}
		for (i = 0; i < nodes.length; i++) {
			a = nodes[i];
			var pulse = 0.5 + 0.5 * Math.sin(time * 1.2 + a.phase);
			ctx.fillStyle = ink(0.35 + 0.4 * pulse);
			ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
		}
		// scanning hairline
		var sx = ((time * 40) % (W + 200)) - 100;
		var g = ctx.createLinearGradient(sx - 60, 0, sx + 60, 0);
		g.addColorStop(0, cool(0)); g.addColorStop(0.5, cool(0.12)); g.addColorStop(1, cool(0));
		ctx.fillStyle = g; ctx.fillRect(sx - 60, 0, 120, H);

		requestAnimationFrame(frame);
	}

	var halo = document.createElement("div");
	halo.className = "hero-halo";
	hero.prepend(halo);
	hero.addEventListener("pointermove", function (e) {
		var r = canvas.getBoundingClientRect();
		pointer.tx = e.clientX - r.left; pointer.ty = e.clientY - r.top;
		var hr = hero.getBoundingClientRect();
		halo.style.left = (e.clientX - hr.left) + "px";
		halo.style.top = (e.clientY - hr.top) + "px";
	});
	hero.addEventListener("pointerleave", function () { pointer.tx = -1e4; pointer.ty = -1e4; });

	// Pause when the hero is off-screen or the tab is hidden.
	if ("IntersectionObserver" in window) {
		new IntersectionObserver(function (entries) {
			var visible = entries[0].isIntersecting && !document.hidden;
			if (visible && !running) { running = true; requestAnimationFrame(frame); }
			if (!visible) { running = false; }
		}).observe(hero);
	}
	document.addEventListener("visibilitychange", function () {
		if (document.hidden) { running = false; }
		else if (!running) { running = true; requestAnimationFrame(frame); }
	});

	window.addEventListener("resize", resize);
	resize();
	requestAnimationFrame(frame);
})();
