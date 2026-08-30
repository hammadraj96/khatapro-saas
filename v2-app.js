/* ==========================================================================
   [BRAND NAME] — Version 2: Modern Animated SaaS Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initV2Theme();
  initV2StickyNav();
  initV2SmoothScroll();
});

/* 0. Light / Dark Mode Toggle System */
function initV2Theme() {
  const savedTheme = localStorage.getItem('v2_theme') || 'dark';
  applyV2Theme(savedTheme);
}

function toggleV2Theme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyV2Theme(newTheme);
  localStorage.setItem('v2_theme', newTheme);
}

function applyV2Theme(theme) {
  const darkIcon = document.querySelector('.theme-icon-dark');
  const lightIcon = document.querySelector('.theme-icon-light');
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (darkIcon) darkIcon.style.display = 'none';
    if (lightIcon) lightIcon.style.display = 'inline-block';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (darkIcon) darkIcon.style.display = 'inline-block';
    if (lightIcon) lightIcon.style.display = 'none';
  }
}

/* 1. Header Elevation on Scroll */
function initV2StickyNav() {
  const header = document.getElementById('v2Header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* 2. Smooth Scroll Anchor Links */
function initV2SmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

/* 3. Transformation 5-Step Scrubber */
function setV2TransformStep(step) {
  const buttons = document.querySelectorAll('.scrubber-btn-pill, .scrubber-tab-btn');
  buttons.forEach((btn, index) => {
    if (index + 1 === step) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  for (let i = 1; i <= 5; i++) {
    const view = document.getElementById(`v2View${i}`);
    if (view) {
      if (i === step) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    }
  }
}

/* 4. Customer 360 Workspace Tabs */
function setV2CustomerTab(tabName) {
  const tabs = document.querySelectorAll('.workspace-tab-item');
  tabs.forEach(tab => {
    if (tab.innerText.toLowerCase().includes(tabName.toLowerCase())) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  const panes = {
    overview: document.getElementById('v2PaneOverview'),
    purchases: document.getElementById('v2PanePurchases'),
    payments: document.getElementById('v2PanePayments'),
    installments: document.getElementById('v2PaneInstallments'),
    ledger: document.getElementById('v2PaneLedger'),
    agreement: document.getElementById('v2PaneAgreement')
  };

  Object.keys(panes).forEach(key => {
    if (panes[key]) {
      if (key === tabName.toLowerCase()) {
        panes[key].classList.add('active');
      } else {
        panes[key].classList.remove('active');
      }
    }
  });
}

/* 5. Interactive Financial Flow Volume Simulator */
function updateV2FinancialStream(val) {
  const num = parseInt(val, 10);
  const formattedSales = 'PKR ' + num.toLocaleString();
  
  const sliderDisplay = document.getElementById('v2SliderDisplayVal');
  const streamSales = document.getElementById('v2StreamSales');
  const streamCollections = document.getElementById('v2StreamCollections');
  const streamExpenses = document.getElementById('v2StreamExpenses');
  const streamInvestment = document.getElementById('v2StreamInvestment');
  const streamOutstanding = document.getElementById('v2StreamOutstanding');

  if (sliderDisplay) sliderDisplay.innerText = formattedSales;
  if (streamSales) streamSales.innerText = formattedSales;

  // Realistic business proportion calculations
  const collections = Math.round(num * 0.784);
  const expenses = Math.round(num * 0.144);
  const investment = Math.round(num * 0.08);
  const outstanding = Math.round(num * 0.216);

  if (streamCollections) streamCollections.innerText = 'PKR ' + collections.toLocaleString();
  if (streamExpenses) streamExpenses.innerText = 'PKR ' + expenses.toLocaleString();
  if (streamInvestment) streamInvestment.innerText = 'PKR ' + investment.toLocaleString();
  if (streamOutstanding) streamOutstanding.innerText = 'PKR ' + outstanding.toLocaleString();
}

/* 6. System Topology Interactive Explanations & Simulations */
const v2TopologyExplanations = {
  customers: "<strong>👥 Customers Module:</strong> Har customer ka phone, CNIC, purchase history, running khata aur zamin ka record ek jagah safe rehta hai.",
  inventory: "<strong>📦 Products & Inventory:</strong> Cash ya installment par bikne wali har product foran stock se deduct hoti hai — zero duplicate entry.",
  cash: "<strong>💵 Cash Sales Engine:</strong> Full payment sale foran cashbook mein deposit hoti hai aur digital receipt issue hoti hai.",
  installments: "<strong>📅 Installment Engine:</strong> 3, 6, ya 12 mahine ka schedule auto-generate hota hai jisme har qist ki due date fix hoti hai.",
  recovery: "<strong>🎯 Recovery Radar:</strong> Aaj kis kis se qist leni hai aur kaun overdue hai — subah dukan kholte hi list samne hoti hai.",
  agreements: "<strong>📝 Digital Agreements:</strong> Sale terms aur customer agreement digital record mein save hota hai with stamp paper format.",
  expenses: "<strong>💸 Expenses & Capital:</strong> Dukan ka rent, bijli ka bill aur chai kharcha rozana cashbook se sync hota hai.",
  profit: "<strong>📊 Automated Profit & Loss:</strong> Sales, expenses aur collections ka automatic hisaab — zero guesswork, real net margin.",
  backup: "<strong>☁️ Cloud Backup & Restore:</strong> Device kharab ya chori hone par bhi aapka business data 100% mehfooz rehta hai."
};

function selectV2TopologyNode(nodeKey, el) {
  document.querySelectorAll('.topology-matrix-card, .topology-pill-btn, .topology-node-button').forEach(chip => chip.classList.remove('active-node'));
  if (el) el.classList.add('active-node');

  const detailEl = document.getElementById('v2TopologyDetailText');
  if (detailEl && v2TopologyExplanations[nodeKey]) {
    detailEl.innerHTML = v2TopologyExplanations[nodeKey];
  }
}

function simulateV2TopologyFlow(flowType) {
  const detailEl = document.getElementById('v2TopologyDetailText');
  if (!detailEl) return;

  if (flowType === 'installment_sale') {
    detailEl.innerHTML = `
      <div style="color: #34d399; font-weight: 800; margin-bottom: 0.35rem;">⚡ SIMULATING INSTALLMENT SALE: Honda CG 125</div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; font-size: 0.82rem; font-family: var(--font-mono);">
        <span style="background: rgba(86, 77, 255, 0.2); padding: 3px 8px; border-radius: 4px;">1. Stock -1</span> ➔
        <span style="background: rgba(16, 185, 129, 0.2); padding: 3px 8px; border-radius: 4px;">2. Cashbook +PKR 100,000</span> ➔
        <span style="background: rgba(245, 158, 11, 0.2); padding: 3px 8px; border-radius: 4px;">3. 12-Mo Schedule Created</span> ➔
        <span style="background: rgba(86, 77, 255, 0.2); padding: 3px 8px; border-radius: 4px;">4. Agreement Archived</span>
      </div>
    `;
  } else if (flowType === 'recovery') {
    detailEl.innerHTML = `
      <div style="color: #fbbf24; font-weight: 800; margin-bottom: 0.35rem;">💳 SIMULATING MONTHLY RECOVERY: PKR 12,500 Collected</div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; font-size: 0.82rem; font-family: var(--font-mono);">
        <span style="background: rgba(16, 185, 129, 0.2); padding: 3px 8px; border-radius: 4px;">1. Cash Inflow +12,500</span> ➔
        <span style="background: rgba(86, 77, 255, 0.2); padding: 3px 8px; border-radius: 4px;">2. Outstanding -12,500</span> ➔
        <span style="background: rgba(52, 211, 153, 0.2); padding: 3px 8px; border-radius: 4px;">3. Qist Marked PAID</span> ➔
        <span style="background: rgba(37, 211, 102, 0.2); padding: 3px 8px; border-radius: 4px;">4. WhatsApp Receipt Sent</span>
      </div>
    `;
  } else if (flowType === 'expense') {
    detailEl.innerHTML = `
      <div style="color: #fda4af; font-weight: 800; margin-bottom: 0.35rem;">💸 SIMULATING EXPENSE ENTRY: Shop Rent PKR 35,000</div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; font-size: 0.82rem; font-family: var(--font-mono);">
        <span style="background: rgba(244, 63, 94, 0.2); padding: 3px 8px; border-radius: 4px;">1. Cashbook -35,000</span> ➔
        <span style="background: rgba(86, 77, 255, 0.2); padding: 3px 8px; border-radius: 4px;">2. Expense Ledger Categorized</span> ➔
        <span style="background: rgba(129, 140, 248, 0.2); padding: 3px 8px; border-radius: 4px;">3. Net Monthly P&L Recalculated</span>
      </div>
    `;
  }
}

/* 7. Action: Mark Overdue Reviewed */
function markV2OverdueReviewed(buttonElement) {
  if (!buttonElement) return;
  buttonElement.disabled = true;
  buttonElement.innerText = '✓ Reviewed';
  buttonElement.style.background = 'var(--status-emerald)';
  buttonElement.style.borderColor = 'var(--status-emerald)';
  
  const parentCard = buttonElement.closest('.overdue-priority-card');
  if (parentCard) {
    parentCard.style.borderColor = 'var(--status-emerald-border)';
    parentCard.style.background = 'var(--status-emerald-bg)';
  }
}

/* 8. Pricing Model Switcher (Monthly Rental vs One-Time Purchase) */
function setV2PricingModel(model) {
  const btnMonthly = document.getElementById('v2BtnMonthly');
  const btnOneTime = document.getElementById('v2BtnOneTime');
  const premiumPrice = document.getElementById('v2PremiumPrice');
  const premiumPeriod = document.getElementById('v2PremiumPeriod');
  const exclusivePrice = document.getElementById('v2ExclusivePrice');
  const exclusivePeriod = document.getElementById('v2ExclusivePeriod');

  if (model === 'monthly') {
    if (btnMonthly) btnMonthly.classList.add('active');
    if (btnOneTime) btnOneTime.classList.remove('active');

    if (premiumPrice) premiumPrice.innerText = 'PKR 2,500';
    if (premiumPeriod) premiumPeriod.innerText = '/ month (Rental)';
    if (exclusivePrice) exclusivePrice.innerText = 'PKR 5,000';
    if (exclusivePeriod) exclusivePeriod.innerText = '/ month (Rental)';
  } else {
    if (btnMonthly) btnMonthly.classList.remove('active');
    if (btnOneTime) btnOneTime.classList.add('active');

    if (premiumPrice) premiumPrice.innerText = 'PKR 35,000';
    if (premiumPeriod) premiumPeriod.innerText = 'One-Time Lifetime';
    if (exclusivePrice) exclusivePrice.innerText = 'PKR 70,000';
    if (exclusivePeriod) exclusivePeriod.innerText = 'One-Time Lifetime';
  }
}

/* 9. Modal Handlers */
function openV2DemoModal() {
  const modal = document.getElementById('v2DemoModal');
  if (modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeV2DemoModal() {
  const modal = document.getElementById('v2DemoModal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function openV2SetupModal(planName) {
  const modal = document.getElementById('v2SetupModal');
  if (modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeV2SetupModal() {
  const modal = document.getElementById('v2SetupModal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function handleV2QuickSetup(e) {
  e.preventDefault();
  alert("Shukriya! Aapka account create ho gaya hai. Ab aap apna digital khata shuru kar sakte hain.");
  closeV2SetupModal();
}

// Close modals when clicking backdrop
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-overlay-hy')) {
    e.target.classList.remove('open');
    e.target.setAttribute('aria-hidden', 'true');
  }
});

/* 10. Hero Cockpit Subtabs Switcher */
function setV2HeroCardTab(tab) {
  const tabs = ['schedule', 'agreement', 'receipt'];
  tabs.forEach(t => {
    const btn = document.getElementById(`heroSubtabBtn${t.charAt(0).toUpperCase() + t.slice(1)}`);
    const pane = document.getElementById(`heroSubpane${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (btn) {
      if (t === tab) btn.classList.add('active');
      else btn.classList.remove('active');
    }
    if (pane) {
      if (t === tab) pane.classList.add('active');
      else pane.classList.remove('active');
    }
  });
}

/* 11. Hero Live Installment Collection Simulator */
function handleHeroCollectInstallment() {
  const paidEl = document.getElementById('heroMetricPaid');
  const outstandingEl = document.getElementById('heroMetricOutstanding');
  const dueEl = document.getElementById('heroMetricDue');
  const progressLabel = document.getElementById('heroProgressLabel');
  const countLabel = document.getElementById('heroInstallmentsCount');
  const progressBar = document.getElementById('heroProgressBar');
  const activePip = document.getElementById('heroPipActive');
  const nextRow = document.getElementById('heroNextQistRow');
  const nextStatus = document.getElementById('heroNextQistStatus');
  const actionTitle = document.getElementById('heroActionTitle');
  const actionSub = document.getElementById('heroActionSub');
  const btnCollect = document.getElementById('btnHeroCollect');
  const btnReset = document.getElementById('btnHeroReset');

  // Update Metrics
  if (paidEl) {
    paidEl.innerText = 'PKR 112,500';
    paidEl.style.transition = 'color 0.3s ease';
    paidEl.style.color = '#34d399';
  }
  if (outstandingEl) {
    outstandingEl.innerText = 'PKR 137,500';
    outstandingEl.style.color = '#fbbf24';
  }
  if (dueEl) {
    dueEl.innerText = '05 OCT';
  }
  if (progressLabel) {
    progressLabel.innerText = 'Recovery Progress: 45% (PKR 112.5k / 250k)';
  }
  if (countLabel) {
    countLabel.innerText = '5 of 12 Clear';
  }
  if (progressBar) {
    progressBar.style.width = '45%';
  }
  if (activePip) {
    activePip.classList.remove('due');
    activePip.classList.add('paid');
  }
  if (nextRow) {
    nextRow.style.background = 'rgba(16, 185, 129, 0.12)';
    nextRow.style.borderColor = 'rgba(16, 185, 129, 0.35)';
  }
  if (nextStatus) {
    nextStatus.innerHTML = '<span style="color: #34d399;">✓ RECEIVED (PKR 12,500)</span>';
  }
  if (actionTitle) {
    actionTitle.innerText = '✓ Payment Successfully Recorded!';
    actionTitle.style.color = '#34d399';
  }
  if (actionSub) {
    actionSub.innerText = 'Receipt #REC-8994 generated & synced with Cashbook.';
  }
  if (btnCollect) {
    btnCollect.disabled = true;
    btnCollect.innerHTML = '<span>✓ Paid</span>';
    btnCollect.style.opacity = '0.7';
  }
  if (btnReset) {
    btnReset.style.display = 'inline-flex';
  }
}

function handleHeroResetInstallment() {
  const paidEl = document.getElementById('heroMetricPaid');
  const outstandingEl = document.getElementById('heroMetricOutstanding');
  const dueEl = document.getElementById('heroMetricDue');
  const progressLabel = document.getElementById('heroProgressLabel');
  const countLabel = document.getElementById('heroInstallmentsCount');
  const progressBar = document.getElementById('heroProgressBar');
  const activePip = document.getElementById('heroPipActive');
  const nextRow = document.getElementById('heroNextQistRow');
  const nextStatus = document.getElementById('heroNextQistStatus');
  const actionTitle = document.getElementById('heroActionTitle');
  const actionSub = document.getElementById('heroActionSub');
  const btnCollect = document.getElementById('btnHeroCollect');
  const btnReset = document.getElementById('btnHeroReset');

  if (paidEl) paidEl.innerText = 'PKR 100,000';
  if (outstandingEl) outstandingEl.innerText = 'PKR 150,000';
  if (dueEl) dueEl.innerText = '05 SEP';
  if (progressLabel) progressLabel.innerText = 'Recovery Progress: 40% (PKR 100k / 250k)';
  if (countLabel) countLabel.innerText = '4 of 12 Clear';
  if (progressBar) progressBar.style.width = '40%';
  if (activePip) {
    activePip.classList.remove('paid');
    activePip.classList.add('due');
  }
  if (nextRow) {
    nextRow.style.background = 'rgba(245, 158, 11, 0.1)';
    nextRow.style.borderColor = 'rgba(245, 158, 11, 0.25)';
  }
  if (nextStatus) {
    nextStatus.innerHTML = '<strong style="color: #fbbf24;">● DUE TODAY (PKR 12,500)</strong>';
  }
  if (actionTitle) {
    actionTitle.innerText = 'Try Live Installment Recovery';
    actionTitle.style.color = '#ffffff';
  }
  if (actionSub) {
    actionSub.innerText = "Click to record Muhammad Ahmed's PKR 12,500";
  }
  if (btnCollect) {
    btnCollect.disabled = false;
    btnCollect.innerHTML = '<span>💳 Receive PKR 12,500</span>';
    btnCollect.style.opacity = '1';
  }
  if (btnReset) {
    btnReset.style.display = 'none';
  }
}

function handleV2WhatsAppReminder() {
  alert("WhatsApp Message Queued for Muhammad Ahmed (0300-1234567):\n\n'Assalam-o-Alaikum Ahmed Bhai, aapki Honda CG 125 ki monthly installment PKR 12,500 tareekh 05 Sep ko due hai. Shukriya!'");
}
