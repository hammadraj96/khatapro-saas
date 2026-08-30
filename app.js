/**
 * KHATAPRO SAAS — INTERACTIVE JAVASCRIPT CONTROLLERS
 * Production-ready interactions for tabs, tickers, timers, pricing toggles, modals, and simulators.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. FLOATING NAVBAR SCROLL EFFECT
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. HERO 5-CARD SHOWCASE CYCLER & SELECTOR
  const heroCards = document.querySelectorAll('.hero-card');
  let currentCardIndex = 0;
  let autoRotateInterval = null;

  function setActiveHeroCard(index) {
    heroCards.forEach((card, i) => {
      if (i === index) {
        card.classList.add('active');
        // Add sound icon to active card if not present
        if (!card.querySelector('.card-sound-badge')) {
          const badge = document.createElement('div');
          badge.className = 'card-sound-badge';
          badge.title = 'فعال لائیو کھاتہ';
          badge.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;
          card.appendChild(badge);
        }
      } else {
        card.classList.remove('active');
        const badge = card.querySelector('.card-sound-badge');
        if (badge) badge.remove();
      }
    });
    currentCardIndex = index;
  }

  heroCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      setActiveHeroCard(index);
      clearInterval(autoRotateInterval);
      startHeroAutoRotate();
    });
  });

  function startHeroAutoRotate() {
    autoRotateInterval = setInterval(() => {
      let nextIndex = (currentCardIndex + 1) % heroCards.length;
      setActiveHeroCard(nextIndex);
    }, 4500);
  }
  startHeroAutoRotate();

  // Pause on hover
  const showcaseWrapper = document.querySelector('.hero-showcase-wrapper');
  if (showcaseWrapper) {
    showcaseWrapper.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
    showcaseWrapper.addEventListener('mouseleave', () => startHeroAutoRotate());
  }

  // 3. DIGITAL STUDIO TAB SWITCHER
  const studioTabs = document.querySelectorAll('.studio-tab-btn');
  const studioContents = document.querySelectorAll('.studio-tab-content');

  studioTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTabId = tab.getAttribute('data-tab');

      studioTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      studioContents.forEach(content => {
        if (content.id === targetTabId) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // 4. CUSTOMER MANAGEMENT SUB-TABS
  const custTabs = document.querySelectorAll('.c-tab-btn');
  custTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      custTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 5. WHATSAPP RECOVERY INTERACTIVE TRIGGER
  const btnTriggerWa = document.getElementById('btn-trigger-wa-modal');
  const feedbackMsg = document.getElementById('wa-feedback-msg');
  if (btnTriggerWa && feedbackMsg) {
    btnTriggerWa.addEventListener('click', () => {
      btnTriggerWa.innerHTML = `<span>بھیجا جا رہا ہے... ⏳</span>`;
      setTimeout(() => {
        btnTriggerWa.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          <span>واٹس ایپ الرٹ کامیابی سے روانہ!</span>
        `;
        feedbackMsg.style.display = 'block';
      }, 600);
    });
  }

  const demoSendWa = document.getElementById('demo-send-wa');
  if (demoSendWa) {
    demoSendWa.addEventListener('click', () => {
      demoSendWa.textContent = '✓ الرٹ بھیج دیا گیا!';
      demoSendWa.style.background = '#059669';
    });
  }

  // 6. PRICING TOGGLE (MONTHLY RENTAL VS ONE-TIME PURCHASE)
  const pricingToggle = document.getElementById('pricing-toggle');
  const lblMonthly = document.getElementById('lbl-monthly');
  const lblLifetime = document.getElementById('lbl-lifetime');

  const pricePrem = document.getElementById('price-prem');
  const priceExcl = document.getElementById('price-excl');
  const subPrem = document.getElementById('sub-prem');
  const subExcl = document.getElementById('sub-excl');

  if (pricingToggle) {
    // Initial state checked = One-time purchase
    pricingToggle.checked = true;

    pricingToggle.addEventListener('change', () => {
      if (pricingToggle.checked) {
        // One-Time Purchase
        lblLifetime.classList.add('active');
        lblMonthly.classList.remove('active');

        if (pricePrem) pricePrem.textContent = '25,000 روپے';
        if (priceExcl) priceExcl.textContent = '45,000 روپے';
        if (subPrem) subPrem.textContent = 'ایک بار لائف ٹائم لائسنس';
        if (subExcl) subExcl.textContent = 'ایک بار مکمل لائف ٹائم رسائی';
      } else {
        // Monthly Rental
        lblMonthly.classList.add('active');
        lblLifetime.classList.remove('active');

        if (pricePrem) pricePrem.textContent = '2,500 روپے / ماہ';
        if (priceExcl) priceExcl.textContent = '4,500 روپے / ماہ';
        if (subPrem) subPrem.textContent = 'ماہانہ کرایہ بنیاد پر';
        if (subExcl) subExcl.textContent = 'ماہانہ کرایہ بنیاد پر';
      }
    });

    lblMonthly.addEventListener('click', () => {
      pricingToggle.checked = false;
      pricingToggle.dispatchEvent(new Event('change'));
    });

    lblLifetime.addEventListener('click', () => {
      pricingToggle.checked = true;
      pricingToggle.dispatchEvent(new Event('change'));
    });
  }

  // 7. FAQ ACCORDION
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 8. SYSTEM CONNECTED MODULES INTERACTIVITY
  const moduleChips = document.querySelectorAll('.module-chip');
  moduleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      moduleChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // 9. MODAL POPUP (LEAD GENERATION / DEMO)
  const demoModal = document.getElementById('demo-modal-overlay');
  const btnOpenDemo = document.getElementById('btn-open-demo');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const demoLeadForm = document.getElementById('demo-lead-form');

  if (btnOpenDemo && demoModal) {
    btnOpenDemo.addEventListener('click', (e) => {
      e.preventDefault();
      demoModal.classList.add('active');
    });
  }

  if (btnCloseModal && demoModal) {
    btnCloseModal.addEventListener('click', () => {
      demoModal.classList.remove('active');
    });
  }

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        demoModal.classList.remove('active');
      }
    });
  }

  if (demoLeadForm) {
    demoLeadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      demoLeadForm.innerHTML = `
        <div style="text-align: center; padding: 20px 0;">
          <div style="font-size: 3rem; margin-bottom: 10px;">🎉</div>
          <h3 style="color: #059669; font-size: 1.3rem; margin-bottom: 8px;">درخواست موصول ہو گئی ہے!</h3>
          <p style="color: #475569; font-size: 0.95rem;">ہمارے کسٹمر ریلیشنز مینیجر آپ کے واٹس ایپ پر جلد لائیو ڈیمو گائیڈ ارسال کریں گے۔</p>
        </div>
      `;
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#' && href.startsWith('#')) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
