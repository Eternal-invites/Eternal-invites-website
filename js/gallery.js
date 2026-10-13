/* ==========================================================================
   Eternal Invites — GALLERY SCRIPT
   Type / occasion / style filters + live search, working together without
   page reloads. Supports deep links, e.g. gallery.html?type=physical
   or gallery.html?occasion=wedding.
   ========================================================================== */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        var grid = document.getElementById("galleryGrid");
        if (!grid) return;

        var countEl = document.getElementById("galleryCount");
        var emptyEl = document.getElementById("galleryEmpty");
        var searchEl = document.getElementById("gallerySearch");
        var resetBtn = document.getElementById("galleryReset");

        var state = { type: "all", occasion: "all", style: "all", query: "" };

        /* Deep-link support: ?type=physical&occasion=wedding&style=Floral */
        var params = new URLSearchParams(location.search);
        if (params.get("type")) state.type = params.get("type");
        if (params.get("occasion")) state.occasion = params.get("occasion");
        if (params.get("style")) state.style = params.get("style").toLowerCase();

        /* Activate chips to match deep link */
        document.querySelectorAll(".filter-chips .chip").forEach(function (chip) {
            var f = chip.dataset.filter, v = chip.dataset.value;
            chip.classList.toggle("is-active", state[f] === v);
        });

        /* Chip clicks */
        document.querySelectorAll(".filter-chips").forEach(function (wrap) {
            wrap.addEventListener("click", function (e) {
                var chip = e.target.closest(".chip");
                if (!chip) return;
                wrap.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("is-active"); });
                chip.classList.add("is-active");
                state[chip.dataset.filter] = chip.dataset.value;
                apply();
            });
        });

        /* Search */
        searchEl.addEventListener("input", function () {
            state.query = searchEl.value.trim().toLowerCase();
            apply();
        });

        /* Reset */
        resetBtn.addEventListener("click", function () {
            state = { type: "all", occasion: "all", style: "all", query: "" };
            searchEl.value = "";
            document.querySelectorAll(".filter-chips").forEach(function (wrap) {
                wrap.querySelectorAll(".chip").forEach(function (c) {
                    c.classList.toggle("is-active", c.dataset.value === "all");
                });
            });
            apply();
        });

        function matches(d) {
            if (state.type !== "all" && d.type !== state.type) return false;
            if (state.occasion !== "all" && d.occasion !== state.occasion) return false;
            if (state.style !== "all" &&
                !d.styles.some(function (s) { return s.toLowerCase() === state.style; })) return false;
            if (state.query) {
                var hay = (d.name + " " + d.desc + " " + d.type + " " +
                    (window.OCCASION_LABELS[d.occasion] || "") + " " +
                    d.styles.join(" ")).toLowerCase();
                if (!hay.includes(state.query)) return false;
            }
            return true;
        }

        function apply() {
            var results = window.DESIGNS.filter(matches);
            grid.innerHTML = results.map(window.designCardHTML).join("");
            /* Cards render visible immediately (no scroll delay inside a filtered list) */
            grid.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
            emptyEl.classList.toggle("hidden", results.length > 0);
            grid.classList.toggle("hidden", results.length === 0);
            countEl.textContent = results.length + (results.length === 1 ? " design" : " designs");
            if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
        }

        apply();
    });
})();
