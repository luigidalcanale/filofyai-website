/* ============================================
   FilofyAI — Shared scripts
   Injects the contact modal on every page and
   handles modal, form, and scroll animations.
   ============================================ */

(function () {
  "use strict";

  // Form submissions are emailed via FormSubmit (https://formsubmit.co).
  // The first real submission triggers a one-time confirmation email to
  // this address — click it once and everything after flows automatically.
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/luigidalcanale@gmail.com";

  /* ---------- Contact modal markup (single source of truth) ---------- */

  var modalHTML = [
    '<div class="modal-overlay" id="contact-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">',
    '  <div class="modal">',
    '    <button class="modal-close" type="button" aria-label="Close contact form">&#10005;</button>',
    '    <div class="modal-form-view">',
    '      <span class="eyebrow">Contact Us</span>',
    '      <h2 id="contact-modal-title">Let’s Connect</h2>',
    '      <p class="modal-sub">Tell us about your business and how we can help you scale with AI.</p>',
    '      <div class="form-error-banner" id="form-error-banner">Something went wrong sending your message. Please try again, or email us directly.</div>',
    '      <form id="contact-form" novalidate>',
    '        <input type="hidden" name="_subject" value="New FilofyAI inquiry">',
    '        <input type="hidden" name="_template" value="table">',
    '        <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off">',
    '        <div class="form-row">',
    '          <div class="form-group">',
    '            <label for="cf-first-name">First Name*</label>',
    '            <input type="text" id="cf-first-name" name="First Name" placeholder="John" required>',
    '          </div>',
    '          <div class="form-group">',
    '            <label for="cf-last-name">Last Name*</label>',
    '            <input type="text" id="cf-last-name" name="Last Name" placeholder="Doe" required>',
    '          </div>',
    '        </div>',
    '        <div class="form-group">',
    '          <label for="cf-email">Email Address*</label>',
    '          <input type="email" id="cf-email" name="Email Address" placeholder="john@company.com" required>',
    '        </div>',
    '        <div class="form-row">',
    '          <div class="form-group">',
    '            <label for="cf-company">Company Name*</label>',
    '            <input type="text" id="cf-company" name="Company Name" placeholder="Acme Inc." required>',
    '          </div>',
    '          <div class="form-group">',
    '            <label for="cf-website">Company Website <span class="optional">(optional)</span></label>',
    '            <input type="url" id="cf-website" name="Company Website" placeholder="https://acme.com">',
    '          </div>',
    '        </div>',
    '        <div class="form-group">',
    '          <label for="cf-role">Your Role*</label>',
    '          <select id="cf-role" name="Your Role" required>',
    '            <option value="" disabled selected>Select your role</option>',
    '            <option>Founder/CEO</option>',
    '            <option>Operations Manager</option>',
    '            <option>CTO/Developer</option>',
    '            <option>Business Owner</option>',
    '            <option>Individual (Personal use)</option>',
    '            <option>Other</option>',
    '          </select>',
    '        </div>',
    '        <div class="form-row">',
    '          <div class="form-group">',
    '            <label for="cf-size">Company Size*</label>',
    '            <select id="cf-size" name="Company Size" required>',
    '              <option value="" disabled selected>Select size</option>',
    '              <option>Just me (personal)</option>',
    '              <option>1-10</option>',
    '              <option>11-50</option>',
    '              <option>51-200</option>',
    '              <option>201-500</option>',
    '              <option>500+</option>',
    '            </select>',
    '          </div>',
    '          <div class="form-group">',
    '            <label for="cf-revenue">Company’s Annual Revenue*</label>',
    '            <select id="cf-revenue" name="Annual Revenue" required>',
    '              <option value="" disabled selected>Select range</option>',
    '              <option>Under $250K</option>',
    '              <option>$250K–$500K</option>',
    '              <option>$500K–$750K</option>',
    '              <option>$750K–$1M</option>',
    '              <option>$1M–$1.5M</option>',
    '              <option>$1.5M–$2M</option>',
    '              <option>$2M+</option>',
    '            </select>',
    '          </div>',
    '        </div>',
    '        <div class="form-group">',
    '          <label for="cf-budget">Project Budget*</label>',
    '          <select id="cf-budget" name="Project Budget" required>',
    '            <option value="" disabled selected>Select budget</option>',
    '            <option>Under $500/month</option>',
    '            <option>$500–$1,000/month</option>',
    '            <option>$1,000–$2,500/month</option>',
    '            <option>$2,500–$5,000/month</option>',
    '            <option>$5,000+/month</option>',
    '          </select>',
    '        </div>',
    '        <div class="form-group">',
    '          <label for="cf-help">How can we help?*</label>',
    '          <textarea id="cf-help" name="How can we help" placeholder="Tell us what you’re looking to achieve..." required></textarea>',
    '        </div>',
    '        <div class="form-group">',
    '          <label>What are you hoping to improve with AI or automation?*</label>',
    '          <div class="checkbox-grid" id="cf-improve">',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Lead generation or sales"> Lead generation or sales</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Customer support"> Customer support</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Internal operations"> Internal operations</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Data processing or reporting"> Data processing or reporting</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Content or marketing workflows"> Content or marketing workflows</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Personal productivity or life organization"> Personal productivity or life organization</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Not sure yet"> Not sure yet</label>',
    '          </div>',
    '          <p class="checkbox-error" id="checkbox-error">Please select at least one option.</p>',
    '        </div>',
    '        <div class="form-group">',
    '          <label for="cf-extra">Anything else we should know before reaching out? <span class="optional">(optional)</span></label>',
    '          <textarea id="cf-extra" name="Anything else" placeholder="Any additional context or questions..."></textarea>',
    '        </div>',
    '        <button type="submit" class="btn btn-block" id="cf-submit">Submit <span class="arrow">→</span></button>',
    '      </form>',
    '    </div>',
    '    <div class="form-success" id="form-success">',
    '      <div class="success-icon">✓</div>',
    '      <h3>Thanks for reaching out!</h3>',
    '      <p>Your message is on its way. We’ll get back to you within 1–2 business days.</p>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join("\n");

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  /* ---------- Modal open / close ---------- */

  var overlay = document.getElementById("contact-modal-overlay");
  var form = document.getElementById("contact-form");
  var formView = overlay.querySelector(".modal-form-view");
  var successView = document.getElementById("form-success");
  var errorBanner = document.getElementById("form-error-banner");
  var lastFocused = null;

  function openModal() {
    lastFocused = document.activeElement;
    overlay.classList.add("open");
    document.body.classList.add("modal-open");
    // reset to form view each time it opens
    formView.style.display = "";
    successView.classList.remove("visible");
    errorBanner.classList.remove("visible");
    var firstField = document.getElementById("cf-first-name");
    if (firstField) firstField.focus();
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.classList.remove("modal-open");
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll("[data-open-contact]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });

  overlay.querySelector(".modal-close").addEventListener("click", closeModal);

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
  });

  /* ---------- Form submission ---------- */

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // native validation for required inputs/selects/textareas
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // required checkbox group needs a manual check
    var checked = form.querySelectorAll('input[name="Improve"]:checked');
    var checkboxError = document.getElementById("checkbox-error");
    if (checked.length === 0) {
      checkboxError.classList.add("visible");
      document.getElementById("cf-improve").scrollIntoView({ block: "center" });
      return;
    }
    checkboxError.classList.remove("visible");

    var submitBtn = document.getElementById("cf-submit");
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending…";
    errorBanner.classList.remove("visible");

    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then(function () {
        form.reset();
        formView.style.display = "none";
        successView.classList.add("visible");
      })
      .catch(function () {
        errorBanner.classList.add("visible");
        errorBanner.scrollIntoView({ block: "center" });
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit <span class="arrow">→</span>';
      });
  });

  /* ---------- Scroll reveal ---------- */

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }
})();
