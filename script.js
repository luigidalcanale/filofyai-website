/* ============================================
   FilofyAI — Shared scripts
   Injects the contact modal on every page and
   handles modal, tabs, forms, and scroll animations.
   ============================================ */

(function () {
  "use strict";

  // Form submissions are emailed via FormSubmit (https://formsubmit.co).
  // The first real submission triggers a one-time confirmation email to
  // this address — click it once and everything after flows automatically.
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/luigidalcanale@gmail.com";

  var SUBTITLES = {
    business: "Tell us about your business and how we can help you scale with AI.",
    personal: "Tell us what you’re trying to accomplish and how we can help you use AI with more clarity, confidence, and impact."
  };

  /* ---------- Contact modal markup (single source of truth) ---------- */

  var modalHTML = [
    '<div class="modal-overlay" id="contact-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">',
    '  <div class="modal">',
    '    <button class="modal-close" type="button" aria-label="Close contact form">&#10005;</button>',
    '    <div class="modal-form-view">',
    '      <span class="eyebrow">Contact Us</span>',
    '      <h2 id="contact-modal-title">Let’s Connect</h2>',
    '      <p class="modal-sub" id="contact-modal-sub">' + SUBTITLES.business + "</p>",
    '      <div class="contact-tabs" role="tablist" aria-label="Contact type" data-active="business">',
    '        <span class="contact-tabs-indicator" aria-hidden="true"></span>',
    '        <button class="contact-tab is-active" id="tab-business" type="button" role="tab" aria-selected="true" aria-controls="panel-business">Business</button>',
    '        <button class="contact-tab" id="tab-personal" type="button" role="tab" aria-selected="false" aria-controls="panel-personal" tabindex="-1">Personal</button>',
    "      </div>",
    '      <div class="form-error-banner" id="form-error-banner" role="alert">Something went wrong sending your message. Please try again, or email us directly.</div>',

    /* ----- Business panel (existing form, unchanged fields) ----- */
    '      <div class="contact-panel" id="panel-business" role="tabpanel" aria-labelledby="tab-business">',
    '      <form id="contact-form" novalidate>',
    '        <input type="hidden" name="_subject" value="New FilofyAI inquiry">',
    '        <input type="hidden" name="_template" value="table">',
    '        <input type="hidden" name="contactType" value="business">',
    '        <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off">',
    '        <div class="form-row">',
    '          <div class="form-group">',
    '            <label for="cf-first-name">First Name*</label>',
    '            <input type="text" id="cf-first-name" name="First Name" placeholder="John" required>',
    "          </div>",
    '          <div class="form-group">',
    '            <label for="cf-last-name">Last Name*</label>',
    '            <input type="text" id="cf-last-name" name="Last Name" placeholder="Doe" required>',
    "          </div>",
    "        </div>",
    '        <div class="form-group">',
    '          <label for="cf-email">Email Address*</label>',
    '          <input type="email" id="cf-email" name="Email Address" placeholder="john@company.com" required>',
    "        </div>",
    '        <div class="form-row">',
    '          <div class="form-group">',
    '            <label for="cf-company">Company Name*</label>',
    '            <input type="text" id="cf-company" name="Company Name" placeholder="Acme Inc." required>',
    "          </div>",
    '          <div class="form-group">',
    '            <label for="cf-website">Company Website <span class="optional">(optional)</span></label>',
    '            <input type="url" id="cf-website" name="Company Website" placeholder="https://acme.com">',
    "          </div>",
    "        </div>",
    '        <div class="form-group">',
    '          <label for="cf-role">Your Role*</label>',
    '          <select id="cf-role" name="Your Role" required>',
    '            <option value="" disabled selected>Select your role</option>',
    "            <option>Founder/CEO</option>",
    "            <option>Operations Manager</option>",
    "            <option>CTO/Developer</option>",
    "            <option>Business Owner</option>",
    "            <option>Individual (Personal use)</option>",
    "            <option>Other</option>",
    "          </select>",
    "        </div>",
    '        <div class="form-row">',
    '          <div class="form-group">',
    '            <label for="cf-size">Company Size*</label>',
    '            <select id="cf-size" name="Company Size" required>',
    '              <option value="" disabled selected>Select size</option>',
    "              <option>Just me (personal)</option>",
    "              <option>1-10</option>",
    "              <option>11-50</option>",
    "              <option>51-200</option>",
    "              <option>201-500</option>",
    "              <option>500+</option>",
    "            </select>",
    "          </div>",
    '          <div class="form-group">',
    '            <label for="cf-revenue">Company’s Annual Revenue*</label>',
    '            <select id="cf-revenue" name="Annual Revenue" required>',
    '              <option value="" disabled selected>Select range</option>',
    "              <option>Under $250K</option>",
    "              <option>$250K–$500K</option>",
    "              <option>$500K–$750K</option>",
    "              <option>$750K–$1M</option>",
    "              <option>$1M–$1.5M</option>",
    "              <option>$1.5M–$2M</option>",
    "              <option>$2M+</option>",
    "            </select>",
    "          </div>",
    "        </div>",
    '        <div class="form-group">',
    '          <label for="cf-budget">Project Budget*</label>',
    '          <select id="cf-budget" name="Project Budget" required>',
    '            <option value="" disabled selected>Select budget</option>',
    "            <option>Under $500/month</option>",
    "            <option>$500–$1,000/month</option>",
    "            <option>$1,000–$2,500/month</option>",
    "            <option>$2,500–$5,000/month</option>",
    "            <option>$5,000+/month</option>",
    "          </select>",
    "        </div>",
    '        <div class="form-group">',
    '          <label for="cf-help">How can we help?*</label>',
    '          <textarea id="cf-help" name="How can we help" placeholder="Tell us what you’re looking to achieve..." required></textarea>',
    "        </div>",
    '        <div class="form-group">',
    "          <label>What are you hoping to improve with AI or automation?*</label>",
    '          <div class="checkbox-grid" id="cf-improve">',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Lead generation or sales"> Lead generation or sales</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Customer support"> Customer support</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Internal operations"> Internal operations</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Data processing or reporting"> Data processing or reporting</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Content or marketing workflows"> Content or marketing workflows</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Personal productivity or life organization"> Personal productivity or life organization</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Not sure yet"> Not sure yet</label>',
    "          </div>",
    '          <p class="checkbox-error" id="checkbox-error" role="alert">Please select at least one option.</p>',
    "        </div>",
    '        <div class="form-group">',
    '          <label for="cf-extra">Anything else we should know before reaching out? <span class="optional">(optional)</span></label>',
    '          <textarea id="cf-extra" name="Anything else" placeholder="Any additional context or questions..."></textarea>',
    "        </div>",
    '        <button type="submit" class="btn btn-block" id="cf-submit">Submit <span class="arrow">→</span></button>',
    "      </form>",
    "      </div>",

    /* ----- Personal panel ----- */
    '      <div class="contact-panel" id="panel-personal" role="tabpanel" aria-labelledby="tab-personal" hidden>',
    '      <form id="contact-form-personal" novalidate>',
    '        <input type="hidden" name="_subject" value="New FilofyAI personal inquiry">',
    '        <input type="hidden" name="_template" value="table">',
    '        <input type="hidden" name="contactType" value="personal">',
    '        <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off">',
    '        <div class="form-row">',
    '          <div class="form-group">',
    '            <label for="cf-p-first-name">First Name*</label>',
    '            <input type="text" id="cf-p-first-name" name="First Name" placeholder="John" required>',
    "          </div>",
    '          <div class="form-group">',
    '            <label for="cf-p-last-name">Last Name*</label>',
    '            <input type="text" id="cf-p-last-name" name="Last Name" placeholder="Doe" required>',
    "          </div>",
    "        </div>",
    '        <div class="form-group">',
    '          <label for="cf-p-email">Email Address*</label>',
    '          <input type="email" id="cf-p-email" name="Email Address" placeholder="john@email.com" required>',
    "        </div>",
    '        <div class="form-row">',
    '          <div class="form-group">',
    '            <label for="cf-p-phone">Phone Number <span class="optional">(optional)</span></label>',
    '            <input type="tel" id="cf-p-phone" name="Phone Number" placeholder="(555) 123-4567" pattern="[0-9\\(\\)\\+\\s.\\-]{7,20}" title="Please enter a valid phone number">',
    "          </div>",
    '          <div class="form-group">',
    '            <label for="cf-p-linkedin">LinkedIn or Portfolio <span class="optional">(optional)</span></label>',
    '            <input type="url" id="cf-p-linkedin" name="LinkedIn or Portfolio" placeholder="https://linkedin.com/in/yourname">',
    "          </div>",
    "        </div>",
    '        <div class="form-group">',
    '          <label for="cf-p-type">Which best describes you?*</label>',
    '          <select id="cf-p-type" name="Which best describes you" required>',
    '            <option value="" disabled selected>Select one</option>',
    "            <option>Working professional</option>",
    "            <option>Freelancer or creator</option>",
    "            <option>Founder or aspiring founder</option>",
    "            <option>Student or recent graduate</option>",
    "            <option>Job seeker or career changer</option>",
    "            <option>Retiree or lifelong learner</option>",
    "            <option>Other</option>",
    "          </select>",
    "        </div>",
    '        <div class="form-row">',
    '          <div class="form-group">',
    '            <label for="cf-p-experience">Your AI Experience*</label>',
    '            <select id="cf-p-experience" name="AI Experience" required>',
    '              <option value="" disabled selected>Select experience level</option>',
    "              <option>I’m completely new to AI</option>",
    "              <option>I’ve tried a few AI tools</option>",
    "              <option>I use AI regularly</option>",
    "              <option>I’m advanced and need specialized help</option>",
    "            </select>",
    "          </div>",
    '          <div class="form-group">',
    '            <label for="cf-p-support">Preferred Type of Support*</label>',
    '            <select id="cf-p-support" name="Preferred Type of Support" required>',
    '              <option value="" disabled selected>Select support type</option>',
    "              <option>One-time strategy session</option>",
    "              <option>1:1 coaching or training</option>",
    "              <option>Hands-on setup and automation</option>",
    "              <option>Custom AI solution or prototype</option>",
    "              <option>Workflow audit and recommendations</option>",
    "              <option>I’m not sure yet</option>",
    "            </select>",
    "          </div>",
    "        </div>",
    '        <div class="form-row">',
    '          <div class="form-group">',
    '            <label for="cf-p-budget">Personal Project Budget*</label>',
    '            <select id="cf-p-budget" name="Personal Project Budget" required>',
    '              <option value="" disabled selected>Select budget</option>',
    "              <option>Under $500</option>",
    "              <option>$500–$1,500</option>",
    "              <option>$1,500–$5,000</option>",
    "              <option>$5,000+</option>",
    "              <option>Not sure — I need guidance</option>",
    "            </select>",
    "          </div>",
    '          <div class="form-group">',
    '            <label for="cf-p-timeline">Desired Start Time*</label>',
    '            <select id="cf-p-timeline" name="Desired Start Time" required>',
    '              <option value="" disabled selected>Select timeline</option>',
    "              <option>As soon as possible</option>",
    "              <option>Within 2 weeks</option>",
    "              <option>Within 1 month</option>",
    "              <option>Within 1–3 months</option>",
    "              <option>I’m just exploring</option>",
    "            </select>",
    "          </div>",
    "        </div>",
    '        <div class="form-group">',
    '          <label for="cf-p-help">What would you like help with?*</label>',
    '          <textarea id="cf-p-help" name="What would you like help with" placeholder="Tell us what you’re trying to accomplish, what feels difficult today, and what a successful outcome would look like…" required></textarea>',
    "        </div>",
    '        <div class="form-group">',
    "          <label>What are you hoping to improve with AI or automation?*</label>",
    '          <p class="checkbox-helper">Select all that apply.</p>',
    '          <div class="checkbox-grid" id="cf-p-improve">',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Personal productivity and time management"> Personal productivity and time management</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Career growth, job search, or interviewing"> Career growth, job search, or interviewing</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Learning AI tools and practical skills"> Learning AI tools and practical skills</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Content creation or creative work"> Content creation or creative work</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Automating repetitive tasks"> Automating repetitive tasks</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Building an AI assistant or workflow"> Building an AI assistant or workflow</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Research and knowledge organization"> Research and knowledge organization</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Starting or developing a personal project"> Starting or developing a personal project</label>',
    '            <label class="checkbox-item"><input type="checkbox" name="Improve" value="Other or not sure yet"> Other or not sure yet</label>',
    "          </div>",
    '          <p class="checkbox-error" id="cf-p-checkbox-error" role="alert">Please select at least one option.</p>',
    "        </div>",
    '        <button type="submit" class="btn btn-block" id="cf-p-submit">Submit <span class="arrow">→</span></button>',
    "      </form>",
    "      </div>",

    "    </div>",
    '    <div class="form-success" id="form-success">',
    '      <div class="success-icon">✓</div>',
    '      <h3 tabindex="-1">Thanks for reaching out!</h3>',
    "      <p>Your message is on its way. We’ll get back to you within 1–2 business days.</p>",
    "    </div>",
    "  </div>",
    "</div>"
  ].join("\n");

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  /* ---------- Element refs ---------- */

  var overlay = document.getElementById("contact-modal-overlay");
  var formView = overlay.querySelector(".modal-form-view");
  var successView = document.getElementById("form-success");
  var errorBanner = document.getElementById("form-error-banner");
  var modalSub = document.getElementById("contact-modal-sub");
  var tablist = overlay.querySelector(".contact-tabs");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  var TYPES = ["business", "personal"];
  var tabs = {
    business: document.getElementById("tab-business"),
    personal: document.getElementById("tab-personal")
  };
  var panels = {
    business: document.getElementById("panel-business"),
    personal: document.getElementById("panel-personal")
  };
  var activeType = "business";
  var switchTimer = null;
  var lastFocused = null;

  /* ---------- Business / Personal tabs ---------- */

  function switchTab(type, moveFocus) {
    if (type === activeType || !panels[type]) return;
    var outgoing = panels[activeType];
    activeType = type;

    TYPES.forEach(function (t) {
      var selected = t === type;
      tabs[t].classList.toggle("is-active", selected);
      tabs[t].setAttribute("aria-selected", selected ? "true" : "false");
      tabs[t].tabIndex = selected ? 0 : -1;
    });
    tablist.setAttribute("data-active", type);
    if (moveFocus) tabs[type].focus();

    errorBanner.classList.remove("visible");
    clearTimeout(switchTimer);
    TYPES.forEach(function (t) { panels[t].classList.remove("leaving"); });

    if (reduceMotion.matches) {
      TYPES.forEach(function (t) { panels[t].hidden = t !== type; });
      modalSub.textContent = SUBTITLES[type];
      return;
    }

    // fade the old panel + subtitle out, then swap; the incoming panel
    // plays its own panelIn animation when unhidden
    modalSub.classList.add("fading");
    outgoing.classList.add("leaving");
    switchTimer = setTimeout(function () {
      TYPES.forEach(function (t) {
        panels[t].classList.remove("leaving");
        panels[t].hidden = t !== activeType;
      });
      modalSub.textContent = SUBTITLES[activeType];
      modalSub.classList.remove("fading");
    }, 150);
  }

  TYPES.forEach(function (t) {
    tabs[t].addEventListener("click", function () { switchTab(t, false); });
  });

  tablist.addEventListener("keydown", function (e) {
    var idx = TYPES.indexOf(activeType);
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      var step = e.key === "ArrowRight" ? 1 : -1;
      switchTab(TYPES[(idx + step + TYPES.length) % TYPES.length], true);
    } else if (e.key === "Home") {
      e.preventDefault();
      switchTab(TYPES[0], true);
    } else if (e.key === "End") {
      e.preventDefault();
      switchTab(TYPES[TYPES.length - 1], true);
    }
  });

  /* ---------- Modal open / close ---------- */

  function openModal() {
    lastFocused = document.activeElement;
    overlay.classList.add("open");
    document.body.classList.add("modal-open");
    // reset to form view each time it opens
    formView.style.display = "";
    successView.classList.remove("visible");
    errorBanner.classList.remove("visible");
    var firstField = panels[activeType].querySelector(
      'input:not([type="hidden"]):not([name="_honey"]), select, textarea'
    );
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

  // keep Tab cycling inside the modal while it is open
  overlay.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var nodes = overlay.querySelectorAll("button, input, select, textarea, a[href]");
    var focusable = Array.prototype.filter.call(nodes, function (el) {
      return el.tabIndex !== -1 && !el.disabled && el.getClientRects().length > 0;
    });
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  /* ---------- Form submission (shared by both forms) ---------- */

  function normalizeUrlField(field) {
    var value = field.value.trim();
    if (value && !/^https?:\/\//i.test(value)) {
      field.value = "https://" + value;
    }
  }

  function wireForm(form) {
    var urlFields = form.querySelectorAll('input[type="url"]');

    Array.prototype.forEach.call(urlFields, function (field) {
      field.addEventListener("blur", function () { normalizeUrlField(field); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      Array.prototype.forEach.call(urlFields, normalizeUrlField);

      // native validation for required inputs/selects/textareas
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // required checkbox group needs a manual check
      var boxes = form.querySelectorAll('input[name="Improve"]');
      var checked = form.querySelectorAll('input[name="Improve"]:checked');
      var checkboxError = form.querySelector(".checkbox-error");
      if (boxes.length && checked.length === 0) {
        checkboxError.classList.add("visible");
        checkboxError.scrollIntoView({ block: "center" });
        return;
      }
      if (checkboxError) checkboxError.classList.remove("visible");

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn.disabled) return; // guard against double submission
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
          var successHeading = successView.querySelector("h3");
          if (successHeading) successHeading.focus();
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
  }

  wireForm(document.getElementById("contact-form"));
  wireForm(document.getElementById("contact-form-personal"));

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
