/* ==========================================================================
   Eternal Invites — MAIN SCRIPT
   Navigation, reveal animations, shared design-card rendering, modal,
   testimonial slider and config-driven contact details.
   Loaded on every page (defer).
   ========================================================================== */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        initIcons();
        initHeader();
        initReveal();
        injectContactDetails();
        initTestimonials();
        initModal();
        renderFeaturedDesigns();
        renderPackages();
        initFaq();
    });

    /* ------------------------------------------------ Lucide icons ---- */
    function initIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    /* ------------------------------------------------ Header ---------- */
    function initHeader() {
        var header = document.getElementById("siteHeader");
        var toggle = document.getElementById("navToggle");
        var nav = document.getElementById("mainNav");

        /* Sticky shadow on scroll */
        var onScroll = function () {
            if (window.scrollY > 24) header.classList.add("is-scrolled");
            else header.classList.remove("is-scrolled");
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        /* Hamburger */
        if (toggle && nav) {
            toggle.addEventListener("click", function () {
                var open = nav.classList.toggle("is-open");
                toggle.setAttribute("aria-expanded", open ? "true" : "false");
            });
            /* Close when a link is tapped */
            nav.querySelectorAll("a").forEach(function (a) {
                a.addEventListener("click", function () {
                    nav.classList.remove("is-open");
                    toggle.setAttribute("aria-expanded", "false");
                });
            });
        }

        /* Active page indicator */
        var page = (location.pathname.split("/").pop() || "index.html").replace(".html", "") || "index";
        document.querySelectorAll(".main-nav a[data-page]").forEach(function (a) {
            if (a.getAttribute("data-page") === page) a.classList.add("is-active");
        });
    }

    /* ------------------------------------------- Scroll reveal -------- */
    function initReveal() {
        var items = document.querySelectorAll(".reveal");
        if (!items.length) return;
        if (!("IntersectionObserver" in window)) {
            items.forEach(function (el) { el.classList.add("is-visible"); });
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add("is-visible");
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });
        items.forEach(function (el) { io.observe(el); });
    }

    /* --------------------------- Config-driven contact details -------- */
    function injectContactDetails() {
        var c = window.SITE_CONFIG;
        if (!c) return;

        /* Phone — every [data-contact="phone"] */
        document.querySelectorAll('[data-contact="phone"]').forEach(function (el) {
            if (el.tagName === "A") el.href = "tel:" + c.phoneInternational;
            el.textContent = c.phone;
        });

        /* WhatsApp-style quick link uses the international number */
        document.querySelectorAll('[data-contact="phone-int"]').forEach(function (el) {
            el.href = "tel:" + c.phoneInternational;
        });

        /* Email (hidden when not configured) */
        document.querySelectorAll('[data-contact="email-wrap"]').forEach(function (el) {
            el.classList.toggle("hidden", !c.email);
        });
        document.querySelectorAll('[data-contact="email"]').forEach(function (el) {
            if (el.tagName === "A") el.href = "mailto:" + c.email;
            el.textContent = c.email;
        });

        /* Location */
        document.querySelectorAll('[data-contact="location-wrap"]').forEach(function (el) {
            el.classList.toggle("hidden", !c.location);
        });
        document.querySelectorAll('[data-contact="location"]').forEach(function (el) {
            el.textContent = c.location;
        });

        /* Social links */
        document.querySelectorAll('[data-social="tiktok"]').forEach(function (el) {
            if (!c.social.tiktok.url) { el.classList.add("hidden"); return; }
            el.href = c.social.tiktok.url;
            var u = el.querySelector("[data-username]");
            if (u) u.textContent = "@" + c.social.tiktok.username;
        });
        document.querySelectorAll('[data-social="instagram"]').forEach(function (el) {
            if (!c.social.instagram.url) { el.classList.add("hidden"); return; }
            el.href = c.social.instagram.url;
            var u = el.querySelector("[data-username]");
            if (u) u.textContent = "@" + c.social.instagram.username;
        });
        document.querySelectorAll('[data-social="telegram"]').forEach(function (el) {
            if (!c.social.telegram.url) { el.classList.add("hidden"); return; }
            el.href = c.social.telegram.url;
            var u = el.querySelector("[data-username]");
            if (u) u.textContent = "@" + c.social.telegram.username;
        });

        /* Footer year */
        document.querySelectorAll("[data-year]").forEach(function (el) {
            el.textContent = new Date().getFullYear();
        });
    }

    /* -------------------------------------- Design card renderer ------ */
    /* Used by the home "Featured Designs" grid and the gallery grid.     */
    function designCardHTML(d) {
        var orderUrl = "order.html?design=" + encodeURIComponent(d.id) +
            "&type=" + d.type + "&occasion=" + d.occasion;
        return '' +
        '<article class="design-card reveal" data-id="' + d.id + '">' +
            '<div class="design-card-media">' +
                '<img src="' + d.image + '" alt="' + escapeAttr(d.alt) + '" loading="lazy">' +
                '<div class="badge-row">' +
                    '<span class="badge badge--type">' + (d.type === "digital" ? "Digital" : "Physical") + '</span>' +
                    (d.concept
                        ? '<span class="badge badge--concept">Concept</span>'
                        : '<span class="badge badge--style">' + (d.styles[0] || "") + '</span>') +
                '</div>' +
            '</div>' +
            '<div class="design-card-body">' +
                '<h3>' + d.name + '</h3>' +
                '<p class="design-card-cat">' + (window.OCCASION_LABELS[d.occasion] || d.occasion) + '</p>' +
                '<div class="design-card-actions">' +
                    '<button class="btn btn-ghost-dark" data-view-design="' + d.id + '">View Design</button>' +
                    '<a class="btn btn-gold" href="' + orderUrl + '">' +
                        (d.type === "digital" ? "Order Similar" : "Order Similar") +
                    '</a>' +
                '</div>' +
            '</div>' +
        '</article>';
    }
    window.designCardHTML = designCardHTML;

    function escapeAttr(s) {
        return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    }
    window.escapeAttr = escapeAttr;

    /* Home featured grid */
    function renderFeaturedDesigns() {
        var grid = document.getElementById("featuredGrid");
        if (!grid) return;
        var designs = window.DESIGNS.slice();
        var initial = 8;

        function render(list) {
            grid.innerHTML = list.map(designCardHTML).join("");
            initIcons();
        }
        render(designs.slice(0, initial));

        var btn = document.getElementById("featuredLoadMore");
        if (btn) {
            if (designs.length <= initial) btn.classList.add("hidden");
            btn.addEventListener("click", function () {
                render(designs);
                grid.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
                btn.classList.add("hidden");
            });
        }
    }

    /* ------------------------------------------- Detail modal --------- */
    function initModal() {
        var overlay = document.getElementById("designModal");
        if (!overlay) return;

        var closeBtn = overlay.querySelector(".modal-close");
        function close() {
            overlay.classList.remove("is-open");
            document.body.style.overflow = "";
            document.removeEventListener("keydown", onKey);
        }
        function onKey(e) { if (e.key === "Escape") close(); }

        closeBtn.addEventListener("click", close);
        overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });

        document.addEventListener("click", function (e) {
            var btn = e.target.closest("[data-view-design]");
            if (!btn) return;
            var d = window.DESIGNS.find(function (x) { return x.id === btn.getAttribute("data-view-design"); });
            if (d) openModal(overlay, d);
        });

        function openModal(ov, d) {
            var orderUrl = "order.html?design=" + encodeURIComponent(d.id) +
                "&type=" + d.type + "&occasion=" + d.occasion;

            var pkgInfo = "";
            if (d.type === "digital") {
                pkgInfo = '<div class="modal-options"><h4>Available in packages</h4><ul>' +
                    window.SITE_CONFIG.packages.map(function (p) {
                        return "<li>" + p.name + " — " + window.formatPrice(p) + "</li>";
                    }).join("") + "</ul>" +
                    '<a class="btn btn-outline-gold btn-sm" href="order.html?type=digital&occasion=' + d.occasion + '#packages">Compare Packages</a></div>';
            } else {
                pkgInfo = '<div class="modal-options"><h4>Pricing</h4><ul><li>Request a Quote — final price is confirmed after your details are reviewed.</li></ul></div>';
            }

            var liveBtn = (d.type === "digital" && d.liveUrl)
                ? '<a class="btn btn-dark" href="' + d.liveUrl + '" target="_blank" rel="noopener">Open Live Invitation <i data-lucide="external-link"></i></a>'
                : "";

            ov.querySelector(".modal-media").innerHTML =
                '<img src="' + d.image + '" alt="' + escapeAttr(d.alt) + '">';
            ov.querySelector(".modal-body").innerHTML =
                '<h3>' + d.name + '</h3>' +
                '<p class="design-card-cat">' + (window.OCCASION_LABELS[d.occasion] || d.occasion) + '</p>' +
                '<div class="modal-meta">' +
                    '<span class="badge badge--type">' + (d.type === "digital" ? "Digital Invitation" : "Physical Card") + '</span>' +
                    d.styles.map(function (s) { return '<span class="badge badge--style">' + s + '</span>'; }).join("") +
                    (d.concept ? '<span class="badge badge--concept">Concept Sample</span>' : "") +
                '</div>' +
                '<p class="modal-desc">' + d.desc + '</p>' +
                (d.concept ? '<p class="modal-desc"><em>This is a clearly-labelled concept sample while final artwork for this occasion is being prepared.</em></p>' : "") +
                '<div class="modal-options"><h4>Customisation options</h4><ul>' +
                    '<li>Names, wording and event details</li>' +
                    '<li>Colours and typography</li>' +
                    '<li>Photos of the couple or celebrant</li>' +
                    '<li>Style adjustments to match your theme</li>' +
                '</ul></div>' +
                pkgInfo +
                '<div class="modal-actions">' +
                    '<a class="btn btn-gold" href="' + orderUrl + '">Order This Design</a>' +
                    liveBtn +
                '</div>';

            ov.classList.add("is-open");
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", onKey);
            initIcons();
        }
    }

    /* ---------------------------------------------- Packages ---------- */
    function renderPackages() {
        var grid = document.getElementById("packagesGrid");
        if (!grid) return;
        grid.innerHTML = window.SITE_CONFIG.packages.map(function (p) {
            return '' +
            '<article class="package-card' + (p.featured ? " package-card--featured" : "") + ' reveal">' +
                (p.featured ? '<span class="package-flag">Most Popular</span>' : '') +
                '<div class="package-head">' +
                    '<h3>' + p.name + '</h3>' +
                    '<div class="package-price">' + window.formatPrice(p) + '<small>per digital invitation</small></div>' +
                '</div>' +
                '<div class="package-body">' +
                    '<ul class="package-features">' +
                        p.features.map(function (f) {
                            return '<li><i data-lucide="check"></i>' + f + '</li>';
                        }).join("") +
                    '</ul>' +
                    '<a class="btn ' + (p.featured ? "btn-gold" : "btn-dark") + ' btn-block" href="order.html?type=digital&package=' + p.id + '">Choose ' +
                        p.name.replace(" Package", "") +
                    '</a>' +
                '</div>' +
            '</article>';
        }).join("");
        initIcons();
    }

    /* ------------------------------------------- Testimonials --------- */
    function initTestimonials() {
        var slider = document.getElementById("testimonialSlider");
        if (!slider) return;

        var track = slider.querySelector(".testimonial-track");
        var slides = track.children.length;
        var dotsWrap = document.getElementById("testimonialDots");
        var index = 0;
        var timer = null;

        for (var i = 0; i < slides; i++) {
            var dot = document.createElement("button");
            dot.className = "testimonial-dot" + (i === 0 ? " is-active" : "");
            dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
            dot.dataset.index = i;
            dotsWrap.appendChild(dot);
        }

        function go(n) {
            index = (n + slides) % slides;
            track.style.transform = "translateX(-" + (index * 100) + "%)";
            dotsWrap.querySelectorAll(".testimonial-dot").forEach(function (d, i) {
                d.classList.toggle("is-active", i === index);
            });
        }

        document.getElementById("tPrev").addEventListener("click", function () { go(index - 1); restart(); });
        document.getElementById("tNext").addEventListener("click", function () { go(index + 1); restart(); });
        dotsWrap.addEventListener("click", function (e) {
            var b = e.target.closest(".testimonial-dot");
            if (b) { go(parseInt(b.dataset.index, 10)); restart(); }
        });

        var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        function restart() {
            if (reduceMotion) return;
            clearInterval(timer);
            timer = setInterval(function () { go(index + 1); }, 7000);
        }
        restart();
    }

    /* -------------------------------------------------- FAQ ----------- */
    function initFaq() {
        document.querySelectorAll(".faq-item").forEach(function (item) {
            var q = item.querySelector(".faq-question");
            var a = item.querySelector(".faq-answer");
            if (!q || !a) return;
            q.addEventListener("click", function () {
                var open = item.classList.toggle("is-open");
                q.setAttribute("aria-expanded", open ? "true" : "false");
                a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
            });
        });
    }

    /* ---------------------------------------------- Toast ------------- */
    window.showToast = function (msg) {
        var t = document.createElement("div");
        t.className = "toast";
        t.textContent = msg;
        document.body.appendChild(t);
        requestAnimationFrame(function () { t.classList.add("is-visible"); });
        setTimeout(function () {
            t.classList.remove("is-visible");
            setTimeout(function () { t.remove(); }, 500);
        }, 3200);
    };
})();
