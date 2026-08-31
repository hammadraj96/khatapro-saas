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

  // 1B. MOBILE MENU DRAWER CONTROLLER
  const btnMobileToggle = document.getElementById('btn-mobile-toggle');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link, .btn-mobile-demo, .btn-mobile-signin');

  if (btnMobileToggle && mobileMenuDrawer) {
    btnMobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = mobileMenuDrawer.classList.toggle('active');
      btnMobileToggle.classList.toggle('active', isActive);
      btnMobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Close when clicking any menu link
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuDrawer.classList.remove('active');
        btnMobileToggle.classList.remove('active');
        btnMobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenuDrawer.contains(e.target) && !btnMobileToggle.contains(e.target)) {
        mobileMenuDrawer.classList.remove('active');
        btnMobileToggle.classList.remove('active');
        btnMobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

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

  // 8. UNIFIED BUSINESS ARCHITECTURE INTERACTIVE ENGINE
  const moduleChips = document.querySelectorAll('.module-chip');
  const isRtl = document.documentElement.getAttribute('dir') === 'rtl';

  const modulesData = {
    cust: {
      id: isRtl ? 'ماڈیول #01' : 'MODULE #01',
      badge: isRtl ? 'کسٹمر کھاتہ و CRM' : 'CRM & LEDGER',
      icon: '👥',
      title: isRtl ? 'گاہک 360° پروفائل و کھاتہ جات' : 'Customer 360° & Account Ledgers',
      desc: isRtl 
        ? 'گاہک کا شناختی کارڈ، فون، اور مکمل لین دین کا ریکارڈ جو ہر نقد فروخت، قسط اور واٹس ایپ الرٹ سے خودکار منسلک رہتا ہے۔'
        : 'Stores complete CNIC, contact profile, balance history, and auto-links every sale, recovery alert, and legal agreement to this customer.',
      step1: isRtl ? 'پروفائل کا اندراج' : 'Profile Created',
      step2: isRtl ? 'نقد/اقساط سیل سے لنک' : 'Linked to POS Sale',
      step3: isRtl ? 'واٹس ایپ لیجر فوری روانہ' : 'WhatsApp Synced',
      metric1: isRtl ? '⚡ فوری تلاش (<10ms)' : '⚡ Instant Search (<10ms)',
      metric2: isRtl ? '🔒 منفرد شناختی کارڈ تصدیق' : '🔒 100% Unique CNIC Protection',
      link: '#customers-section',
      actionText: isRtl ? 'ماڈیول کی تفصیلات دیکھیں ←' : 'Explore Customers →',
      activeSat: 1,
      coreStatus: isRtl ? 'کسٹمر ریکارڈ فعال' : 'Customer Record Active'
    },
    prod: {
      id: isRtl ? 'ماڈیول #02' : 'MODULE #02',
      badge: isRtl ? 'پراڈکٹ کیٹلاگ' : 'CATALOG & PRICING',
      icon: '📦',
      title: isRtl ? 'مصنوعات کا کیٹلاگ و ویرینٹ مینجمنٹ' : 'Product Catalog & Multi-Variant Engine',
      desc: isRtl
        ? 'الیکٹرانکس، بائیکس اور موبائلز کے لیے چیسس/انجن نمبر، آئی ایم ای آئی (IMEI) اور وارنٹی کا خودکار ریکارڈ۔'
        : 'Supports electronics, bikes, mobile phones, and general merchandise with custom serial numbers, engine numbers, and warranty tracking.',
      step1: isRtl ? 'پراڈکٹ اندراج' : 'Product Added',
      step2: isRtl ? 'بارکوڈ/سیریل الاٹ' : 'Barcode Assigned',
      step3: isRtl ? 'اسٹاک سے خودکار کٹوتی' : 'Auto Stock Deduct',
      metric1: isRtl ? '🏷️ نقد و اقساط الگ قیمتیں' : '🏷️ Dual Cash/Inst Pricing',
      metric2: isRtl ? '🔍 تیز ترین بارکوڈ اسکین' : '🔍 Barcode & Serial Search',
      link: '#digital-studio',
      actionText: isRtl ? 'ماڈیول کی تفصیلات دیکھیں ←' : 'Explore Products →',
      activeSat: 2,
      coreStatus: isRtl ? 'بارکوڈ کیٹلاگ ہم آہنگ' : 'Barcode Catalog Synced'
    },
    inv: {
      id: isRtl ? 'ماڈیول #03' : 'MODULE #03',
      badge: isRtl ? 'گودام و اسٹاک' : 'SUPPLY CHAIN',
      icon: '🏬',
      title: isRtl ? 'لائیو اسٹاک و گودام مانیٹرنگ' : 'Real-Time Stock & Warehouse Tracking',
      desc: isRtl
        ? 'دکان اور گودام میں موجود مال کا لائیو ریکارڈ، مال ختم ہونے سے پہلے خودکار الرٹ تاکہ فروخت نہ رکے۔'
        : 'Tracks on-shelf stock vs warehouse reserves in real-time with automated low-stock warnings before items run out.',
      step1: isRtl ? 'نیا مال گودام داخل' : 'Stock Inward Entry',
      step2: isRtl ? 'کاؤنٹر فروخت پر کٹوتی' : 'POS Auto Deduction',
      step3: isRtl ? 'کم مال پر پیشگی الرٹ' : 'Low-Stock Alert',
      metric1: isRtl ? '📊 0% اسٹاک غلطی' : '📊 0% Stock Variance',
      metric2: isRtl ? '⚡ ریئل ٹائم اپڈیٹ' : '⚡ Real-Time Balance',
      link: '#digital-studio',
      actionText: isRtl ? 'ماڈیول کی تفصیلات دیکھیں ←' : 'Explore Inventory →',
      activeSat: 3,
      coreStatus: isRtl ? 'گودام انوینٹری لائیو' : 'Warehouse Stock Live'
    },
    pos: {
      id: isRtl ? 'ماڈیول #04' : 'MODULE #04',
      badge: isRtl ? 'کاؤنٹر بلنگ' : 'RETAIL CHECKOUT',
      icon: '💵',
      title: isRtl ? 'تیز رفتار کاؤنٹر پی او ایس و تھرمل پرنٹنگ' : 'High-Speed Counter POS & Thermal Billing',
      desc: isRtl
        ? 'بارکوڈ اسکینر کی مدد سے صرف 3 سیکنڈ میں تھرمل رسید پرنٹنگ اور رقم کا فوری آمدنی میں اندراج۔'
        : 'Lightning-fast 3-second billing with barcode scanner support, instant receipt printing, and real-time revenue posting.',
      step1: isRtl ? 'بارکوڈ اسکین' : 'Item Scanned',
      step2: isRtl ? 'تھرمل رسید پرنٹ' : 'Receipt Printed',
      step3: isRtl ? 'روزنامچہ کیش میں اندراج' : 'Cash Drawer Updated',
      metric1: isRtl ? '⏱️ صرف 3 سیکنڈ بلنگ' : '⏱️ 3-Second Checkout',
      metric2: isRtl ? '🖨️ تھرمل پرنٹر سپورٹ' : '🖨️ 58/80mm Thermal Ready',
      link: '#digital-studio',
      actionText: isRtl ? 'ماڈیول کی تفصیلات دیکھیں ←' : 'Explore POS →',
      activeSat: 2,
      coreStatus: isRtl ? 'پی او ایس کاؤنٹر فعال' : 'POS Counter Engine Active'
    },
    inst: {
      id: isRtl ? 'ماڈیول #05' : 'MODULE #05',
      badge: isRtl ? 'اقساط پلاننگ' : 'HIRE-PURCHASE',
      icon: '📅',
      title: isRtl ? 'اقساط پلانر و ماہانہ شیڈول سسٹم' : 'Hire-Purchase & Installment Planner',
      desc: isRtl
        ? '3 سے 36 ماہ کے لیے خودکار اقساط پلان، ایڈوانس کٹوتی اور ماہانہ واجب الادا تاریخوں کا کمپیوٹرائزڈ شیڈول۔'
        : 'Customizable installment terms (3 to 36 months) with auto-split monthly due dates, advance calculation, and mark-up formulas.',
      step1: isRtl ? 'ایڈوانس وصول' : 'Down Payment Paid',
      step2: isRtl ? 'ماہانہ شیڈول تیار' : 'Schedule Generated',
      step3: isRtl ? 'میسج الرٹ شیڈول' : 'Due Alerts Scheduled',
      metric1: isRtl ? '🗓️ خودکار تاریخ یاد دہانی' : '🗓️ Auto Due Reminders',
      metric2: isRtl ? '🛡️ 100% شفاف حساب' : '🛡️ 100% Clear Balance',
      link: '#installments-section',
      actionText: isRtl ? 'ماڈیول کی تفصیلات دیکھیں ←' : 'Explore Installments →',
      activeSat: 4,
      coreStatus: isRtl ? 'اقساط لیجر فعال' : 'Installment Engine Live'
    },
    pay: {
      id: isRtl ? 'ماڈیول #06' : 'MODULE #06',
      badge: isRtl ? 'وصولیاں و بینک' : 'TREASURY & CASH',
      icon: '💳',
      title: isRtl ? 'کثیر الجہتی وصولیاں (کیش، بینک، راست)' : 'Multi-Channel Payment Collections',
      desc: isRtl
        ? 'کیش، بینک، راست (Raast) یا ایزی پیسہ سے رقم وصول کریں اور گاہک کو فوری تصدیقی رسید فراہم کریں۔'
        : 'Collect via Cash, Raast, Bank Transfer, JazzCash or EasyPaisa with instant digital slip generation and customer SMS confirmation.',
      step1: isRtl ? 'رقم وصولی درج' : 'Payment Received',
      step2: isRtl ? 'ڈیجیٹل رسید جاری' : 'Slip Generated',
      step3: isRtl ? 'بقایا کھاتے سے کٹوتی' : 'Ledger Cleared',
      metric1: isRtl ? '🏦 ملٹی بینک سپورٹ' : '🏦 Multi-Bank Support',
      metric2: isRtl ? '⚡ فوری بیلنس کلیئرنگ' : '⚡ Instant Clearing',
      link: '#finance-section',
      actionText: isRtl ? 'ماڈیول کی تفصیلات دیکھیں ←' : 'Explore Payments →',
      activeSat: 4,
      coreStatus: isRtl ? 'بینک و کیش وصولی فعال' : 'Payments Live Synced'
    },
    rec: {
      id: isRtl ? 'ماڈیول #07' : 'MODULE #07',
      badge: isRtl ? 'واٹس ایپ ریکوری' : 'DEBT RECOVERY',
      icon: '🚨',
      title: isRtl ? 'خودکار ریکوری و واٹس ایپ فالو اپ' : 'Automated Recovery & Overdue Escalation',
      desc: isRtl
        ? 'تاخیر کا شکار اقساط کی خودکار نشاندہی اور نرم شائستہ انداز میں واٹس ایپ یاد دہانی تاکہ 65% تیز ریکوری ہو۔'
        : 'Identifies pending and overdue installments, generating polite WhatsApp notices with payment links for 65% faster collection.',
      step1: isRtl ? 'تاریخ گزرنے پر الرٹ' : 'Due Date Passed',
      step2: isRtl ? 'ریڈ لسٹ میں خودکار شامل' : 'Flagged Overdue',
      step3: isRtl ? 'واٹس ایپ بل میسج روانہ' : 'WhatsApp Notice Sent',
      metric1: isRtl ? '📈 65% تیز تر ریکوری' : '📈 65% Faster Recovery',
      metric2: isRtl ? '📲 1-کلک واٹس ایپ الرٹ' : '📲 1-Click WhatsApp',
      link: '#recovery-section',
      actionText: isRtl ? 'ماڈیول کی تفصیلات دیکھیں ←' : 'Explore Recovery →',
      activeSat: 1,
      coreStatus: isRtl ? 'واٹس ایپ بوٹ ایکٹو' : 'WhatsApp Recovery Active'
    },
    khata: {
      id: isRtl ? 'ماڈیول #08' : 'MODULE #08',
      badge: isRtl ? 'ڈیجیٹل لیجر' : 'CORE ACCOUNTING',
      icon: '📖',
      title: isRtl ? 'مکمل ڈیجیٹل کسٹمر و سپلائر لیجر' : 'Real-Time Debtor & Creditor Ledgers',
      desc: isRtl
        ? 'مارکیٹ سے کس کس سے کتنے پیسے لینے ہیں اور سپلائرز کو کتنے دینے ہیں، ایک نظر میں مکمل کھاتہ صاف۔'
        : 'Dual-entry balance tracker showing exactly who owes you money (Receivables) and whom you owe (Payables) with 100% mathematical precision.',
      step1: isRtl ? 'خرید یا فروخت اندراج' : 'Ledger Entry Added',
      step2: isRtl ? 'جمع/بنام خودکار کٹوتی' : 'Debit/Credit Applied',
      step3: isRtl ? 'بقایا بیلنس فوری اپڈیٹ' : 'Balance Updated',
      metric1: isRtl ? '🧮 100% ریاضی غلطی سے پاک' : '🧮 100% Error-Free Math',
      metric2: isRtl ? '📱 لائیو ویب لنک' : '📱 Live Web-Link',
      link: '#digital-khata',
      actionText: isRtl ? 'ماڈیول کی تفصیلات دیکھیں ←' : 'Explore Khata →',
      activeSat: 3,
      coreStatus: isRtl ? 'ڈیجیٹل کھاتہ متحرک' : 'Digital Khata Connected'
    },
    agr: {
      id: isRtl ? 'ماڈیول #09' : 'MODULE #09',
      badge: isRtl ? 'قانونی تحفظ' : 'LEGAL PROTECTION',
      icon: '📑',
      title: isRtl ? 'قانونی بیعنامہ و عدالتی اقرار نامہ' : 'Legal Contracts & E-Stamp Paper Deeds',
      desc: isRtl
        ? 'اسٹامپ پیپر اور اقساط بیعنامہ فوری پرنٹ کریں جس میں خریدار، ضامنین اور تمام قانونی شرائط درج ہوں۔'
        : 'Generates legally compliant hire-purchase deeds with pre-filled asset details, guarantor CNICs, and biometric signature boxes.',
      step1: isRtl ? 'گاہک ڈیٹا لوڈ' : 'Customer Loaded',
      step2: isRtl ? 'قانونی شقیں شامل' : 'Clauses Injected',
      step3: isRtl ? 'اسٹامپ پرنٹ تیار' : 'Print on Stamp Paper',
      metric1: isRtl ? '🏛️ قانونی ایکٹ کے مطابق' : '🏛️ Stamp Act Compliant',
      metric2: isRtl ? '🔒 محفوظ ڈیجیٹل ریکارڈ' : '🔒 Permanent Archive',
      link: '#digital-khata',
      actionText: isRtl ? 'ماڈیول کی تفصیلات دیکھیں ←' : 'Explore Legal Deeds →',
      activeSat: 3,
      coreStatus: isRtl ? 'ای-اسٹامپ انجن تیار' : 'E-Deed Generator Ready'
    },
    exp: {
      id: isRtl ? 'ماڈیول #10' : 'MODULE #10',
      badge: isRtl ? 'اخراجات مینجمنٹ' : 'EXPENSE TRACKER',
      icon: '🧾',
      title: isRtl ? 'دکان کے روزمرہ خرچے و ملازمین کی تنخواہیں' : 'Shop Expenses, Salaries & Petty Cash',
      desc: isRtl
        ? 'دکان کا کرایہ، بجلی کا بل، جنریٹر ڈیزل، چائے اور ملازمین کے ایڈوانس خرچوں کا الگ الگ درست حساب۔'
        : 'Categorizes shop electricity, rents, generator fuel, tea, and employee advances to calculate your genuine net earnings.',
      step1: isRtl ? 'خرچہ کی رسید درج' : 'Voucher Logged',
      step2: isRtl ? 'ہیڈ کے مطابق کیٹلاگ' : 'Categorized Head',
      step3: isRtl ? 'خالص منافع سے کٹوتی' : 'Deducted from Net P&L',
      metric1: isRtl ? '📂 کیٹلاگ شدہ اخراجات' : '📂 Categorized Heads',
      metric2: isRtl ? '📉 غیر ضروری اخراجات پر روک' : '📉 Leakage Prevention',
      link: '#finance-section',
      actionText: isRtl ? 'ماڈیول کی تفصیلات دیکھیں ←' : 'Explore Expenses →',
      activeSat: 4,
      coreStatus: isRtl ? 'روزمرہ اخراجات ہم آہنگ' : 'Expense Ledger Synced'
    },
    pnl: {
      id: isRtl ? 'ماڈیول #11' : 'MODULE #11',
      badge: isRtl ? 'کاروباری رپورٹ' : 'BUSINESS INTELLIGENCE',
      icon: '📈',
      title: isRtl ? 'روزانہ آمدن، اخراجات و خالص منافع' : 'Daily P&L & Real-Time Net Margins',
      desc: isRtl
        ? 'دن بھر کی نقد فروخت، وصول شدہ اقساط اور خرچوں کو خودکار مائنس کر کے شام کو دکان کا اصل منافع دکھائے۔'
        : 'Automatically nets cash sales + installment profits against shop expenses to give you the honest final profit figure every evening.',
      step1: isRtl ? 'تمام 10 ماڈیولز کا ڈیٹا' : '10 Modules Aggregated',
      step2: isRtl ? 'کلاؤڈ کیلکولیشن' : 'Real-time Net Math',
      step3: isRtl ? 'اصل منافع چارٹ تیار' : 'Daily P&L Generated',
      metric1: isRtl ? '📊 100% خودکار حساب' : '📊 100% Automated P&L',
      metric2: isRtl ? '📈 آمدن ترقی کا چارٹ' : '📈 Growth Visualizer',
      link: '#finance-section',
      actionText: isRtl ? 'ماڈیول کی تفصیلات دیکھیں ←' : 'Explore P&L →',
      activeSat: 4,
      coreStatus: isRtl ? 'منافع و نقصان انجن لائیو' : 'P&L Analytics Active'
    }
  };

  const inspBadge = document.getElementById('insp-badge');
  const inspId = document.getElementById('insp-id');
  const inspIcon = document.getElementById('insp-icon');
  const inspTitle = document.getElementById('insp-title');
  const inspDesc = document.getElementById('insp-desc');
  const pStep1 = document.getElementById('p-step-1');
  const pStep2 = document.getElementById('p-step-2');
  const pStep3 = document.getElementById('p-step-3');
  const inspMetric1 = document.getElementById('insp-metric-1');
  const inspMetric2 = document.getElementById('insp-metric-2');
  const inspActionBtn = document.getElementById('insp-action-btn');
  const activeCoreStatus = document.getElementById('active-core-status');

  const satNodes = [
    document.getElementById('sat-node-1'),
    document.getElementById('sat-node-2'),
    document.getElementById('sat-node-3'),
    document.getElementById('sat-node-4')
  ];

  const beamLines = [
    document.getElementById('beam-1'),
    document.getElementById('beam-2'),
    document.getElementById('beam-3'),
    document.getElementById('beam-4')
  ];

  let currentModKeyIndex = 0;
  const modKeys = Object.keys(modulesData);
  let archInterval = null;

  function renderModuleInspector(modKey) {
    const data = modulesData[modKey];
    if (!data) return;

    if (inspBadge) inspBadge.textContent = data.badge;
    if (inspId) inspId.textContent = data.id;
    if (inspIcon) inspIcon.textContent = data.icon;
    if (inspTitle) inspTitle.textContent = data.title;
    if (inspDesc) inspDesc.textContent = data.desc;
    if (pStep1) pStep1.textContent = data.step1;
    if (pStep2) pStep2.textContent = data.step2;
    if (pStep3) pStep3.textContent = data.step3;
    if (inspMetric1) inspMetric1.textContent = data.metric1;
    if (inspMetric2) inspMetric2.textContent = data.metric2;
    if (inspActionBtn) {
      inspActionBtn.href = data.link;
      inspActionBtn.textContent = data.actionText;
    }
    if (activeCoreStatus) {
      activeCoreStatus.textContent = data.coreStatus;
    }

    // Activate the appropriate satellite node & beam
    satNodes.forEach((node, idx) => {
      if (node) {
        if (idx + 1 === data.activeSat) {
          node.classList.add('active');
        } else {
          node.classList.remove('active');
        }
      }
    });

    beamLines.forEach((beam, idx) => {
      if (beam) {
        if (idx + 1 === data.activeSat) {
          beam.classList.add('active');
        } else {
          beam.classList.remove('active');
        }
      }
    });
  }

  function setActiveModule(chipEl) {
    const modKey = chipEl.getAttribute('data-mod');
    moduleChips.forEach(c => c.classList.remove('active'));
    chipEl.classList.add('active');
    renderModuleInspector(modKey);
  }

  moduleChips.forEach((chip, index) => {
    chip.addEventListener('click', () => {
      currentModKeyIndex = index;
      setActiveModule(chip);
      clearInterval(archInterval);
      startArchAutoRotate();
    });
  });

  function startArchAutoRotate() {
    archInterval = setInterval(() => {
      currentModKeyIndex = (currentModKeyIndex + 1) % moduleChips.length;
      if (moduleChips[currentModKeyIndex]) {
        setActiveModule(moduleChips[currentModKeyIndex]);
      }
    }, 4500);
  }

  if (moduleChips.length > 0) {
    startArchAutoRotate();
  }

  const archStage = document.getElementById('architecture-stage');
  if (archStage) {
    archStage.addEventListener('mouseenter', () => clearInterval(archInterval));
    archStage.addEventListener('mouseleave', () => startArchAutoRotate());
  }

  // 9. MODAL POPUP (LEAD GENERATION / DEMO)
  const demoModal = document.getElementById('demo-modal-overlay');
  const btnOpenDemo = document.getElementById('btn-open-demo');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const demoLeadForm = document.getElementById('demo-lead-form');

  const btnOpenDemoManifesto = document.getElementById('btn-open-demo-manifesto');
  const btnOpenDemoConcierge = document.getElementById('btn-open-demo-concierge');

  if (btnOpenDemo && demoModal) {
    btnOpenDemo.addEventListener('click', (e) => {
      e.preventDefault();
      demoModal.classList.add('active');
    });
  }

  if (btnOpenDemoManifesto && demoModal) {
    btnOpenDemoManifesto.addEventListener('click', (e) => {
      e.preventDefault();
      demoModal.classList.add('active');
    });
  }

  if (btnOpenDemoConcierge && demoModal) {
    btnOpenDemoConcierge.addEventListener('click', (e) => {
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
