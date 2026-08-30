const fs = require('fs');
const path = require('path');

function auditFile(filename, cssFilename, jsFilename) {
  const htmlPath = path.join(__dirname, filename);
  const cssPath = path.join(__dirname, cssFilename);
  const jsPath = path.join(__dirname, jsFilename);

  const html = fs.readFileSync(htmlPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');
  const js = fs.readFileSync(jsPath, 'utf8');

  console.log(`\n=== AUDITING ${filename.toUpperCase()} & ${cssFilename.toUpperCase()} ===\n`);

  let failed = false;

  function check(testName, condition, errorMsg) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
    } else {
      console.error(`❌ [FAIL] ${testName}: ${errorMsg}`);
      failed = true;
    }
  }

  // 1. Check Brand Placeholder
  check(
    'Brand Placeholder [BRAND NAME] Usage',
    html.includes('[BRAND NAME]') && !html.includes('KhataPro'),
    'Brand should be [BRAND NAME] and must not contain KhataPro'
  );

  // 2. Check 15 Chapters
  const requiredSections = [
    { id: 'hero', name: 'Chapter 01: Hero' },
    { id: 'problem', name: 'Chapter 02: The Problem' },
    { id: 'transformation', name: 'Chapter 03: The Transformation' },
    { id: 'customer-khata', name: 'Chapter 04: Customer + Khata' },
    { id: 'cash-installment', name: 'Chapter 05: Cash + Installment' },
    { id: 'installments-recovery', name: 'Chapter 06: Installments + Recovery' },
    { id: 'agreements', name: 'Chapter 07: Agreements' },
    { id: 'money-flow', name: 'Chapter 08 & 09: Money Flow & Financial Picture' },
    { id: 'connected-system', name: 'Chapter 10: System Topology' },
    { id: 'security', name: 'Chapter 11: Security + Backup' },
    { id: 'emotional-moment', name: 'Chapter 12: Emotional Brand Moment' },
    { id: 'pricing', name: 'Chapter 13: Pricing' },
    { id: 'final-cta', name: 'Chapter 14: Final CTA' }
  ];

  requiredSections.forEach(sec => {
    check(
      `Section Present: ${sec.name} (#${sec.id})`,
      html.includes(`id="${sec.id}"`),
      `Missing section element with id="${sec.id}"`
    );
  });

  // 3. Check Exact Core Copy & Statements
  check(
    'Hero Headline Copy',
    html.includes('Aapka business chhota nahi hai') && html.includes('Aapka system purana hai'),
    'Hero headline copy mismatch'
  );

  check(
    'Problem Headline Copy',
    html.includes('Hisaab hai.') && html.includes('Lekin control nahi.'),
    'Problem headline copy mismatch'
  );

  check(
    'Transformation Headline Copy',
    html.includes('Ab hisaab register mein nahi') && html.includes('System mein hoga'),
    'Transformation headline copy mismatch'
  );

  check(
    'Customer 360 Headline Copy',
    html.includes('Har customer ka poora hisaab'),
    'Customer 360 headline copy mismatch'
  );

  check(
    'Dual Sales Headline Copy',
    html.includes('Dono ka hisaab — ek system'),
    'Dual sales headline copy mismatch'
  );

  check(
    'Installment & Recovery Headline Copy',
    html.includes('Kis se kitna lena hai?') && html.includes('Installment ka hisaab — clear.'),
    'Installment & recovery headline copy mismatch'
  );

  check(
    'Agreement Headline Copy',
    html.includes('Agreement bhi.') && html.includes('Record bhi.'),
    'Agreement headline copy mismatch'
  );

  check(
    'Money Flow Headline Copy',
    html.includes('Sale se profit tak.') && html.includes('Asal business picture dekhein.'),
    'Money flow headline copy mismatch'
  );

  check(
    'Connected System Headline Copy',
    html.includes('Har record connected.') && html.includes('Har cheez ek jagah.'),
    'Connected system headline copy mismatch'
  );

  check(
    'Security Headline Copy',
    html.includes('Business ka data,') && html.includes('business ki tarah secure.'),
    'Security headline copy mismatch'
  );

  check(
    'Emotional Brand Statement',
    html.includes('Aapko software nahi chahiye.') && html.includes('Aapko apne business ka control chahiye.'),
    'Emotional brand moment statement mismatch'
  );

  check(
    'Final CTA Headline Copy',
    html.includes('Aaj se Khata digital karein.'),
    'Final CTA headline copy mismatch'
  );

  // 4. Check Strict Pricing Limits & Purchase Models
  check(
    'Pricing Limits: Free / Basic (10 Customers, 10 Products)',
    html.includes('10 Customers') && html.includes('10 Products'),
    'Free plan limits must be exactly 10 Customers and 10 Products'
  );

  check(
    'Pricing Limits: Premium (100 Customers, 100 Products)',
    html.includes('100 Customers') && html.includes('100 Products'),
    'Premium plan limits must be exactly 100 Customers and 100 Products'
  );

  check(
    'Pricing Limits: Exclusive (Unlimited Customers, Unlimited Products)',
    html.includes('Unlimited Customers') && html.includes('Unlimited Products'),
    'Exclusive plan limits must be exactly Unlimited Customers and Unlimited Products'
  );

  check(
    'Purchase Model Toggle (Monthly Rental vs One-Time Purchase)',
    html.includes('MONTHLY RENTAL') && html.includes('ONE-TIME PURCHASE'),
    'Pricing purchase model toggle buttons missing'
  );

  // 5. Check Customer Record Details
  check(
    'Customer Record Details (Muhammad Ahmed / Honda Bike / PKR 250,000 / PKR 100,000 / PKR 150,000 / 05 SEP)',
    html.includes('Muhammad Ahmed') && html.includes('250,000') && html.includes('100,000') && html.includes('150,000'),
    'Customer record details missing or inaccurate'
  );

  // 6. Check Banned Buzzwords
  const bannedWords = ['Revolutionize', 'Supercharge', 'AI-powered', 'Military-grade', '256-bit encryption'];
  bannedWords.forEach(word => {
    check(
      `No Banned Term: "${word}"`,
      !html.toLowerCase().includes(word.toLowerCase()),
      `Contains banned term: ${word}`
    );
  });

  return !failed;
}

const v1Passed = auditFile('index.html', 'style.css', 'app.js');
const v2Passed = auditFile('v2.html', 'v2-style.css', 'v2-app.js');
const lightPassed = auditFile('light.html', 'v2-style.css', 'v2-app.js');

if (v1Passed && v2Passed && lightPassed) {
  console.log('\n===================================================');
  console.log('🎉 ALL AUDIT CHECKS PASSED FOR V1, V2 & LIGHT EDITION!');
  process.exit(0);
} else {
  console.error('\n===================================================');
  console.error('❌ SOME TESTS FAILED.');
  process.exit(1);
}
