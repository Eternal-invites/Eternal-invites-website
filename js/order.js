/* ==========================================================================
   Eternal Invites — ORDER FORM SCRIPT
   Conditional physical/digital sections, package pre-selection from URL
   (?type=digital&package=premium), live order summary, validation and
   real submission through the endpoint configured in js/config.js.
   ========================================================================== */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("orderForm");
        if (!form) return;

        var cfg = window.SITE_CONFIG;

        /* ------------------------------------ Populate selects -------- */
        var occasionSelect = document.getElementById("occasion");
        cfg.occasions.forEach(function (o) {
            occasionSelect.insertAdjacentHTML("beforeend",
                '<option value="' + o.id + '">' + o.label + "</option>");
        });

        var designSelect = document.getElementById("design");

        /* Package option cards */
        var pkgWrap = document.getElementById("packageOptions");
        pkgWrap.innerHTML = cfg.packages.map(function (p) {
            return '<label class="package-option">' +
                '<input type="radio" name="package" value="' + p.id + '">' +
                '<div class="package-option-head"><strong>' + p.name + '</strong>' +
                '<span class="package-option-price">' + window.formatPrice(p) + '</span></div>' +
                '<ul class="package-option-features">' +
                p.features.map(function (f) { return "<li>" + f + "</li>"; }).join("") +
                "</ul></label>";
        }).join("");

        /* ------------------------------------ Conditional sections ----- */
        var physicalSection = document.getElementById("physicalFields");
        var digitalSection = document.getElementById("digitalFields");
        var summaryPrice = document.getElementById("sumPriceRow");

        function currentType() {
            var r = form.querySelector('input[name="invitationType"]:checked');
            return r ? r.value : "";
        }

        function refreshSections() {
            var t = currentType();
            physicalSection.classList.toggle("hidden", t !== "physical");
            digitalSection.classList.toggle("hidden", t !== "digital");
            /* Keep required attributes in sync with visibility */
            physicalSection.querySelectorAll("[data-required-when]").forEach(function (el) {
                el.required = (t === "physical");
            });
            digitalSection.querySelectorAll("[data-required-when]").forEach(function (el) {
                el.required = (t === "digital");
            });
            refreshDesignOptions();
            updateSummary();
        }

        function refreshDesignOptions() {
            var t = currentType();
            designSelect.innerHTML = '<option value="">Select a design (optional)</option>';
            window.DESIGNS.filter(function (d) { return !t || d.type === t; })
                .forEach(function (d) {
                    designSelect.insertAdjacentHTML("beforeend",
                        '<option value="' + d.id + '">' + d.name + " — " +
                        (window.OCCASION_LABELS[d.occasion] || d.occasion) + "</option>");
                });
            designSelect.insertAdjacentHTML("beforeend",
                '<option value="custom">A fully custom design / not listed</option>');
        }

        /* ------------------------------------ URL prefill -------------- */
        var params = new URLSearchParams(location.search);
        var preType = params.get("type");
        var prePkg = params.get("package");
        var preDesign = params.get("design");
        var preOccasion = params.get("occasion");

        if (preType === "digital" || preType === "physical") {
            var radio = form.querySelector('input[name="invitationType"][value="' + preType + '"]');
            if (radio) radio.checked = true;
        }
        refreshSections();

        if (preOccasion && occasionSelect.querySelector('option[value="' + preOccasion + '"]')) {
            occasionSelect.value = preOccasion;
        }
        if (preDesign && window.DESIGNS.some(function (d) { return d.id === preDesign; })) {
            designSelect.value = preDesign;
        }
        if (prePkg) {
            var pkgRadio = form.querySelector('input[name="package"][value="' + prePkg + '"]');
            if (pkgRadio) pkgRadio.checked = true;
            markPackageSelected();
        }
        updateSummary();

        /* ------------------------------------ Live UI state ------------ */
        form.addEventListener("change", function (e) {
            if (e.target.name === "invitationType") {
                form.querySelectorAll(".choice-card").forEach(function (c) {
                    c.classList.toggle("is-selected",
                        c.contains(e.target) && e.target.checked);
                });
                refreshSections();
                return;
            }
            if (e.target.name === "package") markPackageSelected();
            updateSummary();
        });
        form.addEventListener("input", updateSummary);

        /* Mark initial type card state */
        form.querySelectorAll('input[name="invitationType"]').forEach(function (r) {
            if (r.checked) r.closest(".choice-card").classList.add("is-selected");
        });

        function markPackageSelected() {
            pkgWrap.querySelectorAll(".package-option").forEach(function (card) {
                card.classList.toggle("is-selected",
                    card.querySelector("input").checked);
            });
        }

        /* ------------------------------------ Order summary ------------ */
        function label(selectEl) {
            return selectEl.selectedIndex > 0
                ? selectEl.options[selectEl.selectedIndex].textContent
                : "";
        }

        function updateSummary() {
            var t = currentType();
            setText("sumType", t ? (t === "digital" ? "Digital Invitation" : "Physical Invitation Card") : "Not selected");
            setText("sumOccasion", label(occasionSelect) || "—");
            setText("sumDesign", label(designSelect) || "—");

            var pkgId = (form.querySelector('input[name="package"]:checked') || {}).value;
            var pkg = cfg.packages.find(function (p) { return p.id === pkgId; });

            if (t === "digital" && pkg) {
                setText("sumPackage", pkg.name);
                setText("sumPrice", window.formatPrice(pkg));
                document.getElementById("sumPackageRow").classList.remove("hidden");
                summaryPrice.classList.remove("hidden");
            } else {
                document.getElementById("sumPackageRow").classList.add("hidden");
                summaryPrice.classList.remove("hidden");
                setText("sumPrice", t === "physical" ? "Request a Quote" : "—");
            }

            setText("sumDate", document.getElementById("eventDate").value || "—");

            var extras = [];
            ["music", "rsvp", "wishes"].forEach(function (name) {
                var sel = form.elements[name + "Req"];
                if (sel && sel.value === "yes") extras.push(sel.dataset.label);
            });
            setText("sumExtras", extras.length ? extras.join(", ") : "None selected");

            /* Note text */
            var note = document.getElementById("summaryNote");
            if (t === "physical") {
                note.textContent = "Final price to be confirmed after we review your quantity and preferences.";
            } else if (t === "digital" && pkg) {
                note.textContent = "Your " + pkg.name + " includes: " + pkg.features.join(", ") + ".";
            } else {
                note.textContent = "Every order is an inquiry — we confirm details, price and availability with you before work begins.";
            }
        }

        function setText(id, v) { document.getElementById(id).textContent = v; }

        /* ------------------------------------ Validation --------------- */
        function fail(field, msg) {
            var wrap = field.closest(".form-field");
            if (!wrap) return false;
            wrap.classList.add("is-invalid");
            var err = wrap.querySelector(".field-error");
            if (err && msg) err.textContent = msg;
            return false;
        }
        function clearFail(field) {
            var wrap = field.closest(".form-field");
            if (wrap) wrap.classList.remove("is-invalid");
        }
        form.addEventListener("input", function (e) { clearFail(e.target); });

        function validate() {
            var ok = true;
            var name = form.elements.fullName;
            var phone = form.elements.phone;
            var email = form.elements.email;

            if (!name.value.trim()) ok = fail(name, "Please enter your full name.") && ok;
            if (!phone.value.trim()) {
                ok = fail(phone, "Please enter your phone number.") && ok;
            } else if (!/^[+]?[0-9\s()-]{7,15}$/.test(phone.value.trim())) {
                ok = fail(phone, "Please enter a valid phone number.") && ok;
            }
            if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
                ok = fail(email, "Please enter a valid email address, or leave it empty.") && ok;
            }
            if (!currentType()) {
                window.showToast("Please choose Physical or Digital invitation first.");
                ok = false;
            }
            var evName = form.elements.eventNames;
            if (!evName.value.trim()) ok = fail(evName, "Who is the invitation for?") && ok;

            /* Digital orders require a package selection */
            if (currentType() === "digital" && !form.querySelector('input[name="package"]:checked')) {
                window.showToast("Please choose a digital package (Basic, Premium or Deluxe).");
                document.getElementById("packageOptions").scrollIntoView({ behavior: "smooth", block: "center" });
                ok = false;
            }

            var firstInvalid = form.querySelector(".form-field.is-invalid input, .form-field.is-invalid select, .form-field.is-invalid textarea");
            if (firstInvalid) firstInvalid.focus();
            return ok;
        }

        /* ------------------------------------ Submission --------------- */
        var submitBtn = document.getElementById("orderSubmit");
        var status = document.getElementById("orderStatus");
        var fileInput = document.getElementById("referenceFiles");
        var fileHint = document.getElementById("fileHint");
        var submitting = false;

        /* Reference upload only works once the form endpoint is configured */
        if (!cfg.orderFormEndpoint) {
            fileInput.disabled = true;
            if (fileHint) fileHint.textContent =
                "File upload will be enabled as soon as the form service is configured (see README). You can share photos with us directly by phone for now.";
        }

        function buildSummaryText() {
            var lines = [
                "ETERNAL INVITES — ORDER REQUEST",
                "Name: " + form.elements.fullName.value,
                "Phone: " + form.elements.phone.value,
                "Email: " + (form.elements.email.value || "—"),
                "Invitation type: " + (currentType() || "—"),
                "Occasion: " + label(occasionSelect),
                "Design: " + label(designSelect),
                "Package: " + (function () {
                    var p = cfg.packages.find(function (x) {
                        return x.id === (form.querySelector('input[name="package"]:checked') || {}).value;
                    });
                    return p ? p.name + " (" + window.formatPrice(p) + ")" : "—";
                })(),
                "Names on invitation: " + form.elements.eventNames.value,
                "Event date: " + form.elements.eventDate.value,
                "Event time: " + form.elements.eventTime.value,
                "Venue: " + form.elements.venue.value,
                "Program: " + form.elements.program.value,
                "Wording: " + form.elements.wording.value,
                "Instructions: " + form.elements.instructions.value
            ];
            return lines.join("\n");
        }

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (submitting) return;                 // block duplicate submits
            status.className = "form-status";
            if (!validate()) return;

            /* Endpoint not configured -> honest fallback with phone contact */
            if (!cfg.orderFormEndpoint) {
                status.className = "form-status form-status--info is-visible";
                status.innerHTML =
                    "<strong>Online ordering is being set up.</strong> Your details are ready — " +
                    'please call us at <a href="tel:' + cfg.phoneInternational + '">' + cfg.phone + "</a> " +
                    'to place this order, or <button type="button" class="btn btn-dark btn-sm" id="copyOrderBtn" style="margin-left:8px">Copy my order details</button>' +
                    " and send them to us. The site owner needs to add a form endpoint in <code>js/config.js</code> to enable online submission (see README).";
                document.getElementById("copyOrderBtn").addEventListener("click", function () {
                    navigator.clipboard.writeText(buildSummaryText()).then(function () {
                        window.showToast("Order details copied — send them to us by phone, Telegram or Instagram.");
                    });
                });
                status.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }

            submitting = true;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span> Sending…';

            var data = new FormData(form);
            data.append("_subject", "New Order Request — " + form.elements.fullName.value);
            data.append("order_summary", buildSummaryText());

            fetch(cfg.orderFormEndpoint, {
                method: "POST",
                body: data,
                headers: { "Accept": "application/json" }
            })
            .then(function (res) {
                if (!res.ok) throw new Error("Submission failed");
                status.className = "form-status form-status--success is-visible";
                status.innerHTML =
                    "<strong>Thank you, " + form.elements.fullName.value.split(" ")[0] +
                    "!</strong> Your order request has been sent. Every order is an inquiry until we " +
                    "confirm the details, price and availability with you — we will contact you shortly. " +
                    'Need a faster answer? Call <a href="tel:' + cfg.phoneInternational + '">' + cfg.phone + "</a>.";
                form.reset();
                form.querySelectorAll(".choice-card, .package-option").forEach(function (c) {
                    c.classList.remove("is-selected");
                });
                refreshSections();
                markPackageSelected();
            })
            .catch(function () {
                status.className = "form-status form-status--error is-visible";
                status.innerHTML =
                    "Something went wrong and your request could not be sent. " +
                    'Please try again, or call us directly at <a href="tel:' + cfg.phoneInternational +
                    '">' + cfg.phone + "</a>.";
            })
            .finally(function () {
                submitting = false;
                submitBtn.disabled = false;
                submitBtn.innerHTML = "Submit Order Request";
                status.scrollIntoView({ behavior: "smooth", block: "center" });
                if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
            });
        });

        updateSummary();
    });
})();
