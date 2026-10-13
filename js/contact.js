/* ==========================================================================
   Eternal Invites — CONTACT FORM SCRIPT
   Validates and sends the message to the endpoint configured in
   js/config.js. Shows the phone contact when the endpoint is not set up.
   ========================================================================== */

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("contactForm");
        if (!form) return;

        var cfg = window.SITE_CONFIG;
        var status = document.getElementById("contactStatus");
        var submitBtn = document.getElementById("contactSubmit");
        var sending = false;

        function fail(field, msg) {
            var wrap = field.closest(".form-field");
            if (!wrap) return false;
            wrap.classList.add("is-invalid");
            var err = wrap.querySelector(".field-error");
            if (err && msg) err.textContent = msg;
            return false;
        }
        form.addEventListener("input", function (e) {
            var w = e.target.closest(".form-field");
            if (w) w.classList.remove("is-invalid");
        });

        function validate() {
            var ok = true;
            if (!form.elements.name.value.trim()) ok = fail(form.elements.name, "Please enter your name.") && ok;
            var c = form.elements.contact.value.trim();
            if (!c) {
                ok = fail(form.elements.contact, "Please enter your phone number or email.") && ok;
            } else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c) || /^[+]?[0-9\s()-]{7,15}$/.test(c))) {
                ok = fail(form.elements.contact, "Please enter a valid phone number or email.") && ok;
            }
            if (!form.elements.message.value.trim()) ok = fail(form.elements.message, "Please write your message.") && ok;
            return ok;
        }

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (sending) return;
            status.className = "form-status";
            if (!validate()) return;

            if (!cfg.contactFormEndpoint) {
                status.className = "form-status form-status--info is-visible";
                status.innerHTML =
                    "<strong>Messaging is being set up.</strong> Please call us at " +
                    '<a href="tel:' + cfg.phoneInternational + '">' + cfg.phone + "</a> " +
                    "or reach us on TikTok / Instagram. The site owner needs to add a form endpoint " +
                    "in <code>js/config.js</code> to enable this form (see README).";
                return;
            }

            sending = true;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span> Sending…';

            var data = new FormData(form);
            data.append("_subject", "New Message — " + form.elements.name.value);

            fetch(cfg.contactFormEndpoint, {
                method: "POST",
                body: data,
                headers: { "Accept": "application/json" }
            })
            .then(function (res) {
                if (!res.ok) throw new Error("Submission failed");
                status.className = "form-status form-status--success is-visible";
                status.innerHTML = "<strong>Message sent!</strong> Thank you — we will get back to you soon.";
                form.reset();
            })
            .catch(function () {
                status.className = "form-status form-status--error is-visible";
                status.innerHTML =
                    "Your message could not be sent. Please try again or call us at " +
                    '<a href="tel:' + cfg.phoneInternational + '">' + cfg.phone + "</a>.";
            })
            .finally(function () {
                sending = false;
                submitBtn.disabled = false;
                submitBtn.innerHTML = "Send Message";
            });
        });
    });
})();
